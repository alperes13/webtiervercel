'use client';

import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  BarChart2, 
  History, 
  CreditCard, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type DashboardSection = 'overview' | 'start-analysis' | 'history' | 'credits' | 'settings';

interface SidebarProps {
  activeSection: DashboardSection;
  onSectionChange: (section: DashboardSection) => void;
}

const MENU_ITEMS = [
  { id: 'overview' as const, label: 'Panel', icon: LayoutDashboard },
  { id: 'history' as const, label: 'Analiz Geçmişi', icon: History },
  { id: 'credits' as const, label: 'Kredi Al', icon: CreditCard },
  { id: 'settings' as const, label: 'Ayarlar', icon: Settings },
];

export default function DashboardSidebar({ activeSection, onSectionChange }: SidebarProps) {
  const { logout } = useAuth();

  return (
    <aside className="w-60 shrink-0 hidden lg:flex flex-col border-r border-zinc-200 bg-white h-[calc(100vh-80px)] sticky top-20">
      <div className="flex-1 py-4 px-3 space-y-0.5">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all group",
                isActive 
                  ? "bg-cyan-500/10 text-cyan-500 font-bold" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={cn("h-4 w-4", isActive ? "text-cyan-500" : "text-slate-400 group-hover:text-slate-600")} />
                <span className="text-[13px]">{item.label}</span>
              </div>
              {isActive && <ChevronRight className="h-4 w-4" />}
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-[var(--color-border)]">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[var(--color-error)] hover:bg-red-500/5 transition-all group"
        >
          <LogOut className="h-5 w-5" />
          <span className="text-sm font-medium">Çıkış Yap</span>
        </button>
      </div>
    </aside>
  );
}
