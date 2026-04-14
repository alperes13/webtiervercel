import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mesafeli Satış Sözleşmesi',
  description: 'Webtier Mesafeli Satış Sözleşmesi - Hizmet alımına ilişkin koşullar ve şartlar.',
};

export default function SaleContractPage() {
  return (
    <div className="light-page min-h-screen pt-16 lg:pt-20">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <h1 className="font-[family-name:var(--font-clash-display)] text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
          Mesafeli Satış Sözleşmesi
        </h1>
        <p className="mt-4 text-sm text-[var(--color-text-muted)]">Son güncelleme: Nisan 2026</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">1. Taraflar</h2>
            <p className="mt-2">
              <strong>Satıcı:</strong> Webtier - Dijital Çözümler<br />
              <strong>Alıcı:</strong> Hizmet alan gerçek veya tüzel kişi
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">2. Konu</h2>
            <p className="mt-2">
              İşbu sözleşmenin konusu, Satıcı&apos;nın Alıcı&apos;ya sunduğu CRO analizi, web tasarım ve
              e-ticaret çözüm hizmetlerinin koşullarını düzenlemektir.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">3. Hizmet Tanımı</h2>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Ücretsiz CRO Analizi: Web sitesi dönüşüm analizi raporu</li>
              <li>E-Ticaret Çözümleri: E-ticaret sitesi kurulumu ve optimizasyonu</li>
              <li>Kurumsal Web Tasarım: Kurumsal web sitesi tasarım ve geliştirme</li>
              <li>CRO Retainer: Aylık sürekli optimizasyon hizmeti</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">4. Ödeme Koşulları</h2>
            <p className="mt-2">
              Hizmet bedeli, proje kapsamına göre belirlenir ve WhatsApp üzerinden iletilen teklifte
              detaylandırılır. Ödeme koşulları proje bazında mutabakat ile belirlenir.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">5. Cayma Hakkı</h2>
            <p className="mt-2">
              6502 sayılı Tüketicinin Korunması Hakkında Kanun uyarınca, hizmet sözleşmelerinde
              hizmetin ifasına başlanmadan önce 14 gün içinde cayma hakkı kullanılabilir.
              Ücretsiz CRO analizi hizmeti için cayma hakkı uygulanmaz.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">6. Gizlilik</h2>
            <p className="mt-2">
              Taraflar, proje sürecinde edindikleri ticari sırları ve gizli bilgileri üçüncü taraflarla
              paylaşmayacaktır. Bu yükümlülük sözleşme sona erdikten sonra da devam eder.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">7. Uyuşmazlık</h2>
            <p className="mt-2">
              İşbu sözleşmeden doğan uyuşmazlıklarda Türkiye Cumhuriyeti mahkemeleri ve icra
              daireleri yetkilidir.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">8. İletişim</h2>
            <p className="mt-2">
              Sözleşme ile ilgili sorularınız için{' '}
              <a href="mailto:info@webtier.com.tr" className="text-[var(--color-accent)] hover:underline">
                info@webtier.com.tr
              </a>{' '}
              adresinden bize ulaşabilirsiniz.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
