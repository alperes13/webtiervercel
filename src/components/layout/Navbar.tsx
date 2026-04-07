'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import HamburgerMenu from './HamburgerMenu';
import Button from '@/components/ui/Button';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-[var(--color-surface)]/80 backdrop-blur-2xl border-b border-[var(--color-border)]'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo-white.png"
                alt="Webtier"
                width={120}
                height={36}
                className="h-8 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden items-center gap-8 md:flex">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-text)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <Link href="/#hero" className="hidden sm:block">
                <Button size="sm" className="animate-pulse-glow">
                  Ücretsiz Analiz
                </Button>
              </Link>

              <button
                onClick={() => setMenuOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-border-light)] hover:bg-[var(--color-surface-light)] hover:text-[var(--color-text)]"
                aria-label="Menüyü aç"
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
