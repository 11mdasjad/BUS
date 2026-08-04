'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import {
  Bus,
  LayoutDashboard,
  PlusCircle,
  CreditCard,
  History,
  Shield,
  BarChart3,
  Users,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Search,
  Bell,
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/passes/new', label: 'Create Bus Pass', icon: PlusCircle },
  { href: '/passes', label: 'View Bus Passes', icon: CreditCard },
  { href: '/history', label: 'History', icon: History },
];

const adminItems = [
  { href: '/admin', label: 'Admin Dashboard', icon: Shield },
  { href: '/admin/reports', label: 'Reports', icon: BarChart3 },
  { href: '/admin/users', label: 'Manage Users', icon: Users },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/passes?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2563eb, #1e40af)' }}>
              <Bus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-tight">BUS PASS</h1>
              <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Management</p>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="mb-2 px-3">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Main Menu</p>
          </div>
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`sidebar-link ${isActive(item.href) ? 'active' : ''}`}
                >
                  <Icon className="w-[18px] h-[18px]" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Admin Section */}
          {((session?.user?.role || 'admin') === 'admin') && (
            <div className="mt-6">
              <button
                onClick={() => setAdminOpen(!adminOpen)}
                className="flex items-center justify-between w-full px-3 mb-2"
              >
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Admin</p>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${adminOpen ? 'rotate-180' : ''}`} />
              </button>
              {adminOpen && (
                <div className="space-y-1">
                  {adminItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`sidebar-link ${isActive(item.href) ? 'active' : ''}`}
                      >
                        <Icon className="w-[18px] h-[18px]" />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </nav>

        {/* User Section */}
        <div className="p-3 border-t border-slate-100">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-primary-700 text-sm font-bold">
                {session?.user?.name?.[0]?.toUpperCase() || 'A'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{session?.user?.name || 'Admin'}</p>
              <p className="text-[11px] text-slate-400 capitalize">{session?.user?.role || 'admin'}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="sidebar-link w-full text-red-500 hover:!bg-red-50 hover:!text-red-600"
          >
            <LogOut className="w-[18px] h-[18px]" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-500"
            >
              <Menu className="w-5 h-5" />
            </button>
            <form onSubmit={handleSearch} className="hidden sm:flex items-center relative">
              <Search className="absolute left-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search passengers, tickets..."
                className="input-field pl-10 w-72 !py-2 !text-sm !rounded-xl !border-slate-200 !bg-slate-50 focus:!bg-white"
              />
            </form>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 relative">
              <Bell className="w-5 h-5" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary-500" />
            </button>
            <div className="hidden sm:flex items-center gap-2 ml-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-primary-700 text-xs font-bold">
                  {session?.user?.name?.[0]?.toUpperCase() || 'A'}
                </span>
              </div>
              <span className="text-sm font-medium text-slate-700">{session?.user?.name || 'Admin'}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="page-enter">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
