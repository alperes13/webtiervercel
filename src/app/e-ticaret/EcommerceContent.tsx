'use client';

import Link from 'next/link';
import { ArrowRight, MessageCircle, CheckCircle2, ShoppingCart, TrendingUp, Smartphone, Search, Package, CreditCard, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Accordion from '@/components/ui/Accordion';
import { SITE_CONFIG } from '@/lib/constants';
import { getWhatsAppUrl } from '@/lib/utils';

const problems = [
  'Ziyaretçiler siteyi geziyor ama satın almıyor',
  'Sepet terk oranı çok yüksek',
  'Mobilde dönüşüm oranı çok düşük',
  'Ürün sayfaları yeterince ikna edici değil',
];

const packages = [
  {
    name: 'E-Ticaret Kurulum',
    description: 'Sıfırdan anahtar teslim e-ticaret sitesi',
    features: [
      'Dönüşüm odaklı ana sayfa tasarımı',
      'Ürün sayfası optimizasyonu',
      'Sepet ve ödeme akışı',
      'Mobil responsive tasarım',
      'SEO altyapısı',
      'CRO best practice uygulaması',
    ],
    ctaText: 'Teklif Al',
    highlighted: false,
  },
  {
    name: 'CRO Optimize Paketi',
    description: 'Mevcut sitenizin dönüşüm optimizasyonu',
    features: [
      'Detaylı CRO analizi',
      'A/B test stratejisi',
      'Kullanıcı akış optimizasyonu',
      'CTA ve form optimizasyonu',
      'Sayfa hızı iyileştirmesi',
      'Güven sinyali entegrasyonu',
    ],
    ctaText: 'Teklif Al',
    highlighted: true,
  },
  {
    name: 'CRO Retainer',
    description: 'Aylık sürekli iyileştirme ve optimizasyon',
    features: [
      'Aylık A/B testleri',
      'Kullanıcı davranış analizi',
      'Landing page optimizasyonu',
      'Performans raporları',
      'Öncelikli destek',
      'Sürekli dönüşüm artışı',
    ],
    ctaText: 'Detay Al',
    highlighted: false,
  },
];

const faqItems = [
  { question: 'E-ticaret sitemde dönüşüm oranım neden düşük?', answer: 'Düşük dönüşüm oranının birçok sebebi olabilir: karmaşık satın alma akışı, yetersiz güven sinyalleri, yavaş sayfa hızı, mobil uyumsuzluk veya zayıf CTA\'lar. CRO analizi ile tam olarak nerelerde kayıp yaşadığınızı tespit ederiz.' },
  { question: 'Shopify/WooCommerce ile çalışıyor musunuz?', answer: 'Evet, tüm popüler e-ticaret platformları ile çalışıyoruz. Shopify, WooCommerce, Trendyol entegrasyonlu siteler ve özel altyapılar dahil.' },
  { question: 'Mevcut sitemin optimizasyonu ne kadar sürer?', answer: 'CRO Optimize paketi genellikle 2-4 hafta sürer. İlk iyileştirmeler 1-2 hafta içinde uygulanmaya başlar.' },
  { question: 'Sıfırdan e-ticaret sitesi kurulumu ne kadar sürer?', answer: 'Projenin kapsamına göre 4-8 hafta arasında değişir. Anahtar teslim, dönüşüm odaklı bir e-ticaret sitesi kuruyoruz.' },
  { question: 'Aylık retainer\'ı iptal edebilir miyim?', answer: 'Evet, aylık retainer paketimiz esnek bir yapıdadır. İstediğiniz zaman iptal edebilirsiniz, herhangi bir taahhüt yoktur.' },
];

const serviceDetails = [
  { icon: <ShoppingCart className="h-5 w-5" />, title: 'Ana Sayfa Yapısı', desc: 'Dönüşüm odaklı, güven veren ana sayfa tasarımı' },
  { icon: <Package className="h-5 w-5" />, title: 'Ürün Sayfası', desc: 'İkna edici ürün sunumu, galeri ve açıklama optimizasyonu' },
  { icon: <CreditCard className="h-5 w-5" />, title: 'Sepet & Ödeme', desc: 'Minimum adımda, güvenli ve hızlı satın alma akışı' },
  { icon: <Smartphone className="h-5 w-5" />, title: 'Mobil UX', desc: 'Mobil öncelikli tasarım, touch-friendly arayüz' },
  { icon: <Search className="h-5 w-5" />, title: 'SEO', desc: 'Organik trafiğinizi artıracak teknik SEO altyapısı' },
  { icon: <BarChart3 className="h-5 w-5" />, title: 'CRO', desc: 'Sürekli test ve optimizasyon ile artan dönüşüm oranı' },
];

export default function EcommerceContent() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-[var(--color-accent)]/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block rounded-full bg-[var(--color-accent)]/10 px-4 py-1.5 text-xs font-semibold text-[var(--color-accent)]">
              E-Ticaret Çözümleri
            </span>
            <h1 className="mt-6 font-[family-name:var(--font-clash-display)] text-4xl font-bold text-[var(--color-text)] sm:text-5xl">
              E-Ticaret Siteniz{' '}
              <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] bg-clip-text text-transparent">
                Satış Makinesi
              </span>{' '}
              Olsun
            </h1>
            <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
              Dönüşüm odaklı e-ticaret altyapısı ile daha fazla satış, daha yüksek ortalama sipariş değeri.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/#hero">
                <Button size="lg">
                  Ücretsiz Analiz Al <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href={getWhatsAppUrl(SITE_CONFIG.whatsapp, 'Merhaba, e-ticaret çözümleri hakkında bilgi almak istiyorum.')} target="_blank" rel="noopener noreferrer">
                <Button variant="accent" size="lg">
                  <MessageCircle className="h-4 w-4" /> WhatsApp İletişim
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-[var(--color-surface-card)]/30">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-[family-name:var(--font-clash-display)] text-2xl font-bold text-[var(--color-text)] sm:text-3xl text-center">
              Siteniz Neden Satış Kaybediyor?
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {problems.map((problem) => (
                <div key={problem} className="flex items-start gap-3 rounded-xl border border-[var(--color-error)]/20 bg-[var(--color-error)]/5 p-4">
                  <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-error)]" />
                  <span className="text-sm text-[var(--color-text-secondary)]">{problem}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-clash-display)] text-2xl font-bold text-[var(--color-text)] sm:text-3xl text-center">
            Neleri Kapsıyor?
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceDetails.map((detail, i) => (
              <motion.div key={detail.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                    {detail.icon}
                  </div>
                  <h3 className="mt-3 font-semibold text-[var(--color-text)]">{detail.title}</h3>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{detail.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 bg-[var(--color-surface-card)]/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-clash-display)] text-2xl font-bold text-[var(--color-text)] sm:text-3xl text-center">
            Paketlerimiz
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {packages.map((pkg, i) => (
              <motion.div key={pkg.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className={`flex h-full flex-col ${pkg.highlighted ? 'border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]/20' : ''}`}>
                  {pkg.highlighted && (
                    <span className="mb-3 inline-block w-fit rounded-full bg-[var(--color-accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-accent)]">
                      Popüler
                    </span>
                  )}
                  <h3 className="font-[family-name:var(--font-clash-display)] text-xl font-bold text-[var(--color-text)]">{pkg.name}</h3>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{pkg.description}</p>
                  <ul className="mt-4 flex-1 space-y-2">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--color-accent-secondary)]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href={getWhatsAppUrl(SITE_CONFIG.whatsapp, `Merhaba, ${pkg.name} hakkında bilgi almak istiyorum.`)} target="_blank" rel="noopener noreferrer" className="mt-6">
                    <Button variant={pkg.highlighted ? 'primary' : 'secondary'} className="w-full">
                      {pkg.ctaText} <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-clash-display)] text-2xl font-bold text-[var(--color-text)] sm:text-3xl text-center">
            Sıkça Sorulan Sorular
          </h2>
          <div className="mt-8">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--color-surface-card)]/30">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-clash-display)] text-3xl font-bold text-[var(--color-text)]">
            E-Ticaret Sitenizi Dönüştürmeye Hazır mısınız?
          </h2>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/#hero">
              <Button size="lg">Ücretsiz Analiz Al <ArrowRight className="h-4 w-4" /></Button>
            </Link>
            <a href={getWhatsAppUrl(SITE_CONFIG.whatsapp, SITE_CONFIG.whatsappMessage)} target="_blank" rel="noopener noreferrer">
              <Button variant="accent" size="lg"><MessageCircle className="h-4 w-4" /> WhatsApp</Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
