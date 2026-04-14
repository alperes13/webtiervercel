'use client';

import Link from 'next/link';
import { ArrowUpRight, MessageCircle, CheckCircle2, Shield, Layers, Users, Globe, FileText, Phone as PhoneIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Accordion from '@/components/ui/Accordion';
import { SITE_CONFIG } from '@/lib/constants';
import { getWhatsAppUrl } from '@/lib/utils';

import { useLanguage } from '@/contexts/LanguageContext';

export default function CorporateContent() {
  const { t } = useLanguage();

  const targetAudience = [
    { icon: <Shield className="h-5 w-5" />, ...t.corporate.audience[0] },
    { icon: <FileText className="h-5 w-5" />, ...t.corporate.audience[1] },
    { icon: <Globe className="h-5 w-5" />, ...t.corporate.audience[2] },
    { icon: <Layers className="h-5 w-5" />, ...t.corporate.audience[3] },
    { icon: <Users className="h-5 w-5" />, ...t.corporate.audience[4] },
    { icon: <PhoneIcon className="h-5 w-5" />, ...t.corporate.audience[5] },
  ];

  return (
    <div className="pt-24 lg:pt-32">
      {/* Hero */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-[var(--color-accent-secondary)]/10 blur-[130px]" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block rounded-full bg-[var(--color-accent-secondary)]/10 px-4 py-1.5 text-xs font-semibold text-[var(--color-accent-secondary)]">
              {t.corporate.tag}
            </span>
            <h1 className="mt-6 font-[family-name:var(--font-clash-display)] text-4xl font-bold text-[var(--color-text)] sm:text-5xl">
              {t.corporate.title}{' '}
              <span className="bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent)] bg-clip-text text-transparent">
                {t.corporate.titleHighlight}
              </span>
            </h1>
            <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
              {t.corporate.subtitle}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/#hero" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto px-8">
                  {t.corporate.ctaAnalysis} <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href={getWhatsAppUrl(SITE_CONFIG.whatsapp, 'Merhaba, kurumsal web tasarım hakkında bilgi almak istiyorum.')} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 text-white border-white/20">
                  <MessageCircle className="mr-2 h-4 w-4" /> {t.corporate.ctaWhatsApp}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-12 bg-white/5 border-y border-white/5">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-[family-name:var(--font-clash-display)] text-2xl font-bold text-[var(--color-text)] sm:text-3xl text-center">
              {t.corporate.problemsTitle}
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {t.corporate.problems.map((problem) => (
                <div key={problem} className="flex items-center gap-4 rounded-xl border border-[var(--color-error)]/20 bg-[var(--color-error)]/5 p-5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-error)]/10">
                    <Shield className="h-4 w-4 text-[var(--color-error)]" />
                  </div>
                  <span className="text-base text-[var(--color-text-secondary)]">{problem}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-clash-display)] text-2xl font-bold text-[var(--color-text)] sm:text-3xl text-center">
            {t.corporate.featuresTitle}
          </h2>
          <div className="mt-10 rounded-2xl border border-[var(--color-accent-secondary)]/20 bg-[var(--color-surface-card)] p-5 sm:p-8">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {t.corporate.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--color-accent-secondary)]" />
                  {feature}
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <a href={getWhatsAppUrl(SITE_CONFIG.whatsapp, 'Merhaba, Kurumsal Web Tasarım paketi hakkında teklif almak istiyorum.')} target="_blank" rel="noopener noreferrer">
                <Button size="lg">
                  {t.corporate.ctaOffer} <ArrowUpRight className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 lg:py-20 bg-white/5 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-[family-name:var(--font-clash-display)] text-3xl font-bold text-[var(--color-text)] sm:text-4xl text-gradient-blue">
              {t.corporate.audienceTitle}
            </h2>
            <p className="mt-3 text-[var(--color-text-secondary)]">{t.corporate.audienceSubtitle}</p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {targetAudience.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: i * 0.05 }}>
                <Card className="p-8 flex flex-col items-start border-white/5 hover:border-[var(--color-accent-secondary)]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--color-accent-secondary)]/5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-accent-secondary)]/10 text-[var(--color-accent-secondary)] ring-1 ring-[var(--color-accent-secondary)]/20 mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">{item.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-clash-display)] text-2xl font-bold text-[var(--color-text)] sm:text-3xl">
              {t.corporate.faqTitle}
            </h2>
          </div>
          <Accordion items={[...t.corporate.faqItems]} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-white/5 to-transparent border-t border-white/5">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-clash-display)] text-3xl font-bold text-[var(--color-text)] sm:text-5xl leading-tight">
            {t.corporate.ctaTitle} <br className="hidden sm:block" />
            <span className="text-[var(--color-accent-secondary)]">{t.corporate.ctaTitleHighlight}</span>
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/#hero" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto px-10">{t.corporate.ctaAnalysis} <ArrowUpRight className="ml-2 h-4 w-4" /></Button>
            </Link>
            <a href={getWhatsAppUrl(SITE_CONFIG.whatsapp, SITE_CONFIG.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-10 text-white border-white/20"><MessageCircle className="mr-2 h-4 w-4" /> {t.corporate.ctaWhatsApp}</Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
