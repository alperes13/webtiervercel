'use client';

import { motion } from 'framer-motion';
import { FAQ_ITEMS } from '@/lib/constants';
import Accordion from '@/components/ui/Accordion';

export default function FAQ() {
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
          <h2 className="font-[family-name:var(--font-clash-display)] text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
            Sıkça Sorulan Sorular
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            Merak ettiğiniz konularda size yardımcı olalım.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12"
        >
          <Accordion items={FAQ_ITEMS} />
        </motion.div>
      </div>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
