'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import CroXAiTrigger from '@/components/cro-x-ai/CroXAiTrigger';
import { forgotPassword, updateProfile } from '@/lib/api';
import { cn } from '@/lib/utils';

import DashboardSidebar, { type DashboardSection } from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import AnalysisHistory from '@/components/dashboard/AnalysisHistory';
import BacklogTasks from '@/components/dashboard/BacklogTasks';
import UserDocuments from '@/components/dashboard/UserDocuments';
import Notifications from '@/components/dashboard/Notifications';
import PurchaseModal from '@/components/ui/PurchaseModal';
import EmailVerificationModal from '@/components/ui/EmailVerificationModal';
import { Zap, Mail, Shield } from 'lucide-react';

export default function DashboardPage() {
  const { session, isAuthenticated, isHydrated, updateSession, logout } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const [activeSection, setActiveSection] = useState<DashboardSection>('overview');
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);

  // Profile states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Sync profile fields when session hydrates
  useEffect(() => {
    if (session) {
      setFirstName(session.firstName || '');
      setLastName(session.lastName || '');
    }
  }, [session]);

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [isHydrated, isAuthenticated, router]);

  if (!isHydrated || !isAuthenticated || !session) {
    return (
      <main className="mx-auto min-h-[70vh] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
      </main>
    );
  }

  const handleProfileUpdate = async () => {
    if (!session?.token) return;
    try {
      await updateProfile(session.token, firstName, lastName);
      updateSession({ firstName, lastName });
      alert(t.dashboard.settings.updateSuccess);
    } catch {
      alert(t.dashboard.settings.updateError);
    }
  };

  const handlePasswordResetRequest = async () => {
    setResetLoading(true);
    setResetSuccess(false);
    try {
      await forgotPassword(session.email);
      setResetSuccess(true);
    } catch {
      alert(t.dashboard.settings.resetError);
    } finally {
      setResetLoading(false);
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 bg-slate-200 rounded-full" />
          <div className="h-4 w-32 bg-slate-200 rounded" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !session) {
    return null;
  }

  return (
    <div className="min-h-[100dvh] lg:min-h-screen bg-zinc-50 pt-16 lg:pt-0">
      <div className="flex w-full">
        {/* Sidebar */}
        <DashboardSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Email Verification Banner */}
            {!session.emailVerified && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <Shield className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-amber-900">{t.dashboard.verification.bannerTitle}</p>
                      <p className="text-xs text-amber-700">{t.dashboard.verification.bannerDesc}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="default"
                    className="text-xs bg-amber-600 hover:bg-amber-700 text-white shrink-0 border-none shadow-sm"
                    onClick={() => setVerifyModalOpen(true)}
                  >
                    {t.dashboard.verification.bannerButton}
                  </Button>
                </div>
              </div>
            )}

            {/* 1. Overview Section */}
            {activeSection === 'overview' && (
              <div className="space-y-6">
                <DashboardHeader />
                
                {/* Single CRO-X AI input — opens animated chat overlay */}
                <Card className="p-5 space-y-4 border-zinc-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-slate-900 uppercase tracking-tight">CRO-X AI</h3>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full uppercase tracking-widest">
                      {t.dashboard.overview.miniCredit}
                    </span>
                  </div>
                  <CroXAiTrigger
                    defaultModel="mini"
                    placeholder={t.dashboard.overview.placeholderMini}
                    className="dashboard-crox"
                  />
                  {!session.emailVerified && (
                    <p className="text-[10px] text-amber-600 font-semibold">
                      {t.dashboard.verification.bannerDesc}
                    </p>
                  )}
                </Card>

                <Card className="p-4 flex items-center justify-between border-cyan-100 bg-cyan-50/10">
                  <div className="flex items-center gap-4">
                    <div className="bg-cyan-100 p-2 rounded-lg">
                      <Zap className="h-5 w-5 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{t.dashboard.overview.ultraBannerTitle}</p>
                      <p className="text-xs text-slate-500 font-medium">{t.dashboard.overview.ultraBannerDesc}</p>
                    </div>
                  </div>
                  <Button onClick={() => setActiveSection('credits')} size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-[11px] font-black px-6 uppercase tracking-wider rounded-lg">{t.dashboard.overview.ultraBannerButton}</Button>
                </Card>
              </div>
            )}

            {/* 3. Analysis Section */}
            {activeSection === 'analysis' && (
              <div className="space-y-4">
                <AnalysisHistory />
                <UserDocuments token={session.token} />
              </div>
            )}

            {/* 4. Backlog Section */}
            {activeSection === 'backlog' && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-slate-900">{t.dashboard.backlog.title}</h2>
                  <p className="text-xs text-slate-500 font-medium">{t.dashboard.backlog.subtitle}</p>
                </div>
                <BacklogTasks token={session.token} />
              </div>
            )}

            {/* 5. Credits Section */}
            {activeSection === 'credits' && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-slate-900">{t.dashboard.credits.title}</h2>
                  <p className="text-xs text-slate-500 font-medium">{t.dashboard.credits.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { amount: 1, price: '249 TL', label: t.dashboard.credits.starter, desc: t.dashboard.credits.packageDescription.replace('{count}', '1'), color: 'text-slate-900' },
                    { amount: 5, price: '999 TL', label: t.dashboard.credits.popular, desc: t.dashboard.credits.packageDescription.replace('{count}', '5'), popular: true, color: 'text-cyan-600' },
                    { amount: 10, price: '1.749 TL', label: t.dashboard.credits.advantage, desc: t.dashboard.credits.packageDescription.replace('{count}', '10'), color: 'text-purple-600' },
                  ].map((pkg) => (
                    <Card key={pkg.amount} className={cn(
                      "group p-6 flex flex-col justify-between space-y-6 relative transition-all duration-300 border-zinc-200 bg-white hover:shadow-2xl hover:-translate-y-1 overflow-hidden",
                      pkg.popular ? "ring-2 ring-cyan-500/50 border-cyan-100" : ""
                    )}>
                      {pkg.popular && (
                        <div className="absolute top-0 right-0">
                          <div className="bg-cyan-500 text-[9px] font-black text-white px-8 py-1 rotate-45 translate-x-[24px] translate-y-[8px] uppercase tracking-widest shadow-sm">
                            {t.dashboard.credits.popular}
                          </div>
                        </div>
                      )}
                      
                      <div className="space-y-4">
                        <div className={cn("text-[10px] font-black uppercase tracking-[0.2em]", pkg.color)}>
                          {pkg.label}
                        </div>
                        <div className="space-y-1">
                          <p className="text-3xl font-black text-slate-900 tracking-tight">{pkg.price}</p>
                          <p className="text-xs text-slate-500 font-medium">{pkg.desc}</p>
                        </div>
                        
                        <ul className="space-y-2 pt-2">
                          {t.dashboard.credits.features.map((feat) => (
                            <li key={feat} className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                              <Shield className="h-3 w-3 text-emerald-500" />
                              {feat}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button 
                        onClick={() => setPurchaseModalOpen(true)} 
                        className={cn(
                          "w-full h-11 text-xs font-black uppercase tracking-widest rounded-lg transition-all",
                          pkg.popular 
                            ? "bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/25" 
                            : "bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200"
                        )}
                      >
                        {t.dashboard.credits.selectButton}
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Notifications Section */}
            {activeSection === 'notifications' && (
              <Notifications token={session.token} />
            )}

            {/* 7. Settings Section */}
            {activeSection === 'settings' && (
              <div className="space-y-6">
                 <div className="space-y-1">
                  <h2 className="text-xl font-bold text-slate-900">{t.dashboard.settings.title}</h2>
                  <p className="text-xs text-slate-500 font-medium">{t.dashboard.settings.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6 space-y-6 border-zinc-200 bg-white shadow-sm rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-cyan-50 text-cyan-600">
                        <Mail className="h-5 w-5" />
                      </div>
                      <h3 className="font-bold text-slate-900 uppercase tracking-tight">{t.dashboard.settings.personalInfo}</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">{t.dashboard.settings.firstName}</label>
                          <input 
                            type="text" 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder={t.dashboard.settings.firstName}
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-inter" 
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">{t.dashboard.settings.lastName}</label>
                          <input 
                            type="text" 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder={t.dashboard.settings.lastName}
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-inter" 
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">{t.dashboard.settings.email}</label>
                        <div className="px-4 py-3 bg-slate-50 border border-slate-100 rounded-lg text-sm font-bold text-slate-400 select-none">
                          {session.email}
                        </div>
                      </div>
                      <Button 
                        onClick={handleProfileUpdate}
                        className="w-full h-11 bg-slate-900 hover:bg-black text-[11px] font-black uppercase tracking-[0.1em] rounded-lg"
                      >
                        {t.dashboard.settings.saveButton}
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-6 space-y-6 border-zinc-200 bg-white shadow-sm rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-purple-50 text-purple-600">
                        <Shield className="h-5 w-5" />
                      </div>
                      <h3 className="font-bold text-slate-900 uppercase tracking-tight">{t.dashboard.settings.security}</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        {t.dashboard.settings.securityDesc}
                      </p>
                      <div className="pt-2">
                        <Button 
                          onClick={handlePasswordResetRequest}
                          disabled={resetLoading || resetSuccess}
                          className={cn(
                            "w-full h-11 text-[11px] font-black uppercase tracking-[0.1em] rounded-lg transition-all",
                            resetSuccess 
                              ? "bg-emerald-500 hover:bg-emerald-600 text-white" 
                              : "bg-slate-900 hover:bg-black text-white"
                          )}
                        >
                          {resetLoading ? t.emailVerification.resending : resetSuccess ? t.dashboard.settings.resetRequested : t.dashboard.settings.resetPasswordButton}
                        </Button>
                        {resetSuccess && (
                          <p className="mt-3 text-[10px] text-emerald-600 font-bold text-center">
                            {t.dashboard.settings.resetCheckEmail}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="flex items-center justify-between p-6 bg-red-50/30 border border-red-100 rounded-lg">
                  <div>
                    <h4 className="text-sm font-bold text-red-900 uppercase tracking-tight">{t.dashboard.settings.logoutTitle}</h4>
                    <p className="text-xs text-red-700/70 font-medium">{t.dashboard.settings.logoutDesc}</p>
                  </div>
                  <Button onClick={logout} variant="outline" className="h-10 px-6 border-red-200 text-red-600 hover:bg-red-50 font-black text-[11px] uppercase tracking-wider rounded-lg">{t.dashboard.settings.logoutButton}</Button>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

      <PurchaseModal open={purchaseModalOpen} onClose={() => setPurchaseModalOpen(false)} />
      <EmailVerificationModal
        open={verifyModalOpen}
        email={session.email}
        token={session.token}
        onVerified={() => updateSession({ emailVerified: true })}
        onClose={() => setVerifyModalOpen(false)}
      />
    </div>
  );
}
