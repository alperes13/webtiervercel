'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X, MessageCircle, Mail } from 'lucide-react';
import { HAMBURGER_MENU_ITEMS, SITE_CONFIG } from '@/lib/constants';
import { getWhatsAppUrl } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface HamburgerMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function HamburgerMenu({ open, onClose }: HamburgerMenuProps) {
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
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-full w-80 bg-[var(--color-surface)] border-l border-[var(--color-border)] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <span className="font-[family-name:var(--font-clash-display)] text-lg font-bold text-[var(--color-text)]">
                {SITE_CONFIG.name}
              </span>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-light)] hover:text-[var(--color-text)]"
                aria-label="Menüyü kapat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-6 space-y-6">
              {HAMBURGER_MENU_ITEMS.map((section) => (
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

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-[var(--color-border)] p-6 space-y-3 bg-[var(--color-surface)]">
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
