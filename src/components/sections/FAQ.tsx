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
    <section className="site-section section-faq py-8 lg:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-16"
        >
          <h2 className="font-[family-name:var(--font-heading)] text-4xl lg:text-6xl font-black text-white leading-tight mb-6">
            {t.faq.title}
          </h2>
          <p className="text-xl text-zinc-500 leading-relaxed">
            {t.faq.subtitle}
          </p>
        </motion.div>

        <div className="site-faq-accordion-wrap">
          <Accordion items={[...t.faq.items]} variant="dark" className="space-y-4" />
        </div>
      </div>

      <script id="faq-schema" type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(faqSchema)}
      </script>
    </section>
  );
}
