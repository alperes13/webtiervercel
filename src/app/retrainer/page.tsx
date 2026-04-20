'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Rocket, RefreshCw, TrendingUp, MessageCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { BentoGrid, type BentoItem } from '@/components/ui/bento-grid';
import { Sparkles } from '@/components/ui/sparkles';
import { VerticalCutReveal } from '@/components/ui/vertical-cut-reveal';
import { TextScramble } from '@/components/ui/text-scramble';
import Accordion from '@/components/ui/Accordion';
import { getWhatsAppUrl } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
};

export default function RetrainerPage() {
  const { t } = useLanguage();

  const handleWhatsApp = (text?: string) => {
    window.open(getWhatsAppUrl(text || 'Webtier Retrainer hakkında bilgi almak istiyorum.'), '_blank');
  };

  const featureBentoItems: BentoItem[] = t.retrainer.features.map((feature, i) => {
    const icons = [
      <Rocket key="rk" className="w-4 h-4 text-violet-500" />,
      <RefreshCw key="rc" className="w-4 h-4 text-blue-500" />,
      <TrendingUp key="tu" className="w-4 h-4 text-emerald-500" />,
    ];
    return {
      title: feature.title,
      description: feature.description,
      icon: icons[i],
      status: i === 0 ? 'Aktif' : i === 1 ? 'Sürekli' : 'Büyüme',
      tags: i === 0 ? ['Uygulama', 'CRO'] : i === 1 ? ['Aylık', 'Takip'] : ['Performans'],
      colSpan: i % 2 === 0 ? 2 : 1,
      hasPersistentHover: i === 0,
    };
  });

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-[#a78bfa]/30">

      {/* ═══ HERO ═══ */}
      <section className="relative pt-32 pb-24 lg:pb-32 overflow-hidden">
        {/* Sparkles Background */}
        <Sparkles
          className="absolute inset-0 pointer-events-none"
          density={400}
          speed={0.3}
          size={1.2}
          color="#a78bfa"
          opacity={0.35}
          direction="top"
        />
        {/* Gradient Orb */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#a78bfa]/10 blur-[120px] rounded-full opacity-40 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Title with VerticalCutReveal */}
            {/* Title with VerticalCutReveal */}
            <div className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight font-[family-name:var(--font-heading)]">
              <VerticalCutReveal
                splitBy="characters"
                staggerDuration={0.03}
                containerClassName="justify-center"
                elementLevelClassName="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
              >
                {t.retrainer.title}
              </VerticalCutReveal>
              <VerticalCutReveal
                splitBy="characters"
                staggerDuration={0.03}
                transition={{ type: 'spring', stiffness: 190, damping: 22, delay: 0.3 }}
                containerClassName="justify-center mt-2"
                elementLevelClassName="text-[#a78bfa]"
              >
                {t.retrainer.titleHighlight}
              </VerticalCutReveal>
            </div>

            {/* Subtitle */}
            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
            >
              {t.retrainer.subtitle}
            </motion.p>

            {/* CTA */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center justify-center gap-4 pt-2"
            >
              <Link href="/iletisim">
                <Button size="lg" className="bg-[#a78bfa] hover:bg-[#9061f9] text-white px-8 rounded-full h-12 text-base font-bold">
                  {t.retrainer.ctaPrimary}
                  <Rocket className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/iletisim">
                <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 text-white px-8 rounded-full h-12 text-base font-medium">
                  {t.retrainer.ctaSecondary}
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES — BentoGrid ═══ */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <BentoGrid items={featureBentoItems} />
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="py-24 bg-white/[0.01]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
            {/* Left: Text */}
            <div className="flex-1 space-y-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-bold leading-tight font-[family-name:var(--font-heading)]"
              >
                {t.retrainer.processTitle} <br />
                <span className="text-[#a78bfa]">{t.retrainer.processTitleHighlight}</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-zinc-400 text-lg leading-relaxed"
              >
                {t.retrainer.processSubtitle}
              </motion.p>
              <div className="space-y-3 py-4">
                {t.retrainer.processItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#a78bfa]/20 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-3 h-3 text-[#a78bfa]" />
                    </div>
                    <span className="text-zinc-300 text-sm md:text-base">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Terminal Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 relative group"
            >
              <div className="absolute inset-0 bg-[#a78bfa]/15 blur-[80px] rounded-full group-hover:bg-[#a78bfa]/25 transition-all duration-700 pointer-events-none" />
              <div className="relative rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl p-4 overflow-hidden shadow-2xl">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4 px-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/30" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
                  <div className="w-3 h-3 rounded-full bg-green-500/30" />
                  <span className="ml-2 text-xs text-zinc-600 font-mono">retrainer-engine-v2</span>
                </div>
                {/* Terminal Content */}
                <div className="p-4 space-y-4 font-mono text-xs md:text-sm">
                  <div className="flex gap-4">
                    <span className="text-[#a78bfa]">01</span>
                    <span className="text-zinc-500">INIT: CRO-X raporu alınıyor...</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#a78bfa]">02</span>
                    <span className="text-zinc-500">APPLY: Dijital varlıklara güncellemeler uygulanıyor...</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#a78bfa]">03</span>
                    <span className="text-emerald-500">DONE: Aylık optimizasyon tamamlandı.</span>
                  </div>
                  <div className="h-24 md:h-32 bg-white/5 rounded-xl border border-white/5 p-4 flex items-end mt-2">
                    <div className="flex-1 flex gap-1 items-end h-full">
                      {[40, 55, 60, 70, 72, 78, 82, 88, 90, 93, 95].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, duration: 0.8 }}
                          className="flex-1 bg-gradient-to-t from-[#a78bfa] to-[#9061f9] rounded-sm opacity-50"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-[family-name:var(--font-heading)]">
              {t.retrainer.faqTitle}
            </h2>
            <Accordion items={[...t.retrainer.faqItems]} variant="dark" />
          </motion.div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-24 bg-white/[0.01]">
        <div className="container mx-auto px-6">
          <div className="relative p-12 md:p-20 rounded-[40px] bg-gradient-to-br from-[#111] to-[#050505] border border-white/5 overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#a78bfa]/5 blur-[80px] rounded-full pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative z-10 space-y-8"
            >
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight font-[family-name:var(--font-heading)]">
                {t.retrainer.ctaTitle} <span className="text-[#a78bfa]">{t.retrainer.ctaTitleHighlight}</span>
              </h2>
              <p className="text-zinc-500 text-lg md:text-xl max-w-xl mx-auto">
                {t.retrainer.ctaSubtitle}
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/iletisim">
                  <Button size="lg" className="bg-white text-black hover:bg-zinc-200 px-10 rounded-full h-14 text-base font-bold w-full md:w-auto">
                    {t.retrainer.ctaPrimaryButton}
                  </Button>
                </Link>
                <Link href="/iletisim">
                  <Button size="lg" variant="ghost" className="text-white hover:bg-white/5 px-10 rounded-full h-14 text-base font-medium w-full md:w-auto">
                    {t.retrainer.ctaSecondaryButton}
                    <MessageCircle className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
