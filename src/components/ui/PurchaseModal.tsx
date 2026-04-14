'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { createPayment } from '@/lib/api';
import { CreditCard, ShieldCheck, Zap } from 'lucide-react';

interface PurchaseModalProps {
  open: boolean;
  onClose: () => void;
}

const PACKAGES = [
  { amount: 1, price: '249 TL', label: '1 Ultra Analiz' },
  { amount: 5, price: '999 TL', label: '5 Ultra Analiz', popular: true },
  { amount: 10, price: '1.749 TL', label: '10 Ultra Analiz' },
];

export default function PurchaseModal({ open, onClose }: PurchaseModalProps) {
  const [selectedAmount, setSelectedAmount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const { session } = useAuth();
  const { t } = useLanguage();

  const handlePurchase = async () => {
    if (!session?.token) return;
    setLoading(true);
    try {
      const res = await createPayment(session.token, selectedAmount);
      if (res.iframe_url) {
        setIframeUrl(res.iframe_url);
      }
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Ödeme başlatılamadı');
    } finally {
      setLoading(false);
    }
  };

  if (iframeUrl) {
    return (
      <Modal open={open} onClose={() => { setIframeUrl(null); onClose(); }} title="Güvenli Ödeme">
        <div className="w-full aspect-[3/4] sm:aspect-square bg-white rounded-lg overflow-hidden">
          <iframe
            src={iframeUrl}
            className="w-full h-full border-none"
            title="PayTR Ödeme"
          />
        </div>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={onClose} title="Ultra Kredi Satın Al">
      <div className="space-y-6">
        <p className="text-sm text-[var(--color-text-secondary)]">
          İşletmeniz için derinlemesine Ultra Analiz raporları oluşturmak üzere kredi bakiyenizi güncelleyin.
        </p>

        <div className="grid grid-cols-1 gap-3">
          {PACKAGES.map((pkg) => (
            <button
              key={pkg.amount}
              onClick={() => setSelectedAmount(pkg.amount)}
              className={`relative flex items-center justify-between p-4 rounded-xl border transition-all ${
                selectedAmount === pkg.amount
                  ? 'border-cyan-500 bg-cyan-500/5 ring-1 ring-cyan-500'
                  : 'border-[var(--color-border)] hover:border-cyan-500/50 hover:bg-[var(--color-surface-light)]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${selectedAmount === pkg.amount ? 'bg-cyan-500 text-white' : 'bg-[var(--color-surface)] text-[var(--color-text-muted)]'}`}>
                  <Zap className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-[var(--color-text)]">{pkg.label}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{pkg.price}</p>
                </div>
              </div>
              {pkg.popular && (
                <span className="absolute -top-2 right-4 px-2 py-0.5 bg-cyan-500 text-[10px] font-bold text-white rounded-full">
                  EN POPÜLER
                </span>
              )}
              <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${selectedAmount === pkg.amount ? 'border-cyan-500 bg-cyan-500' : 'border-[var(--color-border)]'}`}>
                {selectedAmount === pkg.amount && <div className="h-2 w-2 rounded-full bg-white" />}
              </div>
            </button>
          ))}
        </div>

        <div className="space-y-4 pt-2">
          <Button size="lg" className="w-full" onClick={handlePurchase} disabled={loading}>
            {loading ? 'Yükleniyor...' : 'Ödeme Yap'}
          </Button>
          
          <div className="flex items-center justify-center gap-4 text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest font-bold">
            <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> PayTR Güvencesi</span>
            <span className="flex items-center gap-1"><CreditCard className="h-3 w-3" /> 256-bit SSL</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
