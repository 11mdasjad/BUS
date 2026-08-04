'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/providers/ToastProvider';
import BusPassPreview from '@/components/passes/BusPassPreview';
import {
  User,
  Phone,
  MapPin,
  Route,
  Calendar,
  Ticket,
  Bus,
  DollarSign,
  Save,
  Eye,
  ArrowLeft,
} from 'lucide-react';

export default function CreatePassPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    ticketNumber: '157',
    busNumber: 'VOLVO B11R',
    passengerName: 'Raju Kumar singh',
    fatherGuardianName: 'Raju Kumar Singh',
    mobileNumber: '7488202225',
    address: 'Maa Laxmi Complex, Banjari Pokhara, Gopalganj',
    passengerPhoto: '',
    busRoute: 'Gopalganj - Delhi Volvo AC',
    fromLocation: 'Gopalganj',
    toLocation: 'Delhi',
    dateOfJourney: '2026-07-28',
    validUntil: '2026-06-26',
    seatNumber: '1 seat / 2 sleeper',
    driverName: 'Maa Laxmi Staff',
    fareAmount: '4000',
    advanceAmount: '500',
    balanceAmount: '3500',
    seatCount: '1 seat',
    sleeperCount: '2 sleeper',
    paymentStatus: 'partial',
    notes: 'Advance Rs 500 received. Balance Rs 3500 payable on journey date.',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      if (name === 'fareAmount' || name === 'advanceAmount') {
        const fare = parseFloat(name === 'fareAmount' ? value : prev.fareAmount) || 0;
        const adv = parseFloat(name === 'advanceAmount' ? value : prev.advanceAmount) || 0;
        next.balanceAmount = String(Math.max(0, fare - adv));
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/passes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          fareAmount: parseFloat(formData.fareAmount) || 0,
          advanceAmount: parseFloat(formData.advanceAmount) || 0,
          balanceAmount: parseFloat(formData.balanceAmount) || 0,
        }),
      });

      if (res.ok) {
        const pass = await res.json();
        showToast('Ticket generated successfully!', 'success');
        router.push(`/passes/${pass._id}`);
      } else {
        const err = await res.json();
        showToast(err.error || 'Failed to generate ticket', 'error');
      }
    } catch {
      showToast('Something went wrong', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Maa Laxmi Travels — Ticket Generator</h1>
          <p className="text-sm text-slate-500 mt-0.5">Generate bus ticket matching original Maa Laxmi Travels layout</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form Inputs (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Ticket & Bus Info */}
            <div className="glass-card p-6 card-enter">
              <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Ticket className="w-4 h-4 text-blue-600" />
                Ticket & Bus Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Ticket Number *</label>
                  <div className="relative">
                    <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input name="ticketNumber" value={formData.ticketNumber} onChange={handleChange} className="input-field pl-10 font-bold text-red-600" placeholder="157" required />
                  </div>
                </div>
                <div>
                  <label className="input-label">Bus Name / Model *</label>
                  <div className="relative">
                    <Bus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input name="busNumber" value={formData.busNumber} onChange={handleChange} className="input-field pl-10 font-bold text-blue-900" placeholder="VOLVO B11R" required />
                  </div>
                </div>
              </div>
            </div>

            {/* Passenger Info */}
            <div className="glass-card p-6 card-enter">
              <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                Passenger Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Passenger Name *</label>
                  <input name="passengerName" value={formData.passengerName} onChange={handleChange} className="input-field" placeholder="Raju Kumar singh" required />
                </div>
                <div>
                  <label className="input-label">Mobile Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="input-field pl-10" placeholder="7488202225" required />
                  </div>
                </div>
                <div>
                  <label className="input-label">Father/Guardian Name</label>
                  <input name="fatherGuardianName" value={formData.fatherGuardianName} onChange={handleChange} className="input-field" placeholder="Father Name" />
                </div>
                <div>
                  <label className="input-label">Address</label>
                  <input name="address" value={formData.address} onChange={handleChange} className="input-field" placeholder="Gopalganj" />
                </div>
              </div>
            </div>

            {/* Journey Details */}
            <div className="glass-card p-6 card-enter">
              <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Route className="w-4 h-4 text-blue-600" />
                Journey Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">From Location *</label>
                  <input name="fromLocation" value={formData.fromLocation} onChange={handleChange} className="input-field" placeholder="Gopalganj" required />
                </div>
                <div>
                  <label className="input-label">To Location *</label>
                  <input name="toLocation" value={formData.toLocation} onChange={handleChange} className="input-field" placeholder="Delhi" required />
                </div>
                <div>
                  <label className="input-label">Ticket Date *</label>
                  <input type="date" name="dateOfJourney" value={formData.dateOfJourney} onChange={handleChange} className="input-field" required />
                </div>
                <div>
                  <label className="input-label">Date of Visit *</label>
                  <input type="date" name="validUntil" value={formData.validUntil} onChange={handleChange} className="input-field" required />
                </div>
                <div>
                  <label className="input-label">Seat Count</label>
                  <input name="seatCount" value={formData.seatCount} onChange={handleChange} className="input-field" placeholder="1 seat" />
                </div>
                <div>
                  <label className="input-label">Sleeper Count</label>
                  <input name="sleeperCount" value={formData.sleeperCount} onChange={handleChange} className="input-field" placeholder="2 sleeper" />
                </div>
              </div>
            </div>

            {/* Fare & Payments */}
            <div className="glass-card p-6 card-enter">
              <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                Fare & Payment Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="input-label">Total Fare (₹)</label>
                  <input type="number" name="fareAmount" value={formData.fareAmount} onChange={handleChange} className="input-field" placeholder="4000" />
                </div>
                <div>
                  <label className="input-label">Advance Paid (₹)</label>
                  <input type="number" name="advanceAmount" value={formData.advanceAmount} onChange={handleChange} className="input-field" placeholder="500" />
                </div>
                <div>
                  <label className="input-label">Balance Amount (₹)</label>
                  <input type="number" name="balanceAmount" value={formData.balanceAmount} onChange={handleChange} className="input-field" placeholder="3500" readOnly />
                </div>
              </div>

              <div className="mt-4">
                <label className="input-label">Payment Status</label>
                <select name="paymentStatus" value={formData.paymentStatus} onChange={handleChange} className="input-field">
                  <option value="partial">Partial Payment (Advance Paid)</option>
                  <option value="paid">Fully Paid</option>
                  <option value="pending">Pending Payment</option>
                </select>
              </div>

              <div className="mt-4">
                <label className="input-label">Notes</label>
                <textarea name="notes" value={formData.notes} onChange={handleChange} className="input-field min-h-[60px]" placeholder="Special notes..." />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button type="submit" disabled={loading} className="btn-primary flex-1 h-12 text-base disabled:opacity-50">
                {loading ? <div className="loader !w-5 !h-5 !border-2 !border-white/30 !border-t-white" /> : <Save className="w-5 h-5" />}
                {loading ? 'Generating Ticket...' : 'Generate & Save Ticket'}
              </button>
            </div>
          </div>

          {/* Live Preview Column (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="sticky top-4">
              <h3 className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-600" /> Live Ticket Preview (Maa Laxmi Travels)
              </h3>
              <BusPassPreview
                pass={{
                  ticketNumber: formData.ticketNumber || '157',
                  busNumber: formData.busNumber || 'VOLVO B11R',
                  passengerName: formData.passengerName,
                  mobileNumber: formData.mobileNumber,
                  fromLocation: formData.fromLocation,
                  toLocation: formData.toLocation,
                  dateOfJourney: formData.dateOfJourney,
                  validUntil: formData.validUntil,
                  advanceAmount: parseFloat(formData.advanceAmount) || 0,
                  balanceAmount: parseFloat(formData.balanceAmount) || 0,
                  fareAmount: parseFloat(formData.fareAmount) || 0,
                  seatCount: formData.seatCount,
                  sleeperCount: formData.sleeperCount,
                }}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
