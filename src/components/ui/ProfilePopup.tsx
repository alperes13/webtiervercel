'use client';

import { useState } from 'react';
import { X, Phone, BarChart3, CreditCard, LogOut, Eye, EyeOff, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { maskPhone } from '@/lib/validators';
import { SITE_CONFIG } from '@/lib/constants';
import { getWhatsAppUrl } from '@/lib/utils';
import { Button } from './Button';

import { useLanguage } from '@/contexts/LanguageContext';
import PurchaseModal from './PurchaseModal';

interface ProfilePopupProps {
  open: boolean;
  onClose: () => void;
}

export default function ProfilePopup({ open, onClose }: ProfilePopupProps) {
  const { session, logout } = useAuth();
  const { t } = useLanguage();
  const [showPhone, setShowPhone] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);

  if (!session) return null;

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[140] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={onClose}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-sm rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-[var(--color-text)]">
                  {t.profile.title}
                </h2>
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-light)] hover:text-[var(--color-text)]"
                  aria-label={t.profile.close}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Phone */}
              <div className="mb-4 rounded-xl bg-[var(--color-surface-card)] p-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-[var(--color-text-muted)]" />
                  <div className="flex-1">
                    <p className="text-xs text-[var(--color-text-muted)]">{t.profile.phone}</p>
                    <p className="text-sm font-medium text-[var(--color-text)]">
                      {showPhone ? session.phoneRaw : maskPhone(session.phoneRaw)}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPhone(!showPhone)}
                    className="text-xs text-[var(--color-accent)] hover:underline flex items-center gap-1"
                  >
                    {showPhone ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    {showPhone ? t.profile.hide : t.profile.show}
                  </button>
                </div>
              </div>

              {/* Analysis Status */}
              <div className="mb-4 rounded-xl bg-[var(--color-surface-card)] p-4">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-4 w-4 text-[var(--color-text-muted)]" />
                  <div className="flex-1">
                    <p className="text-xs text-[var(--color-text-muted)]">{t.profile.status}</p>
                    {session.analysisStatus === 'pending' && (
                      <p className="text-sm font-medium text-[var(--color-warning)]">
                        {t.profile.statusPending}
                      </p>
                    )}
                    {session.analysisStatus === 'completed' && (
                      <p className="text-sm font-medium text-[var(--color-success)]">
                        {t.profile.statusCompleted}
                      </p>
                    )}
                    {session.analysisStatus === 'none' && (
                      <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                        {t.profile.statusNone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Credits */}
              <div className="mb-6 space-y-3">
                {/* Mini Credits */}
                <div className="rounded-xl bg-[var(--color-surface-card)] p-4">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-4 w-4 text-emerald-500/70" />
                    <div className="flex-1">
                      <p className="text-xs text-[var(--color-text-muted)]">Mini Kredi</p>
                      <p className="text-sm font-medium text-[var(--color-text)]">
                        {session.creditsMini}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ultra Credits */}
                <div className="rounded-xl bg-[var(--color-surface-card)] p-4">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-4 w-4 text-cyan-500/70" />
                    <div className="flex-1">
                      <p className="text-xs text-[var(--color-text-muted)]">Ultra Kredi</p>
                      <p className="text-sm font-medium text-[var(--color-text)]">
                        {session.creditsUltra}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs font-bold border-cyan-500/20 hover:bg-cyan-500/5 text-cyan-400"
                    onClick={() => setPurchaseOpen(true)}
                  >
                    {t.profile.creditsButton}
                  </Button>
                </div>
              </div>

              {/* Logout */}
              <Button
                variant="ghost"
                size="default"
                onClick={handleLogout}
                className="w-full text-[var(--color-error)] hover:bg-[var(--color-error)]/10"
              >
                <LogOut className="h-4 w-4" />
                {t.profile.logout}
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <PurchaseModal open={purchaseOpen} onClose={() => setPurchaseOpen(false)} />
    </>
  );
}
