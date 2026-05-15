'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowLeftRight, ChevronDown, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { PLATFORMS, formatBubble, getPlatform } from './platforms';
import type { AddressMap, ChatMessage, CroXModel, PlatformKey, SubmitPayload } from './types';
import PlatformPill from './PlatformPill';
import ChatBubble from './ChatBubble';
import CroXAiConfirmModal from './CroXAiConfirmModal';

interface Props {
  open: boolean;
  onClose: () => void;
  defaultModel?: CroXModel;
}

const MODEL_OPTIONS: Array<{ value: CroXModel; label: string }> = [
  { value: 'mini', label: 'CRO-X MINI' },
  { value: 'ultra', label: 'CRO-X ULTRA' },
];

function modelLabel(m: CroXModel): string {
  return MODEL_OPTIONS.find((o) => o.value === m)?.label ?? 'CRO-X MINI';
}

export default function CroXAiOverlay({ open, onClose, defaultModel = 'mini' }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, session, updateSession } = useAuth();

  const [model, setModel] = useState<CroXModel>(defaultModel);
  const [addresses, setAddresses] = useState<AddressMap>({});
  const [activePlatform, setActivePlatform] = useState<PlatformKey | null>(null);
  const [draftValue, setDraftValue] = useState('');
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Reset state on open and seed bot messages
  useEffect(() => {
    if (!open) return;
    setModel(defaultModel);
    setAddresses({});
    setActivePlatform(null);
    setDraftValue('');
    setConfirmOpen(false);
    setSubmitError(null);
    setSubmitting(false);

    const seeded: ChatMessage[] = [];
    if (!isAuthenticated) {
      seeded.push({
        id: `bot-login-${Date.now()}`,
        kind: 'bot',
        text: 'Analiz almadan önce giriş yapman gerektiğini unutma.',
        inlineLoginLink: true,
      });
    }
    seeded.push({
      id: `bot-intro-${Date.now()}`,
      kind: 'bot',
      text: 'Herhangi bir dijital adresini gir. Ne kadar adres yazarsan o kadar iyi.',
    });
    setChatLog(seeded);
  }, [open, isAuthenticated, defaultModel]);

  // Body scroll lock
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // ESC closes (unless modal open or submitting)
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !confirmOpen && !submitting) {
        onClose();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, confirmOpen, submitting, onClose]);

  // Auto-scroll chat to bottom on new message
  useEffect(() => {
    const el = chatScrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [chatLog]);

  // Focus input when active platform changes
  useEffect(() => {
    if (activePlatform && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activePlatform]);

  const filledCount = useMemo(
    () => Object.values(addresses).filter((v) => v && v.trim().length > 0).length,
    [addresses],
  );

  const placeholder = activePlatform
    ? getPlatform(activePlatform).inputLabel
    : 'Dijital adres seçiniz:';

  const placeholderColor = activePlatform ? 'text-blue-400' : 'text-white/45';

  const ekleEnabled = !!activePlatform && draftValue.trim().length > 0;

  function handlePlatformClick(key: PlatformKey) {
    setActivePlatform(key);
    setDraftValue(addresses[key] ?? '');
  }

  function handleAddAddress() {
    if (!activePlatform || !draftValue.trim()) return;
    const value = draftValue.trim();
    const platform = activePlatform;
    setAddresses((prev) => ({ ...prev, [platform]: value }));
    setChatLog((prev) => [
      ...prev,
      {
        id: `addr-${platform}-${Date.now()}`,
        kind: 'address',
        platform,
        text: formatBubble(platform, value),
      },
    ]);
    setActivePlatform(null);
    setDraftValue('');
  }

  function handleClear() {
    setAddresses({});
    setActivePlatform(null);
    setDraftValue('');
    setChatLog((prev) => prev.filter((m) => m.kind !== 'address' && m.kind !== 'success'));
  }

  function handleAnalyzeClick() {
    if (filledCount === 0) return;
    setSubmitError(null);
    setConfirmOpen(true);
  }

  async function handleConfirm() {
    if (!isAuthenticated || !session) {
      setConfirmOpen(false);
      const redirect = encodeURIComponent(pathname || '/');
      router.push(`/auth/login?redirect=${redirect}`);
      return;
    }

    // Pre-flight credit check (UX only — server is source of truth)
    const balance = model === 'ultra' ? session.creditsUltra : session.creditsMini;
    if (balance < 1) {
      setSubmitError(
        model === 'ultra'
          ? 'Yetersiz Ultra kredi. Kredi yüklemek için tıklayın.'
          : 'Yetersiz Mini kredi. Kredi yüklemek için tıklayın.',
      );
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const payload: SubmitPayload = {
      type: model,
      addresses: {
        website: addresses.website || 'empty',
        instagram: addresses.instagram || 'empty',
        google_business: addresses.google_business || 'empty',
        linkedin: addresses.linkedin || 'empty',
        facebook: addresses.facebook || 'empty',
        tiktok: addresses.tiktok || 'empty',
      },
    };

    try {
      const res = await fetch('/api/analysis/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: boolean; error?: string };

      if (!res.ok || !data.success) {
        if (res.status === 402) {
          setSubmitError(data.error ?? 'Yetersiz kredi.');
        } else if (res.status === 401) {
          setConfirmOpen(false);
          router.push('/auth/login');
        } else {
          setSubmitError(data.error ?? 'Analiz oluşturulamadı.');
        }
        return;
      }

      // Success: update session credits, append success bubble, reset
      if (model === 'ultra') {
        updateSession({ creditsUltra: Math.max(0, session.creditsUltra - 1), analysisStatus: 'pending' });
      } else {
        updateSession({ creditsMini: Math.max(0, session.creditsMini - 1), analysisStatus: 'pending' });
      }

      setConfirmOpen(false);
      setAddresses({});
      setActivePlatform(null);
      setDraftValue('');
      setChatLog((prev) => [
        ...prev.filter((m) => m.kind !== 'success'),
        {
          id: `success-${Date.now()}`,
          kind: 'success',
          text:
            'Tamamlanan raporunuz "Profil > Analizler & Dökümanlar" altına tanımlanır yada E-Mail adresinize iletilir. Analizin hazırlanması server yoğunluğuna göre 0-2 saat arasında değişebilir. CRO-X AI kullandığınız için teşekkür ederiz.',
        },
      ]);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Beklenmeyen hata.');
    } finally {
      setSubmitting(false);
    }
  }

  const loginHref = `/auth/login?redirect=${encodeURIComponent(pathname || '/')}`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[130] bg-black"
          aria-modal="true"
          role="dialog"
        >
          {/* Top bar with back button + title */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <button
              type="button"
              onClick={onClose}
              aria-label="Geri"
              className="pointer-events-auto h-10 w-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition shadow-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="text-white text-sm font-semibold tracking-wide pointer-events-auto">
              CRO-X AI
            </div>
            <div className="w-10" />
          </div>

          <div className="h-full w-full flex flex-col pt-20 pb-6 px-4 sm:px-6">
            {/* Chat area */}
            <div
              ref={chatScrollRef}
              className="flex-1 overflow-y-auto space-y-3 pb-4 max-w-3xl w-full mx-auto"
            >
              {chatLog.length === 0 && (
                <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
                  <h1 className="text-white text-3xl sm:text-4xl font-bold">CRO-X AI</h1>
                  <p className="text-white/60 text-sm mt-2">Limitlerine dokun.</p>
                </div>
              )}
              {chatLog.map((m) => (
                <ChatBubble key={m.id} msg={m} loginHref={loginHref} />
              ))}
            </div>

            {/* Bottom action area */}
            <div className="max-w-3xl w-full mx-auto pt-3 border-t border-white/10 space-y-4">
              {/* TEMIZLE / ANALIZE GONDER row (only when at least 1 address) */}
              {filledCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-end gap-3"
                >
                  <button
                    type="button"
                    onClick={handleClear}
                    disabled={submitting}
                    className="px-5 py-2 rounded-full text-[12px] font-bold uppercase tracking-wider bg-white text-rose-600 border border-white hover:bg-zinc-100 transition disabled:opacity-50"
                  >
                    TEMİZLE
                  </button>
                  <button
                    type="button"
                    onClick={handleAnalyzeClick}
                    disabled={submitting}
                    className="px-5 py-2 rounded-full text-[12px] font-bold uppercase tracking-wider bg-white text-rose-700 border border-rose-700 hover:bg-rose-50 transition inline-flex items-center gap-2 disabled:opacity-50"
                  >
                    ANALİZE GÖNDER
                    <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-rose-900 text-white">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                </motion.div>
              )}

              {/* Platform pills */}
              <div className="flex gap-3 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible">
                {PLATFORMS.map((p) => (
                  <PlatformPill
                    key={p.key}
                    platform={p}
                    isActive={activePlatform === p.key}
                    hasValue={!!(addresses[p.key] && addresses[p.key]!.trim())}
                    onClick={() => handlePlatformClick(p.key)}
                  />
                ))}
              </div>

              {/* Address input bar */}
              <div className="rounded-2xl border border-white/15 bg-zinc-950/60 backdrop-blur-md overflow-hidden">
                <div className="px-5 pt-4 pb-2">
                  <div className="flex items-center gap-3">
                    <span className={cn('text-[13px] font-semibold whitespace-nowrap', placeholderColor)}>
                      {placeholder}
                    </span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={draftValue}
                      onChange={(e) => setDraftValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && ekleEnabled) {
                          e.preventDefault();
                          handleAddAddress();
                        }
                      }}
                      disabled={!activePlatform}
                      placeholder=""
                      className={cn(
                        'flex-1 bg-transparent outline-none text-white text-[13px] font-medium',
                        'placeholder:text-white/30',
                      )}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between px-3 pb-3 pt-1">
                  {/* Model selector */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="flex items-center gap-1.5 h-8 pl-2 pr-2.5 text-[10.5px] font-bold uppercase tracking-wider rounded-full text-white/70 hover:text-white hover:bg-white/5 transition"
                      >
                        <ArrowLeftRight className="w-3 h-3 opacity-60" />
                        <span>{modelLabel(model)}</span>
                        <ChevronDown className="w-3 h-3 opacity-60" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      className="min-w-[10rem] z-[150] border-white/10 bg-zinc-950/95 backdrop-blur-xl text-white"
                    >
                      {MODEL_OPTIONS.map((opt) => (
                        <DropdownMenuItem
                          key={opt.value}
                          onSelect={() => setModel(opt.value)}
                          className="flex items-center justify-between gap-2 cursor-pointer text-white/70 hover:text-white focus:text-white focus:bg-white/5"
                        >
                          <span className="text-[10.5px] font-bold tracking-wider uppercase">{opt.label}</span>
                          {model === opt.value && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* EKLE button */}
                  <button
                    type="button"
                    onClick={handleAddAddress}
                    disabled={!ekleEnabled}
                    className={cn(
                      'inline-flex items-center gap-2 pl-4 pr-2 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition',
                      ekleEnabled
                        ? 'bg-white text-zinc-900 hover:bg-zinc-100'
                        : 'bg-white/20 text-white/50 cursor-not-allowed',
                    )}
                  >
                    EKLE
                    <span
                      className={cn(
                        'inline-flex items-center justify-center h-6 w-6 rounded-full',
                        ekleEnabled ? 'bg-zinc-900 text-white' : 'bg-white/30 text-white/70',
                      )}
                    >
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <CroXAiConfirmModal
            open={confirmOpen}
            model={model}
            addresses={addresses}
            submitting={submitting}
            errorMessage={submitError}
            onClose={() => {
              if (!submitting) {
                setConfirmOpen(false);
                setSubmitError(null);
              }
            }}
            onConfirm={handleConfirm}
            onEdit={() => {
              if (!submitting) {
                setConfirmOpen(false);
                setSubmitError(null);
              }
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
