'use client';

import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Testimonials() {
  const { t } = useLanguage();
  return (
    <section className="site-section section-testimonials relative py-12 lg:py-32">
      <div className="absolute inset-0 bg-dot-grid opacity-20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full glow-amber opacity-10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">
            {t.testimonials.label}
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-[var(--color-text)] sm:text-4xl lg:text-5xl">
            {t.testimonials.title}
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {t.testimonials.items.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              layout={false}
              className="gradient-border glass-card animate-shimmer flex flex-col rounded-2xl p-7"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[var(--color-accent)] text-[var(--color-accent)]" />
                ))}
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="mt-5 flex items-center gap-3 border-t border-[var(--color-border)] pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent)]/10 text-sm font-bold text-[var(--color-accent)]">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text)]">{testimonial.name}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
