'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { getNotifications } from '@/lib/api';
import { 
  LayoutDashboard, 
  FileText, 
  ListTodo, 
  CreditCard, 
  Bell, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  LifeBuoy,
  Home,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/MenuToggleIcon';

export type DashboardSection = 
  | 'overview' 
  | 'analysis' 
  | 'backlog' 
  | 'credits' 
  | 'notifications' 
  | 'settings';

interface SidebarProps {
  activeSection: DashboardSection;
  onSectionChange: (section: DashboardSection) => void;
}

export default function DashboardSidebar({ activeSection, onSectionChange }: SidebarProps) {
  const { session, logout } = useAuth();
  const { t } = useLanguage();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Poll for unread notification count every 30 seconds
  const fetchUnreadCount = useCallback(async () => {
    if (!session?.token) return;
    try {
      const res = await getNotifications(session.token);
      if (res.success) setUnreadCount(res.unreadCount);
    } catch { /* ignore */ }
  }, [session?.token]);

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30_000);
    return () => clearInterval(interval);
  }, [fetchUnreadCount]);

  // Reset badge when user opens notifications tab
  useEffect(() => {
    if (activeSection === 'notifications') setUnreadCount(0);
  }, [activeSection]);

  const MENU_ITEMS = [
    { id: 'overview' as const, label: t.dashboard.sidebar.dashboard, icon: LayoutDashboard, badge: 0 },
    { id: 'analysis' as const, label: t.dashboard.sidebar.analysis, icon: FileText, badge: 0 },
    { id: 'backlog' as const, label: t.dashboard.sidebar.backlog, icon: ListTodo, badge: 0 },
    { id: 'credits' as const, label: t.dashboard.sidebar.credits, icon: CreditCard, badge: 0 },
    { id: 'notifications' as const, label: t.dashboard.sidebar.notifications, icon: Bell, badge: unreadCount },
    { id: 'settings' as const, label: t.dashboard.sidebar.profile, icon: Settings, badge: 0 },
  ];

  if (!session) return null;

  const initials = session.firstName 
    ? (session.lastName ? `${session.firstName[0]}${session.lastName[0]}` : session.firstName[0])
    : session.email[0].toUpperCase();

  const fullName = session.firstName 
    ? (session.lastName ? `${session.firstName} ${session.lastName}` : session.firstName)
    : session.email.split('@')[0];

  // Close mobile menu on section change
  const handleSectionChange = (section: DashboardSection | 'home') => {
    if (section === 'home') {
      window.location.href = '/';
      return;
    }
    onSectionChange(section as DashboardSection);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Header / Toggle */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-[60]">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center gap-2 p-1.5 hover:bg-slate-50 transition-colors z-[130]"
          aria-label={t.dashboard.header.panel}
        >
          <MenuToggleIcon open={isMobileMenuOpen} className="h-6 w-6 text-slate-600" duration={350} />
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.1em]">{t.dashboard.header.panel}</span>
        </button>
        <Link href="/">
          <Image src="/images/logo-black.png" alt="Logo" width={100} height={30} className="h-7 w-auto object-contain" />
        </Link>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[70] lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside className={cn(
        "fixed lg:sticky top-0 left-0 h-screen z-[71] lg:z-30 bg-white border-r border-slate-200 transition-all duration-300 ease-in-out flex flex-col shadow-xl lg:shadow-none",
        isCollapsed ? "lg:w-20" : "lg:w-64",
        "w-64", // Fixed width on mobile when open
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo Section */}
        <div className={cn(
          "h-16 lg:h-20 flex items-center px-6 border-b border-slate-100 transition-all duration-300",
          isCollapsed ? "justify-center px-0" : "justify-between"
        )}>
          {!isCollapsed ? (
            <>
              <Link href="/">
                <Image src="/images/logo-black.png" alt="Logo" width={120} height={40} className="h-8 w-auto object-contain" />
              </Link>
              <button 
                onClick={() => setIsCollapsed(true)}
                className="hidden lg:flex p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsCollapsed(false)}
              className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
          
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-2 hover:bg-slate-50 rounded-lg text-slate-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-6 space-y-1 custom-scrollbar">
          {!isCollapsed && (
            <p className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              {t.dashboard.sidebar.system}
            </p>
          )}

          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            const hasBadge = item.badge > 0;
            
            return (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 rounded-lg transition-all duration-200 group relative",
                  isCollapsed ? "justify-center px-2 py-3" : "px-3 py-2.5",
                  isActive 
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                {/* Icon with badge */}
                <div className="relative shrink-0">
                  <Icon className={cn(
                    "transition-colors duration-200",
                    isCollapsed ? "h-6 w-6" : "h-5 w-5",
                    isActive ? "text-white" : "text-slate-400 group-hover:text-slate-900"
                  )} />
                  {hasBadge && (
                    <span className={cn(
                      "absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 rounded-full text-[10px] font-black flex items-center justify-center",
                      isActive ? "bg-white text-slate-900" : "bg-cyan-500 text-white"
                    )}>
                      {item.badge > 99 ? '99+' : item.badge}
                    </span>
                  )}
                </div>
                
                {!isCollapsed && (
                  <span className={cn(
                    "text-sm font-semibold transition-all duration-200 truncate flex-1",
                    isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100"
                  )}>
                    {item.label}
                  </span>
                )}

                {/* Unread badge label (expanded mode) */}
                {!isCollapsed && hasBadge && (
                  <span className={cn(
                    "text-[10px] font-black px-1.5 py-0.5 rounded-full shrink-0",
                    isActive ? "bg-white/20 text-white" : "bg-cyan-500 text-white"
                  )}>
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}

                {/* Tooltip for collapsed mode */}
                {isCollapsed && (
                  <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 text-white text-[11px] rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 whitespace-nowrap z-50 font-bold shadow-xl">
                    {item.label}
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-slate-900" />
                  </div>
                )}
              </button>
            );
          })}

          <div className="pt-2 mt-2 border-t border-slate-50">
            <button
              onClick={() => handleSectionChange('home')}
              className={cn(
                "w-full flex items-center gap-3 rounded-lg transition-all duration-200 group relative",
                isCollapsed ? "justify-center px-2 py-3" : "px-3 py-2.5",
                "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Home className={cn(
                "shrink-0 transition-colors duration-200",
                isCollapsed ? "h-6 w-6" : "h-5 w-5",
                "text-slate-400 group-hover:text-slate-900"
              )} />
              
              {!isCollapsed && (
                <span className="text-sm font-semibold transition-all duration-200 truncate opacity-80 group-hover:opacity-100">
                  {t.dashboard.sidebar.home}
                </span>
              )}

              {isCollapsed && (
                <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 text-white text-[11px] rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 whitespace-nowrap z-50 font-bold shadow-xl">
                  {t.dashboard.sidebar.home}
                  <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-slate-900" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Footer Section */}
        <div className="p-4 border-t border-slate-100 space-y-4 bg-slate-50/10">
          {/* Profile Card (Integrated like Image 2) */}
          <div className={cn(
            "flex items-center gap-3 transition-all duration-300 overflow-hidden",
            isCollapsed ? "justify-center" : "px-2"
          )}>
            <div className="h-10 w-10 shrink-0 rounded-lg bg-gradient-to-tr from-slate-100 to-slate-50 border border-slate-200 flex items-center justify-center text-xs font-black text-slate-400 shadow-sm">
              {initials}
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0 pr-1">
                <p className="text-sm font-bold text-slate-900 truncate">{fullName}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight truncate">
                  {session.emailVerified ? t.dashboard.sidebar.verifiedMember : t.dashboard.sidebar.notVerified}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <button
               onClick={() => {}} // Placeholder for support
               className={cn(
                "w-full flex items-center gap-3 rounded-lg transition-all duration-200 group relative px-3 py-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50",
                isCollapsed && "justify-center px-2"
               )}
            >
              <LifeBuoy className="h-5 w-5 shrink-0 text-slate-400 group-hover:text-slate-900" />
              {!isCollapsed && <span className="text-sm font-medium">{t.dashboard.sidebar.support}</span>}
            </button>
            
            <button
              onClick={logout}
              className={cn(
                "w-full flex items-center gap-3 rounded-lg transition-all duration-200 group relative px-3 py-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50",
                isCollapsed && "justify-center px-2"
              )}
            >
              <LogOut className="h-5 w-5 shrink-0 text-slate-400 group-hover:text-red-500" />
              {!isCollapsed && <span className="text-sm font-medium">{t.dashboard.sidebar.logout}</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}


