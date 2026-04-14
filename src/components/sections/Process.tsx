'use client';

import Link from 'next/link';
import { Search, MessageCircle, Target, Rocket, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { PROCESS_STEPS } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageContext';

const iconMap: Record<string, React.ReactNode> = {
  Search: <Search className="h-7 w-7" />,
  MessageCircle: <MessageCircle className="h-7 w-7" />,
  Target: <Target className="h-7 w-7" />,
  Rocket: <Rocket className="h-7 w-7" />,
};



const stepColors = [
  'from-[#6366f1]/20 to-[#6366f1]/5 border-[#6366f1]/30',
  'from-[#f59e0b]/20 to-[#f59e0b]/5 border-[#f59e0b]/30',
  'from-[#10b981]/20 to-[#10b981]/5 border-[#10b981]/30',
  'from-[#e879f9]/20 to-[#e879f9]/5 border-[#e879f9]/30',
];

const iconColors = [
  'bg-[#6366f1]/15 text-[#6366f1] ring-[#6366f1]/25',
  'bg-[#f59e0b]/15 text-[#f59e0b] ring-[#f59e0b]/25',
  'bg-[#10b981]/15 text-[#10b981] ring-[#10b981]/25',
  'bg-[#e879f9]/15 text-[#e879f9] ring-[#e879f9]/25',
];

const numberColors = [
  'text-[#6366f1]',
  'text-[#f59e0b]',
  'text-[#10b981]',
  'text-[#e879f9]',
];

export default function Process() {
  const { t } = useLanguage();
  
  const steps = t.process.steps.map((step, index) => ({
    ...step,
    icon: Object.values(iconMap)[index],
    step: index + 1
  }));

  return (
    <section className="site-section section-process relative pt-0 !important lg:pt-0 !important pb-10 lg:pb-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dot-grid opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] max-w-full rounded-full bg-[var(--color-accent)]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent-blue)]">
            {t.process.label}
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-[var(--color-text)] sm:text-4xl lg:text-5xl">
            {t.process.title}{' '}
            <span className="text-gradient-amber">{t.process.titleHighlight}</span>
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-base text-[var(--color-text-secondary)] leading-relaxed">
            {t.process.subtitle}
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: index * 0.1, ease: 'easeOut' }}
              className={`relative flex flex-col rounded-2xl border bg-gradient-to-b ${stepColors[index]} p-6 lg:p-7`}
            >
              {/* Big step number (background) */}
              <span className={`absolute top-4 right-5 font-[family-name:var(--font-heading)] text-6xl font-black opacity-10 select-none ${numberColors[index]}`}>
                {step.step}
              </span>

              {/* Icon */}
              <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ${iconColors[index]}`}>
                {step.icon}
              </div>


              {/* Title */}
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--color-text)] leading-tight">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)] flex-1">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, delay: 0.45 }}
          className="mt-14 flex flex-col items-center gap-4 text-center"
        >
          <Link href="/#hero">
            <Button size="lg" className="animate-pulse-glow rounded-2xl px-10 text-base font-semibold">
              {t.process.steps[0].title} {t.process.titleHighlight}
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
