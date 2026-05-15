'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
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
  const pillsControls = useAnimation();

  function flashPills() {
    pillsControls.start({
      x: [0, -8, 8, -6, 6, -3, 3, 0],
      transition: { duration: 0.55, ease: 'easeInOut' },
    });
  }

  // Reset state on open and seed bot messages SEQUENTIALLY with timing
  useEffect(() => {
    if (!open) return;
    setModel(defaultModel);
    setAddresses({});
    setActivePlatform(null);
    setDraftValue('');
    setConfirmOpen(false);
    setSubmitError(null);
    setSubmitting(false);
    setChatLog([]); // Start empty: shows hero "CRO-X AI / Limitlerine dokun."

    const timers: number[] = [];

    // Hero stays centered for 3s, then slides up — bot messages start arriving after.
    const HERO_HOLD_MS = 3000;

    if (!isAuthenticated) {
      timers.push(
        window.setTimeout(() => {
          setChatLog((prev) => [
            ...prev,
            {
              id: `bot-login-${Date.now()}`,
              kind: 'bot',
              text: 'Analiz almadan önce giriş yapman gerektiğini unutma.',
              inlineLoginLink: true,
            },
          ]);
        }, HERO_HOLD_MS),
      );
      timers.push(
        window.setTimeout(() => {
          setChatLog((prev) => [
            ...prev,
            {
              id: `bot-intro-${Date.now()}`,
              kind: 'bot',
              text: 'Herhangi bir dijital adresini gir. Ne kadar adres yazarsan o kadar iyi.',
            },
          ]);
        }, HERO_HOLD_MS + 800),
      );
    } else {
      timers.push(
        window.setTimeout(() => {
          setChatLog((prev) => [
            ...prev,
            {
              id: `bot-intro-${Date.now()}`,
              kind: 'bot',
              text: 'Herhangi bir dijital adresini gir. Ne kadar adres yazarsan o kadar iyi.',
            },
          ]);
        }, HERO_HOLD_MS),
      );
    }

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [open, isAuthenticated, defaultModel]);

  // Body scroll lock (iOS-safe: lock both <html> and <body>) + navbar hide via body class
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const html = document.documentElement;
    const original = {
      bodyOverflow: document.body.style.overflow,
      bodyPosition: document.body.style.position,
      bodyTop: document.body.style.top,
      bodyLeft: document.body.style.left,
      bodyRight: document.body.style.right,
      bodyWidth: document.body.style.width,
      bodyHeight: document.body.style.height,
      bodyTouch: document.body.style.touchAction,
      htmlOverflow: html.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
      htmlHeight: html.style.height,
    };
    // Lock <body>
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.touchAction = 'none';
    // Lock <html> too — iOS Safari scrolls the documentElement, not body, in some modes
    html.style.overflow = 'hidden';
    html.style.overscrollBehavior = 'none';
    html.style.height = '100%';
    document.body.classList.add('crox-overlay-open');
    return () => {
      document.body.style.overflow = original.bodyOverflow;
      document.body.style.position = original.bodyPosition;
      document.body.style.top = original.bodyTop;
      document.body.style.left = original.bodyLeft;
      document.body.style.right = original.bodyRight;
      document.body.style.width = original.bodyWidth;
      document.body.style.height = original.bodyHeight;
      document.body.style.touchAction = original.bodyTouch;
      html.style.overflow = original.htmlOverflow;
      html.style.overscrollBehavior = original.htmlOverscroll;
      html.style.height = original.htmlHeight;
      document.body.classList.remove('crox-overlay-open');
      window.scrollTo(0, scrollY);
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

  // Auto-scroll chat to bottom on new message (since we use justify-end)
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

  const showHero = chatLog.length === 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[130] bg-black overflow-hidden"
          style={{ touchAction: 'none', overscrollBehavior: 'none' }}
          aria-modal="true"
          role="dialog"
        >
          {/* Top bar — back button always; CRO-X AI title appears once messages start */}
          <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between pointer-events-none z-10">
            <button
              type="button"
              onClick={onClose}
              aria-label="Geri"
              className="pointer-events-auto h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition shadow-lg"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <motion.div
              animate={{ opacity: showHero ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="text-white text-xs sm:text-sm font-semibold tracking-wide pointer-events-auto"
            >
              CRO-X AI
            </motion.div>
            <div className="w-9 sm:w-10" />
          </div>

          {/* Main vertical layout: chat (top, growing) + bottom dock */}
          <div className="h-full w-full flex flex-col pt-14 sm:pt-16 pb-3 sm:pb-5 px-3 sm:px-6">
            {/* Chat region: grows to fill, content aligns to bottom */}
            <div className="flex-1 min-h-0 max-w-2xl w-full mx-auto relative">
              {/* Hero (empty state) — fades out as soon as a bot message arrives */}
              <AnimatePresence>
                {showHero && (
                  <motion.div
                    key="hero"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -60 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
                  >
                    <h1 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">CRO-X AI</h1>
                    <p className="text-white/60 text-xs sm:text-sm mt-2">Limitlerine dokun.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Chat scroll: justify-end so bubbles stack from bottom */}
              <div
                ref={chatScrollRef}
                className="absolute inset-0 overflow-y-auto flex flex-col justify-end space-y-2.5 sm:space-y-3 pb-2"
                style={{
                  overscrollBehavior: 'contain',
                  WebkitOverflowScrolling: 'touch',
                  touchAction: 'pan-y',
                }}
              >
                <AnimatePresence initial={false}>
                  {chatLog.map((m) => (
                    <ChatBubble key={m.id} msg={m} loginHref={loginHref} />
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom dock: action buttons + pills + input */}
            <div className="max-w-2xl w-full mx-auto pt-3 border-t border-white/10 space-y-3 sm:space-y-4">
              {/* Action buttons (TEMİZLE / ANALİZE GÖNDER) appear once user added an address */}
              <AnimatePresence>
                {filledCount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: 8, height: 0 }}
                    className="flex flex-wrap items-center justify-end gap-2 sm:gap-3"
                  >
                    <button
                      type="button"
                      onClick={handleClear}
                      disabled={submitting}
                      className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-[11px] sm:text-[12px] font-bold uppercase tracking-wider bg-white text-rose-600 border border-white hover:bg-zinc-100 transition disabled:opacity-50"
                    >
                      TEMİZLE
                    </button>
                    <button
                      type="button"
                      onClick={handleAnalyzeClick}
                      disabled={submitting}
                      className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-[11px] sm:text-[12px] font-bold uppercase tracking-wider bg-white text-rose-700 border border-rose-700 hover:bg-rose-50 transition inline-flex items-center gap-2 disabled:opacity-50"
                    >
                      ANALİZE GÖNDER
                      <span className="inline-flex items-center justify-center h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-rose-900 text-white">
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Platform pills — wrap on all viewports, never overflow */}
              <motion.div
                animate={pillsControls}
                className="flex flex-wrap justify-center gap-1.5 sm:gap-2"
              >
                {PLATFORMS.map((p) => (
                  <PlatformPill
                    key={p.key}
                    platform={p}
                    isActive={activePlatform === p.key}
                    hasValue={!!(addresses[p.key] && addresses[p.key]!.trim())}
                    onClick={() => handlePlatformClick(p.key)}
                  />
                ))}
              </motion.div>

              {/* Address input bar */}
              <div
                className="rounded-2xl border border-white/15 bg-zinc-950/60 backdrop-blur-md overflow-hidden"
                onClickCapture={(e) => {
                  // If user clicks input area before picking a platform, shake the pills as a hint.
                  if (!activePlatform) {
                    const target = e.target as HTMLElement;
                    if (target.closest('input') || target.closest('[data-input-row]')) {
                      flashPills();
                    }
                  }
                }}
              >
                <div className="px-3 sm:px-5 pt-3 sm:pt-4 pb-1.5 sm:pb-2" data-input-row>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span
                      className={cn(
                        'text-[13px] sm:text-[13px] font-semibold whitespace-nowrap',
                        placeholderColor,
                      )}
                    >
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
                      onMouseDown={(e) => {
                        // Block native focus when no platform is picked — prevents iOS keyboard + zoom.
                        if (!activePlatform) {
                          e.preventDefault();
                        }
                      }}
                      onFocus={() => {
                        if (!activePlatform) {
                          inputRef.current?.blur();
                        }
                      }}
                      readOnly={!activePlatform}
                      placeholder=""
                      className={cn(
                        // 16px (text-base) on mobile prevents iOS Safari auto-zoom on focus; sm shrinks back.
                        'flex-1 min-w-0 bg-transparent outline-none text-white text-base sm:text-[13px] font-medium',
                        'placeholder:text-white/30',
                      )}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between px-2 sm:px-3 pb-2 sm:pb-3 pt-1 gap-2">
                  {/* Model selector */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="flex items-center gap-1.5 h-8 pl-1.5 pr-2 sm:pl-2 sm:pr-2.5 text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider rounded-full text-white/70 hover:text-white hover:bg-white/5 transition"
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
                      'inline-flex items-center gap-1.5 sm:gap-2 pl-3 pr-1.5 py-1 sm:pl-4 sm:pr-2 sm:py-1.5 rounded-full text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider transition shrink-0',
                      ekleEnabled
                        ? 'bg-white text-zinc-900 hover:bg-zinc-100'
                        : 'bg-white/20 text-white/50 cursor-not-allowed',
                    )}
                  >
                    EKLE
                    <span
                      className={cn(
                        'inline-flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 rounded-full',
                        ekleEnabled ? 'bg-zinc-900 text-white' : 'bg-white/30 text-white/70',
                      )}
                    >
                      <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
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
