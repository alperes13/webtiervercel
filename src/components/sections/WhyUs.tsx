'use client';

import { Crosshair, BarChart3, Zap, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const reasons = [
  {
    icon: <Crosshair className="h-6 w-6" />,
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
  },
  {
    icon: <Zap className="h-6 w-6" />,
  },
  {
    icon: <HeartHandshake className="h-6 w-6" />,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function WhyUs() {
  const { t } = useLanguage();
  return (
    <section className="site-section section-why-us py-12 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14 text-center"
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[var(--color-accent-blue)]">
            {t.whyUs.label}
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-[var(--color-text)] sm:text-4xl lg:text-5xl">
            {t.whyUs.title}
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            {t.whyUs.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {t.whyUs.items.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-card)] transition-hover hover:border-[var(--color-border-light)] group"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-surface-light)] to-[var(--color-surface)] border border-[var(--color-border)] group-hover:border-[var(--color-accent)]/50 transition-colors">
                <div className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors">
                  {reasons[index % reasons.length].icon}
                </div>
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-text)] leading-tight">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
