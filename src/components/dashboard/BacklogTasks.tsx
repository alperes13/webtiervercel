'use client';

import { useEffect, useState } from 'react';
import { Calendar, Tag, ChevronDown, ChevronUp } from 'lucide-react';

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

const PRIORITY_CONFIG: Record<string, { label: string; color: string; dot: string }> = {
  low:      { label: 'Düşük',   color: 'bg-slate-100 text-slate-500 border-slate-200',      dot: 'bg-slate-400' },
  medium:   { label: 'Orta',    color: 'bg-blue-50 text-blue-600 border-blue-200',           dot: 'bg-blue-500' },
  high:     { label: 'Yüksek',  color: 'bg-amber-50 text-amber-600 border-amber-200',        dot: 'bg-amber-500' },
  critical: { label: 'Kritik',  color: 'bg-red-50 text-red-600 border-red-200',              dot: 'bg-red-500' },
};

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  todo:        { label: 'Yapılacak',      color: 'text-slate-400' },
  in_progress: { label: 'Devam Ediyor',   color: 'text-blue-500' },
  review:      { label: 'İncelemede',     color: 'text-purple-500' },
  done:        { label: 'Tamamlandı',     color: 'text-emerald-500' },
  cancelled:   { label: 'İptal Edildi',   color: 'text-slate-300' },
};

interface TaskCardProps {
  task: Task;
}

function TaskCard({ task }: TaskCardProps) {
  const [expanded, setExpanded] = useState(false);
  const priority = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.medium;
  const status = STATUS_CONFIG[task.status] || STATUS_CONFIG.todo;

  return (
    <div className="border border-black/8 rounded-2xl bg-white overflow-hidden hover:border-black/12 transition-colors">
      <button
        className="w-full text-left p-4 flex items-start gap-3"
        onClick={() => (task.description || task.image_url) && setExpanded(e => !e)}
      >
        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${priority.dot}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-medium text-[var(--color-text)] leading-snug">{task.title}</p>
            {(task.description || task.image_url) && (
              <span className="text-slate-300 flex-shrink-0 mt-0.5">
                {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${priority.color}`}>
              {priority.label}
            </span>
            <span className={`text-[10px] font-medium ${status.color}`}>
              {status.label}
            </span>
            {task.due_date && (
              <span className="flex items-center gap-1 text-[10px] text-slate-400">
                <Calendar size={9} />
                {new Date(task.due_date).toLocaleDateString('tr-TR')}
              </span>
            )}
          </div>

          {task.labels && task.labels.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {task.labels.map(l => (
                <span key={l} className="flex items-center gap-0.5 text-[10px] text-slate-400">
                  <Tag size={9} />{l}
                </span>
              ))}
            </div>
          )}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-black/4 pt-3">
          {task.image_url && (
            <img
              src={task.image_url}
              alt={task.title}
              className="w-full rounded-xl object-cover max-h-48 mb-3"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          )}
          {task.description && (
            <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-wrap">{task.description}</p>
          )}
        </div>
      )}
    </div>
  );
}

interface Props {
  token: string;
}

export default function BacklogTasks({ token }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    fetch('/api/user/tasks', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => { if (data.success) setTasks(data.tasks); })
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-5 h-5 border-2 border-black/10 border-t-black/40 rounded-full animate-spin" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-slate-400">Henüz backlog task'ı yok.</p>
        <p className="text-xs text-slate-300 mt-1">Ekibimiz yakında görevler ekleyecek.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map(task => <TaskCard key={task.id} task={task} />)}
    </div>
  );
}
