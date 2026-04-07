'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import PhoneInput from '@/components/ui/PhoneInput';
import OTPInput from '@/components/ui/OTPInput';
import { isValidUrl, isValidPhone, isValidEmail, normalizeUrl } from '@/lib/validators';
import { useOTP } from '@/hooks/useOTP';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import type { UserSession } from '@/types';

type ContactType = 'phone' | 'email';

export default function HeroSection() {
  const [siteUrl, setSiteUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [contactType, setContactType] = useState<ContactType>('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [contactError, setContactError] = useState('');

  const { step, setStep, loading, error, attemptsLeft, isTimedOut, timeoutRemaining, sendOTP, verifyOTP, reset } = useOTP();
  const { login } = useAuth();

  const handleAnalyze = () => {
    const trimmed = siteUrl.trim();
    if (!trimmed) {
      setUrlError('Lütfen web sitenizin URL\'sini girin.');
      return;
    }
    if (!isValidUrl(trimmed)) {
      setUrlError('Geçerli bir URL girin. Örn: websiteniz.com');
      return;
    }
    setUrlError('');
    setStep('phone');
  };

  const handleSendOTP = async () => {
    if (contactType === 'phone') {
      if (!isValidPhone(phone)) {
        setContactError('Geçerli bir Türkiye telefon numarası girin. (5XX XXX XX XX)');
        return;
      }
      setContactError('');
      await sendOTP(phone, normalizeUrl(siteUrl), 'phone');
    } else {
      if (!isValidEmail(email)) {
        setContactError('Geçerli bir iş e-posta adresi girin.');
        return;
      }
      setContactError('');
      await sendOTP(email, normalizeUrl(siteUrl), 'email');
    }
  };

  const handleVerifyOTP = async (code: string) => {
    const result = await verifyOTP(code);
    if (result) {
      const contactValue = contactType === 'phone' ? phone.replace(/\D/g, '') : email;
      const session: UserSession = {
        token: 'placeholder-token',
        phone: contactType === 'phone' ? contactValue : '',
        phoneRaw: contactType === 'phone' ? contactValue : '',
        email: contactType === 'email' ? contactValue : undefined,
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
    setEmail('');
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

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-16 lg:pt-20">
      {/* Dot grid */}
      <div className="absolute inset-0 bg-dot-grid opacity-40" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 h-[600px] w-[600px] rounded-full glow-amber opacity-60 blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 h-[500px] w-[500px] rounded-full glow-blue opacity-50 blur-3xl" />
      <div className="absolute top-3/4 left-1/3 h-[300px] w-[300px] rounded-full glow-green opacity-30 blur-3xl" />

      {/* Subtle top vignette */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--color-surface)] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--color-surface)] to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6 flex justify-center">
            <span className="gradient-border inline-flex items-center gap-2 rounded-full bg-[var(--color-surface-card)] px-4 py-2 text-xs font-medium text-[var(--color-text-secondary)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              Türkiye&apos;nin CRO odaklı web ajansı
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={itemVariants}
            className="font-[family-name:var(--font-heading)] text-5xl font-extrabold leading-[1.05] tracking-tight text-[var(--color-text)] sm:text-6xl lg:text-7xl"
          >
            Web Siteniz{' '}
            <span className="text-gradient-amber">Satış Yapıyor</span>{' '}
            mu, Yoksa{' '}
            <span className="text-gradient-blue">Sadece Var</span> mı?
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)] sm:text-xl lg:max-w-3xl lg:mx-auto"
          >
            Ücretsiz CRO analiziyle sitenizin dönüşüm açıklarını keşfedin.
            Rakiplerinizden önce hareket edin.
          </motion.p>

          {/* URL Input */}
          <motion.div variants={itemVariants} className="mt-10">
            <div className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <input
                  type="url"
                  value={siteUrl}
                  onChange={(e) => {
                    setSiteUrl(e.target.value);
                    if (urlError) setUrlError('');
                  }}
                  placeholder="https://websitenizi-girin.com"
                  onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                  className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-card)]/80 px-5 py-4 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] backdrop-blur-sm transition-all focus:border-[var(--color-accent)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:shadow-[0_0_30px_rgba(245,158,11,0.15)]"
                />
              </div>
              <Button
                size="lg"
                onClick={handleAnalyze}
                className="shrink-0 rounded-2xl px-8 text-base font-semibold animate-pulse-glow"
              >
                Analiz Et
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            {urlError && (
              <p className="mt-2 text-center text-sm text-[var(--color-error)]">{urlError}</p>
            )}

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-5 sm:gap-8">
              {['100% Ücretsiz', '2 Dakikada Sonuç', 'Uzman Analizi'].map((badge) => (
                <span key={badge} className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                  <CheckCircle2 className="h-4 w-4 text-[var(--color-accent-secondary)]" />
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex flex-col items-center gap-2"
          >
            <span className="text-xs text-[var(--color-text-muted)] tracking-widest uppercase">Keşfet</span>
            <ChevronDown className="h-5 w-5 text-[var(--color-text-muted)] animate-scroll-down" />
          </motion.div>
        </motion.div>
      </div>

      {/* ── Contact Modal (Phone or Email tabs) ── */}
      <Modal
        open={step === 'phone'}
        onClose={handleCloseModal}
        title="İletişim Bilgileriniz"
      >
        <p className="mb-5 text-sm text-[var(--color-text-secondary)]">
          Analiz sonuçlarınızı size iletebilmemiz için bilgilerinizi girin.
        </p>

        {/* Tab selector */}
        <div className="mb-5 flex rounded-xl border border-[var(--color-border)] p-1 gap-1 bg-[var(--color-surface-card)]">
          <button
            onClick={() => { setContactType('phone'); setContactError(''); }}
            className={cn(
              'flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-200',
              contactType === 'phone'
                ? 'bg-[var(--color-accent)] text-[var(--color-primary)]'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
            )}
          >
            <Phone className="h-4 w-4" />
            Telefon
          </button>
          <button
            onClick={() => { setContactType('email'); setContactError(''); }}
            className={cn(
              'flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-200',
              contactType === 'email'
                ? 'bg-[var(--color-accent-blue)] text-white'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
            )}
          >
            <Mail className="h-4 w-4" />
            İş E-postası
          </button>
        </div>

        {contactType === 'phone' ? (
          <PhoneInput
            value={phone}
            onChange={(v) => { setPhone(v); if (contactError) setContactError(''); }}
            error={contactError}
            disabled={loading}
          />
        ) : (
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (contactError) setContactError(''); }}
              placeholder="isim@sirketiniz.com"
              disabled={loading}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-card)] px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] transition-all focus:border-[var(--color-accent-blue)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-blue)]/30 disabled:opacity-50"
            />
            {contactError && (
              <p className="mt-1.5 text-xs text-[var(--color-error)]">{contactError}</p>
            )}
          </div>
        )}

        {isTimedOut && (
          <p className="mt-3 text-sm text-[var(--color-error)]">
            Çok fazla deneme. {Math.ceil(timeoutRemaining / 60)} dakika sonra tekrar deneyin.
          </p>
        )}

        <Button
          size="lg"
          variant={contactType === 'phone' ? 'primary' : 'secondary'}
          className={cn(
            'mt-4 w-full',
            contactType === 'email' && 'bg-[var(--color-accent-blue)] text-white hover:bg-[var(--color-accent-blue-hover)]'
          )}
          onClick={handleSendOTP}
          disabled={loading || isTimedOut}
        >
          {loading ? 'Gönderiliyor...' : 'Doğrulama Kodu Gönder'}
        </Button>

        <p className="mt-3 text-center text-xs text-[var(--color-text-muted)]">
          {contactType === 'phone'
            ? 'SMS ile 6 haneli kod gönderilecek'
            : 'E-posta adresinize 6 haneli kod gönderilecek'}
        </p>
      </Modal>

      {/* OTP Modal */}
      <Modal
        open={step === 'otp'}
        onClose={handleCloseModal}
        title="Doğrulama Kodu"
      >
        <p className="mb-2 text-center text-sm text-[var(--color-text-secondary)]">
          {contactType === 'phone'
            ? `+90 ${phone} numarasına gönderilen`
            : `${email} adresine gönderilen`}
        </p>
        <p className="mb-6 text-center text-sm text-[var(--color-text-muted)]">
          6 haneli kodu girin
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
            {attemptsLeft} deneme hakkınız kaldı
          </p>
        )}
        {loading && (
          <p className="mt-3 text-center text-sm text-[var(--color-text-muted)]">
            Doğrulanıyor...
          </p>
        )}
      </Modal>
    </section>
  );
}
