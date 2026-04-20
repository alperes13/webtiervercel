'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Plus, Trash2, Pencil, FileText, Link, Calendar, Tag } from 'lucide-react';
import TaskForm from './TaskForm';
import DocumentForm from './DocumentForm';

interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  mini_credits: number;
  ultra_credits: number;
}

interface Task {
  id: string;
  title: string;
  description: string | null;
  priority: string;
  status: string;
  labels: string[] | null;
  image_url: string | null;
  due_date: string | null;
  created_at: string;
}

interface Document {
  id: string;
  type: 'file' | 'link';
  name: string;
  url: string;
  file_extension: string | null;
  created_at: string;
}

const PRIORITY_COLORS: Record<string, string> = {
  low:      'bg-slate-500/10 text-slate-400 border-slate-500/20',
  medium:   'bg-blue-500/10 text-blue-400 border-blue-500/20',
  high:     'bg-amber-500/10 text-amber-400 border-amber-500/20',
  critical: 'bg-red-500/10 text-red-400 border-red-500/20',
};

const PRIORITY_LABELS: Record<string, string> = {
  low: 'Düşük', medium: 'Orta', high: 'Yüksek', critical: 'Kritik',
};

const STATUS_LABELS: Record<string, string> = {
  todo: 'Yapılacak', in_progress: 'Devam Ediyor', review: 'İncelemede', done: 'Tamamlandı', cancelled: 'İptal',
};

type TabId = 'credits' | 'tasks' | 'documents';

interface Props {
  user: User;
  onClose: () => void;
}

export default function UserDetailPanel({ user, onClose }: Props) {
  const [tab, setTab] = useState<TabId>('credits');
  const [creditType, setCreditType] = useState<'mini' | 'ultra'>('mini');
  const [creditAmount, setCreditAmount] = useState('');
  const [creditLoading, setCreditLoading] = useState(false);
  const [creditMsg, setCreditMsg] = useState('');
  const [currentCredits, setCurrentCredits] = useState({ mini: user.mini_credits, ultra: user.ultra_credits });

  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [documents, setDocuments] = useState<Document[]>([]);
  const [docsLoading, setDocsLoading] = useState(false);
  const [showDocForm, setShowDocForm] = useState(false);

  const fetchTasks = useCallback(async () => {
    setTasksLoading(true);
    const res = await fetch(`/api/admin/users/${user.id}/tasks`, { credentials: 'include' });
    const data = await res.json();
    if (data.success) setTasks(data.tasks);
    setTasksLoading(false);
  }, [user.id]);

  const fetchDocs = useCallback(async () => {
    setDocsLoading(true);
    const res = await fetch(`/api/admin/users/${user.id}/documents`, { credentials: 'include' });
    const data = await res.json();
    if (data.success) setDocuments(data.documents);
    setDocsLoading(false);
  }, [user.id]);

  useEffect(() => {
    if (tab === 'tasks') fetchTasks();
    if (tab === 'documents') fetchDocs();
  }, [tab, fetchTasks, fetchDocs]);

  async function handleAddCredits(e: React.FormEvent) {
    e.preventDefault();
    const amount = parseInt(creditAmount);
    if (isNaN(amount) || amount === 0) { setCreditMsg('Geçerli bir miktar girin.'); return; }
    setCreditLoading(true);
    setCreditMsg('');
    try {
      const res = await fetch(`/api/admin/users/${user.id}/credits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ type: creditType, amount }),
      });
      const data = await res.json();
      if (data.success) {
        setCurrentCredits({ mini: data.credits.mini, ultra: data.credits.ultra });
        setCreditAmount('');
        setCreditMsg(`✓ ${Math.abs(amount)} ${creditType} kredi ${amount > 0 ? 'eklendi' : 'çıkarıldı'}.`);
      } else {
        setCreditMsg(data.error || 'Hata oluştu.');
      }
    } finally {
      setCreditLoading(false);
    }
  }

  async function deleteTask(taskId: string) {
    if (!confirm('Bu task silinecek. Emin misin?')) return;
    await fetch(`/api/admin/tasks/${taskId}`, { method: 'DELETE', credentials: 'include' });
    fetchTasks();
  }

  async function deleteDoc(docId: string) {
    if (!confirm('Bu döküman silinecek. Emin misin?')) return;
    await fetch(`/api/admin/documents/${docId}`, { method: 'DELETE', credentials: 'include' });
    fetchDocs();
  }

  const TABS: { id: TabId; label: string }[] = [
    { id: 'credits', label: 'Krediler' },
    { id: 'tasks', label: 'Backlog' },
    { id: 'documents', label: 'Dökümanlar' },
  ];

  const displayName = [user.first_name, user.last_name].filter(Boolean).join(' ') || user.email;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="w-full max-w-xl bg-slate-950 border-l border-slate-800 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-start justify-between">
          <div>
            <p className="font-semibold text-white">{displayName}</p>
            <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors p-1">
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800 px-2">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                tab === t.id
                  ? 'border-white text-white'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* Credits Tab */}
          {tab === 'credits' && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="text-xs text-slate-500 mb-1">Mini Kredi</p>
                  <p className="text-2xl font-bold text-white">{currentCredits.mini}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="text-xs text-slate-500 mb-1">Ultra Kredi</p>
                  <p className="text-2xl font-bold text-white">{currentCredits.ultra}</p>
                </div>
              </div>

              <form onSubmit={handleAddCredits} className="space-y-3">
                <h3 className="text-sm font-medium text-slate-300">Manuel Kredi İşlemi</h3>
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={creditType}
                    onChange={e => setCreditType(e.target.value as 'mini' | 'ultra')}
                    className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-slate-500"
                  >
                    <option value="mini">Mini Kredi</option>
                    <option value="ultra">Ultra Kredi</option>
                  </select>
                  <input
                    type="number"
                    value={creditAmount}
                    onChange={e => setCreditAmount(e.target.value)}
                    placeholder="Miktar (- ile çıkar)"
                    className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-slate-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={creditLoading}
                  className="w-full py-2.5 rounded-xl bg-white text-slate-900 text-sm font-medium hover:bg-slate-100 transition-colors disabled:opacity-50"
                >
                  {creditLoading ? 'İşleniyor...' : 'Uygula'}
                </button>
                {creditMsg && (
                  <p className={`text-sm ${creditMsg.startsWith('✓') ? 'text-emerald-400' : 'text-red-400'}`}>{creditMsg}</p>
                )}
              </form>
            </div>
          )}

          {/* Tasks Tab */}
          {tab === 'tasks' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-slate-300">Backlog Task'ları</h3>
                <button
                  onClick={() => { setEditingTask(null); setShowTaskForm(true); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/8 border border-white/10 text-white text-xs hover:bg-white/12 transition-colors"
                >
                  <Plus size={12} /> Yeni Task
                </button>
              </div>

              {showTaskForm && (
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-700">
                  <h4 className="text-sm font-medium text-white mb-4">{editingTask ? 'Task Düzenle' : 'Yeni Task Oluştur'}</h4>
                  <TaskForm
                    userId={user.id}
                    initial={editingTask || undefined}
                    onSuccess={() => { setShowTaskForm(false); setEditingTask(null); fetchTasks(); }}
                    onCancel={() => { setShowTaskForm(false); setEditingTask(null); }}
                  />
                </div>
              )}

              {tasksLoading ? (
                <p className="text-slate-500 text-sm text-center py-8">Yükleniyor...</p>
              ) : tasks.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-8">Henüz task yok.</p>
              ) : (
                <div className="space-y-2">
                  {tasks.map(task => (
                    <div key={task.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 group">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1.5">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${PRIORITY_COLORS[task.priority] || ''}`}>
                              {PRIORITY_LABELS[task.priority] || task.priority}
                            </span>
                            <span className="text-[10px] text-slate-500">{STATUS_LABELS[task.status] || task.status}</span>
                          </div>
                          <p className="text-sm font-medium text-white">{task.title}</p>
                          {task.description && (
                            <p className="text-xs text-slate-400 mt-1 line-clamp-2">{task.description}</p>
                          )}
                          <div className="flex flex-wrap gap-2 mt-2">
                            {task.labels?.map(l => (
                              <span key={l} className="flex items-center gap-1 text-[10px] text-blue-400">
                                <Tag size={9} />{l}
                              </span>
                            ))}
                            {task.due_date && (
                              <span className="flex items-center gap-1 text-[10px] text-slate-500">
                                <Calendar size={9} />
                                {new Date(task.due_date).toLocaleDateString('tr-TR')}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                          <button
                            onClick={() => { setEditingTask(task); setShowTaskForm(true); }}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-700 transition-colors"
                          >
                            <Pencil size={12} />
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Documents Tab */}
          {tab === 'documents' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-slate-300">Dökümanlar & Analizler</h3>
                <button
                  onClick={() => setShowDocForm(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/8 border border-white/10 text-white text-xs hover:bg-white/12 transition-colors"
                >
                  <Plus size={12} /> Ekle
                </button>
              </div>

              {showDocForm && (
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-700">
                  <h4 className="text-sm font-medium text-white mb-4">Döküman / Link Ekle</h4>
                  <DocumentForm
                    userId={user.id}
                    onSuccess={() => { setShowDocForm(false); fetchDocs(); }}
                    onCancel={() => setShowDocForm(false)}
                  />
                </div>
              )}

              {docsLoading ? (
                <p className="text-slate-500 text-sm text-center py-8">Yükleniyor...</p>
              ) : documents.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-8">Henüz döküman yok.</p>
              ) : (
                <div className="space-y-2">
                  {documents.map(doc => (
                    <div key={doc.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 group">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        doc.type === 'link' ? 'bg-green-500/10 border border-green-500/20' : 'bg-blue-500/10 border border-blue-500/20'
                      }`}>
                        {doc.type === 'link' ? (
                          <Link size={14} className="text-green-400" />
                        ) : (
                          <FileText size={14} className="text-blue-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">{doc.name}</p>
                        <p className="text-xs text-slate-500">
                          {doc.file_extension && <span className="uppercase mr-2">{doc.file_extension}</span>}
                          {new Date(doc.created_at).toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a href={doc.url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-700 transition-colors">
                          <Link size={12} />
                        </a>
                        <button
                          onClick={() => deleteDoc(doc.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
