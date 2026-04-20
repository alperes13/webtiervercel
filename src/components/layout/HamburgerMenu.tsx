'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, MessageCircle, Mail, Globe, ChevronDown, Rocket, ShoppingBag, Landmark, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { getWhatsAppUrl } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface HamburgerMenuProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: 'cro', href: '/dashboard', icon: Rocket, color: 'text-cyan-500' },
  { id: 'retrainer', href: '/retrainer', icon: Sparkles, color: 'text-purple-500' },
  { id: 'ecommerce', href: '/e-ticaret', icon: ShoppingBag, color: 'text-orange-500' },
  { id: 'corporate', href: '/kurumsal', icon: Landmark, color: 'text-blue-500' },
];

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
          {/* Backdrop with heavy blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Panel - Extraordinary Glass Design */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 z-[120] flex h-full w-[min(380px,85vw)] flex-col bg-white/90 dark:bg-[#0A0A0A]/90 backdrop-blur-2xl border-l border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.3)] overflow-hidden"
          >
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-5%] left-[-10%] w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="relative flex items-center justify-between p-8 shrink-0">
              <Link href="/" onClick={onClose} className="group transition-transform active:scale-95">
                <div className="relative">
                   <Image
                    src="/images/logo-black.png"
                    alt={SITE_CONFIG.name}
                    width={130}
                    height={38}
                    className="h-9 w-auto object-contain dark:invert"
                  />
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
                </div>
              </Link>
              <button
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[var(--color-text-muted)] transition-all hover:bg-black/10 dark:hover:bg-white/10 hover:rotate-90 active:scale-90"
                aria-label="Kapat"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Menu Items - Staggered */}
            <div className="relative flex-1 overflow-y-auto px-6 py-4 space-y-2">
              <div className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-6 px-3">Navigasyon</div>
              <div className="space-y-3">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-center gap-4 p-4 rounded-2xl transition-all hover:bg-black/[0.03] dark:hover:bg-white/[0.03] active:bg-black/[0.05]"
                    >
                      <div className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-2xl bg-white dark:bg-black border border-black/5 dark:border-white/10 shadow-sm transition-all group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-md",
                        item.color
                      )}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-lg font-black text-[var(--color-text)] leading-none">{t.nav[item.id as keyof typeof t.nav]}</span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mt-1">Keşfet</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Language Selector */}
              <div className="mt-12 pt-8 border-t border-black/5 dark:border-white/5">
                <div className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-6 px-3">Tercihler</div>
                <div className="px-3">
                  <button
                    onClick={() => setLangOpen(!langOpen)}
                    className={cn(
                      "flex w-full items-center justify-between p-4 rounded-2xl border border-black/5 dark:border-white/10 transition-all",
                      langOpen ? "bg-black/[0.02] dark:bg-white/[0.02] border-cyan-500/50" : "hover:bg-black/[0.01] dark:hover:bg-white/[0.01]"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
                        <Globe className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Dil Seçimi</div>
                        <div className="text-sm font-black uppercase text-[var(--color-text)]">
                           {currentLang.label} ({currentLang.code})
                        </div>
                      </div>
                    </div>
                    <ChevronDown className={cn("h-5 w-5 transition-transform duration-300", langOpen && "rotate-180")} />
                  </button>
                  
                  <AnimatePresence>
                    {langOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden space-y-1 mt-2"
                      >
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                            className={cn(
                              "w-full flex items-center justify-between p-3.5 rounded-xl text-sm transition-all",
                              language === lang.code 
                                ? "bg-cyan-500 text-white font-black shadow-lg shadow-cyan-500/20" 
                                : "text-[var(--color-text-secondary)] hover:bg-black/5 dark:hover:bg-white/5 font-bold"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{lang.flag}</span>
                              <span className="uppercase tracking-tight">{lang.label}</span>
                            </div>
                            {language === lang.code && <div className="h-2 w-2 rounded-full bg-white animate-pulse" />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Footer - Floating Contact */}
            <div className="relative shrink-0 p-8 space-y-3 bg-gradient-to-t from-white dark:from-black to-transparent">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-2 gap-3"
              >
                <a
                  href={getWhatsAppUrl(SITE_CONFIG.whatsapp, SITE_CONFIG.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-[#25D366]/10 p-4 text-[#25D366] transition-all hover:bg-[#25D366]/20 border border-[#25D366]/20 group active:scale-95"
                >
                  <MessageCircle className="h-6 w-6 group-hover:animate-bounce" />
                  <span className="text-[10px] font-black uppercase tracking-tighter">WhatsApp</span>
                </a>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-cyan-500/10 p-4 text-cyan-600 transition-all hover:bg-cyan-500/20 border border-cyan-500/20 group active:scale-95"
                >
                  <Mail className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-tighter">E-posta</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
