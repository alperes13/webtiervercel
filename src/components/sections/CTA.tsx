'use client';

import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { SITE_CONFIG } from '@/lib/constants';
import { getWhatsAppUrl } from '@/lib/utils';

export default function CTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dot-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full glow-amber opacity-20 blur-3xl" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-[400px] w-[400px] rounded-full glow-blue opacity-15 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">
            Başlayalım
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl font-extrabold text-[var(--color-text)] sm:text-5xl lg:text-6xl">
            Sitenizin Gerçek Potansiyelini{' '}
            <span className="text-gradient-amber">Keşfedin</span>
          </h2>
          <p className="mt-5 text-lg text-[var(--color-text-secondary)]">
            Ücretsiz CRO analiziyle başlayın. Rakiplerinizden önce harekete geçin.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/#hero">
              <Button size="lg" className="rounded-2xl px-8 text-base animate-pulse-glow">
                Ücretsiz Analiz Al
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <a
              href={getWhatsAppUrl(SITE_CONFIG.whatsapp, SITE_CONFIG.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="lg" className="rounded-2xl px-8 text-base border-[var(--color-border-light)]">
                <MessageCircle className="h-5 w-5 text-[#25D366]" />
                WhatsApp&apos;tan Yazın
              </Button>
            </a>
          </div>

          {/* Trust note */}
          <p className="mt-6 text-sm text-[var(--color-text-muted)]">
            Kredi kartı gerekmez • 2 dakikada sonuç • Uzman analizi
          </p>
        </motion.div>
      </div>
    </section>
  );
}
