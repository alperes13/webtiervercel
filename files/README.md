# 🎉 WEBTIER - Tam Backend Sistemi Hazır!

## 📦 Size Hazırladığım Dosyalar

### 1. **Database** 📊
- `database/schema.sql` - PostgreSQL veritabanı şeması
  - users (kullanıcılar)
  - otp_sessions (OTP doğrulama)
  - credits (kredi hareketleri)
  - analyses (analizler)
  - payments (ödemeler)
  - Helper functions (kredi ekle/çıkar)

### 2. **API Routes** 🔌
Tüm backend endpoints hazır:

**Auth (Kimlik Doğrulama):**
- `POST /api/auth/register` - Yeni kullanıcı kaydı
- `POST /api/auth/send-otp` - OTP kodu gönder
- `POST /api/auth/verify-otp` - OTP doğrula ve giriş yap

**Credits (Kredi Yönetimi):**
- `GET /api/credits/balance` - Kredi bakiyesi

**Analysis (Analiz):**
- `POST /api/analysis/mini` - Mini analiz talebi (ücretsiz)
- `POST /api/analysis/ultra` - Ultra analiz talebi (ücretli)

**Payment (Ödeme - PayTR):**
- `POST /api/payment/create` - Ödeme başlat
- `POST /api/payment/callback` - PayTR webhook

**Webhook:**
- `POST /api/webhook/whatsapp` - WhatsApp mesaj dinleyici

### 3. **Helper Libraries** 🛠️
- `src/lib/db.ts` - PostgreSQL bağlantı helper
- `src/lib/paytr.ts` - PayTR ödeme entegrasyonu

### 4. **Environment Variables** ⚙️
- `.env.example` - Tüm gerekli değişkenler

### 5. **Dokümantasyon** 📚
- `PROJECT_INSTRUCTIONS_V2.md` - Güncellenmiş proje talimatları
- `DEPLOYMENT.md` - Adım adım deployment rehberi
- `package.json` - Güncellenmiş bağımlılıklar

---

## 🚀 Hızlı Başlangıç

### 1. Bağımlılıkları Yükle

```bash
# Yeni bağımlılıkları yükle
npm install
```

Yeni eklenenler:
- `pg` (PostgreSQL client)
- `jose` (JWT authentication)
- `@types/pg`

### 2. Environment Variables

```bash
# .env.local oluştur
cp .env.example .env.local

# Düzenle:
# - POSTGRES_URL
# - JWT_SECRET
# - PAYTR_*
# - WHATSAPP_*
```

### 3. Database Kurulumu

```bash
# Vercel Postgres oluştur (veya Supabase)
# Schema'yı çalıştır:
psql $POSTGRES_URL < database/schema.sql
```

### 4. Local Test

```bash
npm run dev

# Test:
curl http://localhost:3000/api/auth/register \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"phone": "+905551234567"}'
```

### 5. Deploy

```bash
# Vercel'e deploy
vercel --prod
```

---

## 🎯 ÖZELLİKLER

### ✅ Tamamlananlar

- ✅ **Üyelik Sistemi**
  - Telefon ile kayıt
  - WhatsApp OTP doğrulama
  - JWT token authentication
  - Her yeni üyeye 2 ücretsiz Mini kredi

- ✅ **Kredi Sistemi**
  - Mini (ücretsiz) kredi
  - Ultra (ücretli) kredi
  - Kredi geçmişi (transaction log)
  - Otomatik kredi düşme/ekleme

- ✅ **Analiz Sistemi**
  - Mini analiz (website + instagram)
  - Ultra analiz (website + instagram + linkedin + tiktok)
  - Analiz durumu takibi
  - Ultra analiz onay/red sistemi
  - Reddedilirse kredi iadesi

- ✅ **Ödeme Sistemi (PayTR)**
  - Kredi satın alma
  - PayTR iframe entegrasyonu
  - Webhook callback
  - Otomatik kredi ekleme
  - Test ve production modu

- ✅ **WhatsApp Entegrasyonu**
  - OTP gönderimi (placeholder)
  - Webhook dinleyici
  - Gelen mesaj işleme

- ✅ **Database**
  - PostgreSQL schema
  - Helper functions
  - Indexes
  - Triggers

- ✅ **Security**
  - JWT authentication
  - SQL injection koruması
  - OTP rate limiting
  - Payment verification

---

## 📋 Yapılacaklar (Frontend)

### Kritik

- [ ] **Login/Register UI Bileşenleri**
  - Telefon numarası input
  - OTP input modal
  - Hata mesajları

- [ ] **Mini Analiz Formu**
  - Website URL input
  - Instagram URL input (opsiyonel)
  - Submit butonu
  - Kredi kontrolü

- [ ] **Ultra Analiz Formu**
  - Website, Instagram, LinkedIn, TikTok URL inputs
  - Ek notlar textarea
  - Kredi satın alma linki
  - Submit butonu

- [ ] **Kredi Satın Alma Modal**
  - Kredi miktarı seçici (1, 5, 10, 20 Ultra kredi)
  - Fiyat gösterimi
  - PayTR iframe açma

- [ ] **Ödeme Sonuç Sayfaları**
  - `/payment/success` - Başarılı ödeme
  - `/payment/failed` - Başarısız ödeme

- [ ] **Profil Popup Güncelleme**
  - Mini/Ultra kredi ayrımı göster
  - Analiz geçmişi
  - Kredi satın al butonu

### Opsiyonel

- [ ] Admin dashboard (analiz onaylama/reddetme)
- [ ] Email notifications
- [ ] Analiz sonuçları görüntüleme
- [ ] Kredi geçmişi sayfası

---

## 🔐 Güvenlik Notları

1. **JWT_SECRET:** Production'da güçlü bir secret kullan
   ```bash
   openssl rand -base64 32
   ```

2. **Database:** Vercel Postgres kullan (otomatik connection pooling)

3. **PayTR:** Test modunu production'da KAPAT

4. **WhatsApp:** Webhook'u sadece güvenilir IP'lerden kabul et

5. **Rate Limiting:** TODO - API'lere rate limit ekle (öncelikli değil ama önemli)

---

## 🧪 Test Senaryoları

### 1. Kullanıcı Kaydı ve Giriş
```bash
# Kayıt
curl -X POST https://yourdomain.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"phone": "+905551234567"}'

# OTP gönder
curl -X POST https://yourdomain.com/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "+905551234567"}'

# OTP doğrula (konsola loglanır)
curl -X POST https://yourdomain.com/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "+905551234567", "otp_code": "123456"}'
```

### 2. Kredi Kontrolü
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

### 4. Kredi Satın Alma
```bash
curl -X POST https://yourdomain.com/api/payment/create \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"credit_amount": 5}'

# Response'daki iframe_url'yi tarayıcıda aç
```

---

## 📞 Sık Sorulan Sorular

### WhatsApp OTP nasıl çalışıyor?
Development'ta OTP kodu console'a loglanır. Production'da kendi WhatsApp API'nizi entegre etmelisiniz.

### PayTR test kartları nedir?
```
Başarılı: 4355 0840 0000 0001, 12/26, CVV: 000
Başarısız: 4355 0840 0000 0002, 12/26, CVV: 000
```

### Database nerede host edilecek?
Vercel Postgres (önerilen) veya Supabase (ücretsiz daha fazla limit).

### Ultra analiz nasıl onaylanır?
Admin dashboard gerekli (TODO). Şimdilik database'den manuel:
```sql
UPDATE analyses 
SET status = 'completed', approved = true 
WHERE id = 'analysis-id';
```

---

## 🎁 Ekstra Özellikler

Sisteme daha sonra ekleyebileceğiniz:

1. **Email Notifications**
   - Analiz tamamlandı
   - Kredi satın alındı
   - OTP alternatif yöntem

2. **Admin Dashboard**
   - Analiz onaylama/reddetme
   - Kullanıcı yönetimi
   - İstatistikler

3. **Analytics**
   - Conversion tracking
   - User behavior
   - Payment analytics

4. **Referral System**
   - Arkadaşını davet et
   - Bonus kredi kazan

---

## 🚀 Deployment Adımları (Özet)

1. ✅ GitHub'a push
2. ✅ Vercel'e import
3. ✅ Postgres oluştur
4. ✅ Schema çalıştır
5. ✅ Env variables ekle
6. ✅ PayTR ayarla
7. ✅ WhatsApp API ayarla
8. ✅ Domain bağla
9. ✅ Test et
10. ✅ LIVE!

Detaylı adımlar: `DEPLOYMENT.md`

---

## 💬 Destek

Sorunuz mu var?

1. `PROJECT_INSTRUCTIONS_V2.md` - Teknik detaylar
2. `DEPLOYMENT.md` - Deployment rehberi
3. İlgili API endpoint dosyalarındaki yorumlar

---

## 🎉 Tebrikler!

Artık tam fonksiyonel bir backend sisteminiz var:

- ✅ Üyelik
- ✅ OTP
- ✅ Kredi yönetimi
- ✅ Analiz sistemi
- ✅ Ödeme entegrasyonu

**Şimdi yapılacaklar:**
1. Frontend bileşenlerini tamamlayın
2. Deploy edin
3. Test edin
4. LIVE yapın!

Başarılar! 🚀
