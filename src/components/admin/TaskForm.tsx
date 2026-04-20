'use client';

import { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface TaskFormProps {
  userId: string;
  onSuccess: () => void;
  onCancel: () => void;
  initial?: {
    id?: string;
    title?: string;
    description?: string;
    priority?: string;
    status?: string;
    labels?: string[];
    image_url?: string;
    due_date?: string;
  };
}

const PRIORITIES = [
  { value: 'low', label: 'Düşük' },
  { value: 'medium', label: 'Orta' },
  { value: 'high', label: 'Yüksek' },
  { value: 'critical', label: 'Kritik' },
];

const STATUSES = [
  { value: 'todo', label: 'Yapılacak' },
  { value: 'in_progress', label: 'Devam Ediyor' },
  { value: 'review', label: 'İncelemede' },
  { value: 'done', label: 'Tamamlandı' },
  { value: 'cancelled', label: 'İptal Edildi' },
];

export default function TaskForm({ userId, onSuccess, onCancel, initial }: TaskFormProps) {
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [priority, setPriority] = useState(initial?.priority || 'medium');
  const [status, setStatus] = useState(initial?.status || 'todo');
  const [labels, setLabels] = useState<string[]>(initial?.labels || []);
  const [labelInput, setLabelInput] = useState('');
  const [imageUrl, setImageUrl] = useState(initial?.image_url || '');
  const [dueDate, setDueDate] = useState(initial?.due_date || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function addLabel() {
    const val = labelInput.trim();
    if (val && !labels.includes(val)) setLabels(l => [...l, val]);
    setLabelInput('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) { setError('Başlık zorunludur.'); return; }
    setError('');
    setLoading(true);

    const isEdit = !!initial?.id;
    const url = isEdit
      ? `/api/admin/tasks/${initial!.id}`
      : `/api/admin/users/${userId}/tasks`;

    try {
      const res = await fetch(url, {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title, description, priority, status, labels, image_url: imageUrl, due_date: dueDate }),
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
      {/* Title */}
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5">Başlık *</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Task başlığı..."
          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-slate-500"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5">Açıklama</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Task detayları, kabul kriterleri..."
          rows={4}
          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-slate-500 resize-none"
        />
      </div>

      {/* Priority & Status */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Öncelik</label>
          <select
            value={priority}
            onChange={e => setPriority(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-slate-500"
          >
            {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Durum</label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-slate-500"
          >
            {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
      </div>

      {/* Labels */}
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5">Etiketler</label>
        <div className="flex gap-2">
          <input
            value={labelInput}
            onChange={e => setLabelInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addLabel(); } }}
            placeholder="Etiket ekle ve Enter'a bas..."
            className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-slate-500"
          />
          <button type="button" onClick={addLabel} className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors">
            <Plus size={14} />
          </button>
        </div>
        {labels.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {labels.map(l => (
              <span key={l} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs">
                {l}
                <button type="button" onClick={() => setLabels(ls => ls.filter(x => x !== l))} className="hover:text-blue-200">
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Image URL & Due Date */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Görsel URL</label>
          <input
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            placeholder="https://..."
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-slate-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Bitiş Tarihi</label>
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-slate-500"
          />
        </div>
      </div>

      {error && (
        <div className="px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
      )}

      {/* Actions */}
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
          {loading ? 'Kaydediliyor...' : initial?.id ? 'Güncelle' : 'Oluştur'}
        </button>
      </div>
    </form>
  );
}
