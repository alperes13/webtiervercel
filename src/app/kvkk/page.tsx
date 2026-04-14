import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni',
  description: 'Webtier KVKK Aydınlatma Metni - Kişisel verilerin korunması hakkında bilgilendirme.',
};

export default function KVKKPage() {
  return (
    <div className="pt-16 lg:pt-20">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <h1 className="font-[family-name:var(--font-clash-display)] text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
          KVKK Aydınlatma Metni
        </h1>
        <p className="mt-4 text-sm text-[var(--color-text-muted)]">Son güncelleme: Nisan 2026</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">1. Veri Sorumlusu</h2>
            <p className="mt-2">
              Webtier (&quot;Şirket&quot;) olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) kapsamında
              kişisel verilerinizin korunmasına büyük önem veriyoruz. Bu aydınlatma metni ile kişisel verilerinizin
              işlenme amaçları, hukuki sebepleri ve haklarınız hakkında sizi bilgilendirmek istiyoruz.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">2. İşlenen Kişisel Veriler</h2>
            <p className="mt-2">Web sitemiz üzerinden aşağıdaki kişisel verileriniz işlenmektedir:</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Telefon numarası (OTP doğrulama için)</li>
              <li>Web sitesi URL bilgisi (CRO analizi için)</li>
              <li>IP adresi ve tarayıcı bilgileri (güvenlik amacıyla)</li>
              <li>Çerez verileri (site performansı için)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">3. Verilerin İşlenme Amacı</h2>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>CRO analiz hizmetinin sunulması</li>
              <li>Kimlik doğrulama (OTP)</li>
              <li>İletişim ve bilgilendirme</li>
              <li>Hizmet kalitesinin artırılması</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">4. Verilerin Aktarılması</h2>
            <p className="mt-2">
              Kişisel verileriniz, yasal zorunluluklar ve hizmet gereksinimleri dışında üçüncü taraflarla
              paylaşılmamaktadır. OTP doğrulama için SMS servis sağlayıcısı ile telefon numaranız paylaşılır.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">5. Veri Saklama Süresi</h2>
            <p className="mt-2">
              Kişisel verileriniz, işleme amacının gerektirdiği süre boyunca saklanır. Analiz verileri
              maksimum 1 yıl süreyle tutulur. Talebiniz üzerine verileriniz silinir.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">6. Haklarınız</h2>
            <p className="mt-2">KVKK&apos;nın 11. maddesi kapsamında aşağıdaki haklara sahipsiniz:</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme</li>
              <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya dışında aktarıldığı üçüncü kişileri bilme</li>
              <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
              <li>Silinmesini veya yok edilmesini isteme</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">7. İletişim</h2>
            <p className="mt-2">
              KVKK kapsamındaki talepleriniz için{' '}
              <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL || 'info@webtier.com.tr'}`} className="text-[var(--color-accent)] hover:underline">
                info@webtier.com.tr
              </a>{' '}
              adresine e-posta gönderebilirsiniz.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
