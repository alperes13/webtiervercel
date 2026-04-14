'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import RuixenStats from "@/components/ui/ruixen-stats";
import { Box } from "@/components/ui/pricing-card-with-features";

export default function CROXUltraSection() {
  const { t } = useLanguage();

  return (
    <section
      id="crox-ultra"
      className="crox-ultra-container relative w-full bg-transparent py-6 lg:py-24 overflow-hidden scroll-mt-20"
    >
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* --- PART 1: Paket Kapsamı GRID --- */}
        <div id="crox-ultra" className="crox-ultra-content-grid space-y-12 lg:space-y-20 mb-20 lg:mb-32">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

            {/* Left: Title Area */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="crox-ultra-title-area lg:w-1/3 flex flex-col justify-center"
            >
              <h2 className="crox-ultra-section-title text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[0.9] font-[family-name:var(--font-heading)] mb-6">
                {t.croxUltra.title}
              </h2>

              <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
                {t.croxUltra.subtitle}
              </p>
            </motion.div>

            {/* Right: Dense Grid */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5 }}
              className="crox-ultra-items-grid lg:w-2/3"
            >
              <div className="relative rounded-[32px] border border-white/10 bg-zinc-900/40 backdrop-blur-lg p-8 lg:p-10 shadow-2xl">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-6 gap-y-3">
                  {(t.croxUltra.items ?? []).map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.02 }}
                      className="flex items-start gap-2 group/item"
                    >
                      <CheckCircle className="h-3.5 w-3.5 mt-0.5 shrink-0 text-cyan-500 transition-transform group-hover/item:scale-110" />
                      <span className="text-zinc-400 text-[11px] lg:text-[12px] font-semibold leading-tight group-hover/item:text-white transition-colors">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* --- PART 2: RuixenStats (Now in the middle) --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="crox-ultra-stats-wrapper"
          >
            <div className="relative rounded-[40px] border border-white/5 bg-white/[0.01] backdrop-blur-md overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none" />
              <RuixenStats />
            </div>
          </motion.div>

          {/* Pricing & Summary (Side-by-side Below Stats) */}
          {/* Pricing Wrap (Two Cards Side-by-side) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="crox-ultra-pricing-wrap flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-12"
          >
            {/* Card 1: ULTRA (Existing, now first) */}
            <div className="w-full max-w-lg">
              <Box
                title="CRO-X AI ULTRA"
                subtitle="Geleceğinizi analiz ile tecrübe edin"
                price="249 TL"
                ctaText={t.croxUltra.cta}
              />
            </div>

            {/* Card 2: MINI (New, now second) */}
            <div className="w-full max-w-lg">
              <Box
                title="CRO-X AI MINI"
                subtitle="Dijital varlığınızı analiz edin, farkı görün"
                price="Ücretsiz"
                priceNote="Kart bilgisi gerekmez"
                ctaText="ANALİZ AL"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
