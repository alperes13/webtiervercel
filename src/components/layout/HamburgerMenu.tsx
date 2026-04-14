'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, MessageCircle, Mail } from 'lucide-react';
import { HAMBURGER_MENU_ITEMS, SITE_CONFIG } from '@/lib/constants';
import { getWhatsAppUrl } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface HamburgerMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function HamburgerMenu({ open, onClose }: HamburgerMenuProps) {
  const { t, language, setLanguage, languages } = useLanguage();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[120] flex h-full w-[min(320px,calc(100vw-3rem))] flex-col bg-[var(--color-surface)] border-l border-[var(--color-border)]"
          >
            {/* Header — logo yerine */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)] shrink-0">
              <Link href="/" onClick={onClose}>
                <Image
                  src="/images/logo-black.png"
                  alt={SITE_CONFIG.name}
                  width={120}
                  height={34}
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-light)] hover:text-[var(--color-text)]"
                aria-label="Menüyü kapat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Menu Items — kaydırılabilir alan */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {[
                {
                  label: t.nav.products,
                  href: '#',
                  children: [
                    { label: t.nav.cro, href: '/#hero' },
                    { label: t.nav.ecommerce, href: '/e-ticaret' },
                    { label: t.nav.corporate, href: '/kurumsal' },
                  ],
                },
                {
                  label: t.nav.about,
                  href: '#',
                  children: [
                    { label: t.nav.brand, href: '/hakkimizda/markamiz' },
                    { label: t.nav.contact, href: '/iletisim' },
                  ],
                },
                {
                  label: t.nav.legal,
                  href: '#',
                  children: [
                    { label: t.nav.kvkk, href: '/kvkk' },
                    { label: t.nav.salesAgreement, href: '/satis-sozlesmesi' },
                    { label: t.nav.privacy, href: '/gizlilik-politikasi' },
                  ],
                },
              ].map((section) => (
                <div key={section.label}>
                  {section.children ? (
                    <>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
                        {section.label}
                      </p>
                      <div className="space-y-1">
                        {section.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={onClose}
                            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-light)] hover:text-[var(--color-accent)]"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={section.href}
                      onClick={onClose}
                      className="block rounded-lg px-3 py-2.5 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
                    >
                      {section.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Footer — dil seçici + iletişim */}
            <div className="shrink-0 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
              {/* Dil Seçici */}
              <div className="px-6 pt-4 pb-3 border-b border-[var(--color-border)]">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
                  Dil / Language
                </p>
                <div className="grid grid-cols-5 gap-1.5">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      title={lang.label}
                      className={cn(
                        'flex flex-col items-center gap-1 rounded-lg px-1 py-2 text-xs transition-colors',
                        language === lang.code
                          ? 'bg-[var(--color-accent)]/15 text-[var(--color-accent)] ring-1 ring-[var(--color-accent)]/30 font-semibold'
                          : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-light)]'
                      )}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span className="text-[10px] font-bold">{lang.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* İletişim */}
              <div className="p-6 space-y-3">
                <a
                  href={getWhatsAppUrl(SITE_CONFIG.whatsapp, SITE_CONFIG.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--color-accent-secondary)] transition-colors hover:bg-[var(--color-surface-light)]"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-light)]"
                >
                  <Mail className="h-4 w-4" />
                  {SITE_CONFIG.email}
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
