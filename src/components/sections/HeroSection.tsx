'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import PhoneInput from '@/components/ui/PhoneInput';
import OTPInput from '@/components/ui/OTPInput';
import ShaderCanvas from '@/components/ui/animated-shader-hero';
import { isValidUrl, isValidPhone, normalizeUrl } from '@/lib/validators';
import { useOTP } from '@/hooks/useOTP';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import type { UserSession } from '@/types';

export default function HeroSection() {
  const [siteUrl, setSiteUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [phone, setPhone] = useState('');
  const [contactError, setContactError] = useState('');

  const [isFocused, setIsFocused] = useState(false);
  const { step, setStep, loading, error, attemptsLeft, isTimedOut, timeoutRemaining, sendOTP, verifyOTP, reset } = useOTP();
  const { login } = useAuth();
  const { t } = useLanguage();

  const handleAnalyze = () => {
    const trimmed = siteUrl.trim();
    if (!trimmed) {
      setUrlError(t.hero.errors.emptyUrl);
      return;
    }
    if (!isValidUrl(trimmed)) {
      setUrlError(t.hero.errors.invalidUrl);
      return;
    }
    setUrlError('');
    setStep('phone');
  };

  const handleSendOTP = async () => {
    if (!isValidPhone(phone)) {
      setContactError(t.hero.errors.invalidPhone);
      return;
    }

    setContactError('');
    await sendOTP(phone, normalizeUrl(siteUrl), 'phone');
  };

  const handleVerifyOTP = async (code: string) => {
    const result = await verifyOTP(code);
    if (result) {
      const normalizedPhone = phone.replace(/\D/g, '');
      const session: UserSession = {
        token: 'placeholder-token',
        phone: normalizedPhone,
        phoneRaw: normalizedPhone,
        createdAt: Date.now(),
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
        analysisStatus: 'pending',
        credits: 3,
      };
      login(session);
    }
  };

  const handleCloseModal = () => {
    reset();
    setPhone('');
    setContactError('');
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
  };

  const rotatingWords = useMemo(() => [...t.hero.words], [t]);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setWordIndex(0);
  }, [t]);

  useEffect(() => {
    const id = setTimeout(() => setWordIndex(i => (i + 1) % rotatingWords.length), 2500);
    return () => clearTimeout(id);
  }, [wordIndex, rotatingWords]);

  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center overflow-hidden pt-20">
      {/* Animated Shader Background */}
      <div className="absolute inset-0 z-0">
        <ShaderCanvas />
      </div>
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(4,1,2,0.72)_0%,rgba(6,2,3,0.52)_40%,rgba(4,1,2,0.72)_100%)]" />
      {/* Dot grid */}
      <div className="absolute inset-0 bg-dot-grid opacity-10 z-0" />

      {/* Top/bottom vignette */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--color-surface)] to-transparent z-0" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--color-surface)] to-transparent z-0" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <motion.div
          variants={containerVariants}
          initial={false}
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6 flex justify-center">
            <span className="gradient-border inline-flex items-center gap-2 rounded-full bg-[var(--color-surface-card)] px-4 py-2 text-xs font-medium text-[var(--color-text-secondary)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              {t.hero.badge}
            </span>
          </motion.div>

            {/* H1 with rotating words */}
          <motion.h1
            variants={itemVariants}
            className="font-[family-name:var(--font-heading)] text-[27px] font-extrabold leading-[1.2] tracking-tight text-[var(--color-text)] uppercase"
          >
            <span className="block">{t.hero.titleLine1}</span>
            <span className="mt-2 block h-[1.1em] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`${wordIndex}-${t.hero.words[wordIndex]}`}
                  className="text-gradient-amber block"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ 
                    duration: 0.5, 
                    ease: [0.23, 1, 0.32, 1] 
                  }}
                >
                  {t.hero.words[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="mt-1 block">{t.hero.titleLine3}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-[16px] leading-relaxed text-[var(--color-text-secondary)] lg:max-w-3xl lg:mx-auto"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* URL Input */}
          <motion.div variants={itemVariants} className="mt-10 flex justify-center w-full px-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-2xl sm:bg-[#1C0E0E]/20 sm:backdrop-blur-3xl sm:border sm:border-white/5 sm:rounded-full sm:p-2 sm:pl-8 transition-all hover:bg-[#1C0E0E]/30">
              <div className="relative flex-1 w-full flex items-center justify-center h-14 sm:h-auto bg-[#1C0E0E]/20 backdrop-blur-3xl border border-white/5 rounded-full sm:bg-transparent sm:backdrop-blur-none sm:border-none">
                {!siteUrl && (
                  <div
                    className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden text-sm sm:text-base px-6"
                    aria-hidden="true"
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={isFocused ? 'focused' : 'not-focused'}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 0.8, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="hero-metallic-placeholder whitespace-nowrap text-center"
                      >
                        {isFocused ? t.hero.placeholderFocused : t.hero.placeholder}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                )}
                <input
                  type="url"
                  value={siteUrl}
                  onChange={(e) => {
                    setSiteUrl(e.target.value);
                    if (urlError) setUrlError('');
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder=""
                  onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                  className="w-full bg-transparent border-none py-4 text-sm sm:text-base text-[var(--color-text)] text-center focus:ring-0 focus:outline-none placeholder:text-transparent"
                />
              </div>
              <Button
                onClick={handleAnalyze}
                className="w-full sm:w-auto shrink-0 h-14 rounded-full px-12 text-base font-bold bg-gradient-to-r from-[var(--color-accent)] to-[#f43f5e] hover:brightness-110 active:scale-[0.98] transition-all animate-pulse-glow shadow-[0_0_40px_rgba(225,29,72,0.2)] border-none ring-0 focus:ring-0 focus:outline-none"
              >
                {t.hero.cta} <ArrowUpRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
          {urlError && (
            <p className="mt-4 text-center text-sm text-[var(--color-error)]">{urlError}</p>
          )}

          {/* Trust badges */}
          <motion.div variants={itemVariants} className="mt-6 flex flex-wrap items-center justify-center gap-5 sm:gap-8">
            {t.hero.badges.map((badge) => (
              <span key={badge} className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                <CheckCircle2 className="h-4 w-4 text-[var(--color-accent)]" />
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          initial={false}
          animate="visible"
          className="mt-12 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-[var(--color-text-muted)] tracking-[0.2em] uppercase font-bold">{t.hero.scroll}</span>
          <ChevronDown className="h-4 w-4 text-[var(--color-text-muted)] animate-scroll-down" />
        </motion.div>
      </div>

      <Modal
        open={step === 'phone'}
        onClose={handleCloseModal}
        title={t.hero.modal.phoneTitle}
      >
        <p className="mb-5 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {t.hero.modal.phoneDesc}
        </p>

        <PhoneInput
          value={phone}
          onChange={(value) => {
            setPhone(value);
            if (contactError) setContactError('');
          }}
          error={contactError}
          disabled={loading}
        />

        {isTimedOut && (
          <p className="mt-3 text-sm text-[var(--color-error)]">
            {t.hero.errors.timeout.replace('{minutes}', String(Math.ceil(timeoutRemaining / 60)))}
          </p>
        )}

        <Button
          size="lg"
          className="mt-4 w-full"
          onClick={handleSendOTP}
          disabled={loading || isTimedOut}
        >
          {loading ? t.hero.modal.phoneSending : t.hero.modal.phoneButton}
        </Button>

        <p className="mt-3 text-center text-xs text-[var(--color-text-muted)]">
          {t.hero.modal.phoneNote}
        </p>
      </Modal>

      {/* OTP Modal */}
      <Modal
        open={step === 'otp'}
        onClose={handleCloseModal}
        title={t.hero.modal.otpTitle}
      >
        <p className="mb-2 text-center text-sm text-[var(--color-text-secondary)]">
          +90 {phone} {t.hero.modal.otpSentTo}
        </p>
        <p className="mb-6 text-center text-sm text-[var(--color-text-muted)]">
          {t.hero.modal.otpEnterCode}
        </p>
        <OTPInput
          onComplete={handleVerifyOTP}
          disabled={loading}
          error={!!error}
        />
        {error && (
          <p className="mt-4 text-center text-sm text-[var(--color-error)]">{error}</p>
        )}
        {attemptsLeft < 5 && attemptsLeft > 0 && (
          <p className="mt-2 text-center text-xs text-[var(--color-text-muted)]">
            {attemptsLeft} {t.hero.modal.otpAttempts}
          </p>
        )}
        {loading && (
          <p className="mt-3 text-center text-sm text-[var(--color-text-muted)]">
            {t.hero.modal.otpVerifying}
          </p>
        )}
      </Modal>
    </section>
  );
}
