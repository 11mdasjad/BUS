import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BusPass from '@/models/BusPass';
import { samplePasses } from '@/lib/memoryStore';

export async function GET() {
  try {
    await dbConnect();

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      totalPasses,
      activePasses,
      todayPasses,
      totalRevenue,
      todayRevenue,
      paidCount,
      pendingCount,
      monthlyData,
    ] = await Promise.all([
      BusPass.countDocuments(),
      BusPass.countDocuments({ validUntil: { $gte: now } }),
      BusPass.countDocuments({ createdAt: { $gte: todayStart } }),
      BusPass.aggregate([{ $group: { _id: null, total: { $sum: '$fareAmount' } } }]),
      BusPass.aggregate([
        { $match: { createdAt: { $gte: todayStart } } },
        { $group: { _id: null, total: { $sum: '$fareAmount' } } },
      ]),
      BusPass.countDocuments({ paymentStatus: 'paid' }),
      BusPass.countDocuments({ paymentStatus: 'pending' }),
      BusPass.aggregate([
        { $match: { createdAt: { $gte: monthStart } } },
        {
          $group: {
            _id: { $dayOfMonth: '$createdAt' },
            count: { $sum: 1 },
            revenue: { $sum: '$fareAmount' },
          },
        },
        { $sort: { _id: 1 } },
      ]),
    ]);

    return NextResponse.json({
      totalPasses,
      activePasses,
      todayPasses,
      totalRevenue: totalRevenue[0]?.total || 0,
      todayRevenue: todayRevenue[0]?.total || 0,
      paidCount,
      pendingCount,
      monthlyData,
    });
  } catch (error) {
    console.warn('MongoDB not available, using fallback memory stats:', error);
    const totalRev = samplePasses.reduce((acc, p) => acc + p.fareAmount, 0);
    const paidC = samplePasses.filter((p) => p.paymentStatus === 'paid').length;
    const pendingC = samplePasses.filter((p) => p.paymentStatus === 'pending').length;

    return NextResponse.json({
      totalPasses: samplePasses.length,
      activePasses: samplePasses.length,
      todayPasses: 1,
      totalRevenue: totalRev,
      todayRevenue: 750,
      paidCount: paidC,
      pendingCount: pendingC,
      monthlyData: [
        { _id: 1, count: 1, revenue: 750 },
        { _id: 2, count: 1, revenue: 450 },
        { _id: 3, count: 1, revenue: 1200 },
      ],
    });
  }
}
