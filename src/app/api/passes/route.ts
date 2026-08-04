import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BusPass from '@/models/BusPass';
import { getNextSequence } from '@/models/Counter';
import { samplePasses, getNextTicketNumber, getNextPassNumber, BusPassRecord } from '@/lib/memoryStore';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const search = searchParams.get('search') || '';
  const paymentStatus = searchParams.get('paymentStatus') || '';
  const route = searchParams.get('route') || '';

  try {
    await dbConnect();

    const query: Record<string, unknown> = {};

    if (search) {
      query.$or = [
        { passengerName: { $regex: search, $options: 'i' } },
        { mobileNumber: { $regex: search, $options: 'i' } },
        { ticketNumber: { $regex: search, $options: 'i' } },
        { busPassNumber: { $regex: search, $options: 'i' } },
      ];
    }

    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }

    if (route) {
      query.busRoute = { $regex: route, $options: 'i' };
    }

    const skip = (page - 1) * limit;
    const [passes, total] = await Promise.all([
      BusPass.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      BusPass.countDocuments(query),
    ]);

    return NextResponse.json({
      passes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit) || 1,
      },
    });
  } catch {
    console.warn('MongoDB query failed, serving from memory store');
    let filtered = [...samplePasses];

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.passengerName.toLowerCase().includes(q) ||
          p.mobileNumber.includes(q) ||
          p.ticketNumber.toLowerCase().includes(q) ||
          p.busPassNumber.toLowerCase().includes(q)
      );
    }

    if (paymentStatus) {
      filtered = filtered.filter((p) => p.paymentStatus === paymentStatus);
    }

    if (route) {
      filtered = filtered.filter((p) => p.busRoute.toLowerCase().includes(route.toLowerCase()));
    }

    const total = filtered.length;
    const start = (page - 1) * limit;
    const passes = filtered.slice(start, start + limit);

    return NextResponse.json({
      passes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit) || 1,
      },
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    try {
      await dbConnect();
      const ticketSeq = await getNextSequence('ticketNumber');
      const passSeq = await getNextSequence('busPassNumber');

      const ticketNumber = `TKT-${String(ticketSeq).padStart(6, '0')}`;
      const busPassNumber = `BP-${String(passSeq).padStart(6, '0')}`;

      const pass = await BusPass.create({
        ...body,
        ticketNumber,
        busPassNumber,
      });

      return NextResponse.json(pass, { status: 201 });
    } catch {
      console.warn('MongoDB unavailable on POST, saving to memory store');
      const ticketNumber = getNextTicketNumber();
      const busPassNumber = getNextPassNumber();

      const newPass: BusPassRecord = {
        _id: `pass-${Date.now()}`,
        passengerName: body.passengerName || 'Passenger',
        fatherGuardianName: body.fatherGuardianName || '',
        mobileNumber: body.mobileNumber || '',
        address: body.address || '',
        passengerPhoto: body.passengerPhoto || '',
        ticketNumber,
        busPassNumber,
        busRoute: body.busRoute || '',
        fromLocation: body.fromLocation || '',
        toLocation: body.toLocation || '',
        dateOfJourney: body.dateOfJourney || new Date().toISOString().split('T')[0],
        validUntil: body.validUntil || new Date().toISOString().split('T')[0],
        seatNumber: body.seatNumber || '',
        busNumber: body.busNumber || '',
        driverName: body.driverName || '',
        fareAmount: Number(body.fareAmount) || 0,
        advanceAmount: Number(body.advanceAmount) || 0,
        balanceAmount: Number(body.balanceAmount) || 0,
        seatCount: body.seatCount || '1 seat',
        sleeperCount: body.sleeperCount || '2 sleeper',
        paymentStatus: body.paymentStatus || 'pending',
        notes: body.notes || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      samplePasses.unshift(newPass);
      return NextResponse.json(newPass, { status: 201 });
    }
  } catch (error) {
    console.error('POST /api/passes error:', error);
    return NextResponse.json({ error: 'Failed to create pass' }, { status: 500 });
  }
}
