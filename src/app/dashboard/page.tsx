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
    <div className="min-h-screen bg-[var(--color-background)] pt-20">
      <div className="mx-auto max-w-7xl flex">
        {/* Sidebar */}
        <DashboardSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-10">
          <div className="max-w-5xl mx-auto space-y-12">
            
            {/* 1. Overview Section */}
            {activeSection === 'overview' && (
              <>
                <DashboardHeader />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <Card className="p-6 space-y-4">
                    <h3 className="font-bold text-lg">Hızlı Analiz</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">Sitenizin dönüşüm potansiyelini saniyeler içinde ölçün.</p>
                    <Button onClick={() => setActiveSection('start-analysis')} variant="default">Analiz Başlat</Button>
                  </Card>
                  <Card className="p-6 space-y-4 bg-cyan-500/5 border-cyan-500/20">
                    <h3 className="font-bold text-lg text-cyan-500">Kredi Yükle</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">Ultra analizler için hesabınıza kredi tanımlayın.</p>
                    <Button onClick={() => setActiveSection('credits')} className="bg-cyan-500 hover:bg-cyan-600">Bakiyeni Artır</Button>
                  </Card>
                </div>
              </>
            )}

            {/* 2. Start Analysis Section */}
            {activeSection === 'start-analysis' && (
              <div className="space-y-10">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Analiz Başlat</h2>
                  <p className="text-[var(--color-text-secondary)]">Hangi analiz modelini kullanmak istersiniz?</p>
                </div>

                {/* Mini Analysis Block */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-[var(--color-text-muted)]" />
                    <h3 className="font-bold uppercase tracking-wider text-xs text-[var(--color-text-muted)]">CRO-X MINI</h3>
                  </div>
                  <HeroInput
                    value={miniUrl}
                    onChange={setMiniUrl}
                    onSubmit={handleMiniSubmit}
                    placeholder="Mini analiz için URL girin..."
                    selectedModel="CRO-X MINI"
                    onModelChange={() => {}}
                    disabled={miniLoading}
                  />
                  {miniError && <p className="text-xs text-red-500">{miniError}</p>}
                </div>

                {/* Ultra Analysis Block */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-cyan-500" />
                    <h3 className="font-bold uppercase tracking-wider text-xs text-cyan-500">CRO-X ULTRA</h3>
                  </div>
                  <HeroInput
                    value={ultraUrl}
                    onChange={setUltraUrl}
                    onSubmit={handleUltraSubmit}
                    placeholder="Ultra analiz için URL girin..."
                    selectedModel="CRO-X ULTRA"
                    onModelChange={() => {}}
                    disabled={ultraLoading}
                  />
                  {ultraError && <p className="text-xs text-red-500">{ultraError}</p>}
                </div>
              </div>
            )}

            {/* 3. History Section */}
            {activeSection === 'history' && <AnalysisHistory />}

            {/* 4. Credits Section */}
            {activeSection === 'credits' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Kredi Yükle</h2>
                  <p className="text-[var(--color-text-secondary)]">CRO-X Ultra paketleri ile profesyonel raporlar alın.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { amount: 1, price: '249 TL', label: '1 Ultra Analiz' },
                    { amount: 5, price: '999 TL', label: '5 Ultra Analiz', popular: true },
                    { amount: 10, price: '1.749 TL', label: '10 Ultra Analiz' },
                  ].map((pkg) => (
                    <Card key={pkg.amount} className={`p-6 flex flex-col justify-between space-y-6 relative transition-all hover:scale-[1.02] ${pkg.popular ? 'border-cyan-500 bg-cyan-500/5' : ''}`}>
                      {pkg.popular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-cyan-500 text-[10px] font-bold text-white rounded-full">EN POPÜLER</span>
                      )}
                      <div className="space-y-2">
                        <h4 className="text-lg font-bold">{pkg.label}</h4>
                        <p className="text-3xl font-black text-white">{pkg.price}</p>
                      </div>
                      <Button 
                        onClick={() => setPurchaseModalOpen(true)} 
                        variant={pkg.popular ? "default" : "outline"}
                        className={pkg.popular ? "bg-cyan-500 hover:bg-cyan-600" : ""}
                      >
                        Satın Al
                      </Button>
                    </Card>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-8 py-8 opacity-50">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><ShieldCheck className="h-4 w-4" /> Güvenli Ödeme</div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><Zap className="h-4 w-4 text-cyan-500" /> Anında Teslimat</div>
                </div>
              </div>
            )}

            {/* 5. Settings Section */}
            {activeSection === 'settings' && (
              <div className="space-y-8 max-w-2xl">
                 <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Hesap Ayarları</h2>
                  <p className="text-[var(--color-text-secondary)]">Kişisel bilgilerinizi ve tercihlerinizi yönetin.</p>
                </div>
                
                <Card className="divide-y divide-[var(--color-border)]">
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-[var(--color-surface-light)]"><Mail className="h-5 w-5" /></div>
                      <div>
                        <p className="text-sm font-medium text-[var(--color-text-secondary)]">E-posta</p>
                        <p className="text-base font-bold">{session.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-[var(--color-surface-light)]"><User className="h-5 w-5" /></div>
                      <div>
                        <p className="text-sm font-medium text-[var(--color-text-secondary)]">Kayıt Tarihi</p>
                        <p className="text-base font-bold">{new Date(session.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-[var(--color-surface-light)]"><Shield className="h-5 w-5" /></div>
                      <div>
                        <p className="text-sm font-medium text-[var(--color-text-secondary)]">Oturum Tipi</p>
                        <p className="text-base font-bold">{session.oauthProvider ? (session.oauthProvider.charAt(0).toUpperCase() + session.oauthProvider.slice(1)) : 'Standart (Email)'}</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="pt-4">
                  <Button onClick={logout} className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20" variant="outline">Oturumu Kapat</Button>
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
