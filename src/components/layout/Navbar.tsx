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
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  
  const [menuOpen, setMenuOpen] = useState(false);
  const { session, isAuthenticated, isHydrated } = useAuth();
  const { t } = useLanguage();

  return (
    <>
        <nav
        className={cn(
          'fixed top-0 left-0 w-full z-[80] transition-all duration-500',
          scrolled
            ? 'bg-[var(--color-surface)]/80 backdrop-blur-[2px] border-b border-[var(--color-border)]'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Links - Left (Desktop Only) */}
            <div className="hidden md:flex items-center gap-8 md:flex-1">
                <Link
                  href="/dashboard"
                  className="text-sm font-semibold text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-text)]"
                >
                  {t.nav.cro}
                </Link>
                <Link
                  href="/retrainer"
                  className="text-sm font-semibold text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-text)]"
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
                  width={160}
                  height={48}
                  className="h-11 sm:h-12 w-auto object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Right side - Right (Always) */}
            <div className="flex items-center gap-3 md:flex-1 justify-end">
              {/* Simplified Language Selector */}
              <LanguageSwitcher className="hidden sm:block" />

              {isHydrated && isAuthenticated ? (
                <Link href="/dashboard">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="rounded-xl border border-[var(--color-border-light)] bg-[var(--color-surface-card)]/80 px-3 text-[var(--color-text)] sm:px-4 font-bold"
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
                    className="rounded-xl border border-[var(--color-border-light)] bg-[var(--color-surface-card)]/80 px-3 text-[var(--color-text)] sm:px-4 font-bold"
                  >
                    <UserRound className="h-4 w-4" />
                    <span className="hidden sm:inline">{t.dashboard.auth.login}</span>
                  </Button>
                </Link>
              )}

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-border-light)] hover:bg-[var(--color-surface-light)] hover:text-[var(--color-text)] z-[130]"
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
