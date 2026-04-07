'use client';

import Link from 'next/link';
import { ArrowRight, MessageCircle, CheckCircle2, Shield, Layers, Users, Globe, FileText, Phone as PhoneIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Accordion from '@/components/ui/Accordion';
import { SITE_CONFIG } from '@/lib/constants';
import { getWhatsAppUrl } from '@/lib/utils';

const problems = [
  'Web siteniz güven vermiyor, ziyaretçiler hemen çıkıyor',
  'Hizmetleriniz net anlaşılmıyor, potansiyel müşteriler kaybolyor',
  'İletişim formunuz dönüşüm üretmiyor',
  'Rakipleriniz dijitalde sizden önde görünüyor',
];

const features = [
  'Güçlü ilk izlenim yaratan ana sayfa',
  'Net ve ikna edici hizmet sayfaları',
  'Dönüşüm odaklı lead formları',
  'WhatsApp CTA entegrasyonu',
  'Referans ve güven sinyalleri',
  'Mobil öncelikli responsive tasarım',
  'SEO uyumlu altyapı',
  'Süreç ve çalışma şekli sunumu',
];

const targetAudience = [
  { icon: <Shield className="h-5 w-5" />, title: 'Klinikler & Sağlık', desc: 'Diş klinikleri, güzellik merkezleri, poliklinikler' },
  { icon: <FileText className="h-5 w-5" />, title: 'Danışmanlık Firmaları', desc: 'Hukuk, finans, yönetim danışmanlığı' },
  { icon: <Globe className="h-5 w-5" />, title: 'Ajanslar', desc: 'Reklam, PR, dijital pazarlama ajansları' },
  { icon: <Layers className="h-5 w-5" />, title: 'Üretim & Servis', desc: 'Üretim firmaları, teknik servis, bakım hizmetleri' },
  { icon: <Users className="h-5 w-5" />, title: 'Profesyonel Hizmetler', desc: 'Eğitim, koçluk, mimarlık, mühendislik' },
  { icon: <PhoneIcon className="h-5 w-5" />, title: 'Yerel İşletmeler', desc: 'Restoran, otel, spor salonu, kuaför' },
];

const faqItems = [
  { question: 'Kurumsal sitemin neden satış üretmediğini nasıl anlarım?', answer: 'Ücretsiz CRO analizimiz ile sitenizin ziyaretçi davranışlarını, form dönüşümlerini ve kullanıcı akışını inceliyoruz. Sitenizin nerede müşteri kaybettiğini net olarak görürsünüz.' },
  { question: 'Lead form optimizasyonu nedir?', answer: 'Lead form optimizasyonu, iletişim formlarınızın dönüşüm oranını artırma sürecidir. Form alanlarını azaltma, güven sinyalleri ekleme, mikro-kopi iyileştirme gibi tekniklerle daha fazla müşteri adayı elde edersiniz.' },
  { question: 'Site yenileme mi yoksa sıfırdan mı kurulum yapmalıyım?', answer: 'Bu tamamen mevcut sitenizin durumuna bağlı. CRO analizinden sonra en doğru yaklaşımı birlikte belirleriz. Bazen küçük optimizasyonlar büyük fark yaratır, bazen sıfırdan başlamak daha verimlidir.' },
  { question: 'Kurumsal site ne kadar sürede hazır olur?', answer: 'Projenin kapsamına göre 3-6 hafta arasında değişir. İçerik hazırlığı ve geri bildirim süreci bu süreyi etkiler.' },
  { question: 'Sonradan içerik ekleyebilir miyim?', answer: 'Evet, tüm sitelerimiz kolay yönetilebilir yapıda kurulur. Gerekirse CMS entegrasyonu da yapılabilir.' },
];

export default function CorporateContent() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-[var(--color-accent-secondary)]/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block rounded-full bg-[var(--color-accent-secondary)]/10 px-4 py-1.5 text-xs font-semibold text-[var(--color-accent-secondary)]">
              Kurumsal Web Tasarım
            </span>
            <h1 className="mt-6 font-[family-name:var(--font-clash-display)] text-4xl font-bold text-[var(--color-text)] sm:text-5xl">
              Kurumsal Siteniz{' '}
              <span className="bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent)] bg-clip-text text-transparent">
                İş Üretsin
              </span>
            </h1>
            <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
              Web siteniz sadece bir kartvizit olmasın. Güven veren, lead üreten, iş getiren bir dijital varlık oluşturun.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/#hero">
                <Button size="lg">
                  Ücretsiz Analiz Al <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href={getWhatsAppUrl(SITE_CONFIG.whatsapp, 'Merhaba, kurumsal web tasarım hakkında bilgi almak istiyorum.')} target="_blank" rel="noopener noreferrer">
                <Button variant="accent" size="lg">
                  <MessageCircle className="h-4 w-4" /> WhatsApp İletişim
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 bg-[var(--color-surface-card)]/30">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-[family-name:var(--font-clash-display)] text-2xl font-bold text-[var(--color-text)] sm:text-3xl text-center">
              Siteniz Güven Veriyor mu?
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {problems.map((problem) => (
                <div key={problem} className="flex items-start gap-3 rounded-xl border border-[var(--color-error)]/20 bg-[var(--color-error)]/5 p-4">
                  <Shield className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-error)]" />
                  <span className="text-sm text-[var(--color-text-secondary)]">{problem}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-clash-display)] text-2xl font-bold text-[var(--color-text)] sm:text-3xl text-center">
            Modern Kurumsal Sayfalar Paketi
          </h2>
          <div className="mt-10 rounded-2xl border border-[var(--color-accent-secondary)]/20 bg-[var(--color-surface-card)] p-8">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--color-accent-secondary)]" />
                  {feature}
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <a href={getWhatsAppUrl(SITE_CONFIG.whatsapp, 'Merhaba, Kurumsal Web Tasarım paketi hakkında teklif almak istiyorum.')} target="_blank" rel="noopener noreferrer">
                <Button size="lg">
                  Teklif Al <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 bg-[var(--color-surface-card)]/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-clash-display)] text-2xl font-bold text-[var(--color-text)] sm:text-3xl text-center">
            Kimler İçin Uygun?
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {targetAudience.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent-secondary)]/10 text-[var(--color-accent-secondary)]">
                    {item.icon}
                  </div>
                  <h3 className="mt-3 font-semibold text-[var(--color-text)]">{item.title}</h3>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{item.desc}</p>
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
            Kurumsal Sitenizi Dönüştürmeye Hazır mısınız?
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
