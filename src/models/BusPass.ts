import mongoose, { Schema, Document } from 'mongoose';

export interface IBusPass extends Document {
  passengerName: string;
  fatherGuardianName: string;
  mobileNumber: string;
  address: string;
  passengerPhoto: string;
  ticketNumber: string;
  busPassNumber: string;
  busRoute: string;
  fromLocation: string;
  toLocation: string;
  dateOfJourney: Date;
  validUntil: Date;
  seatNumber: string;
  busNumber: string;
  driverName: string;
  fareAmount: number;
  advanceAmount: number;
  balanceAmount: number;
  seatCount: string;
  sleeperCount: string;
  paymentStatus: 'paid' | 'pending' | 'partial';
  notes: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BusPassSchema = new Schema<IBusPass>(
  {
    passengerName: { type: String, required: true, trim: true },
    fatherGuardianName: { type: String, default: '', trim: true },
    mobileNumber: { type: String, required: true, trim: true },
    address: { type: String, default: '', trim: true },
    passengerPhoto: { type: String, default: '' },
    ticketNumber: { type: String, required: true, unique: true },
    busPassNumber: { type: String, required: true, unique: true },
    busRoute: { type: String, default: 'Express', trim: true },
    fromLocation: { type: String, required: true, trim: true },
    toLocation: { type: String, required: true, trim: true },
    dateOfJourney: { type: Date, required: true },
    validUntil: { type: Date, default: Date.now },
    seatNumber: { type: String, default: '1 seat', trim: true },
    busNumber: { type: String, default: 'Volvo AC', trim: true },
    driverName: { type: String, default: 'Maa Laxmi Staff', trim: true },
    fareAmount: { type: Number, default: 0, min: 0 },
    advanceAmount: { type: Number, default: 0, min: 0 },
    balanceAmount: { type: Number, default: 0, min: 0 },
    seatCount: { type: String, default: '1 seat', trim: true },
    sleeperCount: { type: String, default: '2 sleeper', trim: true },
    paymentStatus: { type: String, enum: ['paid', 'pending', 'partial'], default: 'pending' },
    notes: { type: String, default: '', trim: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

BusPassSchema.index({ passengerName: 'text', mobileNumber: 'text', ticketNumber: 'text', busPassNumber: 'text' });
BusPassSchema.index({ dateOfJourney: 1 });
BusPassSchema.index({ paymentStatus: 1 });

export default mongoose.models.BusPass || mongoose.model<IBusPass>('BusPass', BusPassSchema);
