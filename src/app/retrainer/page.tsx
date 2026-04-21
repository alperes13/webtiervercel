'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Rocket,
  RefreshCw,
  TrendingUp,
  MessageCircle,
  CheckCircle,
  BarChart3,
  Target,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import BackgroundPaths from '@/components/ui/background-paths';
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline';
import AnimatedBentoCard from '@/components/ui/bento-card-animated';
import {
  InterfacesAccordion,
  InterfacesAccordionItem,
  InterfacesAccordionTrigger,
  InterfacesAccordionContent,
} from '@/components/ui/interfaces-accordion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function RetrainerPage() {
  const { t } = useLanguage();

  const timelineData = [
    {
      id: 1,
      title: 'CRO-X Raporu',
      date: 'Adım 1',
      content: 'CRO-X AI analizinden gelen kapsamlı rapor ve öneriler değerlendirilir, öncelikli aksiyonlar belirlenir.',
      category: 'Analiz',
      icon: BarChart3,
      relatedIds: [2],
      status: 'completed' as const,
      energy: 100,
    },
    {
      id: 2,
      title: 'Uygulama',
      date: 'Adım 2',
      content: 'Rapordaki tüm aksiyonlar web sitenize ve dijital varlıklarınıza profesyonel ekibimizle uygulanır.',
      category: 'Uygulama',
      icon: Rocket,
      relatedIds: [1, 3],
      status: 'in-progress' as const,
      energy: 75,
    },
    {
      id: 3,
      title: 'Takip & Analiz',
      date: 'Adım 3',
      content: 'Uygulanan değişikliklerin performansı aylık olarak takip edilir, raporlanır ve değerlendirilir.',
      category: 'Takip',
      icon: Target,
      relatedIds: [2, 4],
      status: 'pending' as const,
      energy: 50,
    },
    {
      id: 4,
      title: 'Optimizasyon',
      date: 'Adım 4',
      content: 'Veriler ışığında yeni iyileştirme fırsatları tespit edilir ve sürekli olarak uygulanır.',
      category: 'Optimizasyon',
      icon: RefreshCw,
      relatedIds: [3, 5],
      status: 'pending' as const,
      energy: 30,
    },
    {
      id: 5,
      title: 'Büyüme',
      date: 'Adım 5',
      content: 'Dönüşüm oranlarınız aydan aya artar, sürdürülebilir büyüme ve gelir artışı sağlanır.',
      category: 'Büyüme',
      icon: TrendingUp,
      relatedIds: [4],
      status: 'pending' as const,
      energy: 10,
    },
  ];

  const bentoTabs = [
    {
      id: 'implementation',
      label: 'Uygulama',
      icon: <Rocket className="w-4 h-4" />,
      title: 'CRO-X Uygulama Hizmeti',
      description:
        'CRO-X AI raporundaki tüm önerileri web sitenize, e-ticaret altyapınıza ve dijital varlıklarınıza profesyonel ekibimizle uyguluyoruz.',
      features: [
        'Web sitesi teknik güncellemeler',
        'UX/UI iyileştirmeleri',
        'CTA optimizasyonu',
        'Mobil uyumluluk düzenlemeleri',
        'Sayfa hızı optimizasyonu',
      ],
    },
    {
      id: 'monthly',
      label: 'Aylık Takip',
      icon: <RefreshCw className="w-4 h-4" />,
      title: 'Aylık Optimizasyon Döngüsü',
      description:
        'Her ay düzenli olarak performans takibi yapar, yeni iyileştirme fırsatlarını tespit eder ve dijital varlıklarınıza uygularız.',
      features: [
        'Aylık performans raporu',
        'Yeni optimizasyon önerileri',
        'A/B test stratejileri',
        'Kullanıcı davranış analizi',
        'Dönüşüm hunisi takibi',
      ],
    },
    {
      id: 'growth',
      label: 'Büyüme',
      icon: <TrendingUp className="w-4 h-4" />,
      title: 'Sürekli Büyüme Motoru',
      description:
        'Abonelik süresi boyunca dijital varlıklarınız sürekli güncellenir, dönüşüm oranlarınız aydan aya artar.',
      features: [
        'Sürdürülebilir dönüşüm artışı',
        'Rakip analizi ve kıyaslama',
        'Trend adaptasyonu',
        'Proaktif iyileştirmeler',
        'Esnek abonelik modeli',
      ],
    },
  ];

  const processItems = t.retrainer.processItems;

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-[#a78bfa]/30">
      {/* ═══ HERO — Background Paths ═══ */}
      <BackgroundPaths
        title={t.retrainer.title}
        titleHighlight={t.retrainer.titleHighlight}
        subtitle={t.retrainer.subtitle}
        color="text-[#a78bfa]"
      >
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link href="/iletisim">
            <Button
              size="lg"
              className="bg-[#a78bfa] hover:bg-[#9061f9] text-white px-8 rounded-full h-12 text-base font-bold"
            >
              {t.retrainer.ctaPrimary}
              <Rocket className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link href="/iletisim">
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 hover:bg-white/5 text-white px-8 rounded-full h-12 text-base font-medium"
            >
              {t.retrainer.ctaSecondary}
            </Button>
          </Link>
        </div>
      </BackgroundPaths>

      {/* ═══ ORBITAL TIMELINE ═══ */}
      <section className="border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center pt-16 pb-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-[family-name:var(--font-heading)]">
              {t.retrainer.processTitle}{' '}
              <span className="text-[#a78bfa]">{t.retrainer.processTitleHighlight}</span>
            </h2>
            <p className="mt-4 text-zinc-500 text-lg max-w-2xl mx-auto">
              {t.retrainer.processSubtitle}
            </p>
          </div>
        </div>
        <RadialOrbitalTimeline timelineData={timelineData} />
      </section>

      {/* ═══ BENTO CARD — Features ═══ */}
      <section className="py-24 bg-white/[0.01]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-[family-name:var(--font-heading)]">
              Neler{' '}
              <span className="text-[#a78bfa]">Dahil?</span>
            </h2>
            <p className="mt-4 text-zinc-500 text-lg">
              Retrainer hizmetinin kapsamını keşfedin
            </p>
          </div>
          <AnimatedBentoCard tabs={bentoTabs} accentColor="#a78bfa" />
        </div>
      </section>

      {/* ═══ PROCESS CHECKLIST ═══ */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto space-y-4">
            {processItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/8 hover:border-[#a78bfa]/30 transition-all"
              >
                <div className="w-5 h-5 rounded-full bg-[#a78bfa]/20 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-3 h-3 text-[#a78bfa]" />
                </div>
                <span className="text-zinc-300 text-sm md:text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ — Interfaces Accordion ═══ */}
      <section className="py-24 bg-white/[0.01]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-[family-name:var(--font-heading)]">
              {t.retrainer.faqTitle}
            </h2>
            <InterfacesAccordion type="single" collapsible>
              {t.retrainer.faqItems.map((item, i) => (
                <InterfacesAccordionItem key={i} value={`faq-${i}`}>
                  <InterfacesAccordionTrigger>{item.question}</InterfacesAccordionTrigger>
                  <InterfacesAccordionContent>{item.answer}</InterfacesAccordionContent>
                </InterfacesAccordionItem>
              ))}
            </InterfacesAccordion>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="relative p-12 md:p-20 rounded-[40px] bg-gradient-to-br from-[#111] to-[#050505] border border-white/5 overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#a78bfa]/8 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight font-[family-name:var(--font-heading)]">
                {t.retrainer.ctaTitle}{' '}
                <span className="text-[#a78bfa]">{t.retrainer.ctaTitleHighlight}</span>
              </h2>
              <p className="text-zinc-500 text-lg md:text-xl max-w-xl mx-auto">
                {t.retrainer.ctaSubtitle}
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/iletisim">
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-zinc-200 px-10 rounded-full h-14 text-base font-bold w-full md:w-auto"
                  >
                    {t.retrainer.ctaPrimaryButton}
                  </Button>
                </Link>
                <Link href="/iletisim">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="text-white hover:bg-white/5 px-10 rounded-full h-14 text-base font-medium w-full md:w-auto"
                  >
                    {t.retrainer.ctaSecondaryButton}
                    <MessageCircle className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
