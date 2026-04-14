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
    <div className="space-y-4">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          Merhaba, {session.email.split('@')[0]}
        </h1>
        <p className="text-xs text-slate-500">
          Webtier Dashboard'a hoş geldiniz.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Card className="p-4 relative overflow-hidden group border-zinc-200 bg-white">
          <div className="absolute top-0 right-0 p-2 opacity-5">
            <LayoutDashboard className="h-10 w-10" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mini Krediler</p>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900">{session.creditsMini}</span>
            <span className="text-[10px] text-slate-400 font-bold">HAK</span>
          </div>
        </Card>

        <Card className="p-4 border-cyan-100 bg-cyan-50/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-10 text-cyan-500">
            <Zap className="h-10 w-10" />
          </div>
          <p className="text-[10px] font-bold text-cyan-600 uppercase tracking-wider">Ultra Krediler</p>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900">{session.creditsUltra}</span>
            <span className="text-[10px] text-cyan-600/60 font-bold">PREMİUM</span>
          </div>
        </Card>

        <Card className="p-4 relative overflow-hidden group border-zinc-200 bg-white">
          <div className="absolute top-0 right-0 p-2 opacity-5">
            <Target className="h-10 w-10" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">E-posta Doğrulama</p>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className={`text-sm font-bold capitalize ${session.emailVerified ? 'text-green-600' : 'text-amber-600'}`}>
              {session.emailVerified ? 'E-posta Doğrulandı' : 'Doğrulama Bekliyor'}
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}
