'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { HeroInput, type CROModel } from '@/components/ui/animated-ai-input';
import { isValidUrl } from '@/lib/validators';
import { createMiniAnalysis, createUltraAnalysis } from '@/lib/api';

import DashboardSidebar, { type DashboardSection } from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import AnalysisHistory from '@/components/dashboard/AnalysisHistory';
import PurchaseModal from '@/components/ui/PurchaseModal';
import { Zap, ShieldCheck, Mail, User, Shield } from 'lucide-react';

export default function DashboardPage() {
  const { session, isAuthenticated, isHydrated, updateSession, logout } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const [activeSection, setActiveSection] = useState<DashboardSection>('overview');
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);

  // Analysis states for Mini
  const [miniUrl, setMiniUrl] = useState('');
  const [miniError, setMiniError] = useState('');
  const [miniLoading, setMiniLoading] = useState(false);

  // Analysis states for Ultra
  const [ultraUrl, setUltraUrl] = useState('');
  const [ultraError, setUltraError] = useState('');
  const [ultraLoading, setUltraLoading] = useState(false);

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

  return (
    <div className="min-h-screen bg-zinc-50 pt-20">
      <div className="mx-auto max-w-7xl flex">
        {/* Sidebar */}
        <DashboardSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Email Verification Banner */}
            {!session.emailVerified && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <Shield className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-amber-900">E-posta Adresinizi Doğrulayın</p>
                    <p className="text-xs text-amber-700">Analiz alabilmek için e-posta adresinizi doğrulayın.</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="text-xs border-amber-200 hover:bg-amber-100">Doğrulama Gönder</Button>
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
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-cyan-500" />
                        <h3 className="font-bold text-sm text-slate-900 uppercase tracking-tight">Hızlı Analiz (Mini)</h3>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">1 KREDİ</span>
                    </div>
                    <HeroInput
                      value={miniUrl}
                      onChange={setMiniUrl}
                      onSubmit={handleMiniSubmit}
                      placeholder="URL girin (Örn: example.com)"
                      selectedModel="CRO-X MINI"
                      onModelChange={() => {}}
                      disabled={miniLoading || !session.emailVerified}
                    />
                    {miniError && <p className="text-[10px] text-red-500 font-medium">{miniError}</p>}
                  </Card>

                  <Card className="p-5 space-y-4 border-zinc-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-amber-500" />
                        <h3 className="font-bold text-sm text-slate-900 uppercase tracking-tight">Uzman Analizi (Ultra)</h3>
                      </div>
                      <span className="text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">1 KREDİ</span>
                    </div>
                    <HeroInput
                      value={ultraUrl}
                      onChange={setUltraUrl}
                      onSubmit={handleUltraSubmit}
                      placeholder="Detaylı analiz için URL girin..."
                      selectedModel="CRO-X ULTRA"
                      onModelChange={() => {}}
                      disabled={ultraLoading || !session.emailVerified}
                    />
                    {ultraError && <p className="text-[10px] text-red-500 font-medium">{ultraError}</p>}
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4 space-y-2 border-zinc-100 bg-zinc-50/50">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tanımlı Krediler</p>
                    <div className="flex gap-4">
                      <div>
                        <p className="text-2xl font-black text-slate-900">{session.creditsMini}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">MİNİ</p>
                      </div>
                      <div className="w-px h-8 bg-zinc-200 mt-2" />
                      <div>
                        <p className="text-2xl font-black text-slate-900">{session.creditsUltra}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">ULTRA</p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 flex items-center justify-between border-cyan-100 bg-cyan-50/30">
                    <div>
                      <p className="text-xs font-bold text-cyan-700 uppercase tracking-wider">Kredi Paketleri</p>
                      <p className="text-xs text-cyan-600">Ultra analizler için bakiye yükleyin.</p>
                    </div>
                    <Button onClick={() => setActiveSection('credits')} size="sm" className="bg-cyan-500 hover:bg-cyan-600 text-xs px-4">Kredi Yükle</Button>
                  </Card>
                </div>
              </div>
            )}

            {/* 3. History Section */}
            {activeSection === 'history' && <AnalysisHistory />}

            {/* 4. Credits Section */}
            {activeSection === 'credits' && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-slate-900">Kredi Yükle</h2>
                  <p className="text-xs text-slate-500 font-medium">CRO-X Ultra paketleri ile profesyonel raporlar alın.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { amount: 1, price: '249 TL', label: '1 Analiz' },
                    { amount: 5, price: '999 TL', label: '5 Analiz', popular: true },
                    { amount: 10, price: '1.749 TL', label: '10 Analiz' },
                  ].map((pkg) => (
                    <Card key={pkg.amount} className={`p-5 flex flex-col justify-between space-y-4 relative transition-all border-zinc-200 bg-white ${pkg.popular ? 'ring-2 ring-cyan-500 border-transparent' : ''}`}>
                      {pkg.popular && (
                        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-cyan-500 text-[9px] font-black text-white rounded-full">POPÜLER</span>
                      )}
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-slate-900">{pkg.label}</h4>
                        <p className="text-2xl font-black text-slate-900">{pkg.price}</p>
                      </div>
                      <Button 
                        onClick={() => setPurchaseModalOpen(true)} 
                        variant={pkg.popular ? "default" : "outline"}
                        className={cn("text-xs h-8", pkg.popular ? "bg-cyan-500 hover:bg-cyan-600" : "border-zinc-200")}
                      >
                        Satın Al
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Settings Section */}
            {activeSection === 'settings' && (
              <div className="space-y-6 max-w-2xl">
                 <div className="space-y-1">
                  <h2 className="text-xl font-bold text-slate-900">Hesap Ayarları</h2>
                  <p className="text-xs text-slate-500 font-medium">Kişisel bilgilerinizi yönetin.</p>
                </div>
                
                <Card className="divide-y divide-zinc-100 border-zinc-200 bg-white overflow-hidden shadow-sm">
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-50"><Mail className="h-4 w-4 text-slate-500" /></div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">E-posta</p>
                        <p className="text-sm font-bold text-slate-900">{session.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-50"><Shield className={cn("h-4 w-4", session.emailVerified ? "text-green-500" : "text-amber-500")} /></div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Doğrulama Durumu</p>
                        <p className={cn("text-sm font-bold", session.emailVerified ? "text-green-600" : "text-amber-600")}>
                          {session.emailVerified ? 'Doğrulanmış' : 'Doğrulanmadı'}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="pt-2">
                  <Button onClick={logout} className="h-9 px-4 text-xs font-bold text-red-500 hover:bg-red-50 border-red-100" variant="outline">Oturumu Kapat</Button>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

      <PurchaseModal open={purchaseModalOpen} onClose={() => setPurchaseModalOpen(false)} />
    </div>
  );
}
