'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, animate } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import LoginModal from '@/components/ui/LoginModal';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { GradientText } from '@/components/ui/gradient-text';
import { HeroInput, type CROModel } from '@/components/ui/animated-ai-input';
import { isValidUrl } from '@/lib/validators';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

import { createMiniAnalysis, createUltraAnalysis } from '@/lib/api';

export default function HeroSection() {
  const [siteUrl, setSiteUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedModel, setSelectedModel] = useState<CROModel>('CRO-X MINI');
  const [loginOpen, setLoginOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isAuthenticated, session, updateSession } = useAuth();
  const { t } = useLanguage();

  const handleAnalyze = async () => {
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

    if (!isAuthenticated || !session) {
      setLoginOpen(true);
      return;
    }

    // Credit check
    if (selectedModel === 'CRO-X MINI' && session.creditsMini < 1) {
      setUrlError('Yetersiz Mini kredi. Profilinizden ek kredi alabilirsiniz.');
      return;
    }
    if (selectedModel === 'CRO-X ULTRA' && session.creditsUltra < 1) {
      setUrlError('Yetersiz Ultra kredi. Lütfen bakiye yükleyin.');
      return;
    }

    setLoading(true);
    try {
      if (selectedModel === 'CRO-X MINI') {
        await createMiniAnalysis(session.token, { website_url: trimmed });
        updateSession({ creditsMini: session.creditsMini - 1, analysisStatus: 'pending' });
      } else {
        await createUltraAnalysis(session.token, { website_url: trimmed });
        updateSession({ creditsUltra: session.creditsUltra - 1, analysisStatus: 'pending' });
      }
      setSiteUrl('');
      alert('Analiz talebiniz başarıyla alındı. Raporunuz hazırlandığında bilgilendirileceksiniz.');
    } catch (e) {
      setUrlError(e instanceof Error ? e.message : 'Analiz başlatılamadı');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
  };

  useEffect(() => {
    let lastTransitionTime = 0;
    let touchStartY = 0;
    const COOLDOWN = 600;

    const snappyScroll = (to: number) => {
      animate(window.scrollY, to, {
        type: "spring",
        stiffness: 150,
        damping: 25,
        mass: 0.8,
        onUpdate: (latest) => window.scrollTo(0, latest)
      });
    };

    const performTransition = (direction: 'up' | 'down') => {
      const now = Date.now();
      if (now - lastTransitionTime < COOLDOWN) return false;

      const scrollY = window.scrollY;
      const target = document.querySelector('#crox-ultra');
      if (!target) return false;

      const navbarHeight = 80;
      const targetTop = target.getBoundingClientRect().top + scrollY - navbarHeight;

      if (direction === 'down' && scrollY < 50) {
        lastTransitionTime = now;
        snappyScroll(targetTop);
        return true;
      }

      if (direction === 'up' && scrollY > 50 && scrollY < targetTop + 50) {
        lastTransitionTime = now;
        snappyScroll(0);
        return true;
      }

      return false;
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 10) return;
      const direction = e.deltaY > 0 ? 'down' : 'up';
      if (performTransition(direction)) {
        e.preventDefault();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      if (Math.abs(deltaY) < 30) return;

      const direction = deltaY > 0 ? 'down' : 'up';
      if (performTransition(direction)) {
        if (e.cancelable) e.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <AuroraBackground
      id="hero"
      className="hero-section-root site-section section-hero min-h-screen lg:h-screen lg:min-h-0 items-center overflow-hidden pt-10 sm:pt-20 lg:pt-0 w-full"
      showRadialGradient={true}
    >
      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-0 h-full flex items-center hero-content-inner">
        <motion.div
          variants={containerVariants}
          initial={false}
          animate="visible"
          className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left Column: Text & Logos */}
          <div className="space-y-8 lg:space-y-12 text-center lg:text-left">
            <div className="space-y-6">
              {/* Main title */}
              <motion.h1
                variants={itemVariants}
                className="hero-main-title font-[family-name:var(--font-heading)] font-extrabold leading-[1.1] tracking-tight text-[var(--color-text)] uppercase"
              >
                <span className="block text-[22px] sm:text-[42px] lg:text-[52px]">
                  {t.hero.heroStaticTitle}{' '}
                  <GradientText as="span" className="text-[22px] sm:text-[42px] lg:text-[52px] font-extrabold leading-[1.1] tracking-tight uppercase">
                    {t.hero.heroTitleHighlight}
                  </GradientText>{' '}
                  {t.hero.heroTitleSuffix}
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="hero-subtitle-text text-[13px] sm:text-[16px] px-5 sm:px-0 lg:px-0 leading-relaxed text-[var(--color-text-secondary)] lg:max-w-xl"
                dangerouslySetInnerHTML={{ __html: t.hero.subtitle }}
              />
            </div>

            {/* Hero Reference Logos */}
            <motion.div variants={itemVariants} className="hero-logos-wrapper relative overflow-visible">
              <div className="flex items-center justify-center lg:justify-start gap-8">
                {[2, 3, 1].map((id) => (
                  <div key={`logo-${id}`} className="flex items-center justify-center shrink-0 w-20 sm:w-28 lg:w-32">
                    <Image
                      src={`/images/hero-refs/${id}.png`}
                      alt={`Reference ${id}`}
                      width={300}
                      height={160}
                      className="h-auto w-full object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Input & Scroll */}
          <div className="hero-down-part flex flex-col items-center justify-center space-y-12 lg:space-y-16 my-[75px]">
            <div className="w-full">
              {/* Input block — HeroInput from animated-ai-input */}
              <motion.div variants={itemVariants} className="hero-input-form-container flex justify-center w-full px-[5px]">
                <HeroInput
                  value={siteUrl}
                  onChange={(v) => {
                    setSiteUrl(v);
                    if (urlError) setUrlError('');
                  }}
                  onSubmit={handleAnalyze}
                  isFocused={isFocused}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder={t.hero.placeholderPrefix}
                  inputHint={t.hero.inputHint}
                  selectedModel={selectedModel}
                  onModelChange={setSelectedModel}
                />
              </motion.div>

              {/* Server hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: isFocused ? 0.7 : 0 }}
                transition={{ duration: 0.3 }}
                className="hero-hint-message mt-3 text-[var(--color-text)] text-[10px] sm:text-xs text-center pointer-events-none h-4"
              >
                {t.hero.serverHint}
              </motion.p>

              {urlError && (
                <p className="mt-2 text-center text-sm text-[var(--color-error)]">{urlError}</p>
              )}
            </div>

            {/* Scroll indicator */}
            <motion.div
              variants={itemVariants}
              initial={false}
              animate="visible"
              className="hero-scroll-group flex flex-col items-center gap-1 text-center cursor-pointer group"
              onClick={() => {
                const target = document.querySelector('#crox-ultra');
                if (target) {
                  const navbarHeight = 80;
                  const offset = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
                  window.scrollTo({ top: offset, behavior: 'smooth' });
                }
              }}
            >
              <span className="inline-block text-sm tracking-[0.22em] uppercase font-bold leading-relaxed mb-4 text-gradient-metallic group-hover:scale-105 transition-transform">
                {t.hero.scroll}
              </span>
              <div className="flex flex-col items-center -space-y-4">
                <ChevronDown className="h-6 w-6 text-[var(--color-text-muted)] animate-scroll-slide opacity-0 group-hover:text-cyan-500 transition-colors" style={{ animationDelay: '0s' }} />
                <ChevronDown className="h-6 w-6 text-[var(--color-text-muted)] animate-scroll-slide opacity-0 group-hover:text-cyan-500 transition-colors" style={{ animationDelay: '0.2s' }} />
                <ChevronDown className="h-6 w-6 text-[var(--color-text-muted)] animate-scroll-slide opacity-0 group-hover:text-cyan-500 transition-colors" style={{ animationDelay: '0.4s' }} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} initialMode="register" />
    </AuroraBackground>
  );
}
