import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BusPass from '@/models/BusPass';
import { auth } from '@/lib/auth';
import * as XLSX from 'xlsx';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as { role: string }).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await dbConnect();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'daily';
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
    const format = searchParams.get('format') || 'json';

    let startDate: Date, endDate: Date;

    if (type === 'daily') {
      startDate = new Date(date);
      endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
    } else {
      const [year, month] = date.split('-').map(Number);
      startDate = new Date(year, month - 1, 1);
      endDate = new Date(year, month, 0, 23, 59, 59);
    }

    const passes = await BusPass.find({
      createdAt: { $gte: startDate, $lte: endDate },
    }).sort({ createdAt: -1 }).lean();

    const summary = {
      totalPasses: passes.length,
      totalRevenue: passes.reduce((sum, p) => sum + (p.fareAmount || 0), 0),
      paidCount: passes.filter((p) => p.paymentStatus === 'paid').length,
      pendingCount: passes.filter((p) => p.paymentStatus === 'pending').length,
      partialCount: passes.filter((p) => p.paymentStatus === 'partial').length,
    };

    if (format === 'excel') {
      const excelData = passes.map((p) => ({
        'Ticket #': p.ticketNumber,
        'Pass #': p.busPassNumber,
        'Passenger': p.passengerName,
        'Father/Guardian': p.fatherGuardianName,
        'Mobile': p.mobileNumber,
        'Route': p.busRoute,
        'From': p.fromLocation,
        'To': p.toLocation,
        'Bus #': p.busNumber,
        'Seat #': p.seatNumber,
        'Driver': p.driverName,
        'Journey Date': new Date(p.dateOfJourney).toLocaleDateString(),
        'Valid Until': new Date(p.validUntil).toLocaleDateString(),
        'Fare': p.fareAmount,
        'Payment': p.paymentStatus,
        'Created': new Date(p.createdAt).toLocaleString(),
      }));

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(excelData);
      XLSX.utils.book_append_sheet(wb, ws, 'Bus Passes');
      const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename="report-${type}-${date}.xlsx"`,
        },
      });
    }

    return NextResponse.json({ passes, summary, type, date });
  } catch (error) {
    console.error('GET /api/reports error:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}
