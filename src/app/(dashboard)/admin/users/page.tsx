'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/providers/ToastProvider';
import {
  Users, Plus, Trash2, ArrowLeft, Shield, UserCircle, Eye, X, Save,
} from 'lucide-react';

interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function ManageUsersPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'operator' });
  const [creating, setCreating] = useState(false);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      if (res.ok) { const data = await res.json(); setUsers(data); }
      else showToast('Failed to fetch users', 'error');
    } catch { showToast('Error loading users', 'error'); }
    finally { setLoading(false); }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      if (res.ok) {
        showToast('User created!', 'success');
        setShowModal(false);
        setNewUser({ name: '', email: '', password: '', role: 'operator' });
        fetchUsers();
      } else {
        const err = await res.json();
        showToast(err.error || 'Failed', 'error');
      }
    } catch { showToast('Error', 'error'); }
    finally { setCreating(false); }
  };

  const handleChangeRole = async (id: string, role: string) => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });
      if (res.ok) { showToast('Role updated', 'success'); fetchUsers(); }
      else showToast('Failed', 'error');
    } catch { showToast('Error', 'error'); }
  };

  const handleDeleteUser = async (id: string, name: string) => {
    if (!confirm(`Delete user "${name}"?`)) return;
    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
      if (res.ok) { showToast('User deleted', 'success'); fetchUsers(); }
      else { const err = await res.json(); showToast(err.error || 'Failed', 'error'); }
    } catch { showToast('Error', 'error'); }
  };

  const roleColors: Record<string, string> = {
    admin: 'badge-danger',
    operator: 'badge-info',
    viewer: 'badge-success',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-6 h-6 text-primary-600" /> Manage Users
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">{users.length} users</p>
          </div>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          <Plus className="w-4 h-4" /> Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="glass-card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40"><div className="loader" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">User</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase hidden sm:table-cell">Email</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Role</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase hidden md:table-cell">Joined</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="table-row border-b border-slate-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-primary-700 text-sm font-bold">{user.name[0]?.toUpperCase()}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                          <p className="text-xs text-slate-400 sm:hidden">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 hidden sm:table-cell">{user.email}</td>
                    <td className="py-3 px-4">
                      <select
                        value={user.role}
                        onChange={(e) => handleChangeRole(user._id, e.target.value)}
                        className="text-xs font-semibold px-2 py-1 rounded-lg border border-slate-200 bg-white"
                      >
                        <option value="admin">Admin</option>
                        <option value="operator">Operator</option>
                        <option value="viewer">Viewer</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 hidden md:table-cell">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end">
                        <button onClick={() => handleDeleteUser(user._id, user.name)}
                          className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors" title="Delete">
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
      </div>

      {/* Create User Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-900">Add New User</h2>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="input-label">Full Name *</label>
                <input value={newUser.name} onChange={(e) => setNewUser((p) => ({ ...p, name: e.target.value }))}
                  className="input-field" placeholder="John Doe" required />
              </div>
              <div>
                <label className="input-label">Email *</label>
                <input type="email" value={newUser.email} onChange={(e) => setNewUser((p) => ({ ...p, email: e.target.value }))}
                  className="input-field" placeholder="john@example.com" required />
              </div>
              <div>
                <label className="input-label">Password *</label>
                <input type="password" value={newUser.password} onChange={(e) => setNewUser((p) => ({ ...p, password: e.target.value }))}
                  className="input-field" placeholder="Min 6 characters" minLength={6} required />
              </div>
              <div>
                <label className="input-label">Role *</label>
                <select value={newUser.role} onChange={(e) => setNewUser((p) => ({ ...p, role: e.target.value }))} className="input-field">
                  <option value="operator">Operator</option>
                  <option value="viewer">Viewer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" disabled={creating} className="btn-primary flex-1 disabled:opacity-50">
                  {creating ? <div className="loader !w-4 !h-4 !border-2 !border-white/30 !border-t-white" /> : <Save className="w-4 h-4" />}
                  {creating ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
