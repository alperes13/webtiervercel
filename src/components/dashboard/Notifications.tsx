'use client';

import { useEffect, useState, useCallback } from 'react';
import { Bell, CheckCheck, ListTodo, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';
import { getNotifications, markNotificationsRead } from '@/lib/api';
import { cn } from '@/lib/utils';

export interface Notification {
  id: string;
  type: 'analysis_completed' | 'analysis_failed' | 'analysis_rejected' | 'task_assigned';
  title: string;
  body: string;
  is_read: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
}

const TYPE_CONFIG: Record<string, {
  icon: React.ElementType;
  iconClass: string;
  bgClass: string;
}> = {
  analysis_completed: { icon: CheckCircle2, iconClass: 'text-emerald-600', bgClass: 'bg-emerald-50' },
  analysis_failed:    { icon: AlertCircle,  iconClass: 'text-red-500',     bgClass: 'bg-red-50'     },
  analysis_rejected:  { icon: XCircle,      iconClass: 'text-amber-500',   bgClass: 'bg-amber-50'   },
  task_assigned:      { icon: ListTodo,     iconClass: 'text-cyan-600',    bgClass: 'bg-cyan-50'    },
};

const formatDate = (dateStr: string, lang: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffMin < 1) return lang === 'tr' ? 'Az önce' : 'Just now';
  if (diffMin < 60) return lang === 'tr' ? `${diffMin} dakika önce` : `${diffMin}m ago`;
  if (diffHour < 24) return lang === 'tr' ? `${diffHour} saat önce` : `${diffHour}h ago`;
  if (diffDay < 7) return lang === 'tr' ? `${diffDay} gün önce` : `${diffDay}d ago`;

  const locale = lang === 'tr' ? 'tr-TR' : 'en-US';
  return date.toLocaleDateString(locale, { day: 'numeric', month: 'short' });
};

interface Props {
  token: string;
  onUnreadCountChange?: (count: number) => void;
}

export default function Notifications({ token, onUnreadCountChange }: Props) {
  const { t, language } = useLanguage();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [markingAll, setMarkingAll] = useState(false);

  const fetchNotifications = useCallback(async () => {
    if (!token) return;
    try {
      const res = await getNotifications(token);
      if (res.success) {
        setNotifications(res.notifications as Notification[]);
        onUnreadCountChange?.(res.unreadCount);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [token, onUnreadCountChange]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleMarkAllRead = async () => {
    setMarkingAll(true);
    try {
      await markNotificationsRead(token, undefined, true);
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      onUnreadCountChange?.(0);
    } catch {
      // silently fail
    } finally {
      setMarkingAll(false);
    }
  };

  const handleMarkOneRead = async (id: string) => {
    if (notifications.find(n => n.id === id)?.is_read) return;
    try {
      await markNotificationsRead(token, id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
      const newUnread = notifications.filter(n => n.id !== id && !n.is_read).length;
      onUnreadCountChange?.(newUnread);
    } catch {
      // silently fail
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;
  const notifT = t.dashboard.notifications;

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-20 rounded-lg bg-slate-100 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-xl font-bold text-slate-900">{notifT.title}</h2>
          <p className="text-xs text-slate-500 font-medium">{notifT.subtitle}</p>
        </div>
        {unreadCount > 0 && (
          <Button
            size="sm"
            variant="outline"
            onClick={handleMarkAllRead}
            disabled={markingAll}
            className="text-[11px] font-bold uppercase tracking-wider border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center gap-1.5"
          >
            <CheckCheck className="h-3.5 w-3.5" />
            {markingAll ? '...' : notifT.markAllRead}
          </Button>
        )}
      </div>

      {/* Unread count badge */}
      {unreadCount > 0 && (
        <div className="text-[11px] font-bold text-cyan-600 bg-cyan-50 border border-cyan-100 rounded-full px-3 py-1 inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse inline-block" />
          {notifT.unreadCount?.replace('{count}', String(unreadCount)) ?? `${unreadCount} okunmamış`}
        </div>
      )}

      {/* Empty state */}
      {notifications.length === 0 && (
        <Card className="p-10 border-dashed border-2 flex flex-col items-center justify-center text-center space-y-3 bg-white">
          <div className="p-4 bg-slate-50 rounded-full">
            <Bell className="h-7 w-7 text-slate-300" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-600">{notifT.empty}</p>
            <p className="text-xs text-slate-400 mt-1">{notifT.emptyHint ?? ''}</p>
          </div>
        </Card>
      )}

      {/* Notification list */}
      {notifications.length > 0 && (
        <div className="space-y-2">
          {notifications.map((notif) => {
            const cfg = TYPE_CONFIG[notif.type] ?? TYPE_CONFIG.task_assigned;
            const Icon = cfg.icon;
            const isUnread = !notif.is_read;

            return (
              <button
                key={notif.id}
                onClick={() => handleMarkOneRead(notif.id)}
                className={cn(
                  'w-full text-left border rounded-lg p-4 flex items-start gap-3 transition-all duration-200 group',
                  isUnread
                    ? 'bg-white border-slate-200 hover:border-cyan-200 hover:shadow-sm'
                    : 'bg-slate-50/50 border-slate-100 opacity-70'
                )}
              >
                {/* Icon */}
                <div className={cn('p-2 rounded-lg shrink-0 mt-0.5', cfg.bgClass)}>
                  <Icon className={cn('h-4 w-4', cfg.iconClass)} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn(
                      'text-sm leading-snug',
                      isUnread ? 'font-bold text-slate-900' : 'font-medium text-slate-500'
                    )}>
                      {notif.title}
                    </p>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {isUnread && (
                        <span className="h-2 w-2 rounded-full bg-cyan-500 shrink-0" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{notif.body}</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-1.5">
                    {formatDate(notif.created_at, language)}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
