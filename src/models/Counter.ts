import mongoose, { Schema } from 'mongoose';

export interface ICounter {
  _id: string;
  seq: number;
}

const CounterSchema = new Schema<ICounter>({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

export async function getNextSequence(name: string): Promise<number> {
  const Counter = mongoose.models.Counter || mongoose.model<ICounter>('Counter', CounterSchema);
  const counter = await Counter.findByIdAndUpdate(
    name,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter!.seq;
}

export default mongoose.models.Counter || mongoose.model<ICounter>('Counter', CounterSchema);
