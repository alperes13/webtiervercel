'use client';

import Link from 'next/link';
import { ArrowRight, BarChart3, ShoppingCart, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const iconMap: Record<string, React.ReactNode> = {
  BarChart3: <BarChart3 className="h-6 w-6" />,
  ShoppingCart: <ShoppingCart className="h-6 w-6" />,
  Building2: <Building2 className="h-6 w-6" />,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function ServicesOverview() {
  const { t } = useLanguage();

  const serviceConfig = [
    { icon: <BarChart3 className="h-6 w-6" />, href: '/#hero' },
    { icon: <ShoppingCart className="h-6 w-6" />, href: '/e-ticaret' },
    { icon: <Building2 className="h-6 w-6" />, href: '/kurumsal' },
  ];

  return (
    <section className="site-section section-services py-8 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14 text-center"
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">
            {t.services.label}
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-[var(--color-text)] sm:text-4xl lg:text-5xl">
            {t.services.title}
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {t.services.items.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.3, ease: 'easeOut' } }}
              className="group gradient-border glass-card flex flex-col rounded-2xl p-7 transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            >
              <div className={`mb-5 flex h-13 w-13 items-center justify-center rounded-xl ${
                index === 0
                  ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
                  : index === 1
                  ? 'bg-[var(--color-accent-blue)]/10 text-[var(--color-accent-blue)]'
                  : 'bg-[var(--color-accent-secondary)]/10 text-[var(--color-accent-secondary)]'
              }`}>
                {serviceConfig[index % serviceConfig.length].icon}
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--color-text)]">
                {service.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {service.description}
              </p>
              <Link
                href={serviceConfig[index % serviceConfig.length].href}
                className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                  index === 0
                    ? 'text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]'
                    : index === 1
                    ? 'text-[var(--color-accent-blue)] hover:text-[var(--color-accent-blue-hover)]'
                    : 'text-[var(--color-accent-secondary)] hover:text-[var(--color-accent-secondary)]/80'
                }`}
              >
                {service.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
