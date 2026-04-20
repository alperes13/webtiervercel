'use client';

import { BarChart2, Users, Settings, LogOut, ChevronRight } from 'lucide-react';

const SECTIONS = [
  { id: 'analyses', label: 'Analizler', icon: BarChart2 },
  { id: 'users', label: 'Kullanıcılar', icon: Users },
  { id: 'settings', label: 'Ayarlar', icon: Settings },
] as const;

export type AdminSection = typeof SECTIONS[number]['id'];

interface Props {
  active: AdminSection;
  onChange: (s: AdminSection) => void;
  adminEmail: string;
  onLogout: () => void;
}

export default function AdminSidebar({ active, onChange, adminEmail, onLogout }: Props) {
  return (
    <aside className="w-60 bg-slate-950 border-r border-slate-800/60 flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-5 border-b border-slate-800/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
              <path d="M8 16L13 11L18 16L23 11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 21L13 16L18 21L23 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-tight">Webtier</p>
            <p className="text-[10px] text-slate-500 leading-tight">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        {SECTIONS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-white/8 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/4'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-white' : 'text-slate-500'} />
              {label}
              {isActive && <ChevronRight size={14} className="ml-auto text-slate-500" />}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-800/60 space-y-1">
        <div className="px-3 py-2">
          <p className="text-xs text-slate-500 truncate">{adminEmail}</p>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/8 transition-all"
        >
          <LogOut size={15} />
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
}
