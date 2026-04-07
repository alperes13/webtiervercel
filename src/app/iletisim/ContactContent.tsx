'use client';

import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { SITE_CONFIG } from '@/lib/constants';
import { getWhatsAppUrl } from '@/lib/utils';

const contactMethods = [
  {
    icon: <MessageCircle className="h-6 w-6" />,
    title: 'WhatsApp',
    description: 'En hızlı iletişim yolu',
    value: SITE_CONFIG.phone,
    href: getWhatsAppUrl(SITE_CONFIG.whatsapp, SITE_CONFIG.whatsappMessage),
    color: 'text-[#25D366]',
    bgColor: 'bg-[#25D366]/10',
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: 'Email',
    description: 'Detaylı sorularınız için',
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
    color: 'text-[var(--color-accent)]',
    bgColor: 'bg-[var(--color-accent)]/10',
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: 'Telefon',
    description: 'Mesai saatlerinde arayın',
    value: SITE_CONFIG.phone,
    href: `tel:${SITE_CONFIG.phone}`,
    color: 'text-[var(--color-accent-secondary)]',
    bgColor: 'bg-[var(--color-accent-secondary)]/10',
  },
];

export default function ContactContent() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-[family-name:var(--font-clash-display)] text-4xl font-bold text-[var(--color-text)] sm:text-5xl">
              İletişime Geçin
            </h1>
            <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
              Projeniz hakkında konuşalım. Size en uygun çözümü birlikte belirleyelim.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {contactMethods.map((method, i) => (
              <motion.a
                key={method.title}
                href={method.href}
                target={method.title === 'WhatsApp' ? '_blank' : undefined}
                rel={method.title === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-card)] p-6 text-center transition-all hover:border-[var(--color-accent)]/30 hover:shadow-lg"
              >
                <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${method.bgColor} ${method.color}`}>
                  {method.icon}
                </div>
                <h3 className="mt-4 font-[family-name:var(--font-clash-display)] text-lg font-semibold text-[var(--color-text)]">
                  {method.title}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">{method.description}</p>
                <p className="mt-3 text-sm font-medium text-[var(--color-text-secondary)]">{method.value}</p>
              </motion.a>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 rounded-2xl border border-[var(--color-accent-secondary)]/20 bg-[var(--color-surface-card)] p-8 text-center"
          >
            <MapPin className="mx-auto h-8 w-8 text-[var(--color-accent)]" />
            <h2 className="mt-4 font-[family-name:var(--font-clash-display)] text-2xl font-bold text-[var(--color-text)]">
              Hızlı Yanıt Alın
            </h2>
            <p className="mt-2 text-[var(--color-text-secondary)]">
              WhatsApp üzerinden anında dönüş yapıyoruz. Projenizi tartışmak için bize yazın.
            </p>
            <div className="mt-6">
              <a
                href={getWhatsAppUrl(SITE_CONFIG.whatsapp, SITE_CONFIG.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="accent" size="lg">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp ile Yazın
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
