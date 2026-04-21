'use client';

import Link from 'next/link';
import {
  ArrowUpRight,
  MessageCircle,
  CheckCircle2,
  Shield,
  Layers,
  Users,
  Globe,
  FileText,
  Phone as PhoneIcon,
  TrendingUp,
  Palette,
  BarChart3,
  Search,
  Sparkles as SparklesIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Sparkles } from '@/components/ui/sparkles';
import ShimmerText from '@/components/ui/shimmer-text-animated';
import GlassCard from '@/components/ui/glass-card';
import FeatureCarousel from '@/components/ui/feature-carousel';
import {
  InterfacesAccordion,
  InterfacesAccordionItem,
  InterfacesAccordionTrigger,
  InterfacesAccordionContent,
} from '@/components/ui/interfaces-accordion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CorporateContent() {
  const { t } = useLanguage();

  const glassCardIcons = [
    <Shield key="sh" className="w-5 h-5" />,
    <FileText key="ft" className="w-5 h-5" />,
    <Globe key="gl" className="w-5 h-5" />,
    <Layers key="la" className="w-5 h-5" />,
    <Users key="us" className="w-5 h-5" />,
    <PhoneIcon key="ph" className="w-5 h-5" />,
  ];

  const glassCardColors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#0ea5e9'];

  const carouselSlides = [
    {
      id: 'design',
      icon: <Palette className="w-6 h-6" />,
      title: 'Premium Tasarım',
      description:
        'Marka kimliğinizi yansıtan, benzersiz ve modern kurumsal web tasarımı. İlk izlenim her şeydir.',
      features: [
        'Özel UI/UX tasarım süreci',
        'Marka odaklı renk paleti',
        'Profesyonel tipografi',
        'Animasyonlu etkileşimler',
        'Responsive tasarım',
      ],
    },
    {
      id: 'seo',
      icon: <Search className="w-6 h-6" />,
      title: 'SEO & Performans',
      description:
        "Google'da üst sıralarda yer almanız için teknik SEO ve sayfa performansı optimizasyonu.",
      features: [
        'On-page SEO optimizasyonu',
        'Core Web Vitals uyumu',
        'Schema markup entegrasyonu',
        'Sitemap ve robots.txt',
        'Sayfa hızı optimizasyonu',
      ],
    },
    {
      id: 'conversion',
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Dönüşüm Odaklı',
      description:
        'Ziyaretçileri müşteriye dönüştüren stratejik tasarım ve CTA optimizasyonu.',
      features: [
        'CTA stratejik yerleşimi',
        'Lead yakalama formları',
        'Güven sinyalleri entegrasyonu',
        'Kullanıcı yolculuğu planlaması',
        'A/B test altyapısı',
      ],
    },
    {
      id: 'tech',
      icon: <SparklesIcon className="w-6 h-6" />,
      title: 'Modern Teknoloji',
      description:
        'En güncel web teknolojileri ile hızlı, güvenli ve ölçeklenebilir altyapı.',
      features: [
        'Next.js / React altyapısı',
        'Headless CMS entegrasyonu',
        'SSL sertifikası',
        'CDN üzerinden hızlı dağıtım',
        'Otomatik yedekleme',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-cyan-500/30">
      {/* ═══ HERO — Sparkles (Aceternity) ═══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Sparkles
          className="absolute inset-0 pointer-events-none"
          density={600}
          speed={0.4}
          size={1.4}
          color="#06b6d4"
          opacity={0.35}
          direction="top"
        />
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-cyan-500/8 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter font-[family-name:var(--font-heading)]"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40">
                Marka Olmak Mı?
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
            >
              {t.corporate.subtitle}
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5">
            <motion.div
              className="w-1 h-1.5 rounded-full bg-cyan-400/60"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* ═══ SHIMMER TEXT SECTION (100vh) ═══ */}
      <section className="min-h-screen flex items-center justify-center bg-[#030303] border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight font-[family-name:var(--font-heading)] leading-tight">
              <ShimmerText
                text="Dijital dünyada fark yaratın."
                shimmerColor="rgba(6,182,212,0.75)"
                duration={2.5}
              />
            </h2>
            <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
              Profesyonel kurumsal web tasarımı ile markanızı dijitalde güçlü bir şekilde konumlandırın.
              İlk izlenim, kalıcı etki.
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Link href="/iletisim">
                <Button
                  size="lg"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-10 rounded-full h-14 text-base font-bold"
                >
                  Teklif Al
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ GLASS CARDS — Audience/Features ═══ */}
      <section className="py-24 bg-white/[0.01]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-[family-name:var(--font-heading)]">
              {t.corporate.audienceTitle}
            </h2>
            <p className="mt-4 text-zinc-500 text-lg">{t.corporate.audienceSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {t.corporate.audience.map((item, i) => (
              <GlassCard
                key={i}
                icon={glassCardIcons[i]}
                title={item.title}
                description={item.desc}
                accentColor={glassCardColors[i]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURE CAROUSEL ═══ */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-[family-name:var(--font-heading)]">
              {t.corporate.featuresTitle}
            </h2>
            <p className="mt-4 text-zinc-500 text-lg">
              Kurumsal web sitenizde sunduğumuz kapsamlı hizmetler
            </p>
          </div>

          <FeatureCarousel slides={carouselSlides} accentColor="#06b6d4" />
        </div>
      </section>

      {/* ═══ PROBLEMS ═══ */}
      <section className="py-24 bg-white/[0.01]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center font-[family-name:var(--font-heading)] mb-16">
              {t.corporate.problemsTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.corporate.problems.map((problem, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-red-500/20 transition-all duration-300"
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

      {/* ═══ FEATURES CHECKLIST ═══ */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-[family-name:var(--font-heading)]">
              Her Paketin <span className="text-cyan-400">İçeriği</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
            {t.corporate.features.map((feature, i) => (
              <div
                key={feature}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 transition-all"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400" />
                <span className="text-sm text-zinc-300 font-medium">{feature}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/iletisim">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 rounded-full h-12 font-bold">
                {t.corporate.ctaOffer} <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-24 bg-white/[0.01]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-[family-name:var(--font-heading)]">
              {t.corporate.faqTitle}
            </h2>

            <InterfacesAccordion type="single" collapsible>
              {t.corporate.faqItems.map((item, i) => (
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
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-500/5 blur-[80px] rounded-full pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              className="relative z-10 space-y-8"
            >
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight font-[family-name:var(--font-heading)]">
                {t.corporate.ctaTitle}{' '}
                <span className="text-cyan-400">{t.corporate.ctaTitleHighlight}</span>
              </h2>
              <p className="text-zinc-500 text-lg md:text-xl max-w-xl mx-auto">
                Ücretsiz CRO analizi ile başlayın. Kurumsal sitenizin lead üretme potansiyelini
                keşfedin.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/#hero">
                  <Button size="lg" className="bg-white text-black hover:bg-zinc-200 px-10 rounded-full h-14 text-base font-bold w-full md:w-auto">
                    {t.corporate.ctaAnalysis}
                    <ArrowUpRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/iletisim">
                  <Button size="lg" variant="ghost" className="text-white hover:bg-white/5 px-10 rounded-full h-14 text-base font-medium w-full md:w-auto">
                    {t.corporate.ctaWhatsApp}
                    <MessageCircle className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <p className="text-xs text-zinc-600 font-medium">
                Kredi kartı gerekmez • 2 dakikada sonuç • Uzman analizi
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
