import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BusPass from '@/models/BusPass';
import { samplePasses } from '@/lib/memoryStore';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await dbConnect();
    const pass = await BusPass.findById(id).lean();
    if (pass) {
      return NextResponse.json(pass);
    }
  } catch {
    // Fallback to memory store
  }

  const memPass = samplePasses.find((p) => p._id === id);
  if (memPass) {
    return NextResponse.json(memPass);
  }

  return NextResponse.json({ error: 'Pass not found' }, { status: 404 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  delete body.ticketNumber;
  delete body.busPassNumber;

  try {
    await dbConnect();
    const pass = await BusPass.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (pass) {
      return NextResponse.json(pass);
    }
  } catch {
    // Fallback
  }

  const index = samplePasses.findIndex((p) => p._id === id);
  if (index !== -1) {
    samplePasses[index] = { ...samplePasses[index], ...body, updatedAt: new Date().toISOString() };
    return NextResponse.json(samplePasses[index]);
  }

  return NextResponse.json({ error: 'Pass not found' }, { status: 404 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await dbConnect();
    const pass = await BusPass.findByIdAndDelete(id);
    if (pass) {
      return NextResponse.json({ message: 'Pass deleted successfully' });
    }
  } catch {
    // Fallback
  }

  const index = samplePasses.findIndex((p) => p._id === id);
  if (index !== -1) {
    samplePasses.splice(index, 1);
    return NextResponse.json({ message: 'Pass deleted successfully' });
  }

  return NextResponse.json({ message: 'Pass deleted successfully' });
}
