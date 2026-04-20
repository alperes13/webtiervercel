'use client';

import { useEffect, useState, useCallback } from 'react';
import { Search, RefreshCw, ExternalLink } from 'lucide-react';

interface Analysis {
  id: string;
  user_id: string;
  user_email: string;
  user_first_name: string | null;
  user_last_name: string | null;
  analysis_type: string;
  status: string;
  website_url: string;
  created_at: string;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending:    { label: 'Bekliyor',   color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  processing: { label: 'İşleniyor', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  completed:  { label: 'Tamamlandı', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  failed:     { label: 'Başarısız',  color: 'bg-red-500/10 text-red-400 border-red-500/20' },
  rejected:   { label: 'Reddedildi', color: 'bg-slate-500/10 text-slate-400 border-slate-500/20' },
};

const VALID_STATUSES = ['pending', 'processing', 'completed', 'failed', 'rejected'];

export default function AnalysisTable() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchAnalyses = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '20' });
    if (search) params.set('search', search);
    if (statusFilter) params.set('status', statusFilter);
    if (typeFilter) params.set('type', typeFilter);
    try {
      const res = await fetch(`/api/admin/analyses?${params}`, { credentials: 'include' });
      const data = await res.json();
      if (data.success) { setAnalyses(data.analyses); setTotal(data.total); }
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter, typeFilter]);

  useEffect(() => { fetchAnalyses(); }, [fetchAnalyses]);

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    try {
      await fetch('/api/admin/analyses', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id, status }),
      });
      await fetchAnalyses();
    } finally {
      setUpdating(null);
    }
  }

  const totalPages = Math.ceil(total / 20);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="E-posta veya URL ara..."
            className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-slate-600"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-300 focus:outline-none focus:border-slate-600"
        >
          <option value="">Tüm Durumlar</option>
          {VALID_STATUSES.map(s => (
            <option key={s} value={s}>{STATUS_LABELS[s]?.label || s}</option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={e => { setTypeFilter(e.target.value); setPage(1); }}
          className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-300 focus:outline-none focus:border-slate-600"
        >
          <option value="">Tüm Tipler</option>
          <option value="mini">Mini</option>
          <option value="ultra">Ultra</option>
        </select>
        <button onClick={fetchAnalyses} className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors">
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/50">
              <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Kullanıcı</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">URL</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Tip</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Durum</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Tarih</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {loading && analyses.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-500">Yükleniyor...</td></tr>
            ) : analyses.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-500">Analiz bulunamadı.</td></tr>
            ) : analyses.map(a => {
              const s = STATUS_LABELS[a.status] || { label: a.status, color: 'bg-slate-500/10 text-slate-400 border-slate-500/20' };
              return (
                <tr key={a.id} className="hover:bg-slate-900/30">
                  <td className="px-4 py-3 text-slate-300">{a.user_email}</td>
                  <td className="px-4 py-3 max-w-[180px]">
                    <a href={a.website_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center gap-1 truncate">
                      {a.website_url.replace(/^https?:\/\//, '')}
                      <ExternalLink size={10} className="flex-shrink-0" />
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                      a.analysis_type === 'ultra'
                        ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                        : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                    }`}>
                      {a.analysis_type?.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${s.color}`}>{s.label}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">
                    {new Date(a.created_at).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={a.status}
                      disabled={updating === a.id}
                      onChange={e => updateStatus(a.id, e.target.value)}
                      className="px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300 focus:outline-none disabled:opacity-50"
                    >
                      {VALID_STATUSES.map(s => (
                        <option key={s} value={s}>{STATUS_LABELS[s]?.label || s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>{total} sonuçtan {Math.min((page - 1) * 20 + 1, total)}–{Math.min(page * 20, total)} gösteriliyor</span>
          <div className="flex gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-40 transition-colors">Önceki</button>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-40 transition-colors">Sonraki</button>
          </div>
        </div>
      )}
    </div>
  );
}
