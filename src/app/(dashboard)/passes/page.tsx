'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/components/providers/ToastProvider';
import {
  Search,
  Filter,
  Download,
  Trash2,
  Eye,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  X,
} from 'lucide-react';

interface BusPass {
  _id: string;
  passengerName: string;
  ticketNumber: string;
  busPassNumber: string;
  busRoute: string;
  fromLocation: string;
  toLocation: string;
  dateOfJourney: string;
  fareAmount: number;
  paymentStatus: string;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

function ViewPassesPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { showToast } = useToast();

  const [passes, setPasses] = useState<BusPass[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 10, total: 0, pages: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    paymentStatus: '',
    fromDate: '',
    toDate: '',
    route: '',
  });

  useEffect(() => {
    fetchPasses();
  }, [pagination.page, searchParams]);

  const fetchPasses = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', String(pagination.page));
      params.set('limit', '10');
      if (search) params.set('search', search);
      if (filters.paymentStatus) params.set('paymentStatus', filters.paymentStatus);
      if (filters.fromDate) params.set('fromDate', filters.fromDate);
      if (filters.toDate) params.set('toDate', filters.toDate);
      if (filters.route) params.set('route', filters.route);

      const res = await fetch(`/api/passes?${params.toString()}`);
      const data = await res.json();
      setPasses(data.passes || []);
      setPagination(data.pagination || { page: 1, limit: 10, total: 0, pages: 0 });
    } catch {
      showToast('Failed to fetch passes', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination((prev) => ({ ...prev, page: 1 }));
    fetchPasses();
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the pass for ${name}?`)) return;
    try {
      const res = await fetch(`/api/passes/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Pass deleted successfully', 'success');
        fetchPasses();
      } else {
        showToast('Failed to delete pass', 'error');
      }
    } catch {
      showToast('Something went wrong', 'error');
    }
  };

  const clearFilters = () => {
    setFilters({ paymentStatus: '', fromDate: '', toDate: '', route: '' });
    setSearch('');
    setPagination((prev) => ({ ...prev, page: 1 }));
    setTimeout(fetchPasses, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bus Passes</h1>
          <p className="text-sm text-slate-500 mt-0.5">{pagination.total} total passes</p>
        </div>
        <Link href="/passes/new" className="btn-primary">
          <PlusCircle className="w-4 h-4" />
          Create New Pass
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="glass-card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-10"
                placeholder="Search by name, ticket, mobile..."
              />
            </div>
            <button type="submit" className="btn-primary">Search</button>
          </form>
          <button onClick={() => setShowFilters(!showFilters)} className={`btn-secondary ${showFilters ? '!border-primary-400 !text-primary-600' : ''}`}>
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="input-label">Payment Status</label>
                <select value={filters.paymentStatus} onChange={(e) => setFilters((p) => ({ ...p, paymentStatus: e.target.value }))} className="input-field">
                  <option value="">All</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="partial">Partial</option>
                </select>
              </div>
              <div>
                <label className="input-label">From Date</label>
                <input type="date" value={filters.fromDate} onChange={(e) => setFilters((p) => ({ ...p, fromDate: e.target.value }))} className="input-field" />
              </div>
              <div>
                <label className="input-label">To Date</label>
                <input type="date" value={filters.toDate} onChange={(e) => setFilters((p) => ({ ...p, toDate: e.target.value }))} className="input-field" />
              </div>
              <div>
                <label className="input-label">Route</label>
                <input value={filters.route} onChange={(e) => setFilters((p) => ({ ...p, route: e.target.value }))} className="input-field" placeholder="Filter by route" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-3">
              <button onClick={clearFilters} className="btn-secondary text-xs py-2 px-3">
                <X className="w-3 h-3" /> Clear
              </button>
              <button onClick={fetchPasses} className="btn-primary text-xs py-2 px-3">Apply Filters</button>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="loader" />
          </div>
        ) : passes.length === 0 ? (
          <div className="text-center py-16">
            <CreditCard className="w-14 h-14 text-slate-200 mx-auto mb-3" />
            <p className="text-lg font-semibold text-slate-400">No passes found</p>
            <p className="text-sm text-slate-400 mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Passenger</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase hidden md:table-cell">Ticket #</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase hidden lg:table-cell">Route</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase hidden sm:table-cell">Journey</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Fare</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {passes.map((pass) => (
                  <tr key={pass._id} className="table-row border-b border-slate-50">
                    <td className="py-3 px-4">
                      <p className="text-sm font-semibold text-slate-900">{pass.passengerName}</p>
                      <p className="text-xs text-slate-400 md:hidden">{pass.ticketNumber}</p>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 font-mono hidden md:table-cell">{pass.ticketNumber}</td>
                    <td className="py-3 px-4 hidden lg:table-cell">
                      <p className="text-sm text-slate-600">{pass.busRoute}</p>
                      <p className="text-xs text-slate-400">{pass.fromLocation} → {pass.toLocation}</p>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 hidden sm:table-cell">
                      {new Date(pass.dateOfJourney).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-slate-900">₹{pass.fareAmount}</td>
                    <td className="py-3 px-4">
                      <span className={`badge ${
                        pass.paymentStatus === 'paid' ? 'badge-success' :
                        pass.paymentStatus === 'pending' ? 'badge-warning' : 'badge-danger'
                      }`}>
                        {pass.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/passes/${pass._id}`} className="p-2 rounded-lg hover:bg-primary-50 text-slate-400 hover:text-primary-600 transition-colors" title="View">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDelete(pass._id, pass.passengerName)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Showing {((pagination.page - 1) * pagination.limit) + 1}–{Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPagination((p) => ({ ...p, page: p.page - 1 }))}
                disabled={pagination.page === 1}
                className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(pagination.pages, 5) }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPagination((prev) => ({ ...prev, page: p }))}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
                    p === pagination.page ? 'bg-primary-600 text-white' : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPagination((p) => ({ ...p, page: p.page + 1 }))}
                disabled={pagination.page === pagination.pages}
                className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ViewPassesPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="loader" /></div>}>
      <ViewPassesPageContent />
    </Suspense>
  );
}
