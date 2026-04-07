# 🚀 CRO & Web Tasarım Ajansı - Proje Yönergeleri

> Bu dosya Claude Code'a verilecek ana yönerge dosyasıdır. Tüm proje bu dosya üzerinden yönetilecektir.

---

## 📋 PROJE ÖZETİ

CRO (Conversion Rate Optimization) odaklı bir dijital ajans web sitesi oluşturulacak. Site 3 ana hizmeti tanıtacak ve potansiyel müşterileri satış hunisine çekecek bir **satış makinesi** olarak çalışacak.

**Satış Akışı:** CRO Ön Analizi → WhatsApp Görüşmesi → İhtiyaç Tespiti → Proje Teklifi veya Aylık Retainer Satışı

**Konumlandırma:** "Web sitesi yapmak" değil → "Web sitesi üzerinden daha fazla dönüşüm ve müşteri kazanımı sağlamak"

**İletişim Eksenleri:** Dönüşüm | Netlik | Gelir Etkisi

---

## 🤖 AJAN SİSTEMİ

Bu projede aşağıdaki ajanlar rol alacak. Her ajan kendi uzmanlık alanında çalışacak ve Proje Yöneticisi tarafından koordine edilecek.

### 1. Proje Yöneticisi (PM)
- **Rol:** Tüm ekibi yönetir, backlogları otomatik ayırır ve dağıtır
- **Görevler:**
  - Proje planını oluştur ve fazlara böl
  - Her ajana görev ata ve takip et
  - Ajanlar arası iletişimi sağla
  - Sprint planlaması yap
  - Kalite kontrol süreçlerini yönet
  - Tüm çıktıları birleştir ve nihai ürünü oluştur
- **Çalışma Şekli:** Her fazda önce analiz ajanlarından veri topla, sonra tasarım ve geliştirmeye aktar

### 2. Rakip Analizci & Pazarlamacı
- **Rol:** Pazar araştırması, rakip analizi, pozisyonlama stratejisi
- **Görevler:**
  - Türkiye'deki CRO ajanslarını ve web tasarım firmalarını analiz et
  - Rakiplerin güçlü/zayıf yönlerini belirle
  - Fark yaratan USP (Unique Selling Proposition) önerileri sun
  - Hedef kitle profillerini çıkar
  - Pazarlama mesajlarını oluştur
  - SEO anahtar kelimeleri belirle
- **Ortak Çalışma:** İçerik Üretici ve CRO Uzmanı ile birlikte çalışır

### 3. CRO Uzmanı
- **Rol:** Dönüşüm optimizasyonu stratejisi, kullanıcı davranışı analizi
- **Görevler:**
  - Her sayfa için dönüşüm stratejisi belirle
  - CTA yerleşimleri ve metinlerini optimize et
  - Güven sinyallerini planla (testimonial, badge, istatistik)
  - Form optimizasyonu yap
  - Kullanıcı akışlarını (user flow) tasarla
  - A/B test önerileri hazırla
  - Satış hunisi yapısını kur
  - Urgency ve scarcity elementlerini planla
- **Ortak Çalışma:** İçerik Üretici ve Rakip Analizci ile birlikte çalışır

### 4. İçerik Üretici
- **Rol:** Tüm metin içeriklerini üretir
- **Görevler:**
  - Hero section başlıkları ve alt başlıkları
  - Hizmet açıklamaları (kısa ve uzun versiyon)
  - SSS (Sıkça Sorulan Sorular) bölümleri
  - Testimonial/referans metinleri
  - CTA buton metinleri
  - Blog/içerik önerileri
  - KVKK, Satış Sözleşmesi, Gizlilik Politikası metinleri
  - Mikro-kopiler (form hataları, başarı mesajları, tooltip'ler)
  - WhatsApp mesaj şablonları
- **Ortak Çalışma:** CRO Uzmanı ve Rakip Analizci ile birlikte çalışır
- **Önemli:** Satış odaklı içerik üretmeli, dönüşüm artırıcı dil kullanmalı

### 5. Designer
- **Rol:** UI/UX tasarımı, görsel kimlik
- **Görevler:**
  - Renk paleti ve tipografi seçimi
  - Wireframe ve mockup oluşturma
  - Komponent tasarımı
  - Responsive tasarım kuralları
  - Animasyon ve mikro-etkileşim planlaması
  - İkon ve görsel stil rehberi
  - Dark/Light mode stratejisi
- **MCP Kullanımı:** `@21st-dev/magic` MCP'den tasarım bileşenlerini çek ve adapte et
- **Referans:** `design-md` repository'sindeki tasarımları referans al
- **Stil:** Generic AI estetiğinden kaçın, cesur ve akılda kalıcı tasarım yap

### 6. Developer
- **Rol:** Frontend geliştirme
- **Görevler:**
  - Next.js/React proje kurulumu
  - Komponent geliştirme
  - API entegrasyonları
  - OTP akışı implementasyonu
  - Responsive implementasyon
  - Performance optimizasyonu
  - SEO teknik implementasyonu
  - Accessibility (a11y) uyumu
- **Ortak Çalışma:** Designer'ın çıktılarını pixel-perfect implemente et, Tester ile sürekli çalış

### 7. Tester
- **Rol:** Kalite güvence
- **Görevler:**
  - Fonksiyonel test senaryoları yaz ve çalıştır
  - Cross-browser testleri
  - Responsive testleri (mobile, tablet, desktop)
  - OTP akışı testleri
  - Performance testleri (Lighthouse, Core Web Vitals)
  - Accessibility testleri
  - Edge case testleri
  - UI/UX tutarlılık kontrolü
- **Ortak Çalışma:** Developer ile sürekli çalış, her sprint sonunda test raporu sun

### 8. Security
- **Rol:** Güvenlik denetimi
- **Görevler:**
  - Input validation kontrolü
  - XSS/CSRF koruması
  - Rate limiting kontrolü (OTP için kritik)
  - HTTPS ve güvenlik header'ları
  - LocalStorage güvenliği
  - API endpoint güvenliği
  - KVKK uyumluluğu teknik kontrol
  - Content Security Policy (CSP)
  - Dependency güvenlik taraması
- **Ortak Çalışma:** Developer ve Tester ile sürekli kontrol

### 9. Code Reviewer
- **Rol:** Kod kalite kontrolü
- **Görevler:**
  - Her PR/commit için kod incelemesi
  - Best practice kontrolü
  - Performance anti-pattern tespiti
  - Kod tekrarı (DRY) kontrolü
  - Naming convention kontrolü
  - Yorum ve dokümantasyon kontrolü
  - Component yapısı ve re-usability kontrolü

---

## 🏗️ TEKNİK MİMARİ

### Teknoloji Yığını
```
Framework:      Next.js 14+ (App Router)
Dil:            TypeScript
Styling:        Tailwind CSS 4+
Animasyon:      Framer Motion
İkonlar:        Lucide React
State:          React Context + LocalStorage (session)
HTTP Client:    Fetch API (sadece GET istekleri)
Deployment:     Static Export veya Node.js hosting
Font:           Google Fonts (distinctive, non-generic seçimler)
```

### Proje Yapısı
```
project-root/
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Anasayfa
│   │   ├── e-ticaret/
│   │   │   └── page.tsx            # E-ticaret Landing Page
│   │   ├── kurumsal/
│   │   │   └── page.tsx            # Kurumsal Landing Page
│   │   ├── kvkk/
│   │   │   └── page.tsx            # KVKK sayfası
│   │   ├── satis-sozlesmesi/
│   │   │   └── page.tsx            # Satış sözleşmesi
│   │   ├── gizlilik-politikasi/
│   │   │   └── page.tsx            # Gizlilik politikası
│   │   └── iletisim/
│   │       └── page.tsx            # İletişim sayfası
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── HamburgerMenu.tsx   # Yandan kayan menü
│   │   │   └── MobileNav.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx     # CRO Analiz input + animasyonlar
│   │   │   ├── ServicesOverview.tsx # 3 hizmet tanıtım kartları
│   │   │   ├── EcommercePreview.tsx # E-ticaret kısa tanıtım
│   │   │   ├── CorporatePreview.tsx# Kurumsal kısa tanıtım
│   │   │   ├── WhyUs.tsx           # Neden biz section
│   │   │   ├── Process.tsx         # Nasıl çalışıyoruz
│   │   │   ├── Testimonials.tsx    # Müşteri yorumları
│   │   │   ├── Stats.tsx           # İstatistikler
│   │   │   ├── FAQ.tsx             # Sıkça sorulan sorular
│   │   │   ├── CTA.tsx             # Son CTA section
│   │   │   └── TrustSignals.tsx    # Güven sinyalleri
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── OTPInput.tsx
│   │   │   ├── PhoneInput.tsx
│   │   │   ├── ProfilePopup.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Accordion.tsx       # FAQ için
│   │   │   └── Tooltip.tsx
│   │   └── shared/
│   │       ├── SEOHead.tsx
│   │       ├── WhatsAppButton.tsx  # Floating WhatsApp
│   │       └── ScrollToTop.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx         # Session yönetimi
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useOTP.ts
│   │   └── useLocalStorage.ts
│   ├── lib/
│   │   ├── api.ts                  # API helper (sadece GET)
│   │   ├── constants.ts
│   │   ├── utils.ts
│   │   └── validators.ts
│   ├── types/
│   │   └── index.ts
│   └── styles/
│       └── globals.css
├── design-md/                      # MCP referans tasarım dosyaları
├── .env.local                      # Environment variables
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🔐 OTP & AUTH AKIŞI (KRİTİK)

### Akış Diyagramı
```
[Kullanıcı site URL girer] 
    → [Analiz Et butonuna tıklar]
    → [Telefon numarası input modal açılır]
    → [Telefon numarası girer (Türkiye formatı: 5XX XXX XX XX)]
    → [GET isteği → dış sisteme telefon numarası gönderilir]
    → [Dış sistem SMS ile OTP kodu gönderir]
    → [UI'da OTP giriş ekranı açılır]
    → [Kullanıcı OTP kodunu girer]
    → [GET isteği → OTP doğrulama]
    → [Başarılı → Session oluştur + Profil popup aç]
    → [Başarısız → Hata mesajı + Kalan deneme sayısı göster]
```

### Teknik Kurallar

```typescript
// OTP Konfigürasyonu
const OTP_CONFIG = {
  maxAttempts: 5,           // Maksimum yanlış kod denemesi
  timeoutDuration: 30 * 60, // 30 dakika timeout (saniye)
  otpLength: 6,             // OTP kod uzunluğu
  phoneFormat: /^5\d{9}$/,  // Türkiye mobil format
};
```

**KRİTİK KURALLAR:**
1. Frontend'den **SADECE GET** istekleri atılacak. POST/PUT/DELETE **YASAK**.
2. Veritabanı **YOK**. Tüm veriler API response'larından gelecek.
3. Session bilgisi **LocalStorage**'da tutulacak.
4. Yanlış OTP'de 5 deneme hakkı var, sonra 30 dakika bekleme.
5. Timeout süresi LocalStorage'da timestamp olarak saklanacak.
6. OTP doğrulama başarılı olunca session token LocalStorage'a yazılacak.

### API Endpoint Yapısı (Placeholder)

```typescript
// .env.local
NEXT_PUBLIC_API_BASE_URL=https://api.example.com

// Endpoint'ler (hepsi GET)
const ENDPOINTS = {
  // Telefon numarası gönder, OTP tetikle
  sendOTP: '/api/v1/otp/send?phone={phone}&site={siteUrl}',
  
  // OTP doğrula
  verifyOTP: '/api/v1/otp/verify?phone={phone}&code={code}',
  
  // Profil bilgisi getir (session token ile)
  getProfile: '/api/v1/profile?token={sessionToken}',
  
  // Analiz sonucu getir
  getAnalysis: '/api/v1/analysis?token={sessionToken}',
};
```

### Session Yapısı (LocalStorage)

```typescript
interface UserSession {
  token: string;
  phone: string;           // Maskelenmiş: 5XX XXX ** **
  phoneRaw: string;        // Tam numara (hidden, "göster" butonu ile)
  createdAt: number;        // Timestamp
  expiresAt: number;        // Timestamp
  analysisStatus: 'pending' | 'completed' | 'none';
  credits: number;          // Kalan kredi hakkı
}

interface OTPState {
  attemptsLeft: number;
  timeoutUntil: number | null; // Timestamp veya null
  phone: string;
}
```

### Profil Popup İçeriği

```
┌─────────────────────────────┐
│  👤 Profilim           [X]  │
├─────────────────────────────┤
│                             │
│  📱 Telefon: 5XX XXX ** **  │
│           [Göster]          │
│                             │
│  📊 Analiz Durumu:          │
│  ┌───────────────────────┐  │
│  │  ⏳ Rapor Hazırlanıyor │  │  ← analysisStatus === 'pending'
│  │  veya                  │  │
│  │  ✅ Rapor Hazır [Gör]  │  │  ← analysisStatus === 'completed'
│  └───────────────────────┘  │
│                             │
│  💳 Kalan Kredi: 2          │
│  ℹ️ [Fazladan kredi için    │
│      WhatsApp danışmanımıza │
│      yazınız]               │
│                             │
│  ─────────────────────────  │
│  [🚪 Çıkış Yap]            │
└─────────────────────────────┘
```

---

## 🎨 TASARIM SPESİFİKASYONLARI

### Genel Tasarım Prensipleri
- **Jenerik AI estetiğinden kesinlikle kaçın** (Inter font, mor gradient, standart kartlar YASAK)
- **Cesur ve akılda kalıcı** tasarım: güçlü tipografi, asimetrik layout'lar, mikro-animasyonlar
- **Satış odaklı:** Her element dönüşüm için tasarlanmalı
- **Güven veren:** Profesyonel, kurumsal ama sıcak
- **Türk pazarına uygun:** Türkçe tipografi desteği güçlü fontlar

### Renk Önerisi (Designer ajana referans)
```css
/* Designer bu paleti baz alabilir veya tamamen yeni bir palet oluşturabilir */
/* Önemli olan: cesur, profesyonel ve dönüşüm odaklı olması */
--color-primary: #0F172A;      /* Koyu navy - güven */
--color-accent: #F59E0B;       /* Amber - dikkat çekici CTA */
--color-accent-secondary: #10B981; /* Yeşil - başarı, büyüme */
--color-surface: #FAFAF9;      /* Sıcak beyaz */
--color-text: #1E293B;         /* Koyu metin */
--color-muted: #64748B;        /* İkincil metin */
```

### Tipografi
- **Başlık fontu:** Karakterli, cesur bir display font (Clash Display, Cabinet Grotesk, Satoshi, vb.)
- **Gövde fontu:** Okunabilir, modern (DM Sans, Plus Jakarta Sans, vb.)
- **Inter, Roboto, Arial YASAK**

### Responsive Breakpoints
```css
/* Mobile First */
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Animasyon Kuralları
- Sayfa yüklemede staggered reveal animasyonları
- Scroll-triggered animasyonlar (intersection observer)
- Hover efektleri: scale, glow, gradient shift
- CTA butonlarında pulse/glow animasyonu
- Sayı sayaçlarında count-up animasyonu
- Hero section'da özel giriş animasyonu

---

## 📄 SAYFA YAPILARI

### 1. ANASAYFA (page.tsx)

#### Navbar
```
[Logo/Marka]    [CRO]    [E-Ticaret]    [☰ Hamburger]
```
- Scroll'da sticky + backdrop blur
- Aktif section highlight
- Mobile'da sadece hamburger

#### Hamburger Menü (Yandan Kayan - Slide)
```
┌──────────────────────┐
│  [X Kapat]           │
│                      │
│  MARKA ADI           │
│  ─────────────────   │
│                      │
│  ÜRÜNLER             │
│  ├─ CRO Analizi      │
│  ├─ E-Ticaret        │
│  └─ Kurumsal         │
│                      │
│  İLETİŞİM            │
│                      │
│  KURUMSAL             │
│  ├─ KVKK             │
│  ├─ Satış Sözleşmesi │
│  ├─ Gizlilik         │
│  └─ Çerez Politikası │
│                      │
│  ─────────────────   │
│  📱 WhatsApp         │
│  📧 info@domain.com  │
└──────────────────────┘
```

#### Hero Section (CRO ANALİZ)
```
┌──────────────────────────────────────────────────┐
│                                                  │
│      Web Siteniz Satış Yapıyor mu,               │
│      Yoksa Sadece Var mı?                        │
│                                                  │
│      Ücretsiz CRO analiziyle sitenizin           │
│      dönüşüm açıklarını keşfedin.                │
│                                                  │
│  ┌────────────────────────────┬──────────────┐   │
│  │  https://siteniz.com       │  Analiz Et ▶ │   │
│  └────────────────────────────┴──────────────┘   │
│                                                  │
│  ✓ 100% Ücretsiz  ✓ 2 Dakika  ✓ Detaylı Rapor   │
│                                                  │
│  [Animasyonlu arka plan / gradient mesh]          │
└──────────────────────────────────────────────────┘
```
- Input: URL girişi, placeholder "https://websitenizi-girin.com"
- Buton: "Analiz Et" - sağda, mobilde alta kayar
- Trust badges alt kısımda
- Arka plan: animasyonlu gradient mesh veya parçacık efekti

#### Güven Barı (Trust Bar)
```
[50+ Mutlu Müşteri] [%40 Ort. Dönüşüm Artışı] [7/24 Destek] [Ücretsiz Analiz]
```
- Sayı animasyonları (count-up)
- Kaydırmalı logo bar (varsa müşteri logoları, yoksa sektör ikonları)

#### Hizmetler Genel Bakış
```
3 kart yan yana (mobilde alt alta):

[1. CRO Analizi]        [2. E-Ticaret]         [3. Kurumsal]
Sitenizin dönüşüm       Satış üreten            Lead üreten
açıklarını tespit edin   e-ticaret altyapısı     kurumsal web sitesi
[Ücretsiz Analiz →]      [Detaylı Bilgi →]       [Detaylı Bilgi →]
```

#### Nasıl Çalışıyoruz (Process)
```
4 adım timeline:

1️⃣ Ücretsiz Analiz → 2️⃣ WhatsApp Görüşme → 3️⃣ Strateji & Teklif → 4️⃣ Uygulama & Sonuç
```
- Scroll'da aktifleşen adımlar
- Her adımda kısa açıklama

#### E-Ticaret Tanıtım (Kısa)
```
┌────────────────────────────────────────────┐
│  E-Ticaret Siteniz Satış Makinesi Olsun    │
│                                            │
│  Kısa açıklama paragrafı...               │
│  • Daha yüksek dönüşüm                    │
│  • Güçlü satın alma akışı                 │
│  • Mobil optimizasyon                      │
│                                            │
│  [Detaylı Bilgi →]                         │
│                        [Görsel/Mockup]      │
└────────────────────────────────────────────┘
```

#### Kurumsal Tanıtım (Kısa)
```
┌────────────────────────────────────────────┐
│  [Görsel/Mockup]                           │
│                                            │
│  Kurumsal Siteniz İş Üretsin               │
│                                            │
│  Kısa açıklama paragrafı...               │
│  • Güçlü ilk izlenim                      │
│  • Net hizmet sunumu                       │
│  • Lead üretimi                            │
│                                            │
│  [Detaylı Bilgi →]                         │
└────────────────────────────────────────────┘
```

#### Neden Biz
- 3-4 farklılaştırıcı özellik
- İkon + başlık + açıklama formatı
- CRO odaklı yaklaşım vurgusu

#### Testimonials / Referanslar
- Slider veya grid
- Fotoğraf + isim + şirket + yorum
- Yıldız rating
- (Başlangıçta placeholder veriler kullanılabilir)

#### SSS (FAQ)
- Accordion yapısında
- En az 8-10 soru
- CRO, E-ticaret ve Kurumsal hizmetlerle ilgili sorular
- Schema markup (SEO için)

#### Son CTA
```
┌────────────────────────────────────────────┐
│                                            │
│  Sitenizin Potansiyelini Keşfedin          │
│                                            │
│  Ücretsiz CRO analiziyle başlayın.         │
│                                            │
│  [Ücretsiz Analiz Al]  [WhatsApp İletişim] │
│                                            │
└────────────────────────────────────────────┘
```

#### Footer
```
┌──────────────────────────────────────────────────┐
│                                                  │
│  [Logo]        HİZMETLER     KURUMSAL   İLETİŞİM │
│                CRO Analizi   KVKK       WhatsApp  │
│  Kısa          E-Ticaret     Satış      Email     │
│  açıklama      Kurumsal      Sözleşmesi Telefon   │
│                CRO Retainer  Gizlilik             │
│                              Çerez                │
│                                                  │
│  ─────────────────────────────────────────────── │
│  © 2026 Marka Adı. Tüm hakları saklıdır.        │
└──────────────────────────────────────────────────┘
```

### 2. E-TİCARET LANDING PAGE (/e-ticaret)

**İçerik Üretici + Rakip Analizci + CRO Uzmanı birlikte doldurur.**

Sayfada olması gerekenler:
- Hero: E-ticaret odaklı güçlü başlık + CTA
- Problem/Çözüm section: "Siteniz neden satış kaybediyor?"
- Hizmet detayları: Ana sayfa yapısı, ürün sayfası, sepet/ödeme akışı, CTA'lar, mobil UX, SEO, CRO
- 3 Paket sunumu:
  - **E-Ticaret Web Site Kurulum** (Sıfırdan anahtar teslim)
  - **CRO Optimize Paketi** (Mevcut site optimizasyonu)
  - **CRO Retainer Paket** (Aylık sürekli iyileştirme)
- Sonuç vaatleri: daha net ürün sunumu, güçlü satın alma akışı, yüksek güven, iyi mobil deneyim
- Uygun müşteri profili
- Süreç adımları
- SSS
- CTA: WhatsApp + Ücretsiz Analiz

### 3. KURUMSAL LANDING PAGE (/kurumsal-web-tasarim)

**İçerik Üretici + Rakip Analizci + CRO Uzmanı birlikte doldurur.**

Sayfada olması gerekenler:
- Hero: Kurumsal odaklı güçlü başlık + CTA
- Problem/Çözüm: "Siteniz güven veriyor mu?"
- Hizmet detayları: Ana sayfa mesajı, hizmet sayfaları, lead form, WhatsApp CTA, referanslar, süreç
- **Modern Kurumsal Sayfalar** paketi
- Uygun müşteri profili (klinik, danışmanlık, ajans, üretim, servis)
- Sonuç vaatleri
- Süreç adımları
- SSS
- CTA

### 4. YASAL SAYFALAR (Footer'dan erişilir)

- **/kvkk** - KVKK Aydınlatma Metni
- **/satis-sozlesmesi** - Mesafeli Satış Sözleşmesi
- **/gizlilik-politikasi** - Gizlilik ve Çerez Politikası
- **/iletisim** - İletişim sayfası (WhatsApp, email, form)

---

## 🔧 MCP ENTEGRASYONU

### MCP 1: Design-MD Referans
```bash
# design-md repository'sini kök dizine klonla
git clone https://github.com/VoltAgent/awesome-design-md.git design-md
```
- Designer bu dosyalardaki tasarım kalıplarını referans alacak
- Component yapıları, layout pattern'ları ve stil rehberleri buradan çekilecek

### MCP 2: @21st-dev/magic
```bash
claude mcp add magic --scope user --env API_KEY="c52ae9a1aed1d8640aec96de96c986a5eb74226b7a48f390599ec1db21398104" -- npx -y @21st-dev/magic@latest
```
- En iyi UI bileşenlerini bu MCP'den çek
- Özellikle: Hero section, Card, CTA, Navbar, Footer, Testimonial bileşenleri
- Animasyon ve mikro-etkileşim referansları

---

## 📱 RESPONSIVE KURALLAR

### Mobile (< 768px)
- Hamburger menü aktif
- Hero input ve buton alt alta
- Kartlar tek sütun
- Font boyutları küçültülmüş
- Touch-friendly buton boyutları (min 44px)
- Sticky CTA bar (alt kısımda)
- WhatsApp floating button

### Tablet (768px - 1024px)
- 2 sütun grid
- Navbar tam görünür
- Hamburger menü opsiyonel

### Desktop (> 1024px)
- Full layout
- Hover efektleri aktif
- Yan yana section'lar

---

## 🔒 GÜVENLİK KONTROL LİSTESİ

- [ ] Tüm input'larda validation (client-side)
- [ ] URL input'unda URL format kontrolü
- [ ] Telefon numarasında format kontrolü (Türkiye)
- [ ] OTP input'unda sadece rakam kabul
- [ ] Rate limiting: 5 deneme / 30 dakika timeout
- [ ] LocalStorage verilerinde encryption (basit obfuscation)
- [ ] XSS koruması: dangerouslySetInnerHTML YASAK
- [ ] HTTPS zorunlu (deployment'ta)
- [ ] Security headers (next.config.js'te)
- [ ] CSP (Content Security Policy) tanımlı
- [ ] Çerez onay banner'ı
- [ ] KVKK uyumlu veri işleme

### Security Headers (next.config.js)
```javascript
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
];
```

---

## 🚀 DEPLOYMENT REHBERİ

### Uygun Hosting Seçenekleri (Fiyat/Performans)

| Platform | Aylık Maliyet | Avantaj |
|----------|--------------|---------|
| **Vercel** (Önerilen) | Ücretsiz - $20 | Next.js native, otomatik CDN, kolay |
| **Netlify** | Ücretsiz - $19 | Statik export uyumlu, form desteği |
| **Railway** | ~$5 | Node.js hosting, ucuz |
| **Hetzner VPS** | €4.5 | Tam kontrol, Avrupa sunucu |
| **DigitalOcean** | $6 | App Platform veya Droplet |
| **Coolify** (Self-hosted) | VPS maliyeti | Açık kaynak, tam kontrol |

### Domain & SSL
```bash
# Domain satın al (Namecheap, Cloudflare, Google Domains)
# DNS'i hosting provider'a yönlendir
# SSL otomatik (Vercel/Netlify) veya Let's Encrypt (VPS)
```

### Vercel Deployment (Önerilen)
```bash
# 1. Vercel CLI kur
npm i -g vercel

# 2. Projeyi deploy et
vercel

# 3. Domain bağla
vercel domains add yourdomain.com

# 4. Environment variables ayarla
vercel env add NEXT_PUBLIC_API_BASE_URL
```

### VPS Deployment (Hetzner/DigitalOcean)
```bash
# 1. Node.js kur
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. PM2 kur
npm install pm2 -g

# 3. Nginx kur ve yapılandır
sudo apt install nginx
# Nginx reverse proxy config...

# 4. SSL (Let's Encrypt)
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com

# 5. Uygulamayı çalıştır
npm run build
pm2 start npm --name "website" -- start
pm2 startup
pm2 save
```

---

## 📊 SEO KONTROL LİSTESİ

- [ ] Her sayfada unique title ve meta description
- [ ] Open Graph ve Twitter Card meta tagları
- [ ] Semantic HTML (header, main, section, article, footer)
- [ ] H1-H6 hiyerarşisi doğru
- [ ] Alt text tüm görsellerde
- [ ] Sitemap.xml otomatik üretimi
- [ ] Robots.txt
- [ ] Schema.org markup (Organization, LocalBusiness, FAQ)
- [ ] Canonical URL'ler
- [ ] Core Web Vitals optimize (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] Lazy loading görseller
- [ ] Next/Image optimizasyonu

---

## 🎯 PERFORMANS HEDEFLERİ

- **Lighthouse Score:** 90+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Total Blocking Time:** < 200ms
- **Cumulative Layout Shift:** < 0.1
- **Bundle size:** < 200KB (initial load)

---

## ✅ PROJE FAZLARI VE BACKLOG

### Faz 0: Hazırlık (PM)
- [ ] MCP'leri kur ve test et
- [ ] design-md repository'sini klonla
- [ ] Proje iskeletini oluştur (Next.js init)
- [ ] Tasarım tokenlarını belirle (renk, font, spacing)

### Faz 1: Araştırma ve Strateji (Rakip Analizci + CRO Uzmanı + İçerik Üretici)
- [ ] Rakip analizi yap
- [ ] CRO stratejisi oluştur
- [ ] İçerik planı hazırla
- [ ] Her section için metin taslakları yaz
- [ ] SSS içerikleri hazırla
- [ ] Yasal sayfa metinleri hazırla

### Faz 2: Tasarım (Designer)
- [ ] MCP'den bileşen referansları çek
- [ ] design-md'den kalıpları incele
- [ ] Renk paleti ve tipografi finalize et
- [ ] Her sayfa için wireframe/mockup
- [ ] Komponent tasarımları
- [ ] Animasyon planı
- [ ] Responsive tasarım kuralları

### Faz 3: Geliştirme (Developer)
- [ ] Proje kurulumu ve yapılandırma
- [ ] Layout bileşenleri (Navbar, Footer, Hamburger Menu)
- [ ] Hero Section + CRO Input
- [ ] OTP akışı tam implementasyon
- [ ] Profil Popup sistemi
- [ ] Anasayfa tüm section'lar
- [ ] E-ticaret landing page
- [ ] Kurumsal landing page
- [ ] Yasal sayfalar
- [ ] İletişim sayfası
- [ ] Responsive implementasyon
- [ ] Animasyonlar (Framer Motion)
- [ ] SEO implementasyonu

### Faz 4: Test ve Güvenlik (Tester + Security)
- [ ] Fonksiyonel testler
- [ ] OTP akış testleri (happy path + edge cases)
- [ ] Cross-browser testler
- [ ] Responsive testler
- [ ] Güvenlik taraması
- [ ] Performance testi (Lighthouse)
- [ ] Accessibility testi
- [ ] Security headers kontrolü

### Faz 5: Code Review ve İyileştirme (Code Reviewer)
- [ ] Tüm kod gözden geçirildi
- [ ] Best practices uyumu
- [ ] Performance optimizasyonları
- [ ] Final düzeltmeler

### Faz 6: Deployment (PM + Developer + Security)
- [ ] Hosting seçimi ve kurulumu
- [ ] Domain bağlantısı
- [ ] SSL sertifikası
- [ ] Environment variables ayarı
- [ ] Production build ve deploy
- [ ] Smoke testler
- [ ] Monitoring kurulumu

---

## 💬 RÖPORTAJ (AskUserQuestion ile)

Projeye başlamadan önce aşağıdaki soruları `AskUserQuestion` tool ile kullanıcıya sor:

### Öncelikli Sorular
1. **Marka Bilgisi:**
   - Marka/şirket adı nedir?
   - Logo dosyanız var mı?
   - Mevcut renk paletiiniz veya marka renginiz var mı?

2. **Hedef Kitle:**
   - Birincil hedef kitleniz kim? (E-ticaret sahipleri / Kurumsal firmalar / Her ikisi)
   - Hangi sektörlere odaklanıyorsunuz?

3. **İçerik:**
   - WhatsApp iletişim numaranız?
   - Email adresiniz?
   - Sosyal medya hesaplarınız?
   - Referans müşterileriniz var mı? (testimonial için)

4. **Teknik:**
   - API base URL'iniz hazır mı? (OTP sistemi için)
   - Hangi hosting tercih edersiniz? (Vercel önerilir)
   - Domain adınız var mı?

5. **Tasarım Tercihi:**
   - Beğendiğiniz web siteleri var mı? (referans)
   - Koyu mu açık mı tema tercih edersiniz?
   - Herhangi bir tasarım kısıtlamanız var mı?

---

## ⚠️ KRİTİK NOTLAR

1. **Veritabanı KULLANILMAYACAK.** Tüm veri akışı GET istekleri üzerinden olacak.
2. **POST/PUT/DELETE isteği ATILMAYACAK.** Sadece GET.
3. **MCP bileşenleri mutlaka kullanılacak.** design-md ve @21st-dev/magic referans alınacak.
4. **Jenerik AI tasarımından KAÇINILACAK.** Her element özenle tasarlanacak.
5. **Satış odaklı düşünülecek.** Her section bir dönüşüm amacına hizmet etmeli.
6. **Türkçe içerik.** Tüm UI ve içerik Türkçe olacak.
7. **WhatsApp entegrasyonu.** Floating button + CTA'larda link.
8. **Mobil öncelikli.** Mobile-first yaklaşım.
9. **Ajanlar arası iletişim PM tarafından sağlanacak.**
10. **Her faz sonunda test ve review yapılacak.**

---

## 📎 EK: İçerik Üretici İçin SSS Örnekleri

İçerik üretici şu başlıklar altında SSS hazırlamalı:

**Genel:**
- CRO nedir ve neden önemlidir?
- Ücretsiz CRO analizi neleri kapsar?
- Analiz sonuçları ne kadar sürede gelir?
- Hizmetleriniz hangi sektörlere uygundur?

**E-Ticaret:**
- E-ticaret sitemde dönüşüm oranım neden düşük?
- Shopify/WooCommerce ile çalışıyor musunuz?
- Mevcut sitemin optimizasyonu ne kadar sürer?
- Sıfırdan e-ticaret sitesi kurulumu ne kadar sürer?

**Kurumsal:**
- Kurumsal sitemin neden satış üretmediğini nasıl anlarım?
- Lead form optimizasyonu nedir?
- Site yenileme mi yoksa sıfırdan mı kurulum yapmalıyım?

**Retainer:**
- Aylık CRO retainer ne içerir?
- Retainer'ı iptal edebilir miyim?
- Sonuçları ne zaman görmeye başlarım?

---

> **Bu dosyayı Claude Code'a verdikten sonra, Claude Code AskUserQuestion tool ile röportaj sorularını soracak ve ardından projeyi fazlar halinde inşa edecektir.**
