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
  { id: 'overview' as const, label: 'Dashboad', icon: LayoutDashboard },
  { id: 'start-analysis' as const, label: 'Analiz Başlat', icon: BarChart2 },
  { id: 'history' as const, label: 'Analiz Gezmişi', icon: History },
  { id: 'credits' as const, label: 'Kredi Al', icon: CreditCard },
  { id: 'settings' as const, label: 'Ayarlar', icon: Settings },
];

export default function DashboardSidebar({ activeSection, onSectionChange }: SidebarProps) {
  const { logout } = useAuth();

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col border-r border-[var(--color-border)] bg-[var(--color-surface)] h-[calc(100vh-80px)] sticky top-20">
      <div className="flex-1 py-6 px-4 space-y-1">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group",
                isActive 
                  ? "bg-cyan-500/10 text-cyan-500 font-semibold" 
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-light)] hover:text-[var(--color-text)]"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn("h-5 w-5", isActive ? "text-cyan-500" : "text-[var(--color-text-muted)] group-hover:text-[var(--color-text)]")} />
                <span className="text-sm">{item.label}</span>
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
