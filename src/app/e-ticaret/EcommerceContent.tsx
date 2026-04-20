'use client';

import Link from 'next/link';
import { ArrowUpRight, MessageCircle, CheckCircle2, ShoppingCart, TrendingUp, Smartphone, Search, Package, CreditCard, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { BentoGrid, type BentoItem } from '@/components/ui/bento-grid';
import { Box } from '@/components/ui/pricing-card-with-features';
import Accordion from '@/components/ui/Accordion';
import { Sparkles } from '@/components/ui/sparkles';
import { VerticalCutReveal } from '@/components/ui/vertical-cut-reveal';
import { TextScramble } from '@/components/ui/text-scramble';
import { SITE_CONFIG } from '@/lib/constants';
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

export default function EcommerceContent() {
  const { t } = useLanguage();

  const whatsappUrl = getWhatsAppUrl(SITE_CONFIG.whatsapp, 'Merhaba, e-ticaret çözümleri hakkında bilgi almak istiyorum.');

  const bentoItems: BentoItem[] = t.ecommerce.details.map((detail, i) => {
    const icons = [
      <ShoppingCart key="sc" className="w-4 h-4 text-orange-500" />,
      <Package key="pk" className="w-4 h-4 text-amber-500" />,
      <CreditCard key="cc" className="w-4 h-4 text-emerald-500" />,
      <Smartphone key="sp" className="w-4 h-4 text-blue-500" />,
      <Search key="se" className="w-4 h-4 text-purple-500" />,
      <BarChart3 key="bc" className="w-4 h-4 text-sky-500" />,
    ];
    return {
      title: detail.title,
      description: detail.desc,
      icon: icons[i],
      status: undefined,
      tags: [],
      colSpan: i < 2 || i > 3 ? 2 : 1,
      hasPersistentHover: i === 0,
    };
  });

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-orange-500/30">

      {/* ═══ HERO ═══ */}
      <section className="relative pt-32 pb-24 lg:pb-32 overflow-hidden">
        {/* Sparkles Background */}
        <Sparkles
          className="absolute inset-0 pointer-events-none"
          density={400}
          speed={0.3}
          size={1.2}
          color="#f97316"
          opacity={0.4}
          direction="top"
        />
        {/* Gradient Orb */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-orange-500/10 blur-[120px] rounded-full opacity-40 pointer-events-none" />

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
                {t.ecommerce.title}
              </VerticalCutReveal>
              <VerticalCutReveal
                splitBy="characters"
                staggerDuration={0.03}
                transition={{ type: 'spring', stiffness: 190, damping: 22, delay: 0.3 }}
                containerClassName="justify-center mt-2"
                elementLevelClassName="text-orange-400"
              >
                {t.ecommerce.titleHighlight}
              </VerticalCutReveal>
              {t.ecommerce.titleSuffix && (
                <VerticalCutReveal
                  splitBy="characters"
                  staggerDuration={0.03}
                  transition={{ type: 'spring', stiffness: 190, damping: 22, delay: 0.5 }}
                  containerClassName="justify-center mt-2"
                  elementLevelClassName="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
                >
                  {t.ecommerce.titleSuffix}
                </VerticalCutReveal>
              )}
            </div>

            {/* Subtitle */}
            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
            >
              {t.ecommerce.subtitle}
            </motion.p>

            {/* CTA */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
            >
              <Link href="/#hero">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 rounded-full h-12 text-base font-bold">
                  {t.ecommerce.ctaAnalysis}
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/iletisim">
                <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 text-white px-8 rounded-full h-12 text-base font-medium">
                  <MessageCircle className="mr-2 w-4 h-4" />
                  {t.ecommerce.ctaWhatsApp}
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ PROBLEMS ═══ */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold tracking-tight text-center font-[family-name:var(--font-heading)] mb-16"
            >
              {t.ecommerce.problemsTitle}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.ecommerce.problems.map((problem, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-red-500/20 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <TrendingUp className="w-4 h-4 text-red-400" />
                  </div>
                  <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors leading-relaxed">{problem}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SERVICE DETAILS — BentoGrid ═══ */}
      <section className="py-24 bg-white/[0.01]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-4"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-[family-name:var(--font-heading)]">
              {t.ecommerce.detailsTitle}
            </h2>
            <p className="mt-4 text-zinc-500 text-lg">{t.ecommerce.detailsSubtitle}</p>
          </motion.div>
          <BentoGrid items={bentoItems} />
        </div>
      </section>

      {/* ═══ PACKAGES — Box Pricing Cards ═══ */}
      <section id="paketler" className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-[family-name:var(--font-heading)]">
              {t.ecommerce.packagesTitle}
            </h2>
            <p className="mt-4 text-zinc-500 text-lg">{t.ecommerce.packagesSubtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
            {t.ecommerce.packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Box
                  title={pkg.name}
                  subtitle={pkg.description}
                  price={''}
                  priceClassName={''}
                  features={[...pkg.features]}
                  ctaText={pkg.ctaText}
                  showTotalLabel={false}
                  creditText=""
                  href="/iletisim"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-24 bg-white/[0.01]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-[family-name:var(--font-heading)]">
              {t.ecommerce.faqTitle}
            </h2>
            <Accordion items={[...t.ecommerce.faqItems]} variant="dark" />
          </motion.div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="relative p-12 md:p-20 rounded-[40px] bg-gradient-to-br from-[#111] to-[#050505] border border-white/5 overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/5 blur-[80px] rounded-full pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative z-10 space-y-8"
            >
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight font-[family-name:var(--font-heading)]">
                {t.ecommerce.ctaTitle}{' '}
                <span className="text-orange-400">{t.ecommerce.ctaTitleHighlight}</span>
              </h2>
              <p className="text-zinc-500 text-lg md:text-xl max-w-xl mx-auto">
                Ücretsiz CRO analizi ile başlayın. E-ticaret sitenizin gerçek potansiyelini keşfedin.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/#hero">
                  <Button size="lg" className="bg-white text-black hover:bg-zinc-200 px-10 rounded-full h-14 text-base font-bold w-full md:w-auto">
                    {t.ecommerce.ctaAnalysis}
                    <ArrowUpRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/iletisim">
                  <Button size="lg" variant="ghost" className="text-white hover:bg-white/5 px-10 rounded-full h-14 text-base font-medium w-full md:w-auto">
                    {t.ecommerce.ctaWhatsApp}
                    <MessageCircle className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <p className="text-xs text-zinc-600 font-medium">
                Kredi kartı gerekmez • 2 dakikada sonuç • Uzman analizi
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
