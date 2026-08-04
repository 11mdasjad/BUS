'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/components/providers/ToastProvider';
import { downloadPDF, printPDF } from '@/lib/generatePDF';
import {
  Search, Filter, Download, Printer, Trash2, Eye, History as HistoryIcon,
  ChevronLeft, ChevronRight, CreditCard, X, Calendar,
} from 'lucide-react';

interface BusPass {
  _id: string;
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
  dateOfJourney: string;
  validUntil: string;
  seatNumber: string;
  busNumber: string;
  driverName: string;
  fareAmount: number;
  paymentStatus: string;
  notes: string;
  createdAt: string;
}

export default function HistoryPage() {
  const { showToast } = useToast();
  const [passes, setPasses] = useState<BusPass[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ paymentStatus: '', fromDate: '', toDate: '', route: '' });
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => { fetchPasses(); }, [page]);

  const fetchPasses = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('limit', '15');
      if (search) params.set('search', search);
      if (filters.paymentStatus) params.set('paymentStatus', filters.paymentStatus);
      if (filters.fromDate) params.set('fromDate', filters.fromDate);
      if (filters.toDate) params.set('toDate', filters.toDate);
      if (filters.route) params.set('route', filters.route);

      const res = await fetch(`/api/passes?${params.toString()}`);
      const data = await res.json();
      setPasses(data.passes || []);
      setTotalPages(data.pagination?.pages || 1);
      setTotal(data.pagination?.total || 0);
    } catch {
      showToast('Failed to fetch history', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); setPage(1); fetchPasses(); };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this pass permanently?')) return;
    try {
      const res = await fetch(`/api/passes/${id}`, { method: 'DELETE' });
      if (res.ok) { showToast('Deleted', 'success'); fetchPasses(); }
      else showToast('Failed', 'error');
    } catch { showToast('Error', 'error'); }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`Delete ${selectedIds.size} selected passes?`)) return;
    for (const id of selectedIds) {
      await fetch(`/api/passes/${id}`, { method: 'DELETE' });
    }
    setSelectedIds(new Set());
    showToast(`${selectedIds.size} passes deleted`, 'success');
    fetchPasses();
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === passes.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(passes.map((p) => p._id)));
  };

  const handleDownload = async (pass: BusPass) => {
    try { await downloadPDF(pass); showToast('PDF downloaded!', 'success'); }
    catch { showToast('PDF failed', 'error'); }
  };

  const handlePrint = async (pass: BusPass) => {
    try { await printPDF(pass); } catch { showToast('Print failed', 'error'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <HistoryIcon className="w-6 h-6 text-primary-600" /> History
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">{total} total records</p>
        </div>
        {selectedIds.size > 0 && (
          <button onClick={handleBulkDelete} className="btn-danger text-xs py-2">
            <Trash2 className="w-3.5 h-3.5" /> Delete {selectedIds.size} Selected
          </button>
        )}
      </div>

      {/* Search & Filters */}
      <div className="glass-card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-10" placeholder="Search history..." />
            </div>
            <button type="submit" className="btn-primary">Search</button>
          </form>
          <button onClick={() => setShowFilters(!showFilters)} className={`btn-secondary ${showFilters ? '!border-primary-400 !text-primary-600' : ''}`}>
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div><label className="input-label">Payment Status</label><select value={filters.paymentStatus} onChange={(e) => setFilters((p) => ({ ...p, paymentStatus: e.target.value }))} className="input-field"><option value="">All</option><option value="paid">Paid</option><option value="pending">Pending</option><option value="partial">Partial</option></select></div>
              <div><label className="input-label">From Date</label><input type="date" value={filters.fromDate} onChange={(e) => setFilters((p) => ({ ...p, fromDate: e.target.value }))} className="input-field" /></div>
              <div><label className="input-label">To Date</label><input type="date" value={filters.toDate} onChange={(e) => setFilters((p) => ({ ...p, toDate: e.target.value }))} className="input-field" /></div>
              <div><label className="input-label">Route</label><input value={filters.route} onChange={(e) => setFilters((p) => ({ ...p, route: e.target.value }))} className="input-field" placeholder="Route" /></div>
            </div>
            <div className="flex justify-end gap-2 mt-3">
              <button onClick={() => { setFilters({ paymentStatus: '', fromDate: '', toDate: '', route: '' }); setSearch(''); setPage(1); setTimeout(fetchPasses, 0); }} className="btn-secondary text-xs py-2"><X className="w-3 h-3" /> Clear</button>
              <button onClick={() => { setPage(1); fetchPasses(); }} className="btn-primary text-xs py-2">Apply</button>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40"><div className="loader" /></div>
        ) : passes.length === 0 ? (
          <div className="text-center py-16">
            <CreditCard className="w-14 h-14 text-slate-200 mx-auto mb-3" />
            <p className="text-lg font-semibold text-slate-400">No records found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="py-3 px-4"><input type="checkbox" checked={selectedIds.size === passes.length && passes.length > 0} onChange={toggleAll} className="rounded" /></th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Passenger</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase hidden md:table-cell">Ticket #</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase hidden lg:table-cell">Route</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase hidden sm:table-cell">Date</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Fare</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {passes.map((pass) => (
                  <tr key={pass._id} className={`table-row border-b border-slate-50 ${selectedIds.has(pass._id) ? 'bg-primary-50/50' : ''}`}>
                    <td className="py-3 px-4"><input type="checkbox" checked={selectedIds.has(pass._id)} onChange={() => toggleSelect(pass._id)} className="rounded" /></td>
                    <td className="py-3 px-4"><p className="text-sm font-semibold text-slate-900">{pass.passengerName}</p></td>
                    <td className="py-3 px-4 text-sm text-slate-600 font-mono hidden md:table-cell">{pass.ticketNumber}</td>
                    <td className="py-3 px-4 text-sm text-slate-600 hidden lg:table-cell">{pass.fromLocation} → {pass.toLocation}</td>
                    <td className="py-3 px-4 text-sm text-slate-600 hidden sm:table-cell">{new Date(pass.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-slate-900">₹{pass.fareAmount}</td>
                    <td className="py-3 px-4">
                      <span className={`badge ${pass.paymentStatus === 'paid' ? 'badge-success' : pass.paymentStatus === 'pending' ? 'badge-warning' : 'badge-danger'}`}>{pass.paymentStatus}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/passes/${pass._id}`} className="p-1.5 rounded-lg hover:bg-primary-50 text-slate-400 hover:text-primary-600" title="View"><Eye className="w-3.5 h-3.5" /></Link>
                        <button onClick={() => handleDownload(pass)} className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600" title="Download PDF"><Download className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handlePrint(pass)} className="p-1.5 rounded-lg hover:bg-green-50 text-slate-400 hover:text-green-600" title="Print"><Printer className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleDelete(pass._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
            <p className="text-xs text-slate-500">Page {page} of {totalPages}</p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30"><ChevronLeft className="w-4 h-4" /></button>
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
