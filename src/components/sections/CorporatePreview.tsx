'use client';

import Link from 'next/link';
import { ArrowRight, Shield, Layers, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

const features = [
  { icon: <Shield className="h-4 w-4" />, text: 'Güçlü ilk izlenim' },
  { icon: <Layers className="h-4 w-4" />, text: 'Net hizmet sunumu' },
  { icon: <Users className="h-4 w-4" />, text: 'Lead üretimi' },
];

export default function CorporatePreview() {
  return (
    <section className="py-20 lg:py-28 bg-[var(--color-surface-card)]/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Visual - left on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-[4/3] rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-surface-card)] to-[var(--color-surface-light)] p-8 flex items-center justify-center">
              <div className="text-center">
                <Shield className="mx-auto h-16 w-16 text-[var(--color-accent-secondary)]/30" />
                <p className="mt-4 text-sm text-[var(--color-text-muted)]">Kurumsal Mockup</p>
              </div>
            </div>
          </motion.div>

          {/* Content - right on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-block rounded-full bg-[var(--color-accent-secondary)]/10 px-4 py-1.5 text-xs font-semibold text-[var(--color-accent-secondary)]">
              Kurumsal
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-clash-display)] text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
              Kurumsal Siteniz{' '}
              <span className="text-[var(--color-accent-secondary)]">İş Üretsin</span>
            </h2>
            <p className="mt-4 text-[var(--color-text-secondary)] leading-relaxed">
              Kurumsal web siteniz sadece bir kartvizit olmasın. Güven veren, lead
              üreten, iş getiren bir dijital varlık oluşturun.
            </p>

            <ul className="mt-6 space-y-3">
              {features.map((feature) => (
                <li key={feature.text} className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                    {feature.icon}
                  </span>
                  {feature.text}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link href="/kurumsal">
                <Button variant="secondary" size="lg">
                  Detaylı Bilgi
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
