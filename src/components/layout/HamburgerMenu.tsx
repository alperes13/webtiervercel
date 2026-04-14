'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, MessageCircle, Mail, Globe, ChevronDown } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
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
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setLangOpen(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const currentLang = languages.find(l => l.code === language) ?? languages[0];

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
            {/* Header */}
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
                aria-label="Kapat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <div className="space-y-4">
                <Link
                  href="/#hero"
                  onClick={onClose}
                  className="block text-xl font-bold text-[var(--color-text)] hover:text-cyan-500 transition-colors"
                >
                  {t.nav.cro}
                </Link>
                <Link
                  href="/retrainer"
                  onClick={onClose}
                  className="block text-xl font-bold text-[var(--color-text)] hover:text-cyan-500 transition-colors"
                >
                  {t.nav.retrainer}
                </Link>
                <Link
                  href="/iletisim"
                  onClick={onClose}
                  className="block text-xl font-bold text-[var(--color-text)] hover:text-cyan-500 transition-colors"
                >
                  {t.nav.contact}
                </Link>
              </div>

              {/* Minimal Language Selector */}
              <div className="pt-4 border-t border-[var(--color-border)]">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex w-full items-center justify-between py-2 text-sm font-bold text-[var(--color-text-secondary)]"
                >
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span className="uppercase">{currentLang.label} ({currentLang.code})</span>
                  </div>
                  <ChevronDown className={cn("h-4 w-4 transition-transform", langOpen && "rotate-180")} />
                </button>
                
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden space-y-1 pt-2"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                          className={cn(
                            "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all",
                            language === lang.code 
                              ? "bg-cyan-500/10 text-cyan-500 font-bold" 
                              : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-light)]"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.label}</span>
                          </div>
                          {language === lang.code && <div className="h-1.5 w-1.5 rounded-full bg-cyan-500" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Footer */}
            <div className="shrink-0 p-6 border-t border-[var(--color-border)] space-y-3">
              <a
                href={getWhatsAppUrl(SITE_CONFIG.whatsapp, SITE_CONFIG.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl bg-[#25D366]/10 px-4 py-3 text-sm font-bold text-[#25D366] transition-all hover:bg-[#25D366]/20 border border-[#25D366]/20"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Destek
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-3 rounded-2xl bg-[var(--color-surface-light)] px-4 py-3 text-sm font-bold text-[var(--color-text-secondary)] transition-all hover:text-[var(--color-text)] border border-[var(--color-border)]"
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
