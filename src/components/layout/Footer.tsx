'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Mail, Phone } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { getWhatsAppUrl } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';



export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo-white.png"
                alt="Webtier"
                width={140}
                height={40}
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
              {t.footer.tagline}
            </p>
          </div>

          {/* Hizmetler */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              {t.footer.servicesLabel}
            </h3>
            <ul className="mt-4 space-y-3">
              {t.footer.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kurumsal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              {t.footer.legalLabel}
            </h3>
            <ul className="mt-4 space-y-3">
              {t.footer.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              {t.footer.contactLabel}
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={getWhatsAppUrl(SITE_CONFIG.whatsapp, SITE_CONFIG.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent-secondary)]"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
                >
                  <Mail className="h-4 w-4" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
                >
                  <Phone className="h-4 w-4" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-[var(--color-border)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. {t.footer.rights}
          </p>
          <Link href="/iletisim" className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">
            {t.footer.contact}
          </Link>
        </div>
      </div>
    </footer>
  );
}
