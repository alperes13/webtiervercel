'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Mail, Phone } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { getWhatsAppUrl } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export default function Footer() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '/tr' || pathname === '/en';

  const textClass = isHome ? "text-[var(--color-text-muted)]" : "text-slate-600";
  const linkClass = isHome ? "text-white" : "text-slate-900";
  const headingClass = isHome ? "text-[var(--color-text-muted)]" : "text-slate-500";

  return (
    <footer className={cn(
      "transition-colors duration-500",
      isHome ? "bg-transparent" : "border-t border-[var(--color-border)] bg-white"
    )}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src={isHome ? "/images/logo-white.png" : "/images/logo-black.png"}
                alt="Webtier"
                width={140}
                height={40}
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </Link>
            <p className={cn("mt-4 text-sm leading-relaxed", textClass)}>
              {t.footer.tagline}
            </p>
          </div>

          {/* Hizmetler */}
          <div>
            <h3 className={cn("text-xs font-bold uppercase tracking-wider", headingClass)}>
              {t.footer.servicesLabel}
            </h3>
            <ul className="mt-4 space-y-3">
              {t.footer.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={cn("text-sm font-medium transition-colors hover:text-cyan-600", linkClass)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kurumsal */}
          <div>
            <h3 className={cn("text-xs font-bold uppercase tracking-wider", headingClass)}>
              {t.footer.legalLabel}
            </h3>
            <ul className="mt-4 space-y-3">
              {t.footer.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={cn("text-sm font-medium transition-colors hover:text-cyan-600", linkClass)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className={cn("text-xs font-bold uppercase tracking-wider", headingClass)}>
              {t.footer.contactLabel}
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/iletisim"
                  className={cn("flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#25D366]", linkClass)}
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Link>
              </li>
              <li>
                <Link
                  href="/iletisim"
                  className={cn("flex items-center gap-2 text-sm font-medium transition-colors hover:text-cyan-600", linkClass)}
                >
                  <Mail className="h-4 w-4" />
                  {SITE_CONFIG.email}
                </Link>
              </li>
              <li>
                <Link
                  href="/iletisim"
                  className={cn("flex items-center gap-2 text-sm font-medium transition-colors hover:text-cyan-600", linkClass)}
                >
                  <Phone className="h-4 w-4" />
                  {SITE_CONFIG.phone}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-[var(--color-border)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={cn("text-xs font-medium", textClass)}>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
