'use client';

import { useState } from 'react';
import { FileText, Link } from 'lucide-react';

interface DocumentFormProps {
  userId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function DocumentForm({ userId, onSuccess, onCancel }: DocumentFormProps) {
  const [type, setType] = useState<'file' | 'link'>('file');
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [fileExtension, setFileExtension] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { setError('İsim zorunludur.'); return; }
    if (!url.trim()) { setError('URL zorunludur.'); return; }
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/users/${userId}/documents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ type, name: name.trim(), url: url.trim(), file_extension: fileExtension.trim() || null }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Hata oluştu.'); return; }
      onSuccess();
    } catch {
      setError('Sunucu hatası.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Type selector */}
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-2">Tür</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setType('file')}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm transition-all ${
              type === 'file'
                ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <FileText size={14} />
            Dosya / Analiz
          </button>
          <button
            type="button"
            onClick={() => setType('link')}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm transition-all ${
              type === 'link'
                ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <Link size={14} />
            Google Drive Linki
          </button>
        </div>
      </div>

      {/* Name */}
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5">İsim *</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder={type === 'file' ? 'CRO Analiz Raporu Q1 2025' : 'Drive Klasörü'}
          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-slate-500"
        />
      </div>

      {/* URL */}
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5">URL *</label>
        <input
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="https://..."
          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-slate-500"
        />
      </div>

      {/* Extension (file only) */}
      {type === 'file' && (
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Uzantı (opsiyonel)</label>
          <input
            value={fileExtension}
            onChange={e => setFileExtension(e.target.value)}
            placeholder="pdf, docx, xlsx..."
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-slate-500"
          />
        </div>
      )}

      {error && (
        <div className="px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
      )}

      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-400 text-sm hover:text-white transition-colors"
        >
          İptal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-2.5 rounded-xl bg-white text-slate-900 text-sm font-medium hover:bg-slate-100 transition-colors disabled:opacity-50"
        >
          {loading ? 'Ekleniyor...' : 'Ekle'}
        </button>
      </div>
    </form>
  );
}
