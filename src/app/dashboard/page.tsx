'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { HeroInput, type CROModel } from '@/components/ui/animated-ai-input';
import { isValidUrl } from '@/lib/validators';
import { createMiniAnalysis, createUltraAnalysis, forgotPassword, updateProfile } from '@/lib/api';
import { cn } from '@/lib/utils';

import DashboardSidebar, { type DashboardSection } from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import AnalysisHistory from '@/components/dashboard/AnalysisHistory';
import PurchaseModal from '@/components/ui/PurchaseModal';
import EmailVerificationModal from '@/components/ui/EmailVerificationModal';
import { Zap, Mail, Shield, ListTodo, Bell } from 'lucide-react';

export default function DashboardPage() {
  const { session, isAuthenticated, isHydrated, updateSession, logout } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const [activeSection, setActiveSection] = useState<DashboardSection>('overview');
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);

  // Analysis states for Mini
  const [miniUrl, setMiniUrl] = useState('');
  const [miniError, setMiniError] = useState('');
  const [miniLoading, setMiniLoading] = useState(false);

  // Analysis states for Ultra
  const [ultraUrl, setUltraUrl] = useState('');
  const [ultraError, setUltraError] = useState('');
  const [ultraLoading, setUltraLoading] = useState(false);

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

  const handleMiniSubmit = async () => {
    if (!miniUrl.trim()) { setMiniError('URL gerekli'); return; }
    if (!isValidUrl(miniUrl)) { setMiniError('Geçersiz URL'); return; }
    if (session.creditsMini < 1) { setMiniError('Yetersiz Mini kredi'); return; }
    
    setMiniLoading(true);
    setMiniError('');
    try {
      await createMiniAnalysis(session.token, { website_url: miniUrl });
      updateSession({ creditsMini: session.creditsMini - 1 });
      setMiniUrl('');
      alert('Mini analiz talebiniz alındı!');
      setActiveSection('history');
    } catch (e: any) {
      setMiniError(e.message);
    } finally {
      setMiniLoading(false);
    }
  };

  const handleUltraSubmit = async () => {
    if (!ultraUrl.trim()) { setUltraError('URL gerekli'); return; }
    if (!isValidUrl(ultraUrl)) { setUltraError('Geçersiz URL'); return; }
    if (session.creditsUltra < 1) { setUltraError('Yetersiz Ultra kredi. Lütfen bakiye yükleyin.'); return; }
    
    setUltraLoading(true);
    setUltraError('');
    try {
      await createUltraAnalysis(session.token, { website_url: ultraUrl });
      updateSession({ creditsUltra: session.creditsUltra - 1 });
      setUltraUrl('');
      alert('Ultra analiz talebiniz alındı! Uzmanlarımız incelemeye başlıyor.');
      setActiveSection('history');
    } catch (e: any) {
      setUltraError(e.message);
    } finally {
      setUltraLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    if (!session?.token) return;
    try {
      await updateProfile(session.token, firstName, lastName);
      updateSession({ firstName, lastName });
      alert('Profil bilgileriniz başarıyla güncellendi!');
    } catch (e) {
      alert('Profil güncellenirken bir hata oluştu.');
    }
  };

  const handlePasswordResetRequest = async () => {
    setResetLoading(true);
    setResetSuccess(false);
    try {
      await forgotPassword(session.email);
      setResetSuccess(true);
    } catch (e) {
      alert('Sıfırlama talebi sırasında bir hata oluştu.');
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
    <div className="min-h-screen bg-zinc-50 pt-16 lg:pt-0">
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
                      <p className="text-sm font-bold text-amber-900">E-posta Adresinizi Doğrulayın</p>
                      <p className="text-xs text-amber-700">Analiz alabilmek için e-posta adresinizi doğrulayın.</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="default"
                    className="text-xs bg-amber-600 hover:bg-amber-700 text-white shrink-0 border-none shadow-sm"
                    onClick={() => setVerifyModalOpen(true)}
                  >
                    Doğrulama Gönder
                  </Button>
                </div>
              </div>
            )}

            {/* 1. Overview Section */}
            {activeSection === 'overview' && (
              <div className="space-y-6">
                <DashboardHeader />
                
                {/* Compact Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Analysis Start Block */}
                  <Card className="p-5 space-y-4 border-zinc-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-slate-900 uppercase tracking-tight">CRO-X MINI</h3>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full uppercase tracking-widest">1 KREDİ</span>
                    </div>
                    <HeroInput
                      value={miniUrl}
                      onChange={setMiniUrl}
                      onSubmit={handleMiniSubmit}
                      placeholder="URL girin (Örn: example.com)"
                      selectedModel="CRO-X MINI"
                      onModelChange={() => {}}
                      inputHint=""
                      disabled={miniLoading || !session.emailVerified}
                    />
                    {miniError && <p className="text-[10px] text-red-500 font-medium">{miniError}</p>}
                  </Card>

                  <Card className="p-5 space-y-4 border-zinc-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-slate-900 uppercase tracking-tight">CRO-X ULTRA</h3>
                      <span className="text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full uppercase tracking-widest">1 KREDİ</span>
                    </div>
                    <HeroInput
                      value={ultraUrl}
                      onChange={setUltraUrl}
                      onSubmit={handleUltraSubmit}
                      placeholder="Detaylı analiz için URL girin..."
                      selectedModel="CRO-X ULTRA"
                      onModelChange={() => {}}
                      inputHint=""
                      disabled={ultraLoading || !session.emailVerified}
                    />
                    {ultraError && <p className="text-[10px] text-red-500 font-medium">{ultraError}</p>}
                  </Card>
                </div>

                <Card className="p-4 flex items-center justify-between border-cyan-100 bg-cyan-50/10">
                  <div className="flex items-center gap-4">
                    <div className="bg-cyan-100 p-2 rounded-xl">
                      <Zap className="h-5 w-5 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Ultra Analiz Paketleri</p>
                      <p className="text-xs text-slate-500 font-medium">Sitenizi uzmanlarımız incelesin, dönüşümlerinizi uçurun.</p>
                    </div>
                  </div>
                  <Button onClick={() => setActiveSection('credits')} size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-[11px] font-black px-6 uppercase tracking-wider rounded-xl">Hemen Yükle</Button>
                </Card>
              </div>
            )}

            {/* 3. Analysis Section */}
            {activeSection === 'analysis' && <AnalysisHistory />}

            {/* 4. Backlog Section */}
            {activeSection === 'backlog' && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-slate-900">Backlog</h2>
                  <p className="text-xs text-slate-500 font-medium">Planlanan ve devam eden geliştirme süreçleri.</p>
                </div>
                <Card className="p-8 border-dashed border-2 flex flex-col items-center justify-center text-center space-y-3 bg-white">
                  <div className="p-3 bg-slate-50 rounded-full">
                    <ListTodo className="h-6 w-6 text-slate-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-600">Henüz backlog öğesi bulunmuyor.</p>
                </Card>
              </div>
            )}

            {/* 5. Credits Section */}
            {activeSection === 'credits' && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-slate-900">Kredi Yükle</h2>
                  <p className="text-xs text-slate-500 font-medium">CRO-X Ultra paketleri ile profesyonel raporlar alın.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { amount: 1, price: '249 TL', label: 'BAŞLANGIÇ', desc: '1 Adet Ultra Analiz', color: 'text-slate-900' },
                    { amount: 5, price: '999 TL', label: 'POPÜLER', desc: '5 Adet Ultra Analiz', popular: true, color: 'text-cyan-600' },
                    { amount: 10, price: '1.749 TL', label: 'AVANTAJLI', desc: '10 Adet Ultra Analiz', color: 'text-purple-600' },
                  ].map((pkg) => (
                    <Card key={pkg.amount} className={cn(
                      "group p-6 flex flex-col justify-between space-y-6 relative transition-all duration-300 border-zinc-200 bg-white hover:shadow-2xl hover:-translate-y-1 overflow-hidden",
                      pkg.popular ? "ring-2 ring-cyan-500/50 border-cyan-100" : ""
                    )}>
                      {pkg.popular && (
                        <div className="absolute top-0 right-0">
                          <div className="bg-cyan-500 text-[9px] font-black text-white px-8 py-1 rotate-45 translate-x-[24px] translate-y-[8px] uppercase tracking-widest shadow-sm">
                            POPÜLER
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
                          {['Uzman İncelemesi', 'Görüntülü Rapor', 'Eylem Planı'].map((feat) => (
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
                          "w-full h-11 text-xs font-black uppercase tracking-widest rounded-xl transition-all",
                          pkg.popular 
                            ? "bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/25" 
                            : "bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200"
                        )}
                      >
                        Paketi Seç
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Notifications Section */}
            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-slate-900">Bildirimler</h2>
                  <p className="text-xs text-slate-500 font-medium">Önemli güncellemeler ve analiz sonuçları.</p>
                </div>
                <Card className="p-8 border-dashed border-2 flex flex-col items-center justify-center text-center space-y-3 bg-white">
                  <div className="p-3 bg-slate-50 rounded-full">
                    <Bell className="h-6 w-6 text-slate-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-600">Henüz bildiriminiz bulunmuyor.</p>
                </Card>
              </div>
            )}

            {/* 7. Settings Section */}
            {activeSection === 'settings' && (
              <div className="space-y-6">
                 <div className="space-y-1">
                  <h2 className="text-xl font-bold text-slate-900">Hesap Ayarları</h2>
                  <p className="text-xs text-slate-500 font-medium">Kişisel bilgilerinizi yönetin.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6 space-y-6 border-zinc-200 bg-white shadow-sm rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-600">
                        <Mail className="h-5 w-5" />
                      </div>
                      <h3 className="font-bold text-slate-900 uppercase tracking-tight">Kişisel Bilgiler</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Ad</label>
                          <input 
                            type="text" 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Adınız"
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-inter" 
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Soyad</label>
                          <input 
                            type="text" 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Soyadınız"
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-inter" 
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">E-posta</label>
                        <div className="px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-400 select-none">
                          {session.email}
                        </div>
                      </div>
                      <Button 
                        onClick={handleProfileUpdate}
                        className="w-full h-11 bg-slate-900 hover:bg-black text-[11px] font-black uppercase tracking-[0.1em] rounded-xl"
                      >
                        Kaydet
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-6 space-y-6 border-zinc-200 bg-white shadow-sm rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                        <Shield className="h-5 w-5" />
                      </div>
                      <h3 className="font-bold text-slate-900 uppercase tracking-tight">Güvenlik</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        Hesap güvenliğiniz için periyodik olarak şifrenizi güncellemenizi öneririz. Şifre değişikliği için sıfırlama bağlantısı talep edebilirsiniz.
                      </p>
                      <div className="pt-2">
                        <Button 
                          onClick={handlePasswordResetRequest}
                          disabled={resetLoading || resetSuccess}
                          className={cn(
                            "w-full h-11 text-[11px] font-black uppercase tracking-[0.1em] rounded-xl transition-all",
                            resetSuccess 
                              ? "bg-emerald-500 hover:bg-emerald-600 text-white" 
                              : "bg-slate-900 hover:bg-black text-white"
                          )}
                        >
                          {resetLoading ? 'Gönderiliyor...' : resetSuccess ? 'Sıfırlama Maili Gönderildi' : 'Şifre Sıfırlama Talep Et'}
                        </Button>
                        {resetSuccess && (
                          <p className="mt-3 text-[10px] text-emerald-600 font-bold text-center">
                            Lütfen e-posta kutunuzu kontrol edin.
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="flex items-center justify-between p-6 bg-red-50/30 border border-red-100 rounded-2xl">
                  <div>
                    <h4 className="text-sm font-bold text-red-900 uppercase tracking-tight">Oturumu Kapat</h4>
                    <p className="text-xs text-red-700/70 font-medium">Hesabınızdan güvenli bir şekilde çıkış yapın.</p>
                  </div>
                  <Button onClick={logout} variant="outline" className="h-10 px-6 border-red-200 text-red-600 hover:bg-red-50 font-black text-[11px] uppercase tracking-wider rounded-xl">Çıkış Yap</Button>
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
