# 🚀 CRO & Web Tasarım Ajansı - Proje Yönergeleri

> Bu dosya Claude Code'a verilecek ana yönerge dosyasıdır. Tüm proje bu dosya üzerinden yönetilecektir.
> Son güncelleme: 2026-05-15 — Proje mevcut durumu yansıtacak şekilde güncellenmiştir.

---

## 📋 PROJE ÖZETİ

CRO (Conversion Rate Optimization) odaklı bir dijital ajans web sitesi. Site 3 ana hizmeti tanıtıyor ve potansiyel müşterileri satış hunisine çeken bir **satış makinesi** olarak çalışıyor.

**Satış Akışı:** CRO Analizi (Mini/Ultra) → Dashboard'da Sonuç → WhatsApp Görüşmesi → Proje Teklifi veya Aylık Retainer

**Konumlandırma:** "Web sitesi yapmak" değil → "Web sitesi üzerinden daha fazla dönüşüm ve müşteri kazanımı sağlamak"

**İletişim Eksenleri:** Dönüşüm | Netlik | Gelir Etkisi

---

## 🤖 AJAN SİSTEMİ

### 1. Proje Yöneticisi (PM)
- Tüm ekibi yönetir, backlogları ayırır ve dağıtır
- Sprint planlaması, kalite kontrol, ajanlar arası iletişim

### 2. Rakip Analizci & Pazarlamacı
- Pazar araştırması, rakip analizi, SEO anahtar kelimeleri
- CRO Uzmanı ve İçerik Üretici ile çalışır

### 3. CRO Uzmanı
- Dönüşüm stratejisi, CTA optimizasyonu, satış hunisi
- A/B test önerileri, güven sinyalleri planlaması

### 4. İçerik Üretici
- Hero başlıkları, hizmet açıklamaları, SSS, KVKK/yasal metinler
- Satış odaklı, dönüşüm artırıcı dil

### 5. Designer
- UI/UX tasarımı, renk paleti, tipografi, animasyon planlaması
- Jenerik AI estetiğinden kaçın, cesur ve akılda kalıcı tasarım

### 6. Developer
- Next.js/React geliştirme, API entegrasyonları
- Responsive, performance, SEO, a11y

### 7. Tester
- Fonksiyonel, cross-browser, responsive, performance testleri
- Auth akışı, ödeme akışı, analiz akışı testleri

### 8. Security
- Input validation, XSS/CSRF, rate limiting, CSP, KVKK uyumu

### 9. Code Reviewer
- Kod kalitesi, best practices, DRY, naming conventions

---

## 🏗️ TEKNİK MİMARİ

### Teknoloji Yığını

```
Framework:      Next.js 16.2.2 (App Router, TypeScript)
Runtime:        React 19.2.4
Styling:        Tailwind CSS 4
Animasyon:      Framer Motion 12, GSAP 3
İkonlar:        Lucide React, react-icons
3D/Shader:      Three.js, @paper-design/shaders-react
Parçacık:       @tsparticles/react
Grafik:         Recharts
State:          React Context + localStorage (session)
Database:       PostgreSQL (pg driver, connection pool max:5)
Auth:           JWT (jose, HMAC HS256, 30 gün TTL), bcryptjs (10 rounds)
OAuth:          Google OAuth 2.0
Email:          Resend (OTP, şifre sıfırlama)
Ödeme:          PayTR entegrasyonu
HTTP Client:    Fetch API (Bearer token ile)
Deployment:     Node.js hosting (Vercel önerilir)
```

### Gerçek Proje Yapısı

```
src/
├── app/
│   ├── layout.tsx                    # Root layout + providers
│   ├── page.tsx                      # Anasayfa
│   ├── e-ticaret/page.tsx
│   ├── kurumsal/
│   │   ├── page.tsx
│   │   └── CorporateContent.tsx
│   ├── hakkimizda/markamiz/
│   │   ├── page.tsx
│   │   └── BrandContent.tsx
│   ├── iletisim/page.tsx
│   ├── kvkk/page.tsx
│   ├── satis-sozlesmesi/page.tsx
│   ├── gizlilik-politikasi/page.tsx
│   ├── maintenance/page.tsx
│   ├── retrainer/page.tsx
│   ├── payment/
│   │   ├── success/page.tsx
│   │   └── failed/page.tsx
│   ├── auth/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   ├── reset-password/page.tsx
│   │   └── callback/page.tsx         # Google OAuth callback
│   ├── dashboard/page.tsx            # Kullanıcı dashboard
│   ├── adminpanel/                   # Admin panel
│   │   └── page.tsx
│   └── api/
│       ├── auth/
│       │   ├── login/route.ts
│       │   ├── register/route.ts
│       │   ├── forgot-password/route.ts
│       │   ├── reset-password/route.ts
│       │   ├── profile/route.ts
│       │   ├── verify-email/send/route.ts
│       │   ├── verify-email/verify/route.ts
│       │   └── google/callback/route.ts
│       ├── admin/
│       │   ├── auth/login/route.ts
│       │   ├── auth/logout/route.ts
│       │   ├── auth/verify/route.ts
│       │   ├── settings/route.ts
│       │   ├── users/route.ts
│       │   ├── users/[id]/credits/route.ts
│       │   ├── users/[id]/tasks/route.ts
│       │   ├── users/[id]/documents/route.ts
│       │   ├── analyses/route.ts
│       │   ├── tasks/[taskId]/route.ts
│       │   └── documents/[docId]/route.ts
│       ├── analysis/
│       │   ├── mini/route.ts
│       │   ├── ultra/route.ts
│       │   └── list/route.ts
│       ├── credits/balance/route.ts
│       ├── notifications/route.ts
│       ├── payment/
│       │   ├── create/route.ts
│       │   └── callback/route.ts
│       ├── user/
│       │   ├── tasks/route.ts
│       │   └── documents/route.ts
│       ├── webhook/whatsapp/route.ts
│       ├── settings/public/route.ts
│       └── public/maintenance/route.ts
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── HamburgerMenu.tsx
│   │   └── SharedBackgroundWrapper.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesOverview.tsx
│   │   ├── FeatureGrid.tsx
│   │   ├── TrustSignals.tsx
│   │   ├── Process.tsx
│   │   └── ...
│   ├── ui/
│   │   ├── animated-ai-input.tsx     # CRO analiz input bileşeni
│   │   ├── animated-shader-hero.tsx  # WebGL shader arka plan
│   │   ├── radial-orbital-timeline.tsx
│   │   ├── ruixen-stats.tsx
│   │   ├── EmailVerificationModal.tsx
│   │   ├── ProfilePopup.tsx
│   │   ├── Input.tsx
│   │   └── ...
│   ├── dashboard/
│   │   ├── AnalysisHistory.tsx
│   │   ├── BacklogTasks.tsx
│   │   ├── DashboardHeader.tsx
│   │   └── DashboardSidebar.tsx
│   └── admin/
│       └── UserDetailPanel.tsx
├── contexts/
│   ├── AuthContext.tsx               # JWT session yönetimi
│   └── LanguageContext.tsx           # i18n dil yönetimi
├── hooks/
│   ├── useAuth.ts
│   └── ...
├── lib/
│   ├── api.ts                        # Frontend API client (Bearer token)
│   ├── auth.ts                       # JWT sign/verify (user)
│   ├── admin-auth.ts                 # JWT sign/verify (admin)
│   ├── db.ts                         # PostgreSQL pool + query helpers
│   ├── email.ts                      # Resend email (OTP, reset)
│   ├── migrate.ts                    # Otomatik DB migrasyonları
│   ├── password.ts                   # bcryptjs hash/verify
│   ├── paytr.ts                      # PayTR ödeme entegrasyonu
│   ├── constants.ts                  # ENDPOINTS, SITE_CONFIG
│   ├── validators.ts
│   └── utils.ts
├── types/
│   └── index.ts
└── styles/
    └── globals.css
```

---

## 🔐 AUTH SİSTEMİ (MEVCUT DURUM)

### Kullanıcı Auth Akışı

```
[Kayıt] → email + şifre (min 6 karakter) → bcrypt hash → users tablosu
         → 1 mini kredi signup bonusu → JWT token (30 gün)

[Giriş] → email + şifre → bcrypt verify → JWT token (30 gün)
         → localStorage'a session yaz

[Google OAuth] → Google ID token → upsert user → JWT token
              → /auth/callback?token=...&email=...

[Email Doğrulama] → 6-digit OTP → Resend ile gönder → 10 dk TTL
                 → /api/auth/verify-email/send + /verify

[Şifre Sıfırlama] → email → 32-byte hex token → Resend ile link → 1 saat TTL
                 → /auth/reset-password?token=...
```

### Admin Auth

```
Admin Girişi: ADMIN_PASSWORD env değişkeni ile (şifre karşılaştırma)
Cookie: webtier_admin_session (HTTP-only, secure, 8 saat)
Rate limit: 5 deneme / 15 dakika / IP (in-memory)
```

### JWT Yapısı (User Session - localStorage)

```typescript
interface UserSession {
  token: string;           // JWT
  email: string;
  userId: string;
  firstName?: string;
  lastName?: string;
  miniCredits: number;
  ultraCredits: number;
  emailVerified: boolean;
  expiresAt: number;       // timestamp
}
```

---

## 🗄️ VERİTABANI ŞEMASI (PostgreSQL)

### Tablolar

```sql
users              -- email, phone, password_hash, google_id, mini_credits, ultra_credits,
                   -- email_verified, first_name, last_name, metadata, last_login
otp_sessions       -- email/phone OTP (6 haneli), 10 dk TTL
credits            -- mini/ultra kredi işlem logu
analyses           -- mini/ultra analiz istekleri, status, sonuç
payments           -- PayTR ödeme kayıtları, merchant_oid
password_reset_tokens  -- 32-byte hex, 1 saat TTL
app_settings       -- maintenance_mode, cro_mini_enabled, cro_ultra_enabled
tasks              -- admin'in kullanıcılara atadığı görevler
user_documents     -- dosya/link ekleri
notifications      -- okunmamış bildirim takibi
```

### DB Helper'lar (`src/lib/db.ts`)

```typescript
pool       // pg.Pool, max 5 bağlantı
query()    // Parameterized query
queryOne() // İlk satırı döndürür veya null
```

### SQL Fonksiyonlar

```sql
deduct_credit(user_id, credit_type)
add_credit(user_id, credit_type, amount)
get_user_credits(user_id)
```

---

## 🔌 API MİMARİSİ

### Kurallar

- **API Route Handler'lar:** GET, POST, PATCH, DELETE hepsi kullanılabilir
- **Frontend API Client** (`src/lib/api.ts`): Bearer token ile tüm istekler
- **Auth:** `Authorization: Bearer <JWT>` header
- **Admin Auth:** `webtier_admin_session` HTTP-only cookie

### Ana Endpoint'ler (`src/lib/constants.ts` — ENDPOINTS)

```typescript
const ENDPOINTS = {
  login:              '/api/auth/login',
  register:           '/api/auth/register',
  creditsBalance:     '/api/credits/balance',
  analysisMini:       '/api/analysis/mini',
  analysisUltra:      '/api/analysis/ultra',
  analysisList:       '/api/analysis/list',
  paymentCreate:      '/api/payment/create',
  verifyEmailSend:    '/api/auth/verify-email/send',
  verifyEmailVerify:  '/api/auth/verify-email/verify',
  forgotPassword:     '/api/auth/forgot-password',
  resetPassword:      '/api/auth/reset-password',
  notifications:      '/api/notifications',
  updateProfile:      '/api/auth/profile',
};
```

### Kredi Sistemi

- **Mini Analiz:** 1 mini_credit harcar
- **Ultra Analiz:** 1 ultra_credit harcar
- **Signup Bonusu:** 1 mini kredi
- Kredi işlemleri `credits` tablosunda loglanır

---

## 💳 ÖDEME SİSTEMİ (PayTR)

- Entegrasyon: `src/lib/paytr.ts`
- Ödeme başlatma: `/api/payment/create`
- PayTR callback: `/api/payment/callback`
- Başarı/başarısızlık sayfaları: `/payment/success`, `/payment/failed`

---

## 🔔 BİLDİRİM SİSTEMİ

- `notifications` tablosu (okunmamış bildirimler)
- API: GET `/api/notifications` (listele), PATCH (okundu işaretle)
- Dashboard'da bildirim göstergesi

---

## 🛡️ BAKIM MODU

- `app_settings.maintenance_mode` DB değeri
- Middleware (`src/proxy.ts`): her istek `/api/public/maintenance` endpoint'ini kontrol eder (60 sn cache)
- Bakım modunda tüm sayfalar `/maintenance` sayfasına yönlendirilir
- Admin panel ve API route'ları bakım modundan muaf

---

## 🎨 TASARIM PRENSİPLERİ

- Jenerik AI estetiğinden kesinlikle kaçın (Inter + mor gradient YASAK)
- Cesur, akılda kalıcı, satış odaklı tasarım
- Koyu gece lacivert tema (dark night navy)
- Türk pazarına uygun Türkçe tipografi
- Mobile-first, responsive

### Renk Paleti
```css
--color-primary: #0F172A;      /* Koyu navy */
--color-accent: #F59E0B;       /* Amber CTA */
--color-accent-secondary: #10B981; /* Yeşil başarı */
--color-surface: #FAFAF9;
--color-text: #1E293B;
--color-muted: #64748B;
```

### Animasyon Kuralları
- Framer Motion staggered reveal (sayfa yükleme)
- Scroll-triggered animasyonlar
- Hover: scale, glow, gradient shift
- CTA pulse/glow
- Count-up sayı animasyonları

---

## 🔒 GÜVENLİK

- bcryptjs şifre hash (10 rounds)
- JWT imzalama (HMAC HS256)
- Rate limiting: admin login 5/15dk, OTP 3/saat
- Email enumeration koruması (forgot-password)
- HTTP-only cookie (admin session)
- SQL injection koruması: parameterized queries
- XSS koruması: dangerouslySetInnerHTML YASAK
- Security headers: `next.config.ts` (HSTS, CSP, X-Frame-Options)
- KVKK uyumlu veri işleme

---

## 🌐 ORTAM DEĞİŞKENLERİ (.env.local)

```bash
# Database
DATABASE_URL=postgresql://...
POSTGRES_URL=postgresql://...

# Auth
JWT_SECRET=...
ADMIN_PASSWORD=...

# Google OAuth
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
NEXT_PUBLIC_GOOGLE_CLIENT_ID=...

# Email (Resend)
RESEND_API_KEY=...
FROM_EMAIL=info@domain.com

# App
NEXT_PUBLIC_BASE_URL=https://domain.com

# PayTR
PAYTR_MERCHANT_ID=...
PAYTR_MERCHANT_KEY=...
PAYTR_MERCHANT_SALT=...
```

---

## 📄 SAYFA YAPILARI

### Anasayfa (/)
- Navbar (sticky, backdrop blur)
- Hero Section: CRO analiz input + animasyonlu arka plan (WebGL shader)
- Güven barı (trust signals, count-up istatistikler)
- Hizmetler genel bakış (3 kart)
- Süreç adımları (Process)
- E-ticaret tanıtım (kısa)
- Kurumsal tanıtım (kısa)
- Neden Biz
- SSS (accordion, schema markup)
- Son CTA
- Footer

### Dashboard (/dashboard)
- Header (kredi göstergesi, profil)
- Sidebar (navigasyon)
- Analiz başlatma (Mini/Ultra seçimi, URL girişi)
- Analiz geçmişi (AnalysisHistory)
- Görevler (BacklogTasks)
- Dökümanlar

### Admin Panel (/adminpanel)
- Kullanıcı yönetimi (kredi ekleme, görev atama)
- Analiz listesi
- Uygulama ayarları (maintenance_mode, cro_mini_enabled, cro_ultra_enabled)
- Ayrı JWT cookie auth (ADMIN_PASSWORD)

### Auth Sayfaları (/auth/*)
- /auth/login — email + şifre girişi, Google OAuth butonu
- /auth/signup — kayıt formu
- /auth/forgot-password — şifre sıfırlama talebi
- /auth/reset-password — yeni şifre belirleme
- /auth/callback — Google OAuth token işleme

---

## ✅ PROJE FAZLARI

### Faz 0: Hazırlık
- [x] Next.js proje kurulumu
- [x] PostgreSQL veritabanı şeması
- [x] Auth sistemi (email/şifre + Google OAuth)
- [x] Admin panel
- [x] Kredi sistemi
- [x] Ödeme entegrasyonu (PayTR)
- [x] Dashboard
- [x] Bildirim sistemi
- [x] Bakım modu

### Faz 1: Kod Kalitesi
- [ ] 90 lint hatası giderildi (54 error + 36 warning)
- [ ] TypeScript tip güvenliği sağlandı
- [ ] Cascading renders düzeltildi

### Faz 2: Test ve Güvenlik
- [ ] Auth akış testleri (login, signup, Google OAuth, şifre sıfırlama)
- [ ] Analiz akışı testleri (Mini/Ultra, kredi düşme, sonuç görüntüleme)
- [ ] Ödeme akışı testleri
- [ ] Cross-browser testleri
- [ ] Responsive testleri
- [ ] Lighthouse 90+

### Faz 3: Deployment
- [ ] Vercel / VPS hosting kurulumu
- [ ] Domain + SSL
- [ ] Environment variables
- [ ] Production build

---

## ⚠️ KRİTİK NOTLAR

1. **Auth:** Email + şifre ile giriş yapılıyor. WhatsApp OTP sistemi kullanılmıyor.
2. **Veritabanı:** PostgreSQL kullanılıyor. Veriler DB'de tutuluyor.
3. **API:** POST/PATCH/DELETE kullanılıyor. "Sadece GET" kuralı geçersiz.
4. **Analizler:** CRO analiz sonuçları kullanıcının dashboard'una yükleniyor.
5. **Tasarım:** Koyu gece lacivert tema, cesur tipografi, jenerik AI estetiğinden kaçın.
6. **Türkçe içerik:** Tüm UI Türkçe.
7. **Mobile-first:** Responsive tasarım zorunlu.
8. **Güvenlik:** bcrypt, JWT, rate limiting, parameterized queries — tüm güvenlik katmanları uygulandı.
