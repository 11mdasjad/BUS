'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/components/providers/ToastProvider';
import {
  User,
  Phone,
  MapPin,
  Camera,
  Route,
  Ticket,
  Bus,
  DollarSign,
  Save,
  ArrowLeft,
  X,
} from 'lucide-react';

export default function EditPassPage() {
  const { id } = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const photoRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [photoPreview, setPhotoPreview] = useState('');

  const [formData, setFormData] = useState({
    ticketNumber: '',
    busNumber: '',
    passengerName: '',
    fatherGuardianName: '',
    mobileNumber: '',
    address: '',
    passengerPhoto: '',
    busRoute: '',
    fromLocation: '',
    toLocation: '',
    dateOfJourney: '',
    validUntil: '',
    seatNumber: '',
    driverName: '',
    fareAmount: '',
    paymentStatus: 'pending',
    notes: '',
  });

  const [busPassNumber, setBusPassNumber] = useState('');

  useEffect(() => {
    fetchPass();
  }, [id]);

  const fetchPass = async () => {
    try {
      const res = await fetch(`/api/passes/${id}`);
      if (res.ok) {
        const data = await res.json();
        setBusPassNumber(data.busPassNumber);
        setPhotoPreview(data.passengerPhoto || '');
        setFormData({
          ticketNumber: data.ticketNumber || '157',
          busNumber: data.busNumber || 'VOLVO B11R',
          passengerName: data.passengerName || '',
          fatherGuardianName: data.fatherGuardianName || '',
          mobileNumber: data.mobileNumber || '',
          address: data.address || '',
          passengerPhoto: data.passengerPhoto || '',
          busRoute: data.busRoute || '',
          fromLocation: data.fromLocation || '',
          toLocation: data.toLocation || '',
          dateOfJourney: data.dateOfJourney ? new Date(data.dateOfJourney).toISOString().split('T')[0] : '',
          validUntil: data.validUntil ? new Date(data.validUntil).toISOString().split('T')[0] : '',
          seatNumber: data.seatNumber || '',
          driverName: data.driverName || '',
          fareAmount: String(data.fareAmount || ''),
          paymentStatus: data.paymentStatus || 'pending',
          notes: data.notes || '',
        });
      } else {
        showToast('Pass not found', 'error');
        router.push('/passes');
      }
    } catch {
      showToast('Failed to load pass', 'error');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        setFormData((prev) => ({ ...prev, passengerPhoto: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/passes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          fareAmount: parseFloat(formData.fareAmount) || 0,
        }),
      });
      if (res.ok) {
        showToast('Pass updated successfully!', 'success');
        router.push(`/passes/${id}`);
      } else {
        showToast('Failed to update pass', 'error');
      }
    } catch {
      showToast('Something went wrong', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loader" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Bus Pass</h1>
          <p className="text-sm text-slate-500 mt-0.5">Ticket #{formData.ticketNumber} • {busPassNumber}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Ticket & Bus Info */}
        <div className="glass-card p-6">
          <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Ticket className="w-4 h-4 text-blue-600" /> Ticket & Bus Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Ticket Number *</label>
              <div className="relative">
                <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input name="ticketNumber" value={formData.ticketNumber} onChange={handleChange} className="input-field pl-10 font-bold text-red-600" required />
              </div>
            </div>
            <div>
              <label className="input-label">Bus Name / Model *</label>
              <div className="relative">
                <Bus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input name="busNumber" value={formData.busNumber} onChange={handleChange} className="input-field pl-10 font-bold text-blue-900" required />
              </div>
            </div>
          </div>
        </div>

        {/* Passenger Information */}
        <div className="glass-card p-6">
          <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-primary-600" /> Passenger Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Passenger Name *</label>
              <input name="passengerName" value={formData.passengerName} onChange={handleChange} className="input-field" required />
            </div>
            <div>
              <label className="input-label">Father/Guardian Name *</label>
              <input name="fatherGuardianName" value={formData.fatherGuardianName} onChange={handleChange} className="input-field" required />
            </div>
            <div>
              <label className="input-label">Mobile Number *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="input-field pl-10" required />
              </div>
            </div>
            <div>
              <label className="input-label">Address *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input name="address" value={formData.address} onChange={handleChange} className="input-field pl-10" required />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label className="input-label">Passenger Photo</label>
            <div onClick={() => photoRef.current?.click()} className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center cursor-pointer hover:border-primary-400 transition-all">
              {photoPreview ? (
                <div className="relative inline-block">
                  <img src={photoPreview} alt="Preview" className="w-20 h-20 rounded-xl object-cover mx-auto" />
                  <button type="button" onClick={(e) => { e.stopPropagation(); setPhotoPreview(''); setFormData((p) => ({ ...p, passengerPhoto: '' })); }}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center"><X className="w-3 h-3" /></button>
                </div>
              ) : (
                <><Camera className="w-6 h-6 text-slate-300 mx-auto mb-1" /><p className="text-xs text-slate-500">Click to upload</p></>
              )}
            </div>
            <input ref={photoRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
          </div>
        </div>

        {/* Journey Details */}
        <div className="glass-card p-6">
          <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Route className="w-4 h-4 text-primary-600" /> Journey Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="input-label">Bus Route *</label><input name="busRoute" value={formData.busRoute} onChange={handleChange} className="input-field" required /></div>
            <div><label className="input-label">From *</label><input name="fromLocation" value={formData.fromLocation} onChange={handleChange} className="input-field" required /></div>
            <div><label className="input-label">To *</label><input name="toLocation" value={formData.toLocation} onChange={handleChange} className="input-field" required /></div>
            <div><label className="input-label">Journey Date *</label><input type="date" name="dateOfJourney" value={formData.dateOfJourney} onChange={handleChange} className="input-field" required /></div>
            <div><label className="input-label">Valid Until *</label><input type="date" name="validUntil" value={formData.validUntil} onChange={handleChange} className="input-field" required /></div>
            <div><label className="input-label">Seat Number *</label><input name="seatNumber" value={formData.seatNumber} onChange={handleChange} className="input-field" required /></div>
            <div><label className="input-label">Driver Name *</label><input name="driverName" value={formData.driverName} onChange={handleChange} className="input-field" required /></div>
          </div>
        </div>

        {/* Payment */}
        <div className="glass-card p-6">
          <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-primary-600" /> Payment & Notes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="input-label">Fare Amount (₹) *</label><input type="number" name="fareAmount" value={formData.fareAmount} onChange={handleChange} className="input-field" required /></div>
            <div><label className="input-label">Payment Status *</label><select name="paymentStatus" value={formData.paymentStatus} onChange={handleChange} className="input-field"><option value="pending">Pending</option><option value="paid">Paid</option><option value="partial">Partial</option></select></div>
          </div>
          <div className="mt-4"><label className="input-label">Notes</label><textarea name="notes" value={formData.notes} onChange={handleChange} className="input-field min-h-[80px]" /></div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => router.back()} className="btn-secondary">Cancel</button>
          <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
            {loading ? <div className="loader !w-4 !h-4 !border-2 !border-white/30 !border-t-white" /> : <Save className="w-4 h-4" />}
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
