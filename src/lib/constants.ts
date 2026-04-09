import type { NavItem, ServiceCard, ProcessStep, StatItem, FAQItem, Testimonial } from '@/types';

export const SITE_CONFIG = {
  name: 'Webtier',
  tagline: 'Dönüşüm Odaklı Web Çözümleri',
  description: 'CRO odaklı web tasarım ve e-ticaret çözümleri ile sitenizin dönüşüm oranını artırın.',
  url: 'https://webtier.com.tr',
  email: 'info@webtier.com.tr',
  phone: '+90 555 000 00 00',
  whatsapp: '905550000000',
  whatsappMessage: 'Merhaba, web sitem hakkında bilgi almak istiyorum.',
};

export const OTP_CONFIG = {
  maxAttempts: 5,
  timeoutDuration: 30 * 60,
  otpLength: 6,
  phoneFormat: /^5\d{9}$/,
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com';

export const ENDPOINTS = {
  sendOTP: `${API_BASE_URL}/api/v1/otp/send`,
  verifyOTP: `${API_BASE_URL}/api/v1/otp/verify`,
  sendOTPEmail: `${API_BASE_URL}/api/v1/otp/send-email`,
  verifyOTPEmail: `${API_BASE_URL}/api/v1/otp/verify-email`,
  getProfile: `${API_BASE_URL}/api/v1/profile`,
  getAnalysis: `${API_BASE_URL}/api/v1/analysis`,
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'CRO Analizi', href: '/#hero' },
  { label: 'E-Ticaret', href: '/e-ticaret' },
];

export const HAMBURGER_MENU_ITEMS: NavItem[] = [
  {
    label: 'Ürünler',
    href: '#',
    children: [
      { label: 'CRO Analizi', href: '/#hero' },
      { label: 'E-Ticaret Web Tasarım', href: '/e-ticaret' },
      { label: 'Kurumsal Web Tasarım', href: '/kurumsal' },
    ],
  },
  {
    label: 'Hakkımızda',
    href: '#',
    children: [
      { label: 'Markamız', href: '/hakkimizda/markamiz' },
      { label: 'İletişim', href: '/iletisim' },
    ],
  },
  {
    label: 'Yasal',
    href: '#',
    children: [
      { label: 'KVKK', href: '/kvkk' },
      { label: 'Satış Sözleşmesi', href: '/satis-sozlesmesi' },
      { label: 'Gizlilik & Çerez', href: '/gizlilik-politikasi' },
    ],
  },
];

export const SERVICES: ServiceCard[] = [
  {
    title: 'CRO Analizi',
    description: 'Sitenizin dönüşüm açıklarını tespit edin ve gelir kaybını durdurun.',
    href: '/#hero',
    icon: 'BarChart3',
    ctaText: 'Ücretsiz Analiz',
  },
  {
    title: 'E-Ticaret Çözümleri',
    description: 'Satış üreten, dönüşüm odaklı e-ticaret altyapısı kurun.',
    href: '/e-ticaret',
    icon: 'ShoppingCart',
    ctaText: 'Detaylı Bilgi',
  },
  {
    title: 'Kurumsal Web Sitesi',
    description: 'Lead üreten, güven veren kurumsal web sitesi oluşturun.',
    href: '/kurumsal',
    icon: 'Building2',
    ctaText: 'Detaylı Bilgi',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: 'Ücretsiz Analiz',
    description: 'Web sitenizin URL\'sini girin, CRO analizinizi başlatalım.',
    icon: 'Search',
  },
  {
    step: 2,
    title: 'WhatsApp Görüşme',
    description: 'Analiz sonuçlarını birlikte değerlendirelim.',
    icon: 'MessageCircle',
  },
  {
    step: 3,
    title: 'Strateji & Teklif',
    description: 'Size özel dönüşüm stratejisi ve teklif hazırlayalım.',
    icon: 'Target',
  },
  {
    step: 4,
    title: 'Uygulama & Sonuç',
    description: 'Stratejiyi uygulayalım, sonuçları birlikte takip edelim.',
    icon: 'Rocket',
  },
];

export const STATS: StatItem[] = [
  { value: 50, suffix: '+', label: 'Mutlu Müşteri' },
  { value: 40, suffix: '%', label: 'Ort. Dönüşüm Artışı' },
  { value: 7, suffix: '/24', label: 'Destek' },
  { value: 100, suffix: '%', label: 'Ücretsiz Analiz' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Ahmet Yılmaz',
    company: 'TechStore',
    role: 'Kurucu',
    content: 'Webtier ile çalışmaya başladıktan sonra e-ticaret sitemizin dönüşüm oranı %35 arttı. Profesyonel ve sonuç odaklı bir ekip.',
    rating: 5,
  },
  {
    name: 'Elif Kaya',
    company: 'Kaya Danışmanlık',
    role: 'Genel Müdür',
    content: 'Kurumsal sitemizi yeniden tasarladılar. Artık web sitemiz gerçekten iş üretiyor, sadece kartvizit değil.',
    rating: 5,
  },
  {
    name: 'Mehmet Demir',
    company: 'ModaShop',
    role: 'E-Ticaret Müdürü',
    content: 'CRO analizi sayesinde sepet terk oranımız %25 düştü. Yatırımın geri dönüşü ilk ayda kendini gösterdi.',
    rating: 5,
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'CRO nedir ve neden önemlidir?',
    answer: 'CRO (Conversion Rate Optimization), web sitenize gelen ziyaretçilerin müşteriye dönüşme oranını artırma sürecidir. Reklam harcamalarınız aynı kalırken, daha fazla satış ve lead elde etmenizi sağlar.',
    category: 'Genel',
  },
  {
    question: 'Ücretsiz CRO analizi neleri kapsar?',
    answer: 'Ücretsiz analizimiz sitenizin dönüşüm hunisini, kullanıcı deneyimini, CTA etkinliğini, mobil uyumluluğunu ve sayfa hızını kapsar. Detaylı bir rapor ile iyileştirme önerilerimizi sunarız.',
    category: 'Genel',
  },
  {
    question: 'Analiz sonuçları ne kadar sürede gelir?',
    answer: 'Ücretsiz CRO analiziniz genellikle 24-48 saat içinde hazır olur. Detaylı raporu WhatsApp üzerinden sizinle paylaşırız.',
    category: 'Genel',
  },
  {
    question: 'E-ticaret sitemde dönüşüm oranım neden düşük?',
    answer: 'Düşük dönüşüm oranının birçok sebebi olabilir: karmaşık satın alma akışı, yetersiz güven sinyalleri, yavaş sayfa hızı, mobil uyumsuzluk veya zayıf CTA\'lar. CRO analizi ile tam olarak nerelerde kayıp yaşadığınızı tespit ederiz.',
    category: 'E-Ticaret',
  },
  {
    question: 'Shopify/WooCommerce ile çalışıyor musunuz?',
    answer: 'Evet, tüm popüler e-ticaret platformları ile çalışıyoruz. Shopify, WooCommerce, Trendyol entegrasyonlu siteler ve özel altyapılar dahil.',
    category: 'E-Ticaret',
  },
  {
    question: 'Sıfırdan e-ticaret sitesi kurulumu ne kadar sürer?',
    answer: 'Projenin kapsamına göre 4-8 hafta arasında değişir. Anahtar teslim, dönüşüm odaklı bir e-ticaret sitesi kuruyoruz.',
    category: 'E-Ticaret',
  },
  {
    question: 'Kurumsal sitemin neden satış üretmediğini nasıl anlarım?',
    answer: 'Ücretsiz CRO analizimiz ile sitenizin ziyaretçi davranışlarını, form dönüşümlerini ve kullanıcı akışını inceliyoruz. Sitenizin nerede müşteri kaybettiğini net olarak görürsünüz.',
    category: 'Kurumsal',
  },
  {
    question: 'Aylık CRO retainer ne içerir?',
    answer: 'Aylık retainer paketimiz sürekli A/B testleri, kullanıcı davranış analizi, landing page optimizasyonu, hız iyileştirmeleri ve aylık performans raporlarını içerir.',
    category: 'Retainer',
  },
  {
    question: 'Retainer\'ı iptal edebilir miyim?',
    answer: 'Evet, aylık retainer paketimiz esnek bir yapıdadır. İstediğiniz zaman iptal edebilirsiniz, herhangi bir taahhüt yoktur.',
    category: 'Retainer',
  },
  {
    question: 'Sonuçları ne zaman görmeye başlarım?',
    answer: 'İlk iyileştirmeler genellikle 2-4 hafta içinde etkisini gösterir. Sürekli optimizasyon ile dönüşüm oranınız aydan aya artmaya devam eder.',
    category: 'Retainer',
  },
];
