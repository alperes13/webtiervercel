'use client';

import { motion } from 'framer-motion';
import Accordion from '@/components/ui/Accordion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FAQ() {
  const { t } = useLanguage();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
            {t.faq.title}
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            {t.faq.subtitle}
          </p>
        </motion.div>

        <div className="mt-12">
          <Accordion items={[...t.faq.items]} />
        </div>
      </div>

      <script id="faq-schema" type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(faqSchema)}
      </script>
    </section>
  );
}
