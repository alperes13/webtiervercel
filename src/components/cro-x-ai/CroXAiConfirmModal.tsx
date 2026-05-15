'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import type { AddressMap, CroXModel } from './types';
import { PLATFORMS } from './platforms';

interface Props {
  open: boolean;
  model: CroXModel;
  addresses: AddressMap;
  submitting: boolean;
  errorMessage: string | null;
  onClose: () => void;
  onConfirm: () => void;
  onEdit: () => void;
}

export default function CroXAiConfirmModal({
  open,
  model,
  addresses,
  submitting,
  errorMessage,
  onClose,
  onConfirm,
  onEdit,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !submitting) onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, submitting, onClose]);

  const filledEntries = PLATFORMS.flatMap((p) => {
    const v = addresses[p.key];
    if (!v || !v.trim()) return [];
    return [{ key: p.key, label: p.label, value: v }];
  });

  const modelLabel = model === 'ultra' ? 'CRO-X Ultra' : 'CRO-X Mini';

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => !submitting && onClose()}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative rounded-2xl border border-blue-500/40 bg-zinc-950/95 shadow-[0_0_40px_rgba(37,99,235,0.25)] p-5 sm:p-6"
            style={{ width: 'min(440px, 95vw)' }}
          >
            <button
              type="button"
              onClick={() => !submitting && onClose()}
              disabled={submitting}
              aria-label="Kapat"
              className="absolute top-2.5 right-2.5 text-red-500 hover:text-red-400 transition disabled:opacity-50"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} />
            </button>

            <div className="border-l-2 border-emerald-500 pl-3 space-y-1.5 text-[11.5px] sm:text-[12px] text-white/90 leading-relaxed pr-7 max-h-[40vh] overflow-y-auto">
              {(() => {
                const addressLines: Array<{ label: string; value: string }> = [
                  { label: 'Web site', value: addresses.website ?? '' },
                  { label: 'Instagram', value: addresses.instagram ?? '' },
                  { label: 'Google İşletme Profili', value: addresses.google_business ?? '' },
                  { label: 'LinkedIn', value: addresses.linkedin ?? '' },
                  { label: 'Facebook', value: addresses.facebook ?? '' },
                  { label: 'TikTok', value: addresses.tiktok ?? '' },
                ];
                const filled = addressLines.filter((l) => l.value.trim().length > 0);
                return filled.map((l) => (
                  <div key={l.label} className="truncate">
                    <span className="font-bold text-white">{l.label}:</span>{' '}
                    <span className="text-white/80">{l.value}</span>
                  </div>
                ));
              })()}
            </div>

            <div className="mt-5 text-center text-[12.5px] sm:text-[13px] text-white/90 leading-relaxed">
              Analize gidecek adresleri onaylıyor musunuz?
              <br />
              {modelLabel} <u className="decoration-white/50 underline-offset-2">1 kredi hakkı</u> kullanır.
            </div>

            {errorMessage && (
              <div className="mt-3 text-center text-[12px] text-red-400 font-semibold">
                {errorMessage}
              </div>
            )}

            <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={onConfirm}
                disabled={submitting || filledEntries.length === 0}
                className="px-5 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-white transition disabled:opacity-60 inline-flex items-center justify-center gap-2"
              >
                {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                ONAYLIYORUM
              </button>
              <button
                type="button"
                onClick={onEdit}
                disabled={submitting}
                className="px-5 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-wider bg-orange-400 hover:bg-orange-300 text-zinc-900 transition disabled:opacity-60"
              >
                DÜZENLE
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
