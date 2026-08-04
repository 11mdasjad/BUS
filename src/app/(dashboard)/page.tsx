'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CreditCard,
  TrendingUp,
  DollarSign,
  Users,
  PlusCircle,
  Eye,
  Search,
  Activity,
  ArrowUpRight,
  Calendar,
  Clock,
} from 'lucide-react';

interface Stats {
  totalPasses: number;
  activePasses: number;
  todayPasses: number;
  totalRevenue: number;
  todayRevenue: number;
  paidCount: number;
  pendingCount: number;
  monthlyData: { _id: number; count: number; revenue: number }[];
}

interface RecentPass {
  _id: string;
  passengerName: string;
  ticketNumber: string;
  busRoute: string;
  fareAmount: number;
  paymentStatus: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentPasses, setRecentPasses] = useState<RecentPass[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, passesRes] = await Promise.all([
        fetch('/api/stats'),
        fetch('/api/passes?limit=5'),
      ]);
      const statsData = await statsRes.json();
      const passesData = await passesRes.json();
      setStats(statsData);
      setRecentPasses(passesData.passes || []);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loader" />
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Passes',
      value: stats?.totalPasses || 0,
      icon: CreditCard,
      color: '#2563eb',
      bgColor: '#eff6ff',
      change: `${stats?.todayPasses || 0} today`,
    },
    {
      label: 'Active Passes',
      value: stats?.activePasses || 0,
      icon: Activity,
      color: '#10b981',
      bgColor: '#ecfdf5',
      change: 'Currently valid',
    },
    {
      label: 'Total Revenue',
      value: `₹${(stats?.totalRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: '#8b5cf6',
      bgColor: '#f5f3ff',
      change: `₹${(stats?.todayRevenue || 0).toLocaleString()} today`,
    },
    {
      label: 'Payment Status',
      value: stats?.paidCount || 0,
      icon: TrendingUp,
      color: '#f59e0b',
      bgColor: '#fffbeb',
      change: `${stats?.pendingCount || 0} pending`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Welcome back! Here&apos;s your overview.</p>
        </div>
        <Link href="/passes/new" className="btn-primary">
          <PlusCircle className="w-4 h-4" />
          Create New Pass
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="stat-card card-enter"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{card.label}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-2">{card.value}</p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" style={{ color: card.color }} />
                    {card.change}
                  </p>
                </div>
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: card.bgColor }}
                >
                  <Icon className="w-5 h-5" style={{ color: card.color }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="glass-card p-6 card-enter" style={{ animationDelay: '400ms' }}>
          <h2 className="text-base font-bold text-slate-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/passes/new"
              className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                <PlusCircle className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Create New Bus Pass</p>
                <p className="text-xs text-slate-500">Generate a new pass with QR code</p>
              </div>
            </Link>
            <Link
              href="/passes"
              className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                <Eye className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">View All Bus Passes</p>
                <p className="text-xs text-slate-500">Browse and manage all passes</p>
              </div>
            </Link>
            <Link
              href="/passes?search="
              className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-violet-300 hover:bg-violet-50 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center group-hover:bg-violet-200 transition-colors">
                <Search className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Search Passengers</p>
                <p className="text-xs text-slate-500">Find by name, ticket, or mobile</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Bus Passes */}
        <div className="lg:col-span-2 glass-card p-6 card-enter" style={{ animationDelay: '500ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900">Recent Bus Passes</h2>
            <Link href="/passes" className="text-xs font-semibold text-primary-600 hover:text-primary-700">
              View All →
            </Link>
          </div>
          {recentPasses.length === 0 ? (
            <div className="text-center py-10">
              <CreditCard className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-500">No bus passes yet</p>
              <Link href="/passes/new" className="text-sm text-primary-600 font-semibold hover:underline mt-1 inline-block">
                Create your first pass →
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left py-2 px-3 text-xs font-semibold text-slate-400 uppercase">Passenger</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-slate-400 uppercase">Ticket #</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-slate-400 uppercase hidden sm:table-cell">Route</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-slate-400 uppercase">Fare</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-slate-400 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPasses.map((pass) => (
                    <tr key={pass._id} className="table-row border-b border-slate-50">
                      <td className="py-3 px-3">
                        <Link href={`/passes/${pass._id}`} className="text-sm font-semibold text-slate-900 hover:text-primary-600">
                          {pass.passengerName}
                        </Link>
                      </td>
                      <td className="py-3 px-3 text-sm text-slate-600 font-mono">{pass.ticketNumber}</td>
                      <td className="py-3 px-3 text-sm text-slate-600 hidden sm:table-cell">{pass.busRoute}</td>
                      <td className="py-3 px-3 text-sm font-semibold text-slate-900">₹{pass.fareAmount}</td>
                      <td className="py-3 px-3">
                        <span className={`badge ${
                          pass.paymentStatus === 'paid' ? 'badge-success' :
                          pass.paymentStatus === 'pending' ? 'badge-warning' : 'badge-danger'
                        }`}>
                          {pass.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Monthly Activity Chart */}
      {stats?.monthlyData && stats.monthlyData.length > 0 && (
        <div className="glass-card p-6 card-enter" style={{ animationDelay: '600ms' }}>
          <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary-600" />
            Monthly Activity
          </h2>
          <div className="flex items-end gap-1 h-40">
            {Array.from({ length: 31 }, (_, i) => {
              const day = stats.monthlyData.find((d) => d._id === i + 1);
              const maxCount = Math.max(...stats.monthlyData.map((d) => d.count), 1);
              const height = day ? (day.count / maxCount) * 100 : 0;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                  <div
                    className="w-full rounded-t-md transition-all duration-300 min-h-[2px]"
                    style={{
                      height: `${Math.max(height, 2)}%`,
                      background: height > 0 ? 'linear-gradient(to top, #2563eb, #60a5fa)' : '#e2e8f0',
                    }}
                  />
                  {height > 0 && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Day {i + 1}: {day?.count} passes
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[10px] text-slate-400">Day 1</span>
            <span className="text-[10px] text-slate-400">Day 31</span>
          </div>
        </div>
      )}
    </div>
  );
}
