'use client';

import Link from 'next/link';
import { ArrowRight, TrendingUp, ShoppingBag, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

const features = [
  { icon: <TrendingUp className="h-4 w-4" />, text: 'Daha yüksek dönüşüm oranı' },
  { icon: <ShoppingBag className="h-4 w-4" />, text: 'Güçlü satın alma akışı' },
  { icon: <Smartphone className="h-4 w-4" />, text: 'Mobil optimizasyon' },
];

export default function EcommercePreview() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block rounded-full bg-[var(--color-accent)]/10 px-4 py-1.5 text-xs font-semibold text-[var(--color-accent)]">
              E-Ticaret
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-clash-display)] text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
              E-Ticaret Siteniz{' '}
              <span className="text-[var(--color-accent)]">Satış Makinesi</span>{' '}
              Olsun
            </h2>
            <p className="mt-4 text-[var(--color-text-secondary)] leading-relaxed">
              Dönüşüm odaklı e-ticaret altyapısı ile ziyaretçilerinizi müşteriye
              dönüştürün. Sepet terk oranını düşürün, ortalama sipariş değerini
              artırın.
            </p>

            <ul className="mt-6 space-y-3">
              {features.map((feature) => (
                <li key={feature.text} className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-accent-secondary)]/10 text-[var(--color-accent-secondary)]">
                    {feature.icon}
                  </span>
                  {feature.text}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link href="/e-ticaret">
                <Button variant="secondary" size="lg">
                  Detaylı Bilgi
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            {/* Placeholder visual */}
            <div className="aspect-[4/3] rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-surface-card)] to-[var(--color-surface-light)] p-8 flex items-center justify-center">
              <div className="text-center">
                <ShoppingBag className="mx-auto h-16 w-16 text-[var(--color-accent)]/30" />
                <p className="mt-4 text-sm text-[var(--color-text-muted)]">E-Ticaret Mockup</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
