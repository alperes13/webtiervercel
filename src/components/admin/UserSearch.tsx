'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, UserCircle, RefreshCw } from 'lucide-react';
import UserDetailPanel from './UserDetailPanel';

interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  mini_credits: number;
  ultra_credits: number;
  is_active: boolean;
  email_verified: boolean;
  created_at: string;
}

export default function UserSearch() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '20' });
    if (query) params.set('q', query);
    try {
      const res = await fetch(`/api/admin/users?${params}`, { credentials: 'include' });
      const data = await res.json();
      if (data.success) { setUsers(data.users); setTotal(data.total); }
    } finally {
      setLoading(false);
    }
  }, [page, query]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const totalPages = Math.ceil(total / 20);

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={query}
            onChange={e => { setQuery(e.target.value); setPage(1); }}
            placeholder="E-posta veya isim ara..."
            className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-slate-600"
          />
        </div>
        <button onClick={fetchUsers} className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors">
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Results */}
      <div className="space-y-2">
        {loading && users.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-8">Yükleniyor...</p>
        ) : users.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-8">Kullanıcı bulunamadı.</p>
        ) : users.map(user => {
          const displayName = [user.first_name, user.last_name].filter(Boolean).join(' ') || null;
          return (
            <div
              key={user.id}
              className="flex items-center gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors"
              onClick={() => setSelectedUser(user)}
            >
              <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0">
                <UserCircle size={18} className="text-slate-400" />
              </div>
              <div className="flex-1 min-w-0">
                {displayName && <p className="text-sm font-medium text-white">{displayName}</p>}
                <p className="text-sm text-slate-400 truncate">{user.email}</p>
                <p className="text-xs text-slate-600 mt-0.5">
                  {new Date(user.created_at).toLocaleDateString('tr-TR')} tarihinde katıldı
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 text-right">
                <div>
                  <p className="text-xs text-slate-500">Mini</p>
                  <p className="text-sm font-semibold text-white">{user.mini_credits}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Ultra</p>
                  <p className="text-sm font-semibold text-white">{user.ultra_credits}</p>
                </div>
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${user.is_active ? 'bg-emerald-400' : 'bg-red-400'}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>{total} kullanıcı</span>
          <div className="flex gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-40 transition-colors">Önceki</button>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-40 transition-colors">Sonraki</button>
          </div>
        </div>
      )}

      {selectedUser && (
        <UserDetailPanel
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}
