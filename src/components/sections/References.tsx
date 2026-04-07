'use client';

import { motion } from 'framer-motion';

const references = [
  { name: 'TechStore', sector: 'E-Ticaret', icon: '🛒' },
  { name: 'Kaya Danışmanlık', sector: 'Danışmanlık', icon: '💼' },
  { name: 'ModaShop', sector: 'Moda', icon: '👗' },
  { name: 'Dental Plus', sector: 'Klinik', icon: '🦷' },
  { name: 'BuildCo', sector: 'İnşaat', icon: '🏗️' },
  { name: 'EduPrime', sector: 'Eğitim', icon: '📚' },
  { name: 'FoodDelivery', sector: 'Yeme & İçme', icon: '🍕' },
  { name: 'FinanceHub', sector: 'Finans', icon: '💳' },
  { name: 'AutoServis', sector: 'Otomotiv', icon: '🚗' },
  { name: 'HealthCare+', sector: 'Sağlık', icon: '🏥' },
];

// Duplicate for seamless loop
const doubled = [...references, ...references];

export default function References() {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[var(--background)] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[var(--background)] to-transparent" />

      <div className="mb-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium uppercase tracking-widest text-[var(--color-text-muted)]"
        >
          Güvendikleri Markalar
        </motion.p>
      </div>

      {/* Marquee */}
      <div className="flex">
        <div className="flex animate-marquee gap-6 whitespace-nowrap">
          {doubled.map((ref, i) => (
            <div
              key={`${ref.name}-${i}`}
              className="glass-card flex items-center gap-3 rounded-xl px-5 py-3 shrink-0"
            >
              <span className="text-xl" aria-hidden="true">{ref.icon}</span>
              <div>
                <p className="text-sm font-semibold text-[var(--color-text)]">{ref.name}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{ref.sector}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
