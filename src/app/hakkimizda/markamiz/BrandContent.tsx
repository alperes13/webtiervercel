'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Target, Eye, Heart, Zap, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getWhatsAppUrl } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/constants';

const values = [
  {
    icon: <Target className="h-6 w-6" />,
    title: 'Sonuç Odaklılık',
    description: 'Her karar, her satır kod ve her tasarım seçimi tek bir soruyla şekillenir: Bu dönüşümü artırıyor mu? Güzel görünmek yetmez, işe yaraması gerekir.',
    color: 'text-[#6366f1] bg-[#6366f1]/10 ring-[#6366f1]/20',
  },
  {
    icon: <Eye className="h-6 w-6" />,
    title: 'Şeffaflık',
    description: 'Müşterilerimize ne yapacağımızı, neden yapacağımızı ve ne beklememiz gerektiğini açıkça söyleriz. Sürpriz yok, belirsizlik yok.',
    color: 'text-[#f59e0b] bg-[#f59e0b]/10 ring-[#f59e0b]/20',
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Gerçek Ortaklık',
    description: 'Müşterilerimizin başarısı bizim başarımızdır. Proje teslim edip çekilmeyiz — dönüşümler artana kadar yanınızdayız.',
    color: 'text-[#f472b6] bg-[#f472b6]/10 ring-[#f472b6]/20',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Sürekli Öğrenme',
    description: 'Dijital dünya durmuyor, biz de durmuyor. En güncel CRO tekniklerini, kullanıcı psikolojisi araştırmalarını ve A/B test sonuçlarını takip ediyoruz.',
    color: 'text-[#10b981] bg-[#10b981]/10 ring-[#10b981]/20',
  },
];

const stats = [
  { value: '50+', label: 'Mutlu Müşteri' },
  { value: '%40', label: 'Ort. Dönüşüm Artışı' },
  { value: '3+', label: 'Yıllık Deneyim' },
  { value: '7/24', label: 'Destek' },
];

export default function BrandContent() {
  return (
    <div className="light-page min-h-screen pt-24 lg:pt-32">
      {/* Hero */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-[var(--color-accent)]/8 blur-[140px]" />
          <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-[var(--color-accent-blue)]/8 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block rounded-full bg-[var(--color-accent)]/10 px-4 py-1.5 text-xs font-semibold text-[var(--color-accent)]">
              Hakkımızda
            </span>
            <h1 className="mt-6 font-[family-name:var(--font-heading)] text-4xl font-extrabold text-[var(--color-text)] sm:text-5xl lg:text-6xl leading-tight">
              Web Siteleri Değil,{' '}
              <span className="text-gradient-amber">Sonuçlar</span>{' '}
              Üretiyoruz
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)] lg:text-xl">
              Webtier, Türkiye&apos;nin CRO (Conversion Rate Optimization) odaklı web ajansıdır.
              Güzel görünen değil, satış üreten, müşteri kazandıran, büyüme yaratan dijital varlıklar inşa ediyoruz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-white/5 bg-white/3">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <p className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-[var(--color-text)] sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent-blue)]">
              Hikayemiz
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
              Neden Webtier?
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-[var(--color-text-secondary)]">
              <p>
                Yıllar önce bir gerçekle yüzleştik: Türkiye&apos;deki işletmelerin büyük çoğunluğu web sitelerine ciddi bütçeler ayırıyor, ama bu sitelerin büyük kısmı sadece &quot;var olmak&quot; için orada duruyor. Ziyaretçiler geliyor, ama satış olmuyor. Form dolduruluyor, ama telefon çalmıyor.
              </p>
              <p>
                Sorun tasarımda değil, stratejideydi. Güzel görseller ve modern fontlar yetmiyordu. Asıl mesele, ziyaretçinin zihninde nasıl bir yolculuk yaşandığıydı. Hangi an güven kırıldı? Hangi noktada kullanıcı formu doldurmaktan vazgeçti? Bu soruların cevabı CRO&apos;daydı.
              </p>
              <p>
                Webtier&apos;i bu anlayışla kurduk. Tasarladığımız her sayfa, yazdığımız her başlık, yerleştirdiğimiz her buton; kullanıcı psikolojisine ve dönüşüm verilerine dayanıyor. Sonuç: müşterilerimiz ortalama %40 dönüşüm artışı yaşıyor.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white/3 border-y border-white/5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-accent)]/15 text-[var(--color-accent)] mb-5 ring-1 ring-[var(--color-accent)]/25">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--color-text)]">
                Misyonumuz
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                Türkiye&apos;deki her ölçekteki işletmenin web varlığını gerçek bir satış ve büyüme motoruna dönüştürmek. Küçük değişimlerin büyük sonuçlar yaratabileceğini her projede kanıtlamak.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-[var(--color-accent-blue)]/20 bg-[var(--color-accent-blue)]/5 p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-accent-blue)]/15 text-[var(--color-accent-blue)] mb-5 ring-1 ring-[var(--color-accent-blue)]/25">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--color-text)]">
                Vizyonumuz
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                CRO odaklı web tasarımın bir standart haline geleceği bir Türkiye'de, bu dönüşümün öncü ajansı olmak. Müşterilerimizin dijital başarısı aracılığıyla sektörde kalıcı bir iz bırakmak.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent-blue)]">
              Değerlerimiz
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
              Bizi Farklı Kılan Nedir?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-5 rounded-2xl border border-white/5 bg-[var(--color-surface-card)] p-6"
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 ${value.color}`}>
                  {value.icon}
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-text)]">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team philosophy */}
      <section className="py-16 bg-white/3 border-y border-white/5">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-accent-secondary)]/10 text-[var(--color-accent-secondary)] ring-1 ring-[var(--color-accent-secondary)]/20 mx-auto mb-6">
              <Users className="h-7 w-7" />
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--color-text)] sm:text-3xl">
              Ekip Felsefemiz
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--color-text-secondary)]">
              Büyük kalabalık değiliz. Ama her projede tam odak, tam çaba ve tam sorumlulukla çalışıyoruz.
              Tasarımcıdan stratejiste, geliştirici den içerik yazarına — her bir ekip üyemiz CRO prensiplerini benimsemiş,
              veri okumayı seven, kullanıcı deneyimini gerçekten önemseyen insanlardan oluşuyor.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
              Müşteriyle baştan bir şey inşa ederiz. Sonra iyileştiririz. Sonra tekrar iyileştiririz.
              Çünkü dijitalde mükemmel bir &quot;bitti&quot; anı yoktur — sadece bir sonraki dönüşüm fırsatı vardır.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
              Birlikte Büyüyelim
            </h2>
            <p className="mt-4 text-base text-[var(--color-text-secondary)]">
              Projenizi konuşmak için ücretsiz analiz alın veya doğrudan WhatsApp&apos;tan ulaşın.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/#hero" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto px-10 animate-pulse-glow">
                  Ücretsiz Analiz Al <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a
                href={getWhatsAppUrl(SITE_CONFIG.whatsapp, 'Merhaba, Webtier hakkında bilgi almak istiyorum.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-10">
                  WhatsApp İletişim
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
