# 🚀 WEBTIER - DEPLOYMENT REHBERİ

## İçindekiler
1. [Vercel + PostgreSQL Deployment](#vercel-deployment)
2. [PayTR Entegrasyonu](#paytr-setup)
3. [WhatsApp API Kurulumu](#whatsapp-setup)
4. [Domain ve SSL](#domain-ssl)
5. [Production Checklist](#production-checklist)

---

## 1. VERCEL + POSTGRESQL DEPLOYMENT {#vercel-deployment}

### Adım 1: Vercel Hesabı Oluştur

1. https://vercel.com adresine git
2. GitHub hesabınla giriş yap
3. Free plan ile başla (Hobby plan)

### Adım 2: GitHub Repository'yi Bağla

```bash
# GitHub'da repo oluştur
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADIN/webtier.git
git push -u origin main
```

Vercel Dashboard'da:
1. "Add New Project"
2. "Import Git Repository"
3. GitHub repo'nuzu seçin
4. Framework Preset: Next.js (otomatik algılanır)
5. Root Directory: ./ (default)
6. Deploy!

### Adım 3: PostgreSQL Database Oluştur

#### Option A: Vercel Postgres (Önerilen)

1. Vercel Dashboard -> Storage -> Create Database
2. Postgres seçin
3. Region: Frankfurt (Türkiye'ye en yakın)
4. Create

Environment variables otomatik eklenir:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`

#### Option B: Supabase (Alternatif - Ücretsiz daha fazla limit)

1. https://supabase.com adresine git
2. "New Project" oluştur
3. Region: Frankfurt
4. Database password belirle
5. Settings -> Database -> Connection String kopyala

Vercel'de manuel ekle:
```env
POSTGRES_URL=postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:5432/postgres
```

### Adım 4: Database Schema'yı Çalıştır

```bash
# Local'den (psql yüklü olmalı)
psql $POSTGRES_URL < database/schema.sql

# Veya Vercel Postgres Dashboard'dan:
# Queries tab -> schema.sql içeriğini yapıştır -> Execute
```

Supabase kullanıyorsanız:
```bash
# SQL Editor'dan schema.sql'i çalıştır
```

### Adım 5: Environment Variables Ayarla

Vercel Dashboard -> Settings -> Environment Variables

```env
# Otomatik eklenenler (Vercel Postgres)
POSTGRES_URL=... (otomatik)
POSTGRES_PRISMA_URL=... (otomatik)
POSTGRES_URL_NON_POOLING=... (otomatik)

# Manuel ekleyeceğiniz
JWT_SECRET=<openssl rand -base64 32 ile oluştur>
NEXT_PUBLIC_BASE_URL=https://yourdomain.vercel.app

# PayTR (sonra eklenecek)
PAYTR_MERCHANT_ID=
PAYTR_MERCHANT_KEY=
PAYTR_MERCHANT_SALT=

# WhatsApp (sonra eklenecek)
WHATSAPP_API_URL=
WHATSAPP_API_TOKEN=
WHATSAPP_VERIFY_TOKEN=webtier-verify-123
```

JWT_SECRET oluşturma:
```bash
openssl rand -base64 32
# Çıktı: kA3s9Dm2jF8qL...
```

### Adım 6: Deploy ve Test

```bash
# Vercel CLI ile (opsiyonel)
npm i -g vercel
vercel

# Veya GitHub'a push yap, otomatik deploy edilir
git push origin main
```

Deploy URL: `https://your-project.vercel.app`

Test:
```bash
curl https://your-project.vercel.app/api/auth/register \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"phone": "+905551234567"}'
```

---

## 2. PAYTR ENTEGRASYONU {#paytr-setup}

### Adım 1: PayTR Üye Ol

1. https://www.paytr.com/ adresine git
2. "Üye Ol" -> Merchant hesabı oluştur
3. Başvuru formu doldur
4. Onay bekle (1-3 gün)

### Adım 2: Merchant Bilgileri Al

PayTR onayladıktan sonra:
1. Panel'e giriş yap
2. Ayarlar -> API Bilgileri
3. Aşağıdakileri kopyala:
   - Merchant ID
   - Merchant Key
   - Merchant Salt

### Adım 3: Test Modu Aktif Et

1. PayTR Panel -> Test Modu: Aktif
2. Test kartlarıyla ödeme test edebilirsiniz

### Adım 4: Environment Variables Ekle

Vercel Dashboard -> Settings -> Environment Variables

```env
PAYTR_MERCHANT_ID=123456
PAYTR_MERCHANT_KEY=aBcDeFgHiJkLmN...
PAYTR_MERCHANT_SALT=OpQrStUvWxYz...
```

### Adım 5: Callback URL Ayarla

PayTR Panel -> Ayarlar -> Callback URL:
```
https://yourdomain.com/api/payment/callback
```

### Adım 6: Test Ödemesi

```bash
# Ödeme başlat
curl -X POST https://yourdomain.com/api/payment/create \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"credit_amount": 1}'

# Response:
{
  "success": true,
  "payment": {
    "id": "...",
    "merchant_oid": "WT1234567890ABCD",
    "token": "paytr-token",
    "amount": 500
  },
  "iframe_url": "https://www.paytr.com/odeme/guvenli/{token}"
}
```

iframe_url'yi tarayıcıda aç ve test kartı ile öde:

**Test Kart (Başarılı):**
```
Kart No: 4355 0840 0000 0001
Son Kullanma: 12/26
CVV: 000
```

### Adım 7: Production'a Geç

Test tamamlandıktan sonra:
1. PayTR Panel -> Test Modu: Pasif
2. Gerçek ödemeleri kabul etmeye başla

---

## 3. WHATSAPP API KURULUMU {#whatsapp-setup}

### Seçenek A: Meta WhatsApp Business API (Resmi)

#### Adım 1: Meta Business Hesabı

1. https://business.facebook.com/ adresine git
2. Business hesabı oluştur
3. WhatsApp Business Platform -> Başlat

#### Adım 2: WhatsApp Business API Setup

1. Business App oluştur
2. WhatsApp Product ekle
3. Test numaranı doğrula
4. Production'a geçiş için başvur

#### Adım 3: Webhook Ayarla

```
Webhook URL: https://yourdomain.com/api/webhook/whatsapp
Verify Token: webtier-verify-123
```

Meta Dashboard -> WhatsApp -> Configuration:
- Callback URL: yukarıdaki URL
- Verify Token: yukarıdaki token

#### Adım 4: Access Token Al

Meta Dashboard -> WhatsApp -> API Setup:
- Access Token kopyala
- `.env`'ye ekle

```env
WHATSAPP_API_URL=https://graph.facebook.com/v18.0/PHONE_NUMBER_ID/messages
WHATSAPP_API_TOKEN=your-access-token
```

### Seçenek B: Netgsm (Türkiye - Kolay Kurulum)

#### Adım 1: Netgsm Üye Ol

1. https://www.netgsm.com.tr/ adresine git
2. WhatsApp Entegrasyon Paketi satın al
3. API bilgilerini al

#### Adım 2: API Credentials

Netgsm Panel -> API Ayarları:
```env
WHATSAPP_API_URL=https://api.netgsm.com.tr/whatsapp/send
WHATSAPP_API_TOKEN=your-netgsm-api-key
```

#### Adım 3: OTP Gönderme Testi

```typescript
// src/app/api/auth/send-otp/route.ts içindeki
// sendWhatsAppOTP fonksiyonunu Netgsm formatına göre düzenle:

async function sendWhatsAppOTP(phone: string, otpCode: string) {
  const response = await fetch(process.env.WHATSAPP_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(`${process.env.NETGSM_USER}:${process.env.NETGSM_PASS}`).toString('base64')}`,
    },
    body: JSON.stringify({
      phone: phone,
      message: `Webtier doğrulama kodunuz: ${otpCode}\n\nBu kodu kimseyle paylaşmayın.`,
    }),
  });
  return response.ok;
}
```

### Seçenek C: İleti Merkezi (Türkiye - Alternatif)

1. https://www.iletimerkezi.com/ adresine git
2. WhatsApp Business paketi satın al
3. API credentials al
4. Netgsm'e benzer şekilde entegre et

---

## 4. DOMAIN VE SSL {#domain-ssl}

### Adım 1: Domain Satın Al

Önerilen satıcılar:
- **Cloudflare:** https://www.cloudflare.com/ (en ucuz)
- **Namecheap:** https://www.namecheap.com/
- **GoDaddy:** https://www.godaddy.com/

Türkiye domain için (.com.tr):
- **nic.tr:** https://www.nic.tr/

### Adım 2: Domain'i Vercel'e Bağla

#### Option A: Vercel DNS (Önerilen)

1. Vercel Dashboard -> Settings -> Domains
2. "Add Domain" -> `yourdomain.com` gir
3. Nameserver'ları gösterir, örnek:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
4. Domain satıcınızın panelinde nameserver'ları değiştir
5. 24-48 saat bekle (DNS propagation)

#### Option B: External DNS (Cloudflare, etc.)

1. DNS sağlayıcınızda A record ekle:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21 (Vercel IP)
   ```
2. CNAME record ekle (www):
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
3. Vercel Dashboard -> Settings -> Domains -> Add
4. Domain'i gir ve doğrula

### Adım 3: SSL (Otomatik)

Vercel otomatik Let's Encrypt SSL sertifikası oluşturur.
DNS ayarları yayıldıktan sonra 1-2 saat içinde aktif olur.

Kontrol:
```bash
curl -I https://yourdomain.com
# HTTP/2 200 olmalı
```

### Adım 4: HTTPS Redirect

Vercel otomatik HTTP -> HTTPS redirect yapar.

---

## 5. PRODUCTION CHECKLIST {#production-checklist}

### Deployment Öncesi

- [ ] Database schema çalıştırıldı
- [ ] Tüm environment variables ayarlandı
- [ ] JWT_SECRET production-ready (32+ karakter)
- [ ] NEXT_PUBLIC_BASE_URL doğru domain
- [ ] PayTR test modu KAPALI (production'da)
- [ ] WhatsApp webhook çalışıyor
- [ ] Test ödemesi başarılı
- [ ] Test OTP gönderimi başarılı

### Security

- [ ] HTTPS aktif
- [ ] Environment variables güvenli
- [ ] SQL injection koruması (parameterized queries)
- [ ] CORS ayarlandı (gerekiyorsa)
- [ ] Rate limiting aktif (TODO)
- [ ] Input validation (TODO: Zod ekle)

### Monitoring

- [ ] Vercel Analytics aktif
- [ ] Error logging (Sentry - opsiyonel)
- [ ] Database backup planı
- [ ] Uptime monitoring (UptimeRobot - opsiyonel)

### Performance

- [ ] Next.js production build test edildi
- [ ] Images optimize (Next/Image kullan)
- [ ] Database indexes oluşturuldu (schema.sql'de var)
- [ ] API response times < 500ms

### Legal

- [ ] KVKK politikası hazır
- [ ] Gizlilik politikası hazır
- [ ] Kullanım şartları hazır
- [ ] Çerez onay banner'ı aktif

---

## 🆘 Sorun Giderme

### "Database connection failed"

```bash
# Connection string kontrolü
echo $POSTGRES_URL

# Manual bağlantı testi
psql $POSTGRES_URL
```

**Çözüm:** Vercel Dashboard -> Storage -> Postgres -> Settings -> Connection String'i kopyala ve yeniden ekle

### "PayTR hash verification failed"

**Sebep:** MERCHANT_KEY veya MERCHANT_SALT yanlış

**Çözüm:** PayTR Panel'den credentials'ı yeniden kopyala

### "WhatsApp OTP not sending"

**Development:** OTP kodu console'a loglanır, API çağrısı atlanır

**Production:** 
1. WHATSAPP_API_URL ve TOKEN kontrolü
2. Webhook çalışıyor mu test et:
   ```bash
   curl -X POST https://yourdomain.com/api/webhook/whatsapp \
     -H "Content-Type: application/json" \
     -d '{"from": "+905551234567", "message": "test"}'
   ```

### "Deployment failed"

**Build Error:** 
```bash
# Local'de build test et
npm run build

# Hata varsa düzelt, tekrar push
```

**Environment Variables:** Vercel Dashboard'da tüm değişkenler ekli mi kontrol et

---

## 📞 Destek Kaynakları

- **Vercel Status:** https://www.vercel-status.com/
- **Vercel Support:** https://vercel.com/support
- **PayTR Destek:** destek@paytr.com
- **PostgreSQL Community:** https://www.postgresql.org/community/

---

## 🎉 Deployment Tamamlandı!

Artık projeniz live! 

Kontrol:
1. ✅ https://yourdomain.com açılıyor
2. ✅ Database bağlantısı çalışıyor
3. ✅ Kayıt/Giriş çalışıyor
4. ✅ OTP geliyor
5. ✅ Ödeme alınıyor
6. ✅ Analizler oluşturuluyor

**Sonraki adımlar:**
- Frontend bileşenlerini tamamla
- Admin dashboard ekle
- Monitoring ve analytics kur
- Marketing başlat!

🚀 **Başarılar!**
