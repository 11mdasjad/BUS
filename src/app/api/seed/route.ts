import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await dbConnect();

    const existingAdmin = await User.findOne({ email: 'admin@buspass.com' });
    if (existingAdmin) {
      return NextResponse.json({ message: 'Admin user already exists' }, { status: 200 });
    }

    await User.create({
      name: 'Admin',
      email: 'admin@buspass.com',
      password: 'admin123',
      role: 'admin',
    });

    return NextResponse.json({ message: 'Admin user created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}
