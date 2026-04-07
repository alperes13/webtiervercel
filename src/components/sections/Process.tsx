'use client';

import { Search, MessageCircle, Target, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '@/lib/constants';

const iconMap: Record<string, React.ReactNode> = {
  Search: <Search className="h-5 w-5" />,
  MessageCircle: <MessageCircle className="h-5 w-5" />,
  Target: <Target className="h-5 w-5" />,
  Rocket: <Rocket className="h-5 w-5" />,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Process() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full glow-blue opacity-20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--color-accent-blue)]">
            Nasıl Çalışıyoruz?
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-[var(--color-text)] sm:text-4xl lg:text-5xl">
            4 Adımda Dönüşüm Artışı
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.step}
              variants={itemVariants}
              className="relative text-center"
            >
              {/* Connector */}
              {index < PROCESS_STEPS.length - 1 && (
                <div className="absolute top-10 left-1/2 hidden h-px w-full bg-gradient-to-r from-[var(--color-accent)]/30 via-[var(--color-accent-blue)]/20 to-transparent lg:block" />
              )}

              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.2 }}
                className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-[var(--color-border-accent)] bg-[var(--color-surface-card)] text-[var(--color-accent)]"
              >
                <span className="absolute -top-2.5 -right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-accent)] text-xs font-bold text-[var(--color-primary)]">
                  {step.step}
                </span>
                {iconMap[step.icon]}
              </motion.div>

              <h3 className="mt-5 font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-text)]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
