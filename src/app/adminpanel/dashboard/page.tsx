'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar, { type AdminSection } from '@/components/admin/AdminSidebar';
import AnalysisTable from '@/components/admin/AnalysisTable';
import UserSearch from '@/components/admin/UserSearch';
import SettingsPanel from '@/components/admin/SettingsPanel';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<AdminSection>('analyses');
  const [adminEmail, setAdminEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/auth/verify', { credentials: 'include' })
      .then(r => r.json())
      .then(data => {
        if (!data.success) { router.replace('/adminpanel'); return; }
        setAdminEmail(data.admin.email);
      })
      .catch(() => router.replace('/adminpanel'))
      .finally(() => setLoading(false));
  }, [router]);

  async function handleLogout() {
    await fetch('/api/admin/auth/logout', { method: 'POST', credentials: 'include' });
    router.replace('/adminpanel');
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-slate-700 border-t-slate-300 rounded-full animate-spin" />
      </div>
    );
  }

  const SECTION_TITLES: Record<AdminSection, string> = {
    analyses: 'Analiz Siparişleri',
    users: 'Kullanıcı Yönetimi',
    settings: 'Ayarlar',
  };

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      <AdminSidebar
        active={activeSection}
        onChange={setActiveSection}
        adminEmail={adminEmail}
        onLogout={handleLogout}
      />

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="px-6 py-4 border-b border-slate-800/60 flex-shrink-0">
          <h1 className="text-base font-semibold text-white">{SECTION_TITLES[activeSection]}</h1>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeSection === 'analyses' && <AnalysisTable />}
          {activeSection === 'users' && <UserSearch />}
          {activeSection === 'settings' && <SettingsPanel />}
        </div>
      </main>
    </div>
  );
}
