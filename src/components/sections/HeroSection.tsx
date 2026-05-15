'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { GradientText } from '@/components/ui/gradient-text';
import CroXAiTrigger from '@/components/cro-x-ai/CroXAiTrigger';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeroSectionProps {
  isMiniEnabled?: boolean;
  isUltraEnabled?: boolean;
}

export default function HeroSection(_props: HeroSectionProps) {
  void _props;
  const { t } = useLanguage();

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
  };


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
              {/* CRO-X AI single trigger — opens animated chat overlay */}
              <motion.div variants={itemVariants} className="hero-input-form-container flex justify-center w-full px-[5px]">
                <CroXAiTrigger
                  defaultModel="mini"
                  placeholder={t.hero.placeholderPrefix}
                  className="anasayfa-crox"
                />
              </motion.div>

              <p className="hero-hint-message mt-3 text-[var(--color-text)] text-[10px] sm:text-xs text-center pointer-events-none h-4 opacity-0">
                {t.hero.serverHint}
              </p>
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

    </AuroraBackground>
  );
}
