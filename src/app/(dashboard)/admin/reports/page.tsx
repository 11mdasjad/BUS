'use client';

import { useState } from 'react';
import { useToast } from '@/components/providers/ToastProvider';
import {
  BarChart3, Calendar, Download, Printer, FileSpreadsheet,
  CreditCard, DollarSign, ArrowLeft, Clock, CheckCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ReportPass {
  _id: string;
  ticketNumber: string;
  busPassNumber: string;
  passengerName: string;
  busRoute: string;
  fromLocation: string;
  toLocation: string;
  fareAmount: number;
  paymentStatus: string;
  createdAt: string;
}

interface ReportSummary {
  totalPasses: number;
  totalRevenue: number;
  paidCount: number;
  pendingCount: number;
  partialCount: number;
}

export default function ReportsPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [reportType, setReportType] = useState<'daily' | 'monthly'>('daily');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [passes, setPasses] = useState<ReportPass[]>([]);
  const [summary, setSummary] = useState<ReportSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const dateValue = reportType === 'daily' ? date : month;
      const res = await fetch(`/api/reports?type=${reportType}&date=${dateValue}`);
      const data = await res.json();
      setPasses(data.passes || []);
      setSummary(data.summary || null);
      setGenerated(true);
    } catch {
      showToast('Failed to generate report', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleExportExcel = async () => {
    try {
      const dateValue = reportType === 'daily' ? date : month;
      const res = await fetch(`/api/reports?type=${reportType}&date=${dateValue}&format=excel`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report-${reportType}-${dateValue}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Excel exported!', 'success');
    } catch {
      showToast('Export failed', 'error');
    }
  };

  const handlePrint = () => { window.print(); };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary-600" /> Reports
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">Generate daily or monthly reports</p>
        </div>
      </div>

      {/* Report Controls */}
      <div className="glass-card p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
          <div>
            <label className="input-label">Report Type</label>
            <div className="flex gap-2">
              <button onClick={() => { setReportType('daily'); setGenerated(false); }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${reportType === 'daily' ? 'bg-primary-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                Daily
              </button>
              <button onClick={() => { setReportType('monthly'); setGenerated(false); }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${reportType === 'monthly' ? 'bg-primary-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                Monthly
              </button>
            </div>
          </div>
          <div>
            <label className="input-label">{reportType === 'daily' ? 'Date' : 'Month'}</label>
            {reportType === 'daily' ? (
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-field" />
            ) : (
              <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="input-field" />
            )}
          </div>
          <button onClick={fetchReport} disabled={loading} className="btn-primary disabled:opacity-50">
            {loading ? <div className="loader !w-4 !h-4 !border-2 !border-white/30 !border-t-white" /> : <BarChart3 className="w-4 h-4" />}
            Generate Report
          </button>
          {generated && (
            <>
              <button onClick={handleExportExcel} className="btn-success">
                <FileSpreadsheet className="w-4 h-4" /> Export Excel
              </button>
              <button onClick={handlePrint} className="btn-secondary">
                <Printer className="w-4 h-4" /> Print
              </button>
            </>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 print-area">
          <div className="stat-card !p-4">
            <p className="text-[10px] font-semibold text-slate-400 uppercase">Total Passes</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{summary.totalPasses}</p>
          </div>
          <div className="stat-card !p-4">
            <p className="text-[10px] font-semibold text-slate-400 uppercase">Total Revenue</p>
            <p className="text-xl font-bold text-primary-600 mt-1">₹{summary.totalRevenue.toLocaleString()}</p>
          </div>
          <div className="stat-card !p-4">
            <p className="text-[10px] font-semibold text-slate-400 uppercase">Paid</p>
            <p className="text-xl font-bold text-emerald-600 mt-1">{summary.paidCount}</p>
          </div>
          <div className="stat-card !p-4">
            <p className="text-[10px] font-semibold text-slate-400 uppercase">Pending</p>
            <p className="text-xl font-bold text-amber-600 mt-1">{summary.pendingCount}</p>
          </div>
          <div className="stat-card !p-4">
            <p className="text-[10px] font-semibold text-slate-400 uppercase">Partial</p>
            <p className="text-xl font-bold text-red-600 mt-1">{summary.partialCount}</p>
          </div>
        </div>
      )}

      {/* Report Table */}
      {generated && (
        <div className="glass-card overflow-hidden print-area">
          {passes.length === 0 ? (
            <div className="text-center py-16">
              <CreditCard className="w-14 h-14 text-slate-200 mx-auto mb-3" />
              <p className="text-lg font-semibold text-slate-400">No records for this period</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">#</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Ticket</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Passenger</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase hidden md:table-cell">Route</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Fare</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase hidden sm:table-cell">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {passes.map((pass, i) => (
                    <tr key={pass._id} className="table-row border-b border-slate-50">
                      <td className="py-3 px-4 text-sm text-slate-400">{i + 1}</td>
                      <td className="py-3 px-4 text-sm text-slate-600 font-mono">{pass.ticketNumber}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-slate-900">{pass.passengerName}</td>
                      <td className="py-3 px-4 text-sm text-slate-600 hidden md:table-cell">{pass.fromLocation} → {pass.toLocation}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-slate-900">₹{pass.fareAmount}</td>
                      <td className="py-3 px-4">
                        <span className={`badge ${pass.paymentStatus === 'paid' ? 'badge-success' : pass.paymentStatus === 'pending' ? 'badge-warning' : 'badge-danger'}`}>{pass.paymentStatus}</span>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600 hidden sm:table-cell">{new Date(pass.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
