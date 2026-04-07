'use client';

import { Crosshair, BarChart3, Zap, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

const reasons = [
  {
    icon: <Crosshair className="h-6 w-6" />,
    title: 'CRO Odaklı Yaklaşım',
    description: 'Sadece güzel site yapmıyoruz. Her element dönüşüm için tasarlanıyor.',
    color: 'text-[var(--color-accent)] bg-[var(--color-accent)]/10',
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: 'Veri Destekli Kararlar',
    description: 'Tahminlere değil, verilere dayanarak optimizasyon yapıyoruz.',
    color: 'text-[var(--color-accent-blue)] bg-[var(--color-accent-blue)]/10',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Hızlı Sonuçlar',
    description: 'İlk iyileştirmeler 2-4 hafta içinde etkisini göstermeye başlar.',
    color: 'text-[var(--color-accent-secondary)] bg-[var(--color-accent-secondary)]/10',
  },
  {
    icon: <HeartHandshake className="h-6 w-6" />,
    title: 'Şeffaf İletişim',
    description: 'WhatsApp üzerinden her adımda yanınızdayız. Sürpriz yok.',
    color: 'text-[var(--color-accent)] bg-[var(--color-accent)]/10',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function WhyUs() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--color-accent-secondary)]">
            Neden Webtier?
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-[var(--color-text)] sm:text-4xl lg:text-5xl">
            Fark Yaratan Yaklaşım
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Rakiplerinizden bir adım önde olmanızı sağlayan metodoloji.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.title}
              variants={itemVariants}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              className="gradient-border glass-card flex gap-5 rounded-2xl p-6"
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${reason.color}`}>
                {reason.icon}
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-text)]">
                  {reason.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
