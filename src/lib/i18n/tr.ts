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
    navigation: string;
    preferences: string;
    languageSelection: string;
    close: string;
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
      insufficientMini: string;
      insufficientUltra: string;
      analysisGenericError: string;
    };
    analysisSuccess: string;
  };
  croxUltra: {
    badge: string;
    title: string;
    subtitle: string;
    moreTitle: string;
    items: string[];
    ultraBox: {
      title: string;
      subtitle: string;
      price: string;
      credit: string;
    };
    miniBox: {
      title: string;
      subtitle: string;
      price: string;
      credit: string;
      cta: string;
    };
    cta: string;
    leaksTitle: string;
    leaksHighlight: string;
    leaksSubtitle: string;
    problems: readonly string[];
    leaksDescription: string;
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
  workflow: {
    title: string;
    highlight: string;
    subtitle1: string;
    subtitle2: string;
    exploreLabel: string;
    exploreHint: string;
    steps: {
      id: string;
      title: string;
      description: string;
    }[];
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
    email: string;
    emailLabel: string;
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
    titleSuffix: string;
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
    ctaTitleSuffix: string;
    hero: {
      brandName: string;
      tagline1: string;
      tagline2: string;
      cardHeading: string;
      cardDescription: string;
      metricLabel: string;
      ctaHeading: string;
      ctaDescription: string;
      ctaAnalysisLabel: string;
      ctaContactLabel: string;
      ctaAnalysisSub: string;
      ctaContactSub: string;
      badge1Title: string;
      badge1Sub: string;
      badge2Title: string;
      badge2Sub: string;
      storeLabel: string;
      salesLabel: string;
    };
    ctaDescription: string;
    ctaTrustNote: string;
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
    heroTitle: string;
    shimmerTitle: string;
    shimmerSubtitle: string;
    ctaButton: string;
    featuresSubtitle: string;
    carouselSlides: {
      id: string;
      title: string;
      description: string;
      features: string[];
    }[];
    checklistTitle: string;
    checklistHighlight: string;
    ctaDescription: string;
    ctaTrustNote: string;
  };
  admin: {
    loginTitle: string;
    loginSubtitle: string;
    emailLabel: string;
    passwordLabel: string;
    loginButton: string;
    loggingIn: string;
    unauthorizedNote: string;
    loginFailed: string;
    serverError: string;
    analysesTitle: string;
    usersTitle: string;
    settingsTitle: string;
  };
  auth: {
    signupTitle: string;
    signupSubtitle: string;
    signupButtonText: string;
    loginTitleText: string;
    loginSubtitle: string;
    loginButtonText: string;
    emailLabel: string;
    passwordLabel: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    rememberMe: string;
    alreadyHaveAccount: string;
    noAccountYet: string;
    forgotPassword: string;
    orContinueWith: string;
    googleContinue: string;
    trustedBy: string;
    resetPasswordSoonText: string;
    welcomeMessage: string;
    signupFailedText: string;
    loginFailedText: string;
    oauthErrors: {
      failed: string;
      cancelled: string;
      config: string;
      generic: string;
    };
    testimonials: {
      name: string;
      text: string;
    }[];
  };
  pricing: {
    title: string;
    subtitle: string;
    monthly: string;
    yearly: string;
    getQuote: string;
    popular: string;
    yearlyNote: string;
    monthlyNote: string;
    totalPrice: string;
    plans: {
      name: string;
      description: string;
      includes: string[];
    }[];
  };
  aiInput: {
    live: string;
    maintenance: string;
    waiting: string;
    analyze: string;
  };
  retrainer: {
    tag: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    box: {
      title: string;
      subtitle: string;
      price: string;
      cta: string;
    };
    features: readonly { title: string; description: string }[];
    processTitle: string;
    processTitleHighlight: string;
    processSubtitle: string;
    processItems: readonly string[];
    ctaTitle: string;
    ctaTitleHighlight: string;
    ctaSubtitle: string;
    ctaPrimaryButton: string;
    ctaSecondaryButton: string;
    faqTitle: string;
    faqItems: readonly { question: string; answer: string }[];
    timelineItems: readonly {
      title: string;
      date: string;
      content: string;
      category: string;
    }[];
    bentoTabs: readonly {
      label: string;
      title: string;
      description: string;
      features: readonly string[];
    }[];
    includedTitle: string;
    includedHighlight: string;
    includedSubtitle: string;
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
  dashboard: {
    sidebar: {
      system: string;
      dashboard: string;
      analysis: string;
      backlog: string;
      credits: string;
      notifications: string;
      profile: string;
      home: string;
      verifiedMember: string;
      notVerified: string;
      support: string;
      logout: string;
    };
    header: {
      panel: string;
      greeting: string;
      credits: string;
      verificationStatus: string;
      pendingVerification: string;
    };
    overview: {
      miniTitle: string;
      ultraTitle: string;
      miniCredit: string;
      ultraCredit: string;
      placeholderMini: string;
      placeholderUltra: string;
      insufficientCredits: string;
      urlRequired: string;
      invalidUrl: string;
      analysisRequested: string;
      ultraAnalysisRequested: string;
      ultraBannerTitle: string;
      ultraBannerDesc: string;
      ultraBannerButton: string;
    };
    verification: {
      bannerTitle: string;
      bannerDesc: string;
      bannerButton: string;
    };
    backlog: {
      title: string;
      subtitle: string;
      noTasks: string;
      soon: string;
      priorities: {
        low: string;
        medium: string;
        high: string;
        critical: string;
      };
      statuses: {
        todo: string;
        inProgress: string;
        review: string;
        done: string;
        cancelled: string;
      };
    };
    credits: {
      title: string;
      subtitle: string;
      starter: string;
      popular: string;
      advantage: string;
      features: readonly string[];
      selectButton: string;
      packageDescription: string;
    };
    purchaseModal: {
      title: string;
      subtitle: string;
      popular: string;
      payButton: string;
      loading: string;
      securePayment: string;
      sslInfo: string;
      paymentError: string;
      packageLabel: string;
      errorGeneric: string;
      securePaymentTitle: string;
      paymentIframeTitle: string;
    };
    auth: {
      login: string;
    };
    notifications: {
      title: string;
      subtitle: string;
      empty: string;
      emptyHint: string;
      markAllRead: string;
      unreadCount: string;
      types: {
        analysis_completed: string;
        analysis_failed: string;
        analysis_rejected: string;
        task_assigned: string;
      };
    };
    settings: {
      title: string;
      subtitle: string;
      personalInfo: string;
      firstName: string;
      lastName: string;
      email: string;
      saveButton: string;
      security: string;
      securityDesc: string;
      resetPasswordButton: string;
      resetRequested: string;
      resetCheckEmail: string;
      logoutTitle: string;
      logoutDesc: string;
      logoutButton: string;
      updateSuccess: string;
      updateError: string;
      resetError: string;
    };
    analysis: {
      historyTitle: string;
      totalLabel: string;
      noAnalyses: string;
      startFirst: string;
      statusCompleted: string;
      statusPending: string;
      statusProcessing: string;
      viewReport: string;
      loadError: string;
      genericError: string;
      documentsTitle: string;
    };
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
    navigation: 'Navigasyon',
    preferences: 'Tercihler',
    languageSelection: 'Dil Seçimi',
    close: 'Kapat',
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
      emptyUrl: 'Lütfen bir web sitesi adresi girin',
      invalidUrl: 'Lütfen geçerli bir web sitesi adresi girin (örn: example.com)',
      invalidEmail: 'Geçerli bir e-posta adresi girin.',
      timeout: 'Çok fazla deneme. {minutes} dakika sonra tekrar deneyin.',
      insufficientMini: 'Yetersiz Mini kredi. Profilinizden ek kredi alabilirsiniz.',
      insufficientUltra: 'Yetersiz Ultra kredi. Lütfen bakiye yükleyin.',
      analysisGenericError: 'Analiz başlatılamadı',
    },
    analysisSuccess: 'Analiz talebiniz başarıyla alındı. Raporunuz hazırlandığında bilgilendirileceksiniz.',
  },
  croxUltra: {
    badge: 'CRO-X ULTRA',
    title: 'CRO-X Ultra Listenin Hepsi!',
    subtitle: 'İşletmenizin dijital varlığını 360° analiz eden, stratejik yol haritası çıkartan premium analiz motoru.',
    moreTitle: 'Daha Fazlası',
    items: [
      'Gelişmiş CRO Analizi',
      'Kullanıcı Davranış Analizi',
      'Dönüşüm Hunisi Takibi',
      'Isı Haritası Entegrasyonu',
      'Hız ve Performans Testi',
      'A/B Testi Önerileri',
      'Kullanılabilirlik Denetimi',
      'Mobil Uyumluluk Analizi',
      'SEO ve İçerik Kontrolü',
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
    ultraBox: {
      title: 'CRO-X AI ULTRA',
      subtitle: 'Geleceğinizi analiz ile tecrübe edin.',
      price: '249 TL',
      credit: '2 Kredi Hakkı.',
    },
    miniBox: {
      title: 'CRO-X AI MINI',
      subtitle: 'Dijital varlığınızı analiz edin, farkı görün.',
      price: 'Ücretsiz',
      credit: '1 Kredi Hakkı.',
      cta: 'ANALİZ AL',
    },
    cta: 'ŞİMDİ DENE',
    leaksTitle: 'Sizi {highlight} uğratan sebepler ney?',
    leaksHighlight: 'zarara',
    leaksSubtitle: "İşletmelerin %92'si aşağıdaki 12 temel sorundan en az 5 tanesini paylaşıyor. Sizin sitenizdeki engel hangisi?",
    problems: [
      'Ziyaretçiler siteyi geziyor ama satın almıyor',
      'Sepet terk etme oranı çok yüksek',
      'Mobilde dönüşüm oranı çok düşük',
      'Ürün sayfaları yeterince ikna edici değil',
      'Ödeme adımları çok karmaşık ve uzun',
      'Sitenin yüklenme hızı kullanıcıları kaçırıyor',
      'Güven sinyalleri ve sosyal kanıtlar eksik',
      'Navigasyon yapısı kafa karıştırıyor',
      'Eylem çağrıları (CTA) görünür değil',
      'Hizmetler/Ürünler net bir şekilde anlaşılmıyor',
      'Rakipler dijitalde daha profesyonel görünüyor',
      'Arama fonksiyonu verimli çalışmıyor'
    ],
    leaksDescription: "Yukarıdaki tüm sızıntıları gerçek zamanlı verilerle kapatıyoruz. Sadece analiz etmiyor, dönüşüm oranlarınızı katlayacak bir yol haritası sunuyoruz.\n\nTek yapmanız gereken dijital bir adres girmek.",
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
      { title: 'E-Ticaret Çolsun', description: 'Satış üreten, dönüşüm odaklı e-ticaret altyapısı kurun.', cta: 'Detaylı Bilgi' },
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
      { title: 'Sonuçlar', description: 'Analiz tamamlandığında aksiyon planınızla birlikte büyüme yolculuğunuz başlar.' },
    ],
  },
  workflow: {
    title: 'Retrainer',
    highlight: 'Webtier',
    subtitle1: 'Webtier olarak, dijital dünyadaki varlığınızı sadece bir web sitesi olmanın ötesine taşıyoruz. Geliştirdiğimiz CRO-X AI teknolojisi ve veri odaklı stratejilerimizle, markanızın büyüme potansiyelini maksimize eden uçtan uca bir dönüşüm yolculuğu kurguluyoruz.',
    subtitle2: 'Her projemizde, kullanıcı davranışlarını milimetrik hassasiyetle analiz ederek, stratejimizi sadece tahminlerle değil, somut verilerle şekillendiriyoruz.',
    exploreLabel: 'Keşfet',
    exploreHint: 'Kartlara tıklayarak süreci keşfedin',
    steps: [
      {
        id: 'p1',
        title: 'CRO-X AI Analizi',
        description: 'Geliştirdiğimiz CRO-X AI teknolojimizle web sitenizin kullanıcı deneyimini derinlemesine analiz ediyor, dönüşüm hunisindeki darboğazları milimetrik hassasiyetle belirliyoruz. Veri odaklı yaklaşımımızla, kullanıcılarınızın nerede ve neden sitenizi terk ettiğini ortaya çıkararak gelir kaybını anında durduruyoruz.',
      },
      {
        id: 'p2',
        title: 'CRO-X Ultra',
        description: 'Dijital varlığınızın tam potansiyelini ortaya çıkaran kapsamlı strateji paketi. Rakip analizinden marka konumlandırmasına, özel raporumuzla dönüşüm yol haritanızı milimetrik hassasiyetle çiziyoruz.',
      },
      {
        id: 'p3',
        title: 'Webtier E-Ticaret',
        description: 'Sadece bir web sitesi değil, yüksek cirolar ve sürdürülebilir büyüme için tasarlanmış bir satış makinesi. Her detayı satış psikolojisine göre optimize edilmiş profesyonel e-ticaret altyapıları ile e-ticaret sitenizi gelire dönüştürüyoruz.',
      },
      {
        id: 'p4',
        title: 'Webtier CRO Optimizasyonu',
        description: 'Sürekli gelişim, sürekli artış. Mevcut trafiğinizi reklamlara ek bütçe ayırmadan daha fazla müşteriye dönüştürmek için veri odaklı A/B testleri ve kullanıcı davranış analizleri ile sitenizi her gün daha iyiye taşıyoruz.',
      },
      {
        id: 'p5',
        title: 'Danışmanlık ve Teklifler',
        description: 'İşletmenize özel butik çözümler ve büyüme stratejileri. Mevcut dijital stratejinizi birlikte değerlendiriyor, büyüme hedeflerinize en hızlı ulaşmanızı sağlayacak performansa dayalı iş birliği modellerini kurguluyoruz.',
      },
      {
        id: 'p6',
        title: 'Limitlerin Ötesinde',
        description: 'Webtier, verinin gücüne ve yapay zekanın hassasiyetine inanan bir teknoloji ve strateji ajansıdır. Limitlerin ötesinde mottomuzla, her işletmenin saklı kalmış potansiyelini verilere ve yapay zekaya dayanarak açığa çıkarıyoruz.',
      },
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
      { question: 'Ücretsiz CRO analizi neleri kapsar?', answer: 'Ücretsiz analizimiz sitenizin dönüşüm hunisini, kullanıcı deneyimini, CTA etkinliğini, mobil uyumluluğunu ve sayfa hızını kapsar. Detaylı bir rapor ile iyileştirme önerilerimizi sunarer.' },
      { question: 'Analiz sonuçları ne kadar sürede gelir?', answer: 'Ücretsiz CRO analiziniz genellikle 24-48 saat içinde hazır olur. Detaylı raporu WhatsApp üzerinden sizinle paylaşırız.' },
      { question: 'E-ticaret sitemde dönüşüm oranım neden düşük?', answer: 'Düşük dönüşüm oranının birçok sebebi olabilir: karmaşık satın alma akışı, yetersiz güven sinyalleri, yavaş sayfa hızı, mobil uyumsuzluk veya zayıf CTAlar. CRO analiz ile tam olarak nerelerde kayıp yaşadığınızı tespit ederiz.' },
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
    email: 'E-posta',
    emailLabel: 'E-posta Adresiniz',
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
      { question: 'Aylık retainer\'ı iptal edebilir miyim?', answer: 'Hizmetimiz aylık abonelik şeklindedir. İstediğiniz zaman iptal edebilir veya dondurabilirsiniz. Taahhüt zorunluluğu yoktur.' },
    ],
    ctaTitle: 'E-Ticaret Sitenizi',
    ctaTitleHighlight: 'Dönüştürmeye',
    ctaTitleSuffix: 'Hazır mısınız?',
    hero: {
      brandName: 'SATIŞ',
      tagline1: 'E-Ticarette Fark',
      tagline2: 'Yaratan Altyapı.',
      cardHeading: 'Dönüşümü artırın.',
      cardDescription: 'Webtier, e-ticaret sitenizi ziyaretçiden müşteriye dönüştüren stratejik tasarım ve CRO optimizasyonu ile büyümenizi hızlandırır.',
      metricLabel: 'Aylık Ciro ₺',
      ctaHeading: 'E-Ticarette büyüyün.',
      ctaDescription: 'Ücretsiz CRO analizi ile başlayın. E-ticaret sitenizin gerçek potansiyelini keşfedin.',
      ctaAnalysisLabel: 'CRO Analizi Al',
      ctaContactLabel: 'İletişime Geç',
      ctaAnalysisSub: 'Ücretsiz',
      ctaContactSub: 'Şimdi',
      badge1Title: '+34.2% Büyüme',
      badge1Sub: 'Bu ay gerçekleşti',
      badge2Title: 'Sepet Optimizasyonu',
      badge2Sub: 'CRO aktif',
      storeLabel: 'Mağaza',
      salesLabel: 'Satışlar',
    },
    ctaDescription: 'Ücretsiz CRO analizi ile başlayın. E-ticaret sitenizin gerçek potansiyelini keşfedin.',
    ctaTrustNote: 'Kredi kartı gerekmez • 2 dakikada sonuç • Uzman analizi',
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
    ctaTitleHighlight: 'Dönüştürün',
    heroTitle: 'Marka Olmak Mı?',
    shimmerTitle: 'Dijital dünyada fark yaratın.',
    shimmerSubtitle: 'Profesyonel kurumsal web tasarımı ile markanızı dijitalde güçlü bir şekilde konumlandırın. İlk izlenim, kalıcı etki.',
    ctaButton: 'Teklif Al',
    featuresSubtitle: 'Kurumsal web sitenizde sunduğumuz kapsamlı hizmetler',
    carouselSlides: [
      {
        id: 'design',
        title: 'Premium Tasarım',
        description: 'Marka kimliğinizi yansıtan, benzersiz ve modern kurumsal web tasarımı. İlk izlenim her şeydir.',
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
        title: 'SEO & Performans',
        description: "Google'da üst sıralarda yer almanız için teknik SEO ve sayfa performansı optimizasyonu.",
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
        title: 'Dönüşüm Odaklı',
        description: 'Ziyaretçileri müşteriye dönüştüren stratejik tasarım ve CTA optimizasyonu.',
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
        title: 'Modern Teknoloji',
        description: 'En güncel web teknolojileri ile hızlı, güvenli ve ölçeklenebilir altyapı.',
        features: [
          'Next.js / React altyapısı',
          'Headless CMS entegrasyonu',
          'SSL sertifikası',
          'CDN üzerinden hızlı dağıtım',
          'Otomatik yedekleme',
        ],
      },
    ],
    checklistTitle: 'Her Paketin',
    checklistHighlight: 'İçeriği',
    ctaDescription: 'Ücretsiz CRO analizi ile başlayın. Kurumsal sitenizin lead üretme potansiyelini keşfedin.',
    ctaTrustNote: 'Kredi kartı gerekmez • 2 dakikada sonuç • Uzman analizi',
  },
  admin: {
    loginTitle: 'Webtier Admin',
    loginSubtitle: 'Yönetici paneline giriş yapın',
    emailLabel: 'E-posta',
    passwordLabel: 'Şifre',
    loginButton: 'Giriş Yap',
    loggingIn: 'Giriş yapılıyor...',
    unauthorizedNote: 'Webtier Admin Panel — Yetkisiz erişim yasaktır.',
    loginFailed: 'Giriş başarısız.',
    serverError: 'Sunucu hatası. Lütfen tekrar deneyin.',
    analysesTitle: 'Analiz Siparişleri',
    usersTitle: 'Kullanıcı Yönetimi',
    settingsTitle: 'Ayarlar',
  },
  auth: {
    signupTitle: 'Hesap Oluştur',
    signupSubtitle: 'Webtier ailesine katılın ve dijital varlığınızı analiz etmeye bugün başlayın.',
    signupButtonText: 'Hesap Oluştur',
    loginTitleText: 'Giriş Yap',
    loginSubtitle: 'Hoş geldiniz! Hesabınıza giriş yaparak analizlerinizi yönetin.',
    loginButtonText: 'Giriş Yap',
    emailLabel: 'Email Adresi',
    passwordLabel: 'Şifre',
    emailPlaceholder: 'E-posta adresinizi girin',
    passwordPlaceholder: 'Şifrenizi girin',
    rememberMe: 'Oturumu açık tut',
    alreadyHaveAccount: 'Zaten bir hesabınız var mı?',
    noAccountYet: 'Henüz bir hesabınız yok mu?',
    forgotPassword: 'Şifremi Unuttum',
    orContinueWith: 'veya şununla devam et',
    googleContinue: 'Google ile devam et',
    trustedBy: '10,000+ KULLANICI TARAFINDAN GÜVENİLİR',
    resetPasswordSoonText: 'Şifre sıfırlama özelliği yakında aktif olacaktır. Lütfen destek ile iletişime geçin.',
    welcomeMessage: 'Başarıyla giriş yapıldı! Hoş geldiniz.',
    signupFailedText: 'Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.',
    loginFailedText: 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.',
    oauthErrors: {
      failed: 'Google ile giriş başarısız oldu. Lütfen tekrar deneyin.',
      cancelled: 'Google girişi iptal edildi.',
      config: 'Sunucu yapılandırma hatası. Lütfen daha sonra tekrar deneyin.',
      generic: 'Bir hata oluştu. Lütfen tekrar deneyin.',
    },
    testimonials: [
      { name: 'Burak Yılmaz', text: 'CRO-X Ultra analizi sonrası sepet terk oranımız %40 düştü. İnanılmaz sonuçlar.' },
      { name: 'Ayşe Kaya', text: 'Webtier ile sitemiz sadece güzel değil, aynı zamanda gerçek bir satış makinesi haline geldi.' },
      { name: 'Can Demir', text: 'A/B testleri sayesinde lead kazanım maliyetimizi tam yarıya indirmeyi başardık.' },
      { name: 'Merve Aras', text: 'Dönüşüm odaklı tasarım yaklaşımı gerçekten fark yaratıyor. Teşekkürler Webtier!' },
      { name: 'Emre Koç', text: 'Müşterilerimize artık Webtier Retrainer ile sürdürülebilir büyüme vaat edebiliyoruz.' },
      { name: 'Selin Deniz', text: 'Kurumsal sitemiz artık sadece bir kartvizit değil, gerçek bir lead jeneratörü.' },
      { name: 'Kerem Öztürk', text: 'Dönüşüm oranlarındaki artış doğrudan ROI\'mize yansıdı. Her kuruşuna kesinlikle değer.' },
      { name: 'Deniz Yıldız', text: 'Shopify optimizasyonları sonrası sayfa hızımız ve dönüşümümüz inanılmaz arttı.' },
    ],
  },
  pricing: {
    title: 'Size En Uygun Planı Seçin',
    subtitle: 'Şeffaf fiyatlandırma, maksimum dönüşüm. İşletmenizin ölçeğine göre optimize edilmiş paketler.',
    monthly: 'Aylık',
    yearly: 'Yıllık',
    getQuote: 'Teklif Al',
    popular: 'Popüler',
    yearlyNote: 'yıllık planlama için',
    monthlyNote: 'paket detayları için',
    totalPrice: 'Toplam Ücret',
    plans: [
      {
        name: 'Starter',
        description: 'Küçük işletmeler ve yeni başlayanlar için ideal CRO başlangıç paketi.',
        includes: [
          'Temel CRO Analizi',
          'Ayda 1 A/B Testi',
          'Isı Haritası Takibi',
          'Haftalık Raporlama',
        ],
      },
      {
        name: 'Professional',
        description: 'Büyüyen işletmeler için gelişmiş optimizasyon özellikleri.',
        includes: [
          'Starter Paketindeki Her Şey',
          'Ayda 3 A/B Testi',
          'Kullanıcı Kayıt Analizi',
          'Dönüşüm Hunisi Optimizasyonu',
          'Öncelikli Destek',
        ],
      },
      {
        name: 'Enterprise',
        description: 'Büyük ölçekli operasyonlar için tam kapsamlı CRO çözümü.',
        includes: [
          'Professional Paketindeki Her Şey',
          'Sınırsız A/B Testi',
          'Özel Strateji Danışmanlığı',
          '7/24 Teknik Destek',
          'Özel Entegrasyonlar',
        ],
      },
    ],
  },
  aiInput: {
    live: 'CANLI',
    maintenance: 'BAKIMDA',
    waiting: 'BEKLENİYOR',
    analyze: 'Analiz Et',
  },
  retrainer: {
    tag: 'CRO-X Uygulama Hizmeti',
    title: 'Webtier',
    titleHighlight: 'Retrainer',
    subtitle: 'CRO-X AI analiz sonuçlarını dijital varlıklarınıza uyguluyoruz. Abonelik bazlı aylık optimizasyon hizmeti ile dönüşüm oranlarınızı sürekli artırın.',
    ctaPrimary: 'Hemen Başvur',
    ctaSecondary: 'Detaylı Bilgi Al',
    box: {
      title: 'Webtier Retrainer',
      subtitle: 'KOBI\'lere uygun yaklaşımlar, markalara çığır açtıracak temaslar.',
      price: 'Önce bir planlayalım',
      cta: 'BİLGİ AL',
    },
    features: [
      {
        title: 'CRO-X Uygulama',
        description: 'CRO-X AI raporundaki tüm önerileri web sitenize, e-ticaret altyapınıza ve dijital varlıklarınıza profesyonel ekibimizle uyguluyoruz.',
      },
      {
        title: 'Aylık Optimizasyon',
        description: 'Her ay düzenli olarak performans takibi yapar, yeni iyileştirme fırsatlarını tespit eder ve dijital varlıklarınıza uygularız.',
      },
      {
        title: 'Sürekli Büyüme',
        description: 'Abonelik süresi boyunca dijital varlıklarınız sürekli güncellenir, dönüşüm oranlarınız aydan aya artar.',
      },
    ],
    processTitle: 'Sonuçlarınız,',
    processTitleHighlight: 'Bizim Eylemimiz.',
    processSubtitle: 'CRO-X AI analiz sonuçlarınızı alır, gerekli tüm teknik ve tasarım güncellemelerini yapar, aylık abonelik ile sürekli optimizasyon sağlarız. Siz işletmenize odaklanın, dijital dönüşümü biz yönetelim.',
    processItems: [
      'CRO-X raporundaki tüm aksiyonların uygulanması',
      'Web sitesi ve dijital varlıklarda teknik güncellemeler',
      'Aylık performans raporu ve yeni optimizasyonlar',
      'Abonelik bazlı esnek çalışma modeli',
    ],
    ctaTitle: 'Dönüşümü',
    ctaTitleHighlight: 'Hayata Geçirin',
    ctaSubtitle: 'Webtier Retrainer ile CRO-X AI sonuçlarınızı dijital varlıklarınıza uygulatın. Aylık abonelik ile sürekli büyüme sağlayın.',
    ctaPrimaryButton: 'Ücretsiz Görüş Talep Et',
    ctaSecondaryButton: 'Satış Ekibiyle Görüşün',
    faqTitle: 'Retrainer Hakkında Merak Edilenler',
    faqItems: [
      { question: 'Retrainer hizmeti tam olarak nedir?', answer: 'Retrainer, CRO-X AI analizinden çıkan raporu web sitenize bizzat bizim uyguladığımız ve her ay sitenizi optimize etmeye devam ettiğimiz bir abonelik hizmetidir.' },
      { question: 'Hangi web sitesi altyapılarını destekliyorsunuz?', answer: 'Shopify, WooCommerce, Magento ve özel React/Next.js projeleri dahil tüm modern altyapıları destekliyoruz.' },
      { question: 'Dönüşüm artışı ne kadar sürede görülür?', answer: 'İlk uygulamalardan sonra 2-4 hafta içinde verilerde iyileşme gözlemlenmeye başlar.' },
      { question: 'Aylık retainer ücreti neye göre belirleniyor?', answer: 'Sitenizin trafiği, sayfa sayısı ve optimizasyon derinliğine göre size özel bir plan sunuyoruz.' },
      { question: 'İstediğim zaman iptal edebilir miyim?', answer: 'Evet, Retrainer hizmeti taahhütsüzdür. Bir sonraki ayın ödemesi yapılmadığında hizmet durdurulur.' },
    ],
    timelineItems: [
      {
        title: 'CRO-X Raporu',
        date: 'Adım 1',
        content: 'CRO-X AI analizinden gelen kapsamlı rapor ve öneriler değerlendirilir, öncelikli aksiyonlar belirlenir.',
        category: 'Analiz',
      },
      {
        title: 'Uygulama',
        date: 'Adım 2',
        content: 'Rapordaki tüm aksiyonlar web sitenize ve dijital varlıklarınıza profesyonel ekibimizle uygulanır.',
        category: 'Uygulama',
      },
      {
        title: 'Takip & Analiz',
        date: 'Adım 3',
        content: 'Uygulanan değişikliklerin performansı aylık olarak takip edilir, raporlanır ve değerlendirilir.',
        category: 'Takip',
      },
      {
        title: 'Optimizasyon',
        date: 'Adım 4',
        content: 'Veriler ışığında yeni iyileştirme fırsatları tespit edilir ve sürekli olarak uygulanır.',
        category: 'Optimizasyon',
      },
      {
        title: 'Büyüme',
        date: 'Adım 5',
        content: 'Dönüşüm oranlarınız aydan aya artar, sürdürülebilir büyüme ve gelir artışı sağlanır.',
        category: 'Büyüme',
      },
    ],
    bentoTabs: [
      {
        label: 'Uygulama',
        title: 'CRO-X Uygulama Hizmeti',
        description: 'CRO-X AI raporundaki tüm önerileri web sitenize, e-ticaret altyapınıza ve dijital varlıklarınıza profesyonel ekibimizle uyguluyoruz.',
        features: [
          'Web sitesi teknik güncellemeler',
          'UX/UI iyileştirmeleri',
          'CTA optimizasyonu',
          'Mobil uyumluluk düzenlemeleri',
          'Sayfa hızı optimizasyonu',
        ],
      },
      {
        label: 'Aylık Takip',
        title: 'Aylık Optimizasyon Döngüsü',
        description: 'Her ay düzenli olarak performans takibi yapar, yeni iyileştirme fırsatlarını tespit eder ve dijital varlıklarınıza uygularız.',
        features: [
          'Aylık performans raporu',
          'Yeni optimizasyon önerileri',
          'A/B test stratejileri',
          'Kullanıcı davranış analizi',
          'Dönüşüm hunisi takibi',
        ],
      },
      {
        label: 'Büyüme',
        title: 'Sürekli Büyüme Motoru',
        description: 'Abonelik süresi boyunca dijital varlıklarınız sürekli güncellenir, dönüşüm oranlarınız aydan aya artar.',
        features: [
          'Sürdürülebilir dönüşüm artışı',
          'Rakip analizi ve kıyaslama',
          'Trend adaptasyonu',
          'Proaktif iyileştirmeler',
          'Esnek abonelik modeli',
        ],
      },
    ],
    includedTitle: 'Neler',
    includedHighlight: 'Dahil?',
    includedSubtitle: 'Retrainer hizmetinin kapsamını keşfedin',
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
  dashboard: {
    sidebar: {
      system: 'Sistem',
      dashboard: 'CRO-X AI Paneli',
      analysis: 'Analizler & Belgeler',
      backlog: 'Backlog',
      credits: 'Kredi Yükle',
      notifications: 'Bildirimler',
      profile: 'Profil',
      home: 'Anasayfa',
      verifiedMember: 'Doğrulanmış Üye',
      notVerified: 'Doğrulanmamış',
      support: 'Destek',
      logout: 'Çıkış Yap',
    },
    header: {
      panel: 'PANEL',
      greeting: 'Merhaba, {name}',
      credits: 'KREDİ',
      verificationStatus: 'Doğrulama Durumu',
      pendingVerification: 'Doğrulama Bekliyor',
    },
    overview: {
      miniTitle: 'CRO-X MINI',
      ultraTitle: 'CRO-X ULTRA',
      miniCredit: '1 KREDİ',
      ultraCredit: '1 KREDİ',
      placeholderMini: 'URL girin (Örn: example.com)',
      placeholderUltra: 'Detaylı analiz için URL girin...',
      insufficientCredits: 'Yetersiz kredi. Lütfen bakiye yükleyin.',
      urlRequired: 'URL gerekli',
      invalidUrl: 'Geçersiz URL',
      analysisRequested: 'Mini analiz talebiniz alındı!',
      ultraAnalysisRequested: 'Ultra analiz talebiniz alındı! Uzmanlarımız incelemeye başlıyor.',
      ultraBannerTitle: 'Ultra Analiz Paketleri',
      ultraBannerDesc: 'Sitenizi uzmanlarımız incelesin, dönüşümlerinizi uçurun.',
      ultraBannerButton: 'Hemen Yükle',
    },
    verification: {
      bannerTitle: 'E-posta Adresinizi Doğrulayın',
      bannerDesc: 'Analiz alabilmek için e-posta adresinizi doğrulayın.',
      bannerButton: 'Doğrulama Gönder',
    },
    backlog: {
      title: 'Backlog',
      subtitle: 'Planlanan ve devam eden geliştirme süreçleri.',
      noTasks: "Henüz backlog task'ı yok.",
      soon: 'Ekibimiz yakında görevler ekleyecek.',
      priorities: {
        low: 'Düşük',
        medium: 'Orta',
        high: 'Yüksek',
        critical: 'Kritik',
      },
      statuses: {
        todo: 'Yapılacak',
        inProgress: 'Devam Ediyor',
        review: 'İncelemede',
        done: 'Tamamlandı',
        cancelled: 'İptal Edildi',
      },
    },
    credits: {
      title: 'Kredi Yükle',
      subtitle: 'CRO-X Ultra paketleri ile profesyonel raporlar alın.',
      starter: 'BAŞLANGIÇ',
      popular: 'POPÜLER',
      advantage: 'AVANTAJLI',
      features: ['Uzman İncelemesi', 'Görüntülü Rapor', 'Eylem Planı'],
      selectButton: 'Paketi Seç',
      packageDescription: '{count} Adet Ultra Analiz',
    },
    purchaseModal: {
      title: 'Ultra Kredi Satın Al',
      subtitle: 'İşletmeniz için derinlemesine Ultra Analiz raporları oluşturmak üzere kredi bakiyenizi güncelleyin.',
      popular: 'EN POPÜLER',
      payButton: 'Ödeme Yap',
      loading: 'Yükleniyor...',
      securePayment: 'PayTR Güvencesi',
      sslInfo: '256-bit SSL',
      paymentError: 'Ödeme sırasında bir hata oluştu.',
      packageLabel: '{count} Kredi Paketi',
      errorGeneric: 'Ödeme başlatılamadı',
      securePaymentTitle: 'Güvenli Ödeme',
      paymentIframeTitle: 'PayTR Ödeme',
    },
    auth: {
      login: 'Giriş Yap',
    },
    notifications: {
      title: 'Bildirimler',
      subtitle: 'Önemli güncellemeler ve analiz sonuçları.',
      empty: 'Henüz bildiriminiz bulunmuyor.',
      emptyHint: 'Analiz tamamlandığında veya yeni bir görev atandığında burada bildirim alacaksınız.',
      markAllRead: 'Tümünü Okundu İşaretle',
      unreadCount: '{count} okunmamış bildirim',
      types: {
        analysis_completed: 'Analiz Tamamlandı',
        analysis_failed: 'Analiz Başarısız',
        analysis_rejected: 'Analiz Reddedildi',
        task_assigned: 'Yeni Görev Atandı',
      },
    },
    settings: {
      title: 'Hesap Ayarları',
      subtitle: 'Kişisel bilgilerinizi yönetin.',
      personalInfo: 'Kişisel Bilgiler',
      firstName: 'Ad',
      lastName: 'Soyad',
      email: 'E-posta',
      saveButton: 'Kaydet',
      security: 'Güvenlik',
      securityDesc: 'Hesap güvenliğiniz için periyodik olarak şifrenizi güncellemenizi öneririz.',
      resetPasswordButton: 'Şifre Sıfırlama Talep Et',
      resetRequested: 'Sıfırlama Maili Gönderildi',
      resetCheckEmail: 'Lütfen e-posta kutunuzu kontrol edin.',
      logoutTitle: 'Oturumu Kapat',
      logoutDesc: 'Hesabınızdan güvenli bir şekilde çıkış yapın.',
      logoutButton: 'Çıkış Yap',
      updateSuccess: 'Profil bilgileriniz başarıyla güncellendi!',
      updateError: 'Profil güncellenirken bir hata oluştu.',
      resetError: 'Sıfırlama talebi sırasında bir hata oluştu.',
    },
    analysis: {
      historyTitle: 'Geçmiş Analizler',
      totalLabel: 'Toplam',
      noAnalyses: 'Henüz analiziniz yok',
      startFirst: 'Hemen ilk analizinizi başlatarak sitenizin dönüşüm potansiyelini keşfedin.',
      statusCompleted: 'Tamamlandı',
      statusPending: 'Bekliyor',
      statusProcessing: 'İşleniyor',
      viewReport: 'Rapor',
      loadError: 'Analizler yüklenemedi',
      genericError: 'Bir hata oluştu',
      documentsTitle: 'Dökümanlar & Linkler',
    },
  },
};

export default tr;
