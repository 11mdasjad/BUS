'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Shield, CreditCard, DollarSign, Users, BarChart3, TrendingUp,
  ArrowUpRight, Activity, Clock,
} from 'lucide-react';

interface Stats {
  totalPasses: number;
  activePasses: number;
  todayPasses: number;
  totalRevenue: number;
  todayRevenue: number;
  paidCount: number;
  pendingCount: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stats')
      .then((r) => r.json())
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="loader" /></div>;

  const cards = [
    { label: 'Total Passes', value: stats?.totalPasses || 0, icon: CreditCard, color: '#2563eb', bg: '#eff6ff' },
    { label: 'Active Passes', value: stats?.activePasses || 0, icon: Activity, color: '#10b981', bg: '#ecfdf5' },
    { label: 'Total Revenue', value: `₹${(stats?.totalRevenue || 0).toLocaleString()}`, icon: DollarSign, color: '#8b5cf6', bg: '#f5f3ff' },
    { label: 'Today Revenue', value: `₹${(stats?.todayRevenue || 0).toLocaleString()}`, icon: TrendingUp, color: '#f59e0b', bg: '#fffbeb' },
    { label: 'Paid Passes', value: stats?.paidCount || 0, icon: Shield, color: '#10b981', bg: '#ecfdf5' },
    { label: 'Pending Payments', value: stats?.pendingCount || 0, icon: Clock, color: '#ef4444', bg: '#fef2f2' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary-600" /> Admin Dashboard
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">System overview and management</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="stat-card card-enter" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{card.label}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-2">{card.value}</p>
                </div>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: card.bg }}>
                  <Icon className="w-5 h-5" style={{ color: card.color }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/admin/reports" className="glass-card p-6 hover:border-primary-300 transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
              <BarChart3 className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Reports</h3>
              <p className="text-sm text-slate-500">Daily/Monthly reports & Excel export</p>
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-300 ml-auto group-hover:text-primary-500 transition-colors" />
          </div>
        </Link>
        <Link href="/admin/users" className="glass-card p-6 hover:border-emerald-300 transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
              <Users className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">User Management</h3>
              <p className="text-sm text-slate-500">Manage users & roles</p>
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-300 ml-auto group-hover:text-emerald-500 transition-colors" />
          </div>
        </Link>
      </div>
    </div>
  );
}
