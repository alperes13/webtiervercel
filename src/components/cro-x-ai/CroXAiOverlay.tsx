'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowLeftRight, ChevronDown, Check, Trash2 } from 'lucide-react';
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
  const [serviceStatus, setServiceStatus] = useState<'bekleniyor' | 'canlı' | 'bakımda'>('bekleniyor');
  const [miniEnabled, setMiniEnabled] = useState(true);
  const [ultraEnabled, setUltraEnabled] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const pillsControls = useAnimation();

  function flashPills() {
    pillsControls.start({
      x: [0, -8, 8, -6, 6, -3, 3, 0],
      transition: { duration: 0.55, ease: 'easeInOut' },
    });
  }

  // Reset + fetch model/maintenance status + seed bot messages (all in one effect for data consistency)
  useEffect(() => {
    if (!open) return;
    setModel(defaultModel);
    setAddresses({});
    setActivePlatform(null);
    setDraftValue('');
    setConfirmOpen(false);
    setSubmitError(null);
    setSubmitting(false);
    setChatLog([]);
    setMiniEnabled(true);
    setUltraEnabled(true);
    setServiceStatus('bekleniyor');

    const timers: number[] = [];
    const HERO_HOLD_MS = 3000;
    const rand = () => 1000 + Math.random() * 1000;

    function scheduleMsg(msg: Omit<ChatMessage, 'id'>, delayFromNow: number) {
      timers.push(
        window.setTimeout(() => {
          setChatLog((prev) => [...prev, { ...msg, id: `${msg.kind}-${Date.now()}` }]);
        }, delayFromNow),
      );
    }

    // Fetch at hero-hold time, then seed messages based on live data
    timers.push(
      window.setTimeout(() => {
        fetch('/api/public/maintenance')
          .then((r) => r.json())
          .then((d: { maintenance_mode?: boolean; cro_mini_enabled?: boolean; cro_ultra_enabled?: boolean }) => {
            const mini = d.cro_mini_enabled !== false;
            const ultra = d.cro_ultra_enabled !== false;
            const bothDown = !mini && !ultra;
            const isMaintenance = !!(d.maintenance_mode || bothDown);

            setMiniEnabled(mini);
            setUltraEnabled(ultra);
            setServiceStatus(isMaintenance ? 'bakımda' : 'canlı');

            let c = 0; // delay cursor relative to fetch completion

            if (isMaintenance) {
              // Both models down or full maintenance — only 2 messages
              const greet = isAuthenticated
                ? { kind: 'bot' as const, text: 'Hoşgeldin, seni görmek güzel.' }
                : { kind: 'bot' as const, text: 'Hoşgeldin, ücretsiz analiz almadan önce giriş yapman gerektiğini unutma. Her hesapta 1 CRO-X Mini kredisi tanımlıdır.', inlineLoginLink: true };
              scheduleMsg(greet, c);
              c += rand();
              scheduleMsg({ kind: 'bot', text: 'CRO-X AI modelleri şu an bakımda.' }, c);
            } else {
              // Normal flow
              const greet = isAuthenticated
                ? { kind: 'bot' as const, text: 'Hoşgeldin, aşağıdaki platformlardan herhangi bir dijital adresi seçebilirsin. Ne kadar çok adres yazarsan o kadar iyi sonuç alırsın. Doğru adreslerini girdiğinden emin ol. Her analiz 1 kredi kullanır.' }
                : { kind: 'bot' as const, text: 'Hoşgeldin, ücretsiz analiz almadan önce giriş yapman gerektiğini unutma. Her hesapta 1 CRO-X Mini kredisi tanımlıdır.', inlineLoginLink: true };
              scheduleMsg(greet, c);
              c += rand();
              if (!isAuthenticated) {
                scheduleMsg({ kind: 'bot', text: 'Aşağıdaki platformlardan herhangi bir dijital adresi seçebilirsin. Ne kadar çok adres yazarsan o kadar iyi sonuç alırsın. Doğru adreslerini girdiğinden emin ol. Her analiz 1 kredi kullanır.' }, c);
                c += rand();
              }
              scheduleMsg({ kind: 'bot', text: 'CRO-X Ultra modelinin analizleri server yoğunluğuna bağlı olarak 0-2 saat içerisinde teslim edilir.', inlineAnalizLink: true }, c);
              // One model down: add partial notice as last message
              if (!mini || !ultra) {
                c += rand();
                const activeModel = mini ? 'CRO-X Mini' : 'CRO-X Ultra';
                scheduleMsg({ kind: 'bot', text: `Şu anda sadece ${activeModel} modeli analiz üretmektedir.` }, c);
              }
            }
          })
          .catch(() => {
            // Fallback: assume all live
            setServiceStatus('canlı');
            let c = 0;
            const greet = isAuthenticated
              ? { kind: 'bot' as const, text: 'Hoşgeldin, aşağıdaki platformlardan herhangi bir dijital adresi seçebilirsin. Ne kadar çok adres yazarsan o kadar iyi sonuç alırsın. Doğru adreslerini girdiğinden emin ol. Her analiz 1 kredi kullanır.' }
              : { kind: 'bot' as const, text: 'Hoşgeldin, ücretsiz analiz almadan önce giriş yapman gerektiğini unutma. Her hesapta 1 CRO-X Mini kredisi tanımlıdır.', inlineLoginLink: true };
            scheduleMsg(greet, c);
            c += rand();
            if (!isAuthenticated) {
              scheduleMsg({ kind: 'bot', text: 'Aşağıdaki platformlardan herhangi bir dijital adresi seçebilirsin.' }, c);
              c += rand();
            }
            scheduleMsg({ kind: 'bot', text: 'CRO-X Ultra modelinin analizleri server yoğunluğuna bağlı olarak 0-2 saat içerisinde teslim edilir.', inlineAnalizLink: true }, c);
          });
      }, HERO_HOLD_MS),
    );

    return () => timers.forEach((t) => window.clearTimeout(t));
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

  // 30s polling: refresh model/maintenance status while overlay is open
  useEffect(() => {
    if (!open) return;
    const poll = () => {
      fetch('/api/public/maintenance')
        .then((r) => r.json())
        .then((d: { maintenance_mode?: boolean; cro_mini_enabled?: boolean; cro_ultra_enabled?: boolean }) => {
          const mini = d.cro_mini_enabled !== false;
          const ultra = d.cro_ultra_enabled !== false;
          setMiniEnabled(mini);
          setUltraEnabled(ultra);
          // serviceStatus is re-derived below via model effect — just store raw values here
        })
        .catch(() => {/* keep current values on error */});
    };
    const interval = window.setInterval(poll, 30_000);
    return () => window.clearInterval(interval);
  }, [open]);

  // Derive model-specific status + inject chat message when model goes into maintenance
  const prevModelStatusRef = useRef<boolean | null>(null);
  useEffect(() => {
    if (!open) return;
    const currentModelEnabled = model === 'mini' ? miniEnabled : ultraEnabled;
    const bothDown = !miniEnabled && !ultraEnabled;
    const isMaintenance = bothDown || !currentModelEnabled;
    setServiceStatus(isMaintenance ? 'bakımda' : 'canlı');

    // Only inject the maintenance notice message after initial load (prevModelStatusRef tracks previous value)
    if (prevModelStatusRef.current !== null && prevModelStatusRef.current !== currentModelEnabled) {
      if (!currentModelEnabled) {
        const modelName = model === 'mini' ? 'CRO-X Mini' : 'CRO-X Ultra';
        setChatLog((prev) => {
          // Avoid duplicate
          const alreadyHas = prev.some((m) => m.kind === 'bot' && m.text.includes('bakımda'));
          if (alreadyHas) return prev;
          return [...prev, { id: `bot-maintenance-${Date.now()}`, kind: 'bot', text: `${modelName} şu an bakımda. Lütfen modeli değiştiriniz veya daha sonra tekrar deneyiniz.` }];
        });
      }
    }
    prevModelStatusRef.current = currentModelEnabled;
  }, [open, model, miniEnabled, ultraEnabled]);

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

  const currentModelEnabled = model === 'mini' ? miniEnabled : ultraEnabled;

  const bothModelsDown = !miniEnabled && !ultraEnabled;

  const placeholder = bothModelsDown
    ? ''
    : !currentModelEnabled
      ? 'Lütfen aşağıdan modeli değiştiriniz.'
      : activePlatform
        ? getPlatform(activePlatform).inputLabel
        : 'Dijital adres seçiniz:';

  const placeholderColor = !currentModelEnabled
    ? 'text-red-400/70'
    : activePlatform ? 'text-blue-400' : 'text-white/45';

  const ekleEnabled = !!activePlatform && draftValue.trim().length > 0 && currentModelEnabled;

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

    // Block if selected model is disabled
    if (model === 'mini' && !miniEnabled) {
      setSubmitError('CRO-X Mini şu an bakımda. Lütfen daha sonra tekrar deneyin.');
      return;
    }
    if (model === 'ultra' && !ultraEnabled) {
      setSubmitError('CRO-X Ultra şu an bakımda. Lütfen daha sonra tekrar deneyin.');
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
          {/* Top bar — back button (left) · title (center) · clear button (right, when filled) */}
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
            <AnimatePresence mode="wait">
              {filledCount > 0 ? (
                <motion.button
                  key="clear"
                  type="button"
                  onClick={handleClear}
                  disabled={submitting}
                  aria-label="Temizle"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="pointer-events-auto h-9 sm:h-10 px-3 sm:px-4 rounded-full bg-white text-black flex items-center gap-1.5 hover:bg-zinc-200 transition shadow-lg disabled:opacity-50"
                >
                  <Trash2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">Temizle</span>
                </motion.button>
              ) : (
                <motion.div key="placeholder" className="w-9 sm:w-10" />
              )}
            </AnimatePresence>
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
              {/* ANALİZE GÖNDER — full width, appears once user added an address */}
              <AnimatePresence>
                {filledCount > 0 && (
                  <motion.button
                    type="button"
                    onClick={handleAnalyzeClick}
                    disabled={submitting || serviceStatus === 'bakımda' || (model === 'mini' && !miniEnabled) || (model === 'ultra' && !ultraEnabled)}
                    initial={{ opacity: 0, y: 8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: 8, height: 0 }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-[11px] sm:text-[12px] font-bold uppercase tracking-wider bg-white text-black hover:bg-zinc-100 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ANALİZE GÖNDER
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-black text-white">
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Platform pills — wrap on all viewports, never overflow */}
              <AnimatePresence>
                {currentModelEnabled && (
                  <motion.div
                    key="pills"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: 'hidden' }}
                  >
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
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Address input bar */}
              <div
                className="rounded-2xl border border-white/15 bg-zinc-950/60 backdrop-blur-md overflow-hidden"
                onClickCapture={(e) => {
                  // If user clicks input area before picking a platform, shake the pills as a hint.
                  if (!activePlatform && currentModelEnabled) {
                    const target = e.target as HTMLElement;
                    if (target.closest('input') || target.closest('[data-input-row]')) {
                      flashPills();
                    }
                  }
                }}
              >
                <div className="px-3 sm:px-5 pt-3 sm:pt-4 pb-1.5 sm:pb-2" data-input-row>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span
                      className={cn(
                        'text-[11px] sm:text-[13px] font-semibold leading-tight',
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
              {/* Status bar: credits (left) · AI status (right) */}
              <div className="mt-[25px] flex items-center justify-between pb-1 px-1">
                <span className="text-[11px] sm:text-[12px] text-white/25 font-medium tracking-wide">
                  {isAuthenticated && session
                    ? `Mini: ${session.creditsMini ?? 0}  ·  Ultra: ${session.creditsUltra ?? 0}`
                    : 'Kredi bilgisi yok'}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    {serviceStatus === 'bekleniyor' ? (
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-yellow-400 opacity-60 animate-pulse" />
                    ) : serviceStatus === 'bakımda' ? (
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500 opacity-80" />
                    ) : (
                      <>
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                      </>
                    )}
                  </span>
                  <span
                    className={cn(
                      'text-[9px] sm:text-[9.5px] font-medium tracking-wide',
                      serviceStatus === 'bekleniyor'
                        ? 'text-yellow-400/50'
                        : serviceStatus === 'bakımda'
                          ? 'text-red-400/70'
                          : 'text-white/25',
                    )}
                  >
                    {serviceStatus === 'bekleniyor' ? 'Bekleniyor' : serviceStatus === 'bakımda' ? 'Bakımda' : 'Canlı'}
                  </span>
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
