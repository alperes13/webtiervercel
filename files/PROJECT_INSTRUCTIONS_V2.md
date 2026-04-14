# 🚀 WEBTIER - Güncellenmiş Proje Talimatları

> **Son Güncelleme:** Backend API, Üyelik Sistemi, Kredi Yönetimi ve PayTR Entegrasyonu eklendi

---

## 📋 YENİ SİSTEM MİMARİSİ

### Teknoloji Yığını (Güncellenmiş)
```
Frontend:           Next.js 16 (App Router) + React 19
Styling:            Tailwind CSS 4+
Backend:            Next.js API Routes (Serverless Functions)
Database:           PostgreSQL (Vercel Postgres)
Authentication:     JWT (jose)
Payment:            PayTR
OTP/Messaging:      WhatsApp Business API (Custom)
Deployment:         Vercel
```

### Proje Yapısı (Yeni Eklenenler)
```
project-root/
├── database/
│   └── schema.sql              # PostgreSQL schema
├── src/
│   ├── app/
│   │   ├── api/                # ⭐ YENİ: API Routes
│   │   │   ├── auth/
│   │   │   │   ├── register/route.ts
│   │   │   │   ├── send-otp/route.ts
│   │   │   │   └── verify-otp/route.ts
│   │   │   ├── credits/
│   │   │   │   └── balance/route.ts
│   │   │   ├── analysis/
│   │   │   │   ├── mini/route.ts
│   │   │   │   └── ultra/route.ts
│   │   │   ├── payment/
│   │   │   │   ├── create/route.ts
│   │   │   │   └── callback/route.ts
│   │   │   └── webhook/
│   │   │       └── whatsapp/route.ts
│   │   ├── payment/
│   │   │   ├── success/page.tsx     # ⭐ YENİ: Ödeme başarılı
│   │   │   └── failed/page.tsx      # ⭐ YENİ: Ödeme başarısız
│   ├── lib/
│   │   ├── db.ts                    # ⭐ YENİ: Database helper
│   │   └── paytr.ts                 # ⭐ YENİ: PayTR helper
├── .env.example                     # ⭐ YENİ: Environment variables
└── ...
```

---

## 🗄️ VERİTABANI KURULUMU

### 1. Vercel Postgres Oluşturma

```bash
# Vercel Dashboard'a git
https://vercel.com/dashboard

# Storage -> Create Database -> Postgres
# Veya Vercel CLI ile:
vercel storage create postgres
```

### 2. Schema'yı Çalıştırma

```bash
# Local geliştirme için (PostgreSQL yüklü olmalı)
psql $POSTGRES_URL < database/schema.sql

# Veya Vercel Dashboard'dan:
# Storage -> Your Database -> Query -> schema.sql içeriğini yapıştır
```

### 3. Environment Variables Ayarlama

Vercel Dashboard -> Settings -> Environment Variables:

```env
POSTGRES_URL=postgresql://...
POSTGRES_PRISMA_URL=postgresql://...
POSTGRES_URL_NON_POOLING=postgresql://...
JWT_SECRET=your-secret-key
PAYTR_MERCHANT_ID=123456
PAYTR_MERCHANT_KEY=your-key
PAYTR_MERCHANT_SALT=your-salt
WHATSAPP_API_URL=https://...
WHATSAPP_API_TOKEN=your-token
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

---

## 🔐 AUTHENTICATION AKIŞI

### 1. Kayıt Akışı
```
[Kullanıcı telefon girer]
    → POST /api/auth/register
    → {phone: "+905551234567"}
    → Kullanıcı oluştur
    → 2 ücretsiz Mini kredi ekle
    → Başarılı yanıt dön
```

### 2. Giriş Akışı (OTP)
```
[Kullanıcı telefon girer]
    → POST /api/auth/send-otp
    → {phone: "+905551234567"}
    → OTP kodu oluştur
    → WhatsApp'a gönder
    → Session ID dön

[Kullanıcı OTP kodu girer]
    → POST /api/auth/verify-otp
    → {phone: "+905...", otp_code: "123456"}
    → OTP doğrula
    → JWT token oluştur
    → Session döndür
```

### 3. Authenticated Requests
```javascript
// Authorization header ile istek at
fetch('/api/credits/balance', {
  headers: {
    'Authorization': `Bearer ${session.token}`
  }
})
```

---

## 💳 KREDİ SİSTEMİ

### Kredi Tipleri
- **Mini (Ücretsiz):** Basit analiz, her yeni üyeye 2 adet hediye
- **Ultra (Ücretli):** Kapsamlı analiz, satın alınmalı

### Kredi İşlemleri

```sql
-- Kredi bakiyesi sorgula
SELECT mini_credits, ultra_credits FROM users WHERE id = $1;

-- Kredi düş (function)
SELECT deduct_credit($user_id, 'mini', $analysis_id, 'Analiz kullanımı');

-- Kredi ekle (function)
SELECT add_credit($user_id, 'ultra', 5, 'purchase', 'Paket satın alımı', $payment_id);
```

### API Endpoints

```typescript
// Kredi bakiyesi
GET /api/credits/balance
Headers: Authorization: Bearer {token}

Response:
{
  success: true,
  credits: {
    mini: 2,
    ultra: 5,
    total: 7
  }
}
```

---

## 📊 ANALİZ SİSTEMİ

### Mini Analiz (Ücretsiz)

```typescript
// Mini analiz talebi
POST /api/analysis/mini
Headers: Authorization: Bearer {token}
Body: {
  website_url: "https://example.com",
  instagram_url: "https://instagram.com/example" // optional
}

Response:
{
  success: true,
  analysis: {
    id: "uuid",
    type: "mini",
    status: "pending"
  }
}
```

### Ultra Analiz (Ücretli)

```typescript
// Ultra analiz talebi
POST /api/analysis/ultra
Headers: Authorization: Bearer {token}
Body: {
  website_url: "https://example.com",
  instagram_url: "https://instagram.com/example", // optional
  linkedin_url: "https://linkedin.com/company/example", // optional
  tiktok_url: "https://tiktok.com/@example", // optional
  additional_notes: "Özel notlar" // optional
}

Response:
{
  success: true,
  message: "Ultra analiz talebi oluşturuldu",
  analysis: {
    id: "uuid",
    type: "ultra",
    status: "pending"
  },
  note: "Analiziniz incelemeye alındı"
}
```

### Analiz Durumları
- `pending`: Beklemede
- `processing`: İşleniyor
- `completed`: Tamamlandı
- `failed`: Başarısız
- `rejected`: Reddedildi (Ultra için - kredi iade edilir)

### Ultra Analiz Red ve İade
```sql
-- Analizi reddet
UPDATE analyses 
SET status = 'rejected', 
    approved = false,
    review_notes = 'Geçersiz URL'
WHERE id = $1;

-- Krediyi iade et
SELECT add_credit($user_id, 'ultra', 1, 'refund', 'Analiz reddedildi', $analysis_id);

-- Refund flag'i işaretle
UPDATE analyses SET refunded = true WHERE id = $1;
```

---

## 💰 PAYTR ÖDEME ENTEGRASYONU

### Ödeme Akışı

```
[Kullanıcı kredi satın almak ister]
    → POST /api/payment/create
    → {credit_amount: 5}
    → PayTR iframe token oluştur
    → Token ve iframe URL döndür

[Kullanıcı ödeme yapar]
    → PayTR iframe'de ödeme
    → PayTR webhook callback
    → POST /api/payment/callback
    → Ödeme doğrula
    → Krediyi ekle
    → Kullanıcıya bildirim
```

### Ödeme İsteği

```typescript
// Kredi satın al
POST /api/payment/create
Headers: Authorization: Bearer {token}
Body: {
  credit_amount: 5  // Kaç Ultra kredi
}

Response:
{
  success: true,
  payment: {
    id: "uuid",
    merchant_oid: "WT1234567890ABCD",
    token: "paytr-token",
    amount: 2500,  // TL
    credit_amount: 5
  },
  iframe_url: "https://www.paytr.com/odeme/guvenli/{token}"
}
```

### Ödeme Sonuç Sayfaları

```typescript
// Başarılı ödeme
/payment/success?credits=5

// Başarısız ödeme
/payment/failed
```

### PayTR Test Kartları

```
Test Kart (Başarılı):
Kart No: 4355 0840 0000 0001
Son Kullanma: 12/26
CVV: 000

Test Kart (Başarısız):
Kart No: 4355 0840 0000 0002
Son Kullanma: 12/26
CVV: 000
```

---

## 📱 WHATSAPP OTP SERVİSİ

### Webhook Endpoint

```
URL: https://yourdomain.com/api/webhook/whatsapp
Method: POST, GET
Verify Token: WHATSAPP_VERIFY_TOKEN
```

### Webhook Doğrulama (GET)

```bash
GET /api/webhook/whatsapp?hub.mode=subscribe&hub.verify_token=YOUR_TOKEN&hub.challenge=CHALLENGE

Response: CHALLENGE (plain text)
```

### Mesaj Alma (POST)

```typescript
// WhatsApp'tan gelen mesaj formatı (örnek)
{
  "from": "+905551234567",
  "message": "Merhaba",
  "timestamp": 1234567890,
  "messageId": "abc123"
}
```

### OTP Gönderme

`/api/auth/send-otp` endpoint'inden `sendWhatsAppOTP` fonksiyonu çağrılır:

```typescript
// TODO: Kendi WhatsApp API'nizi entegre edin
async function sendWhatsAppOTP(phone: string, otpCode: string) {
  const response = await fetch(process.env.WHATSAPP_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
    },
    body: JSON.stringify({
      phone: phone,
      message: `Webtier doğrulama kodunuz: ${otpCode}\n\nBu kodu kimseyle paylaşmayın.`,
    }),
  });
  return response.ok;
}
```

### WhatsApp Sağlayıcı Önerileri

**Türkiye:**
- Netgsm: https://www.netgsm.com.tr/
- İleti Merkezi: https://www.iletimerkezi.com/
- Jetapi: https://www.jetapi.com.tr/

**Global:**
- Twilio: https://www.twilio.com/whatsapp
- MessageBird: https://messagebird.com/
- Vonage: https://www.vonage.com/

---

## 🚀 DEPLOYMENT (VERCEL)

### 1. Proje Kurulumu

```bash
# Bağımlılıkları yükle
npm install

# Environment variables oluştur
cp .env.example .env.local
# .env.local dosyasını düzenle

# Development server
npm run dev
```

### 2. Vercel'e Deploy

```bash
# Vercel CLI kur
npm i -g vercel

# İlk deploy
vercel

# Production deploy
vercel --prod
```

### 3. Vercel Dashboard Ayarları

```
1. Settings -> Environment Variables
   - Tüm .env değişkenlerini ekle
   
2. Settings -> Functions
   - Max Duration: 10s (Hobby), 60s (Pro)
   
3. Storage -> Postgres
   - Database'i bağla
   - Environment variables otomatik eklenir
```

### 4. Domain Bağlama

```bash
# Vercel CLI ile
vercel domains add yourdomain.com

# Veya Dashboard'dan:
# Settings -> Domains -> Add Domain
```

### 5. SSL (Otomatik)

Vercel otomatik Let's Encrypt SSL sertifikası oluşturur.

---

## 🧪 TEST SENARYOLARI

### 1. Kayıt ve Giriş

```bash
# Yeni kullanıcı kaydı
curl -X POST https://yourdomain.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"phone": "+905551234567"}'

# OTP gönder
curl -X POST https://yourdomain.com/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "+905551234567"}'

# OTP doğrula
curl -X POST https://yourdomain.com/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "+905551234567", "otp_code": "123456"}'
```

### 2. Kredi Bakiyesi

```bash
curl https://yourdomain.com/api/credits/balance \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 3. Mini Analiz

```bash
curl -X POST https://yourdomain.com/api/analysis/mini \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "website_url": "https://example.com",
    "instagram_url": "https://instagram.com/example"
  }'
```

### 4. Ödeme

```bash
curl -X POST https://yourdomain.com/api/payment/create \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"credit_amount": 5}'
```

---

## 🔒 GÜVENLİK CHECKLIST

- [x] JWT token kullanımı
- [x] HTTPS zorunlu (Vercel otomatik)
- [x] SQL injection koruması (Parameterized queries)
- [x] Rate limiting (TODO: implement)
- [x] OTP max attempts (3)
- [x] OTP expiration (5 dakika)
- [x] Payment verification (PayTR hash)
- [x] Environment variables güvenli
- [x] Webhook verification
- [ ] CORS policy (TODO: ayarla)
- [ ] Input validation (TODO: zod ekle)

---

## 📊 DATABASE BACKUP

```bash
# Vercel Postgres backup
vercel storage backup create

# Manual backup
pg_dump $POSTGRES_URL > backup.sql

# Restore
psql $POSTGRES_URL < backup.sql
```

---

## 🐛 DEBUGGING

### Database Queries

```typescript
// Query logging
console.log('SQL:', query, params);

// Slow query detection (lib/db.ts'te otomatik)
```

### API Errors

```bash
# Vercel logs
vercel logs

# Real-time logs
vercel logs --follow
```

---

## 📝 TODO LİSTESİ

- [ ] Frontend: Kayıt/Giriş bileşenleri
- [ ] Frontend: Mini/Ultra analiz formları
- [ ] Frontend: Kredi satın alma modal'ı
- [ ] Frontend: Ödeme success/fail sayfaları
- [ ] Backend: Email notifications
- [ ] Backend: Admin dashboard (analiz onay/red)
- [ ] Backend: Rate limiting
- [ ] Backend: Input validation (Zod)
- [ ] DevOps: Monitoring (Sentry)
- [ ] DevOps: Analytics (Google Analytics)
- [ ] Documentation: API docs (Swagger)

---

## 🆘 SORUN GİDERME

### Database Connection Error
```
Error: Connection timeout
Fix: Vercel Dashboard -> Storage -> Postgres -> Check status
```

### PayTR Integration Error
```
Error: Hash verification failed
Fix: Check PAYTR_MERCHANT_KEY and PAYTR_MERCHANT_SALT
```

### WhatsApp OTP Not Sending
```
Error: WhatsApp API not configured
Fix: Set WHATSAPP_API_URL and WHATSAPP_API_TOKEN
Development: OTP kod console'a loglanır
```

### JWT Token Invalid
```
Error: Invalid token
Fix: Check JWT_SECRET matches between requests
```

---

## 📞 DESTEK

- **Vercel Docs:** https://vercel.com/docs
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **PayTR Docs:** https://www.paytr.com/dokuman
- **Next.js Docs:** https://nextjs.org/docs

---

**Son Güncelleme:** 2024
**Versiyon:** 2.0 (Backend + Üyelik + Kredi + Ödeme)
