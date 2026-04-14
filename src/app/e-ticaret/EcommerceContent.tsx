'use client';

import Link from 'next/link';
import { ArrowUpRight, MessageCircle, CheckCircle2, ShoppingCart, TrendingUp, Smartphone, Search, Package, CreditCard, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Accordion from '@/components/ui/Accordion';
import { SITE_CONFIG } from '@/lib/constants';
import { getWhatsAppUrl } from '@/lib/utils';

import { useLanguage } from '@/contexts/LanguageContext';

export default function EcommerceContent() {
  const { t } = useLanguage();

  const serviceDetails = [
    { icon: <ShoppingCart className="h-5 w-5" />, ...t.ecommerce.details[0] },
    { icon: <Package className="h-5 w-5" />, ...t.ecommerce.details[1] },
    { icon: <CreditCard className="h-5 w-5" />, ...t.ecommerce.details[2] },
    { icon: <Smartphone className="h-5 w-5" />, ...t.ecommerce.details[3] },
    { icon: <Search className="h-5 w-5" />, ...t.ecommerce.details[4] },
    { icon: <BarChart3 className="h-5 w-5" />, ...t.ecommerce.details[5] },
  ];

  return (
    <div className="pt-24 lg:pt-32">
      {/* Hero */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-[var(--color-accent)]/10 blur-[130px]" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block rounded-full bg-[var(--color-accent)]/10 px-4 py-1.5 text-xs font-semibold text-[var(--color-accent)]">
              {t.ecommerce.tag}
            </span>
            <h1 className="mt-6 font-[family-name:var(--font-clash-display)] text-4xl font-bold text-[var(--color-text)] sm:text-5xl">
              {t.ecommerce.title}{' '}
              <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] bg-clip-text text-transparent">
                {t.ecommerce.titleHighlight}
              </span>
              {t.ecommerce.titleSuffix && (
                <span> {t.ecommerce.titleSuffix}</span>
              )}
            </h1>
            <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
              {t.ecommerce.subtitle}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/#hero" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">
                  {t.ecommerce.ctaAnalysis} <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href={getWhatsAppUrl(SITE_CONFIG.whatsapp, 'Merhaba, e-ticaret çözümleri hakkında bilgi almak istiyorum.')} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <MessageCircle className="mr-2 h-4 w-4" /> {t.ecommerce.ctaWhatsApp}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-12 bg-white/5 border-y border-white/5">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-[family-name:var(--font-clash-display)] text-2xl font-bold text-[var(--color-text)] sm:text-3xl text-center">
              {t.ecommerce.problemsTitle}
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {t.ecommerce.problems.map((problem) => (
                <div key={problem} className="flex items-center gap-4 rounded-xl border border-[var(--color-error)]/20 bg-[var(--color-error)]/5 p-5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-error)]/10">
                    <TrendingUp className="h-4 w-4 text-[var(--color-error)]" />
                  </div>
                  <span className="text-base text-[var(--color-text-secondary)]">{problem}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-[family-name:var(--font-clash-display)] text-2xl font-bold text-[var(--color-text)] sm:text-4xl text-gradient-amber">
              {t.ecommerce.detailsTitle}
            </h2>
            <p className="mt-3 text-[var(--color-text-secondary)]">{t.ecommerce.detailsSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceDetails.map((detail, i) => (
              <motion.div key={detail.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: i * 0.05 }}>
                <Card className="p-7 flex flex-col items-start border-white/5 hover:border-[var(--color-accent)]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--color-accent)]/5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] ring-1 ring-[var(--color-accent)]/20 mb-5">
                    {detail.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">{detail.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{detail.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="paketler" className="py-16 bg-white/5 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-clash-display)] text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
              {t.ecommerce.packagesTitle}
            </h2>
            <p className="mt-3 text-[var(--color-text-secondary)]">{t.ecommerce.packagesSubtitle}</p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {t.ecommerce.packages.map((pkg, i) => (
              <motion.div key={pkg.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: i * 0.08 }}>
                <Card className={`relative flex flex-col p-7 transition-all duration-300 ${pkg.highlighted ? 'border-[var(--color-accent)]/50 ring-1 ring-[var(--color-accent)]/20 bg-white/5 shadow-2xl shadow-[var(--color-accent)]/10' : 'border-white/5'}`}>
                  {pkg.highlighted && pkg.popularBadge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                      <span className="rounded-full bg-[var(--color-accent)] px-4 py-1.5 text-[10px] font-bold text-white shadow-lg tracking-wider uppercase">
                        {pkg.popularBadge}
                      </span>
                    </div>
                  )}
                  <div className="mb-5">
                    <h3 className="font-[family-name:var(--font-clash-display)] text-2xl font-bold text-[var(--color-text)]">{pkg.name}</h3>
                    <p className="mt-1.5 text-sm text-[var(--color-text-secondary)]">{pkg.description}</p>
                  </div>
                  <ul className="mt-2 space-y-2.5">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)] group">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--color-accent)] group-hover:scale-110 transition-all duration-300" />
                        <span className="pt-0.5">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={getWhatsAppUrl(SITE_CONFIG.whatsapp, `Merhaba, ${pkg.name} hakkında bilgi almak istiyorum.`)} target="_blank" rel="noopener noreferrer" className="mt-8">
                    <Button variant={pkg.highlighted ? 'default' : 'outline'} className="w-full h-11 text-sm font-semibold">
                      {pkg.ctaText} <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-clash-display)] text-2xl font-bold text-[var(--color-text)] sm:text-3xl">
              {t.ecommerce.faqTitle}
            </h2>
          </div>
          <Accordion items={[...t.ecommerce.faqItems]} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-b from-white/5 to-transparent border-t border-white/5">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-clash-display)] text-3xl font-bold text-[var(--color-text)] sm:text-5xl leading-tight">
            {t.ecommerce.ctaTitle} <br className="hidden sm:block" />
            <span className="text-[var(--color-accent)]">{t.ecommerce.ctaTitleHighlight}</span>
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/#hero" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto px-10">{t.ecommerce.ctaAnalysis} <ArrowUpRight className="ml-2 h-4 w-4" /></Button>
            </Link>
            <a href={getWhatsAppUrl(SITE_CONFIG.whatsapp, SITE_CONFIG.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-10"><MessageCircle className="mr-2 h-4 w-4" /> {t.ecommerce.ctaWhatsApp}</Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
