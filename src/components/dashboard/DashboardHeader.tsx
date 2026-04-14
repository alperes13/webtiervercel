'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/Card';
import { Zap, Target, LayoutDashboard } from 'lucide-react';

export default function DashboardHeader() {
  const { session } = useAuth();
  const { t } = useLanguage();

  if (!session) return null;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text)]">
          Merhaba, {session.email.split('@')[0]}
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Webtier Dashboard'a hoş geldiniz. Analizlerinizi yönetebilir ve yeni analizler başlatabilirsiniz.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <LayoutDashboard className="h-16 w-16" />
          </div>
          <p className="text-sm font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Mini Kredi</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-[var(--color-text)]">{session.creditsMini}</span>
            <span className="text-xs text-[var(--color-text-muted)]">Analiz Hakkı</span>
          </div>
        </Card>

        <Card className="p-6 border-cyan-500/20 bg-cyan-500/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-cyan-500">
            <Zap className="h-16 w-16" />
          </div>
          <p className="text-sm font-medium text-cyan-500 uppercase tracking-wider">Ultra Kredi</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-[var(--color-text)]">{session.creditsUltra}</span>
            <span className="text-xs text-[var(--color-text-muted)]">Premium Analiz</span>
          </div>
        </Card>

        <Card className="p-6 relative overflow-hidden group hidden lg:block">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Target className="h-16 w-16" />
          </div>
          <p className="text-sm font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Durum</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold text-[var(--color-text)] capitalize">
              {session.oauthProvider || 'E-posta'} ile bağlı
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}
