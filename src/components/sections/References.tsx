'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

// Split logos into two rows for variety
const LOGO_COUNT = 17;
const allLogos = Array.from({ length: LOGO_COUNT }, (_, i) => ({
  id: i + 1,
  path: `/images/logos/${i + 1}.png`
}));

// Split logos into two distinct rows
const row1 = allLogos.slice(0, 9);
const row2 = allLogos.slice(9);

// Quadrupled to ensure they fill the screen and provide a seamless loop
const repeatedRow1 = [...row1, ...row1, ...row1, ...row1];
const repeatedRow2 = [...row2, ...row2, ...row2, ...row2];

export default function References() {
  const { t } = useLanguage();
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-48 bg-gradient-to-r from-[var(--background)] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-48 bg-gradient-to-l from-[var(--background)] to-transparent" />

      <div className="mb-14 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted)]"
        >
          {t.references.label}
        </motion.p>
      </div>

      <div className="flex flex-col gap-16">
        {/* Marquee Row 1 (Forward) */}
        <div className="flex w-full overflow-hidden">
          <div className="flex animate-marquee gap-12 whitespace-nowrap items-center py-6">
            {repeatedRow1.map((logo: { id: number; path: string }, i: number) => (
              <div
                key={`r1-${logo.id}-${i}`}
                className="flex items-center justify-center shrink-0 opacity-40 hover:opacity-100 transition-all duration-300 filter grayscale hover:grayscale-0 px-6"
              >
                <img 
                  src={logo.path} 
                  alt={`Partner Logo ${logo.id}`} 
                  className="h-20 w-auto object-contain max-w-[240px]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Marquee Row 2 (Reverse) */}
        <div className="flex w-full overflow-hidden">
          <div className="flex animate-marquee-reverse gap-12 whitespace-nowrap items-center py-6">
            {repeatedRow2.map((logo: { id: number; path: string }, i: number) => (
              <div
                key={`r2-${logo.id}-${i}`}
                className="flex items-center justify-center shrink-0 opacity-40 hover:opacity-100 transition-all duration-300 filter grayscale hover:grayscale-0 px-6"
              >
                <img 
                  src={logo.path} 
                  alt={`Partner Logo ${logo.id}`} 
                  className="h-20 w-auto object-contain max-w-[240px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
