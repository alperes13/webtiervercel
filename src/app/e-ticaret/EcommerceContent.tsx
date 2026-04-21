'use client';

import Link from 'next/link';
import {
  ArrowUpRight,
  MessageCircle,
  TrendingUp,
  ShoppingCart,
  Smartphone,
  Search,
  Package,
  CreditCard,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { BentoGrid, type BentoItem } from '@/components/ui/bento-grid';
import { Box } from '@/components/ui/pricing-card-with-features';
import {
  InterfacesAccordion,
  InterfacesAccordionItem,
  InterfacesAccordionTrigger,
  InterfacesAccordionContent,
} from '@/components/ui/interfaces-accordion';
import { CinematicHero } from '@/components/ui/cinematic-landing-hero';
import { useLanguage } from '@/contexts/LanguageContext';

/* ─── Main ──────────────────────────────────────────────── */
export default function EcommerceContent() {
  const { t } = useLanguage();

  const bentoItems: BentoItem[] = t.ecommerce.details.map((detail, i) => {
    const icons = [
      <ShoppingCart key="sc" className="w-4 h-4 text-blue-400" />,
      <Package key="pk" className="w-4 h-4 text-indigo-400" />,
      <CreditCard key="cc" className="w-4 h-4 text-emerald-400" />,
      <Smartphone key="sp" className="w-4 h-4 text-sky-400" />,
      <Search key="se" className="w-4 h-4 text-violet-400" />,
      <BarChart3 key="bc" className="w-4 h-4 text-cyan-400" />,
    ];
    return {
      title: detail.title,
      description: detail.desc,
      icon: icons[i],
      status: undefined,
      tags: [],
      colSpan: i < 2 || i > 3 ? 2 : 1,
      hasPersistentHover: i === 0,
    };
  });

  return (
    <div className="min-h-screen bg-[#060c1a] text-white selection:bg-blue-500/30">
      <div className="overflow-x-hidden w-full min-h-screen">
        <CinematicHero />
      </div>

      {/* Problems */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center font-[family-name:var(--font-heading)] mb-16">
              {t.ecommerce.problemsTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.ecommerce.problems.map((problem, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-blue-500/25 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <TrendingUp className="w-4 h-4 text-red-400" />
                  </div>
                  <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors leading-relaxed">
                    {problem}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-24 bg-white/[0.015]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-[family-name:var(--font-heading)]">
              {t.ecommerce.detailsTitle}
            </h2>
            <p className="mt-4 text-zinc-500 text-lg">{t.ecommerce.detailsSubtitle}</p>
          </div>
          <BentoGrid items={bentoItems} />
        </div>
      </section>

      {/* Packages */}
      <section id="paketler" className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-[family-name:var(--font-heading)]">
              {t.ecommerce.packagesTitle}
            </h2>
            <p className="mt-4 text-zinc-500 text-lg">{t.ecommerce.packagesSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
            {t.ecommerce.packages.map((pkg) => (
              <Box key={pkg.name} title={pkg.name} subtitle={pkg.description} price="" priceClassName=""
                features={[...pkg.features]} ctaText={pkg.ctaText} showTotalLabel={false}
                creditText="" href="/iletisim" />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white/[0.015]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-[family-name:var(--font-heading)]">
              {t.ecommerce.faqTitle}
            </h2>
            <InterfacesAccordion type="single" collapsible>
              {t.ecommerce.faqItems.map((item, i) => (
                <InterfacesAccordionItem key={i} value={`faq-${i}`}>
                  <InterfacesAccordionTrigger>{item.question}</InterfacesAccordionTrigger>
                  <InterfacesAccordionContent>{item.answer}</InterfacesAccordionContent>
                </InterfacesAccordionItem>
              ))}
            </InterfacesAccordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="relative p-12 md:p-20 rounded-[40px] overflow-hidden text-center"
            style={{ background: 'linear-gradient(145deg,#0f1d4a 0%,#060c1a 100%)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/8 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight font-[family-name:var(--font-heading)]">
                {t.ecommerce.ctaTitle}{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-300">
                  {t.ecommerce.ctaTitleHighlight}
                </span>
              </h2>
              <p className="text-zinc-400 text-lg md:text-xl max-w-xl mx-auto">
                Ücretsiz CRO analizi ile başlayın. E-ticaret sitenizin gerçek potansiyelini keşfedin.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/#hero">
                  <Button size="lg" className="bg-white text-black hover:bg-zinc-200 px-10 rounded-full h-14 text-base font-bold w-full md:w-auto">
                    {t.ecommerce.ctaAnalysis} <ArrowUpRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/iletisim">
                  <Button size="lg" variant="ghost" className="text-white hover:bg-white/5 px-10 rounded-full h-14 text-base font-medium w-full md:w-auto">
                    {t.ecommerce.ctaWhatsApp} <MessageCircle className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <p className="text-xs text-zinc-600 font-medium">Kredi kartı gerekmez • 2 dakikada sonuç • Uzman analizi</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
