export interface Translations {
  nav: {
    products: string;
    cro: string;
    ecommerce: string;
    corporate: string;
    about: string;
    brand: string;
    contact: string;
    legal: string;
    kvkk: string;
    salesAgreement: string;
    privacy: string;
    freeAnalysis: string;
    retrainer: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    words: readonly string[];
    titleLine3: string;
    titleLineBottom: string;
    heroStaticTitle: string;
    heroTitleHighlight: string;
    heroTitleSuffix: string;
    subtitle: string;
    placeholderPrefix: string;
    placeholderPlatforms: readonly string[];
    inputHint: string;
    serverHint: string;
    cta: string;
    tagline: readonly string[];
    scroll: string;
    errors: {
      emptyUrl: string;
      invalidUrl: string;
      invalidEmail: string;
      timeout: string;
    };
  };
  croxUltra: {
    badge: string;
    title: string;
    titleHighlight?: string;
    subtitle: string;
    slideDeckLabel?: string;
    benefitCategories?: readonly { title: string; items: readonly string[] }[];
    totalLabel?: string;
    cta: string;
    problems?: readonly string[];
    price?: string;
    summaryLabel?: string;
    bannerTitle?: string;
    bannerSubtext?: string;
    items?: readonly string[];
  };
  trustSignals: {
    stats: readonly { value: number; suffix: string; label: string }[];
  };
  services: {
    label: string;
    title: string;
    subtitle: string;
    items: readonly { title: string; description: string; cta: string }[];
  };
  ecommercePreview: {
    tag: string;
    title: string;
    titleHighlight: string;
    titleSuffix: string;
    description: string;
    features: readonly string[];
    cta: string;
    mockupLabel: string;
  };
  corporatePreview: {
    tag: string;
    title: string;
    titleHighlight: string;
    description: string;
    features: readonly string[];
    cta: string;
    mockupLabel: string;
  };
  process: {
    label: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    steps: readonly { title: string; description: string }[];
  };
  whyUs: {
    label: string;
    title: string;
    subtitle: string;
    items: readonly { title: string; description: string }[];
  };
  testimonials: {
    label: string;
    title: string;
    items: readonly {
      name: string;
      role: string;
      company: string;
      content: string;
      rating: number;
    }[];
  };
  faq: {
    title: string;
    subtitle: string;
    items: readonly { question: string; answer: string }[];
  };
  cta: {
    label: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    trustNote: string;
  };
  references: {
    label: string;
  };
  footer: {
    tagline: string;
    servicesLabel: string;
    legalLabel: string;
    contactLabel: string;
    rights: string;
    contact: string;
    services: readonly { label: string; href: string }[];
    legal: readonly { label: string; href: string }[];
  };
  featureGrid: {
    title: string;
    description: string;
    items: readonly {
      title: string;
      meta: string;
      description: string;
      status?: string;
      tags: readonly string[];
    }[];
  };
  profile: {
    title: string;
    phone: string;
    phoneLabel: string;
    status: string;
    statusPending: string;
    statusCompleted: string;
    statusNone: string;
    credits: string;
    creditsLabel: string;
    creditsButton: string;
    logout: string;
    hide: string;
    show: string;
    close: string;
  };
  cookieConsent: {
    title: string;
    description: string;
    link: string;
    suffix: string;
    button: string;
  };
  common: {
    whatsappAria: string;
    scrollToTopAria: string;
    whatsappContact: string;
  };
  ecommerce: {
    tag: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    ctaAnalysis: string;
    ctaWhatsApp: string;
    problemsTitle: string;
    problems: readonly string[];
    detailsTitle: string;
    detailsSubtitle: string;
    details: readonly { title: string; desc: string }[];
    packagesTitle: string;
    packagesSubtitle: string;
    packages: readonly {
      name: string;
      description: string;
      features: readonly string[];
      ctaText: string;
      highlighted: boolean;
      popularBadge?: string;
    }[];
    faqTitle: string;
    faqItems: readonly { question: string; answer: string }[];
    ctaTitle: string;
    ctaTitleHighlight: string;
    titleSuffix: string;
  };
  corporate: {
    tag: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    ctaAnalysis: string;
    ctaWhatsApp: string;
    problemsTitle: string;
    problems: readonly string[];
    featuresTitle: string;
    features: readonly string[];
    ctaOffer: string;
    audienceTitle: string;
    audienceSubtitle: string;
    audience: readonly { title: string; desc: string }[];
    faqTitle: string;
    faqItems: readonly { question: string; answer: string }[];
    ctaTitle: string;
    ctaTitleHighlight: string;
  };
  contact: {
    title: string;
    subtitle: string;
    methods: {
      whatsapp: { title: string; desc: string };
      email: { title: string; desc: string };
      phone: { title: string; desc: string };
    };
    fastResponseTitle: string;
    fastResponseSubtitle: string;
    whatsappButton: string;
  };
  emailVerification: {
    title: string;
    subtitle: string;
    emailSentTo: string;
    codePlaceholder: string;
    verifyButton: string;
    verifying: string;
    resend: string;
    resending: string;
    didntGetCode: string;
    successMessage: string;
    errorInvalidCode: string;
    terms: string;
    termsLink: string;
    privacyLink: string;
    and: string;
  };
}

const tr: Translations = {
  nav: {
    products: 'Ürünler',
    cro: 'CRO-X AI',
    ecommerce: 'E-Ticaret Web Tasarım',
    corporate: 'Kurumsal Web Tasarım',
    about: 'Hakkımızda',
    brand: 'Markamız',
    contact: 'İletişim',
    legal: 'Yasal',
    kvkk: 'KVKK',
    salesAgreement: 'Satış Sözleşmesi',
    privacy: 'Gizlilik & Çerez',
    freeAnalysis: 'Ücretsiz Analiz',
    retrainer: 'Webtier Retrainer',
  },
  hero: {
    badge: 'türkiye\'nin cro odaklı Embedded AI modülü',
    titleLine1: 'İŞLETMENİZ',
    words: [
      'Gelir Elde Ediyor Mu?',
      'Ölçekleniyor Mu?',
      'Müşteri Kazanıyor Mu?',
      'Satış Yapıyor Mu?',
      'Dönüşüm Sağlıyor Mu?',
      'Lead Topluyor Mu?',
      'Büyüyor Mu?',
      'Kâr Ediyor Mu?',
      'Ciro Artırıyor Mu?',
      'Gelirini Katlıyor Mu?',
      'Pazar Payını Artırıyor Mu?',
      'Yeni Pazarlara Açılıyor Mu?',
      'Müşterilerini Elde Tutuyor Mu?',
      'Talep Oluşturuyor Mu?',
      'Doğru Kitleye Ulaşıyor Mu?',
      'İlgi Çekiyor Mu?',
      'Ziyaretçileri Müşteriye Çeviriyor Mu?',
      'Sepetleri Satışa Dönüştürüyor Mu?',
      'Lead\'leri Satışa Dönüştürüyor Mu?',
      'Funnel\'ı Verimli Çalışıyor Mu?',
      'Zaman Kaybını Azaltıyor Mu?',
      'Operasyonel Olarak Güçlü Mü?',
      'Kaynaklarını Doğru Kullanıyor Mu?',
    ],
    titleLine3: '',
    titleLineBottom: 'YOKSA SADECE DURUYOR MU?',
    heroStaticTitle: 'İşletmenin',
    heroTitleHighlight: 'maksimum',
    heroTitleSuffix: 'halini keşfet.',
    subtitle: 'CRO-X Mini ile tanışın. <u>Ücretsiz</u> modeliyle dijital varlığınız için analiz alın, uygulayın, <u>satışlarınızı katlayın</u>.',
    placeholderPrefix: 'Dijital adresini gir: Instagram, Web site veya Tiktok',
    placeholderPlatforms: ['İnstagram', 'Web site', 'Google', 'Linkedin', 'Tiktok'],
    inputHint: 'Gerçek Potansiyelini Keşfet',
    serverHint: 'Server yoğunluğuna bağlı olarak rapor iletim süresi 0-2 saat arasında değişebilir.',
    cta: 'ANALİZ AL',
    tagline: [
      'DİJİTAL PAZARLAMAYI ****** ETTİK!',
      'Sadece bir analiz değil, eğer uygularsan garantili bir gelir artışı.',
      'Limitsizlerle, limitlerini açıyoruz.',
    ],
    scroll: 'CRO-X Ultra',
    errors: {
      emptyUrl: 'Lütfen web sitenizin URL\'sini girin.',
      invalidUrl: 'Geçerli bir URL girin. Örn: websiteniz.com',
      invalidEmail: 'Geçerli bir e-posta adresi girin.',
      timeout: 'Çok fazla deneme. {minutes} dakika sonra tekrar deneyin.',
    },
  },
  croxUltra: {
    badge: 'CRO-X ULTRA',
    title: 'CRO-X ULTRA ile Tam Kapsamlı Analiz',
    subtitle: 'İşletmenizin dijital varlığını 360° analiz eden, stratejik yol haritası çıkartan premium analiz paketi.',
    price: '249.00 TL',
    summaryLabel: '+ 30 sayfa özet',
    bannerTitle: 'CRO-X AI ULTRA',
    bannerSubtext: 'Geleceğinizi analiz ile tecrübe edin.',
    items: [
      'Rakip Analizi & Kıyaslama',
      'Dönüşüm Hunisi (Funnel) Haritalama',
      'Isı Haritası (Heatmap) Yorumu',
      'Tıklama Haritası Analizi',
      'Kaydırma (Scroll) Derinliği Ölçümü',
      'Form Alanı Bırakma Analizi',
      'Mobil Kullanılabilirlik Denetimi',
      'Sayfa Yükleme Hızı Optimizasyonu',
      'CTA (Eylem Çağrısı) Konumlandırması',
      'Renk Psikolojisi ve Kontrast Ayarları',
      'Tipografi ve Okunabilirlik Kontrolü',
      'Kullanıcı Deneyim (UX) Akış Analizi',
      'Güven Unsurları (Trust Signals) Denetimi',
      'Sosyal Kanıt Entegrasyon Analizi',
      'Navigasyon ve Menü Yapısı Sadeleştirme',
      'Hata Sayfaları (404 vb.) İyileştirme',
      'Arama Çubuğu Performans Analizi',
      'Sepet Terk Etme Nedenleri Tespiti',
      'Checkout (Ödeme) Adımları Sadeleştirme',
      'Pop-up ve Banner Etkinlik Ölçümü',
      'Ürün Videoları ve Görsel Kalite Analizi',
      'Ürün Açıklamaları İkna Teknikleri',
      'Sıkça Sorulan Sorular (SSS) Verimliliği',
      'Müşteri Yorumları Bölümü Stratejisi',
      'Filtreleme ve Kategorizasyon Denetimi',
      'Fiyat Sunumu ve İndirim Psikolojisi',
      'Cross-sell (Çapraz Satış) Fırsatları',
      'Up-sell (Üst Satış) Yerleşimleri',
      'Üyelik ve Kayıt Süreçleri Analizi',
      'E-posta Kayıt Formu Optimizasyonu',
      'Canlı Destek ve Chatbot Verimliliği',
      'Çıkış Niyeti (Exit-intent) Stratejileri',
      'Kişiselleştirilmiş İçerik Alanları',
      'Stok Uyarıları ve Aciliyet Analizi',
      'Kargo ve İade Bilgilendirme Netliği',
      'Dil ve Yerelleştirme Denetimi',
      'Rakip Reklam Kreatifleri Kıyaslaması',
      'Sosyal Medya Profilleri Entegrasyonu',
      'Marka Sesi ve Tutarlılık Kontrolü',
      '12 Aylık Dönüşüm Yol Haritası'
    ],
    cta: 'CRO-X Ultra',
    problems: [
      'Reklam harcıyoruz ama satış gelmiyor',
      'Ziyaretçiler siteye girip hemen çıkıyor',
      'Sepet terk oranlarımız çok yüksek',
      'Mobil kullanıcılar ödeme yapamıyor',
      'Rakiplerimiz bizden daha hızlı büyüyor',
      'Hangi sayfanın müşteri kaçırdığını bilmiyoruz',
      'Verilerimiz var ama yorumlayamıyoruz',
      'Sitemiz çok yavaş yükleniyor',
      'Kullanıcılar güven duymadığı için almıyor',
      'Ödeme adımları çok karmaşık',
      'Dönüşüm oranlarını nasıl artıracağımızı bilmiyoruz',
      'Sosyal kanıtlarımız eksik veya etkisiz'
    ],
  },
  trustSignals: {
    stats: [
      { value: 50, suffix: '+', label: 'Mutlu Müşteri' },
      { value: 40, suffix: '%', label: 'Ort. Dönüşüm Artışı' },
      { value: 7, suffix: '/24', label: 'Destek' },
      { value: 100, suffix: '%', label: 'Ücretsiz Analiz' },
    ],
  },
  services: {
    label: 'Hizmetlerimiz',
    title: 'Her Web Sitesi Aynı Değildir',
    subtitle: 'E-ticaretten kurumsala, CRO analizinden sürekli optimizasyona — ihtiyacınıza özel çözümler.',
    items: [
      { title: 'CRO Analizi', description: 'Sitenizin dönüşüm açıklarını tespit edin ve gelir kaybını durdurun.', cta: 'Ücretsiz Analiz' },
      { title: 'E-Ticaret Çözümleri', description: 'Satış üreten, dönüşüm odaklı e-ticaret altyapısı kurun.', cta: 'Detaylı Bilgi' },
      { title: 'Kurumsal Web Sitesi', description: 'Lead üreten, güven veren kurumsal web sitesi oluşturun.', cta: 'Detaylı Bilgi' },
    ],
  },
  ecommercePreview: {
    tag: 'E-Ticaret',
    title: 'E-Ticaret Siteniz',
    titleHighlight: 'Satış Makinesi',
    titleSuffix: 'Olsun',
    description: 'Dönüşüm odaklı e-ticaret altyapısı ile ziyaretçilerinizi müşteriye dönüştürün. Sepet terk oranını düşürün, ortalama sipariş değerini artırın.',
    features: ['Daha yüksek dönüşüm oranı', 'Güçlü satın alma akışı', 'Mobil optimizasyon'],
    cta: 'Detaylı Bilgi',
    mockupLabel: 'E-Ticaret Mockup',
  },
  corporatePreview: {
    tag: 'Kurumsal',
    title: 'Kurumsal Siteniz',
    titleHighlight: 'İş Üretsin',
    description: 'Kurumsal web siteniz sadece bir kartvizit olmasın. Güven veren, lead üreten, iş getiren bir dijital varlık oluşturun.',
    features: ['Güçlü ilk izlenim', 'Net hizmet sunumu', 'Lead üretimi'],
    cta: 'Detaylı Bilgi',
    mockupLabel: 'Kurumsal Mockup',
  },
  process: {
    label: 'Nasıl Çalışıyoruz?',
    title: '4 Adımda',
    titleHighlight: 'Dönüşüm Artışı',
    subtitle: 'Sadece web sitesi değil, satış ve müşteri kazandıran bir dijital varlık. İşte bu noktaya nasıl ulaştığımız.',
    steps: [
      { title: 'Ücretsiz Analiz', description: 'Web sitenizin URL\'sini girin, CRO analizinizi başlatalım.' },
      { title: 'WhatsApp Görüşme', description: 'Analiz sonuçlarını birlikte değerlendirelim.' },
      { title: 'Strateji & Teklif', description: 'Size özel dönüşüm stratejisi ve teklif hazırlayalım.' },
      { title: 'Uygulama & Sonuç', description: 'Stratejiyi uygulayalım, sonuçları birlikte takip edelim.' },
    ],
  },
  whyUs: {
    label: 'Neden Webtier?',
    title: 'Fark Yaratan Yaklaşım',
    subtitle: 'Rakiplerinizden bir adım önde olmanızı sağlayan metodoloji.',
    items: [
      { title: 'CRO Odaklı Yaklaşım', description: 'Sadece güzel site yapmıyoruz. Her element dönüşüm için tasarlanıyor.' },
      { title: 'Veri Destekli Kararlar', description: 'Tahminlere değil, verilere dayanarak optimizasyon yapıyoruz.' },
      { title: 'Hızlı Sonuçlar', description: 'İlk iyileştirmeler 2-4 hafta içinde etkisini göstermeye başlar.' },
      { title: 'Şeffaf İletişim', description: 'WhatsApp üzerinden her adımda yanınızdayız. Sürpriz yok.' },
    ],
  },
  testimonials: {
    label: 'Referanslar',
    title: 'Müşterilerimiz Ne Diyor?',
    items: [
      {
        name: 'Ahmet Yılmaz',
        role: 'Kurucu',
        company: 'TechStore',
        content: 'Webtier ile çalışmaya başladıktan sonra e-ticaret sitemizin dönüşüm oranı %35 arttı. Profesyonel ve sonuç odaklı bir ekip.',
        rating: 5,
      },
      {
        name: 'Elif Kaya',
        role: 'Genel Müdür',
        company: 'Kaya Danışmanlık',
        content: 'Kurumsal sitemizi yeniden tasarladılar. Artık web sitemiz gerçekten iş üretiyor, sadece kartvizit değil.',
        rating: 5,
      },
      {
        name: 'Mehmet Demir',
        role: 'E-Ticaret Müdürü',
        company: 'ModaShop',
        content: 'CRO analizi sayesinde sepet terk oranımız %25 düştü. Yatırımın geri dönüşü ilk ayda kendini gösterdi.',
        rating: 5,
      },
    ],
  },
  faq: {
    title: 'Sıkça Sorulan Sorular',
    subtitle: 'Merak ettiğiniz konularda size yardımcı olalım.',
    items: [
      { question: 'CRO nedir ve neden önemlidir?', answer: 'CRO (Conversion Rate Optimization), web sitenize gelen ziyaretçilerin müşteriye dönüşme oranını artırma sürecidir. Reklam harcamalarınız aynı kalırken, daha fazla satış ve lead elde etmenizi sağlar.' },
      { question: 'Ücretsiz CRO analizi neleri kapsar?', answer: 'Ücretsiz analizimiz sitenizin dönüşüm hunisini, kullanıcı deneyimini, CTA etkinliğini, mobil uyumluluğunu ve sayfa hızını kapsar. Detaylı bir rapor ile iyileştirme önerilerimizi sunarız.' },
      { question: 'Analiz sonuçları ne kadar sürede gelir?', answer: 'Ücretsiz CRO analiziniz genellikle 24-48 saat içinde hazır olur. Detaylı raporu WhatsApp üzerinden sizinle paylaşırız.' },
      { question: 'E-ticaret sitemde dönüşüm oranım neden düşük?', answer: 'Düşük dönüşüm oranının birçok sebebi olabilir: karmaşık satın alma akışı, yetersiz güven sinyalleri, yavaş sayfa hızı, mobil uyumsuzluk veya zayıf CTAlar. CRO analizi ile tam olarak nerelerde kayıp yaşadığınızı tespit ederiz.' },
      { question: 'Shopify/WooCommerce ile çalışıyor musunuz?', answer: 'Evet, tüm popüler e-ticaret platformları ile çalışıyoruz. Shopify, WooCommerce, Trendyol entegrasyonlu siteler ve özel altyapılar dahil.' },
      { question: 'Sıfırdan e-ticaret sitesi kurulumu ne kadar sürer?', answer: 'Projenin kapsamına göre 4-8 hafta arasında değişir. Anahtar teslim, dönüşüm odaklı bir e-ticaret sitesi kuruyoruz.' },
      { question: 'Kurumsal sitemin neden satış üretmediğini nasıl anlarım?', answer: 'Ücretsiz CRO analizimiz ile sitenizin ziyaretçi davranışlarını, form dönüşümlerini ve kullanıcı akışını inceliyoruz. Sitenizin nerede müşteri kaybettiğini net olarak görürsünüz.' },
      { question: 'Aylık CRO retainer ne içerir?', answer: 'Aylık retainer paketimiz sürekli A/B testleri, kullanıcı davranış analizi, landing page optimizasyonu, hız iyileştirmeleri ve aylık performans raporlarını içerir.' },
      { question: 'Retainer\'ı iptal edebilir miyim?', answer: 'Evet, aylık retainer paketimiz esnek bir yapıdadır. İstediğiniz zaman iptal edebilirsiniz, herhangi bir taahhüt yoktur.' },
      { question: 'Sonuçları ne zaman görmeye başlarım?', answer: 'İlk iyileştirmeler genellikle 2-4 hafta içinde etkisini gösterir. Sürekli optimizasyon ile dönüşüm oranınız aydan aya artmaya devam eder.' },
      { question: 'CRO-X Ultra analizi ne kadar sürer?', answer: 'CRO-X Ultra analizi, sitenizin karmaşıklığına bağlı olarak uzman ekibimiz tarafından 48-72 saat içinde tamamlanır ve detaylı raporunuz WhatsApp üzerinden iletilir.' },
      { question: 'Analiz sonuçlarını nasıl raporluyorsunuz?', answer: 'Analiz sonuçlarını hem yönetici özeti hem de teknik detayları içeren, adım adım uygulanabilir çözüm önerilerinden oluşan kapsamlı bir dijital rapor olarak sunuyoruz.' },
      { question: 'E-ticaret sitemde hangi metrikleri takip ediyorsunuz?', answer: 'Dönüşüm oranı, sepet terk oranı, hemen çıkma oranı, sayfa derinliği, tıklama yoğunluğu ve ortalama sipariş değeri gibi hayati metrikleri derinlemesine analiz ediyoruz.' },
      { question: 'A/B testi süreci nasıl işliyor?', answer: 'Analizden elde ettiğimiz verilere dayanarak hipotezler kuruyor, sitenizin farklı versiyonlarını gerçek kullanıcılarla test ediyor ve en yüksek dönüşümü sağlayan sürümü belirliyoruz.' },
      { question: 'Isı haritası (Heatmap) verilerini nasıl yorumluyorsunuz?', answer: 'Kullanıcılarınızın sitemizde en çok nereye odaklandığını, hangi butonlara tıkladığını ve nerede takıldığını görselleştirerek kayıp noktalarını tespit ediyoruz.' },
      { question: 'CRO çalışması SEO\'yu etkiler mi?', answer: 'Evet, olumlu etkiler. Kullanıcı deneyimini (UX) iyileştiren ve hemen çıkma oranını düşüren CRO çalışmaları, Google ve diğer arama motorları tarafından ödüllendirilir.' },
      { question: 'Shopify siteme CRO-X Ultra uygulayabilir miyim?', answer: 'Kesinlikle. Shopify, WooCommerce, Magento ve tüm özel altyapılı siteler için özelleştirilmiş analiz ve optimizasyon sağlıyoruz.' },
      { question: 'Hangi sektörler için en etkili sonuçları alıyorsunuz?', answer: 'E-ticaret, sağlık, danışmanlık, turizm ve B2B hizmet sektörlerinde dönüşüm oranlarında en belirgin artışları sağlıyoruz.' },
      { question: 'Analiz sonrası uygulama desteği veriyor musunuz?', answer: 'Evet. Çıkan rapordaki iyileştirmeleri isterseniz kendi ekibinizle, isterseniz de Webtier\'in uzman geliştirici kadrosuyla hızla hayata geçirebilirsiniz.' },
      { question: 'Garantili dönüşüm artışı sağlıyor musunuz?', answer: 'Veri odaklı metodolojimiz sayesinde, analizdeki öneriler harfiyen uygulandığında dönüşüm oranlarında ölçülebilir bir artış sağlıyoruz.' },
    ],
  },
  cta: {
    label: 'Başlayalım',
    title: 'Sitenizin Gerçek Potansiyelini',
    titleHighlight: 'Keşfedin',
    subtitle: 'Ücretsiz CRO analiziyle başlayın. Rakiplerinizden önce harekete geçin.',
    primaryCta: 'Ücretsiz Analiz Al',
    secondaryCta: 'WhatsApp\'tan Yazın',
    trustNote: 'Kredi kartı gerekmez • 2 dakikada sonuç • Uzman analizi',
  },
  references: {
    label: 'Güvendikleri Markalar',
  },
  footer: {
    tagline: 'İşletmenin maksimum halini keşfet.',
    servicesLabel: 'Hizmetler',
    legalLabel: 'Yasal',
    contactLabel: 'İletişim',
    rights: 'Tüm hakları saklıdır.',
    contact: 'İletişim',
    services: [
      { label: 'CRO-X AI', href: '/dashboard' },
      { label: 'CRO Retainer', href: '/e-ticaret' },
      { label: 'E-Ticaret Web Tasarım', href: '/e-ticaret' },
      { label: 'Kurumsal Web Tasarım', href: '/kurumsal' },
    ],
    legal: [
      { label: 'KVKK', href: '/kvkk' },
      { label: 'Mesafeli Satış Sözleşmesi', href: '/satis-sozlesmesi' },
      { label: 'Gizlilik & Çerez Politikası', href: '/gizlilik-politikasi' },
    ],
  },
  featureGrid: {
    title: 'Neden Webtier ile Çalışmalısınız?',
    description: 'Geleneksel ajansların aksine biz sadece trafiğe değil, o trafiğin ne kadarının kazanca dönüştüğüne odaklanıyoruz.',
    items: [
      {
        title: 'CRO & Dönüşüm Analizi',
        meta: 'Detaylı Veri',
        description: 'Sitenizin neden müşteri kaybettiğini verilerle analiz ediyor, dönüşüm deliklerini kapatıyoruz.',
        status: 'Popüler',
        tags: ['Veri', 'Analiz'],
      },
      {
        title: 'A/B Test Stratejileri',
        meta: 'Hipotez Testi',
        description: 'Varsayımlarla değil, gerçek kullanıcı testleriyle karar veriyoruz.',
        tags: ['Test', 'CRO'],
      },
      {
        title: 'Dönüşüm Odaklı Tasarım',
        meta: 'UX/UI',
        description: 'Sadece şık değil, aynı zamanda satış yapan yüksek performanslı landing page ve e-ticaret arayüzleri.',
        tags: ['Tasarım', 'Satış'],
      },
      {
        title: 'Hızlı & Çevik Uygulama',
        meta: '2x Hız',
        description: 'Optimizasyon süreçlerini haftalar değil, günler içinde canlıya alıyoruz.',
        status: 'Hızlı',
        tags: ['Performans'],
      },
      {
        title: 'E-Ticaret Uzmanlığı',
        meta: '+150 Proje',
        description: 'Shopify, WooCommerce ve özel altyapılarda tescilli satış artırma deneyimi.',
        tags: ['E-Ticaret'],
      },
      {
        title: 'Sürekli Optimizasyon',
        meta: 'Retainer',
        description: 'Dönüşüm bir kerelik bir iş değildir. Sürekli testlerle büyümenizi otomatiğe alıyoruz.',
        status: 'Destek',
        tags: ['Büyüme'],
      },
    ],
  },
  profile: {
    title: 'Profilim',
    phone: 'Telefon',
    phoneLabel: 'Telefon Numaranız',
    status: 'Analiz Durumu',
    statusPending: 'Rapor Hazırlanıyor...',
    statusCompleted: 'Rapor Hazır',
    statusNone: 'Henüz analiz yok',
    credits: 'Kalan Kredi',
    creditsLabel: 'Kredi',
    creditsButton: 'CRO-X Ultra\'ya Git',
    logout: 'Çıkış Yap',
    hide: 'Gizle',
    show: 'Göster',
    close: 'Kapat',
  },
  cookieConsent: {
    title: 'Çerez ve oturum bilgilendirmesi',
    description: 'Analiz akışını ve oturum durumunu sürdürebilmek için gerekli çerezleri ve LocalStorage verilerini kullanıyoruz. Detaylar için',
    link: 'Gizlilik ve Çerez Politikası',
    suffix: 'sayfasını inceleyebilirsiniz.',
    button: 'Kabul Et',
  },
  common: {
    whatsappAria: 'WhatsApp ile iletişime geçin',
    scrollToTopAria: 'Sayfanın başına dön',
    whatsappContact: 'WhatsApp İletişim',
  },
  ecommerce: {
    tag: 'E-Ticaret Çözümleri',
    title: 'E-Ticaret Siteniz',
    titleHighlight: 'Satış Makinesi',
    titleSuffix: 'Olsun',
    subtitle: 'Dönüşüm odaklı e-ticaret altyapısı ile daha fazla satış, daha yüksek ortalama sipariş değeri.',
    ctaAnalysis: 'Ücretsiz Analiz Al',
    ctaWhatsApp: 'WhatsApp İletişim',
    problemsTitle: 'Siteniz Neden Satış Kaybediyor?',
    problems: [
      'Ziyaretçiler siteyi geziyor ama satın almıyor',
      'Sepet terk oranı çok yüksek',
      'Mobilde dönüşüm oranı çok düşük',
      'Ürün sayfaları yeterince ikna edici değil',
    ],
    detailsTitle: 'Neleri Kapsıyor?',
    detailsSubtitle: 'A\'dan Z\'ye dönüşüm odaklı tasarım ve geliştirme süreci',
    details: [
      { title: 'Ana Sayfa Yapısı', desc: 'Dönüşüm odaklı, güven veren ana sayfa tasarımı' },
      { title: 'Ürün Sayfası', desc: 'İkna edici ürün sunumu, galeri ve açıklama optimizasyonu' },
      { title: 'Sepet & Ödeme', desc: 'Minimum adımda, güvenli ve hızlı satın alma akışı' },
      { title: 'Mobil UX', desc: 'Mobil öncelikli tasarım, touch-friendly arayüz' },
      { title: 'SEO', desc: 'Organik trafiğinizi artıracak teknik SEO altyapısı' },
      { title: 'CRO', desc: 'Sürekli test ve optimizasyon ile artan dönüşüm oranı' },
    ],
    packagesTitle: 'Paketlerimiz',
    packagesSubtitle: 'İhtiyacınıza en uygun CRO ve e-ticaret çözümünü seçin',
    packages: [
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
        popularBadge: 'EN POPÜLER',
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
    ],
    faqTitle: 'Sıkça Sorulan Sorular',
    faqItems: [
      { question: 'E-ticaret sitemde dönüşüm oranım neden düşük?', answer: 'Düşük dönüşüm oranının birçok sebebi olabilir: karmaşık satın alma akışı, yetersiz güven sinyalleri, yavaş sayfa hızı, mobil uyumsuzluk veya zayıf CTA\'lar. CRO analizi ile tam olarak nerelerde kayıp yaşadığınızı tespit ederiz.' },
      { question: 'Shopify/WooCommerce ile çalışıyor musunuz?', answer: 'Evet, tüm popüler e-ticaret platformları ile çalışıyoruz. Shopify, WooCommerce, Trendyol entegrasyonlu siteler ve özel altyapılar dahil.' },
      { question: 'Mevcut sitemin optimizasyonu ne kadar sürer?', answer: 'CRO Optimize paketi genellikle 2-4 hafta sürer. İlk iyileştirmeler 1-2 hafta içinde uygulanmaya başlar.' },
      { question: 'Sıfırdan e-ticaret sitesi kurulumu ne kadar sürer?', answer: 'Projenin kapsamına göre 4-8 hafta arasında değişir. Anahtar teslim, dönüşüm odaklı bir e-ticaret sitesi kuruyoruz.' },
      { question: 'Aylık retainer\'ı iptal edebilir miyim?', answer: 'Evet, aylık retainer paketimiz esnek bir yapıdadır. İstediğiniz zaman iptal edebilirsiniz, herhangi bir taahhüt yoktur.' },
    ],
    ctaTitle: 'E-Ticaret Sitenizi',
    ctaTitleHighlight: 'Dönüştürmeye',
  },
  corporate: {
    tag: 'Kurumsal Web Tasarım',
    title: 'Kurumsal Siteniz',
    titleHighlight: 'İş Üretsin',
    subtitle: 'Web siteniz sadece bir kartvizit olmasın. Güven veren, lead üreten, iş getiren bir dijital varlık oluşturun.',
    ctaAnalysis: 'Ücretsiz Analiz Al',
    ctaWhatsApp: 'WhatsApp İletişim',
    problemsTitle: 'Siteniz Güven Veriyor mu?',
    problems: [
      'Web siteniz güven vermiyor, ziyaretçiler hemen çıkıyor',
      'Hizmetleriniz net anlaşılmıyor, potansiyel müşteriler kaybolyor',
      'İletişim formunuz dönüşüm üretmiyor',
      'Rakipleriniz dijitalde sizden önde görünüyor',
    ],
    featuresTitle: 'Modern Kurumsal Sayfalar Paketi',
    features: [
      'Güçlü ilk izlenim yaratan ana sayfa',
      'Net ve ikna edici hizmet sayfaları',
      'Dönüşüm odaklı lead formları',
      'WhatsApp CTA entegrasyonu',
      'Referans ve güven sinyalleri',
      'Mobil öncelikli responsive tasarım',
      'SEO uyumlu altyapı',
      'Süreç ve çalışma şekli sunumu',
    ],
    ctaOffer: 'Teklif Al',
    audienceTitle: 'Kimler İçin Uygun?',
    audienceSubtitle: 'Sektörünüze özel dönüşüm stratejileri ile yanınızdayız',
    audience: [
      { title: 'Klinikler & Sağlık', desc: 'Diş klinikleri, güzellik merkezleri, poliklinikler' },
      { title: 'Danışmanlık Firmaları', desc: 'Hukuk, finans, management danışmanlığı' },
      { title: 'Ajanslar', desc: 'Reklam, PR, dijital pazarlama ajansları' },
      { title: 'Üretim & Servis', desc: 'Üretim firmaları, teknik servis, bakım hizmetleri' },
      { title: 'Profesyonel Hizmetler', desc: 'Eğitim, koçluk, mimarlık, mühendislik' },
      { title: 'Yerel İşletmeler', desc: 'Restoran, otel, spor salonu, kuaför' },
    ],
    faqTitle: 'Sıkça Sorulan Sorular',
    faqItems: [
      { question: 'Kurumsal sitemin neden satış üretmediğini nasıl anlarım?', answer: 'Ücretsiz CRO analizimiz ile sitenizin ziyaretçi davranışlarını, form dönüşümlerini ve kullanıcı akışını inceliyoruz. Sitenizin nerede müşteri kaybettiğini net olarak görürsünüz.' },
      { question: 'Lead form optimizasyonu nedir?', answer: 'Lead form optimizasyonu, iletişim formlarınızın dönüşüm oranını artırma sürecidir. Form alanlarını azaltma, güven sinyalleri ekleme, mikro-kopi iyileştirme gibi tekniklerle daha fazla müşteri adayı elde edersiniz.' },
      { question: 'Site yenileme mi yoksa sıfırdan mı kurulum yapmalıyım?', answer: 'Bu tamamen mevcut sitenizin durumuna bağlı. CRO analizinden sonra en doğru yaklaşımı birlikte belirleriz. Bazen küçük optimizasyonlar büyük fark yaratır, bazen sıfırdan başlamak daha verimlidir.' },
      { question: 'Kurumsal site ne kadar sürede hazır olur?', answer: 'Projenin kapsamına göre 3-6 hafta arasında değişir. İçerik hazırlığı ve geri bildirim süreci bu süreyi etkiler.' },
      { question: 'Sonradan içerik ekleyebilir miyim?', answer: 'Evet, tüm sitelerimiz kolay yönetilebilir yapıda kurulur. Gerekirse CMS entegrasyonu da yapılabilir.' },
    ],
    ctaTitle: 'Kurumsal Sitenizi',
    ctaTitleHighlight: 'Dönüştürmeye',
  },
  contact: {
    title: 'İletişime Geçin',
    subtitle: 'Projeniz hakkında konuşalım. Size en uygun çözümü birlikte belirleyelim.',
    methods: {
      whatsapp: { title: 'WhatsApp', desc: 'En hızlı iletişim yolu' },
      email: { title: 'E-posta', desc: 'Detaylı sorularınız için' },
      phone: { title: 'Telefon', desc: 'Mesai saatlerinde arayın' },
    },
    fastResponseTitle: 'Hızlı Yanıt Alın',
    fastResponseSubtitle: 'WhatsApp üzerinden anında dönüş yapıyoruz. Projenizi tartışmak için bize yazın.',
    whatsappButton: 'WhatsApp ile Yazın',
  },
  emailVerification: {
    title: 'Doğrulama Kodunu Girin',
    subtitle: 'E-posta adresinize doğrulama kodu gönderdik',
    emailSentTo: 'adresine gönderildi',
    codePlaceholder: '------',
    verifyButton: 'Doğrula',
    verifying: 'Doğrulanıyor...',
    resend: 'Tekrar Gönder',
    resending: 'Gönderiliyor...',
    didntGetCode: 'Kod gelmedi mi?',
    successMessage: 'E-posta başarıyla doğrulandı!',
    errorInvalidCode: 'Geçersiz kod. Lütfen tekrar deneyin.',
    terms: 'Devam ederek',
    termsLink: 'Kullanım Şartları',
    privacyLink: 'Gizlilik Politikası',
    and: 've',
  },
};

export default tr;
