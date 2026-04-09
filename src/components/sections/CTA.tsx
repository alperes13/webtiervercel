'use client';

import Link from 'next/link';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';
import { SITE_CONFIG } from '@/lib/constants';
import { getWhatsAppUrl } from '@/lib/utils';

export default function CTA() {
  const { t } = useLanguage();
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dot-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full glow-amber opacity-20 blur-3xl" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-[400px] w-[400px] max-w-[100vw] rounded-full glow-blue opacity-15 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/80">
            {t.cta.label}
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            {t.cta.title}{' '}
            <span className="text-gradient-amber">{t.cta.titleHighlight}</span>
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            {t.cta.subtitle}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/#hero">
              <Button size="lg" variant="secondary" className="px-8 min-w-[200px] border-none shadow-[0_0_40px_rgba(245,158,11,0.2)] hover:shadow-[0_0_60px_rgba(245,158,11,0.4)] transition-shadow">
                {t.cta.primaryCta}
                <ArrowUpRight className="h-5 w-5" />
              </Button>
            </Link>
            <a
              href={getWhatsAppUrl(SITE_CONFIG.whatsapp, SITE_CONFIG.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="lg" className="rounded-2xl px-8 text-base border-[var(--color-border-light)]">
                <MessageCircle className="h-5 w-5 text-[#25D366]" />
                {t.cta.secondaryCta}
              </Button>
            </a>
          </div>

          {/* Trust note */}
          <p className="mt-6 text-sm text-[var(--color-text-muted)]">
            {t.cta.trustNote}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
