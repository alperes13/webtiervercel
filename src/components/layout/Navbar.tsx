'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, UserRound, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import HamburgerMenu from './HamburgerMenu';
import { Button } from '@/components/ui/Button';
import { MenuToggleIcon } from '@/components/ui/MenuToggleIcon';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  
  const [menuOpen, setMenuOpen] = useState(false);
  const { session, isAuthenticated, isHydrated } = useAuth();
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
        <nav
        className={cn(
          'fixed top-0 left-0 w-full z-[80] transition-all duration-500',
          scrolled
            ? 'bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Links - Left (Desktop Only) */}
            <div className="hidden md:flex items-center gap-8 md:flex-1">
                <Link
                  href="/dashboard"
                  className={cn(
                    "text-sm font-semibold transition-colors duration-200",
                    scrolled ? "text-slate-600 hover:text-black" : "text-slate-700 hover:text-black"
                  )}
                >
                  {t.nav.cro}
                </Link>
                <Link
                  href="/retrainer"
                  className={cn(
                    "text-sm font-semibold transition-colors duration-200",
                    scrolled ? "text-slate-600 hover:text-black" : "text-slate-700 hover:text-black"
                  )}
                >
                  {t.nav.retrainer}
                </Link>
            </div>

            {/* Logo - Center on Desktop, Left on Mobile */}
            <div className="flex md:flex-1 md:justify-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/logo-black.png"
                  alt="Webtier"
                  width={154}
                  height={44}
                  className="h-11 sm:h-12 w-auto object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Right side - Right (Always) */}
            <div className="flex items-center gap-3 md:flex-1 justify-end">
              {/* Simple Language Toggle (TR <-> EN) */}
              <button
                onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
                className={cn(
                  "hidden sm:flex h-9 items-center justify-center rounded-lg border px-3 text-xs font-bold transition-all uppercase",
                  scrolled
                    ? "border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-black"
                    : "border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-white/50"
                )}
                aria-label="Toggle Language"
              >
                {language === 'tr' ? 'EN' : 'TR'}
              </button>

              {isHydrated && isAuthenticated ? (
                <Link href="/dashboard">
                  <Button
                    size="sm"
                    variant="secondary"
                    className={cn(
                      "rounded-lg border font-bold px-3 sm:px-4",
                      scrolled 
                        ? "border-slate-200 bg-slate-50 text-slate-900" 
                        : "border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    <UserRound className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {session?.firstName || session?.email.split('@')[0]}
                    </span>
                  </Button>
                </Link>
              ) : (
                <Link href="/auth/login">
                  <Button
                    size="sm"
                    variant="secondary"
                    className={cn(
                      "rounded-lg border font-bold px-3 sm:px-4",
                      scrolled 
                        ? "border-slate-200 bg-slate-50 text-slate-900" 
                        : "border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    <UserRound className="h-4 w-4" />
                    <span className="hidden sm:inline">{t.dashboard.auth.login}</span>
                  </Button>
                </Link>
              )}

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg border transition-all z-[130]",
                  scrolled
                    ? "border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-black"
                    : "border-slate-300 text-slate-700 hover:bg-white/50 hover:text-black"
                )}
                aria-label="Toggle Menu"
              >
                <MenuToggleIcon open={menuOpen} className="h-5 w-5" duration={350} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
