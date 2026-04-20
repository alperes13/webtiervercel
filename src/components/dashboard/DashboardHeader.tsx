'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { Zap, Target, LayoutDashboard } from 'lucide-react';

export default function DashboardHeader() {
  const { session, isHydrated } = useAuth();
  const [isVerifyModalOpen, setVerifyModalOpen] = useState(false);
  const { t } = useLanguage();

  // Hydration and safety guard
  if (!isHydrated || !session) {
    return <div className="h-20 animate-pulse bg-slate-100 rounded-2xl" />;
  }

  const firstName = session.firstName;
  const lastName = session.lastName;
  const displayName = firstName ? (lastName ? `${firstName} ${lastName}` : firstName) : session.email.split('@')[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          Merhaba, {displayName}
        </h1>
        <p className="text-xs text-slate-500">
          CRO-X AI Panel
        </p>
      </div>

      <div className={cn("grid gap-3 sm:grid-cols-3", session.emailVerified ? "sm:grid-cols-2" : "sm:grid-cols-3")}>
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

        {!session.emailVerified && (
          <Card className="p-4 relative overflow-hidden group border-zinc-200 bg-white text-amber-700 border-amber-100 bg-amber-50/30">
            <div className="absolute top-0 right-0 p-2 opacity-5">
              <Target className="h-10 w-10" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider">Doğrulama Durumu</p>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-sm font-bold capitalize">
                Doğrulama Bekliyor
              </span>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
