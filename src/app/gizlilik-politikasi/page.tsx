import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gizlilik ve Çerez Politikası',
  description: 'Webtier Gizlilik ve Çerez Politikası - Verilerinizin nasıl toplandığı ve kullanıldığı hakkında bilgi.',
};

export default function PrivacyPage() {
  return (
    <div className="pt-16 lg:pt-20">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <h1 className="font-[family-name:var(--font-clash-display)] text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
          Gizlilik ve Çerez Politikası
        </h1>
        <p className="mt-4 text-sm text-[var(--color-text-muted)]">Son güncelleme: Nisan 2026</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">1. Giriş</h2>
            <p className="mt-2">
              Webtier olarak gizliliğinize saygı duyuyoruz. Bu politika, web sitemizi ziyaret
              ettiğinizde hangi bilgilerin toplandığını, nasıl kullanıldığını ve haklarınızı
              açıklamaktadır.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">2. Toplanan Bilgiler</h2>
            <h3 className="mt-3 font-medium text-[var(--color-text)]">Otomatik Toplanan Bilgiler:</h3>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>IP adresi</li>
              <li>Tarayıcı türü ve sürümü</li>
              <li>İşletim sistemi</li>
              <li>Ziyaret edilen sayfalar ve süreleri</li>
              <li>Yönlendiren URL</li>
            </ul>
            <h3 className="mt-3 font-medium text-[var(--color-text)]">Sizin Sağladığınız Bilgiler:</h3>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Telefon numarası (OTP doğrulama)</li>
              <li>Web sitesi URL&apos;si (CRO analizi)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">3. Çerez Politikası</h2>
            <p className="mt-2">Web sitemizde aşağıdaki çerez türleri kullanılmaktadır:</p>
            <div className="mt-3 space-y-3">
              <div>
                <h4 className="font-medium text-[var(--color-text)]">Zorunlu Çerezler</h4>
                <p>Sitenin temel işlevleri için gereklidir. Oturum yönetimi ve güvenlik amacıyla kullanılır.</p>
              </div>
              <div>
                <h4 className="font-medium text-[var(--color-text)]">Performans Çerezleri</h4>
                <p>Sitenin nasıl kullanıldığını anlamamıza yardımcı olur. Anonim istatistik verileri toplar.</p>
              </div>
              <div>
                <h4 className="font-medium text-[var(--color-text)]">İşlevsellik Çerezleri</h4>
                <p>Tercihlerinizi hatırlamamızı sağlar (dil, bölge gibi).</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">4. LocalStorage Kullanımı</h2>
            <p className="mt-2">
              Oturum bilgileriniz ve OTP durum bilgileri tarayıcınızın LocalStorage alanında saklanır.
              Bu veriler sunucuya gönderilmez ve yalnızca tarayıcınızda bulunur. Çıkış yaptığınızda
              silinir.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">5. Üçüncü Taraf Hizmetler</h2>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Google Fonts (tipografi)</li>
              <li>SMS Servis Sağlayıcısı (OTP doğrulama)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">6. Veri Güvenliği</h2>
            <p className="mt-2">
              Verilerinizi korumak için HTTPS şifreleme, güvenlik başlıkları (HSTS, CSP) ve
              düzenli güvenlik denetimleri uygulamaktayız.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">7. Haklarınız</h2>
            <p className="mt-2">
              Verilerinize erişim, düzeltme, silme ve işlemeye itiraz etme haklarınız bulunmaktadır.
              Taleplerinizi{' '}
              <a href="mailto:info@webtier.com.tr" className="text-[var(--color-accent)] hover:underline">
                info@webtier.com.tr
              </a>{' '}
              adresine iletebilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">8. Politika Güncellemeleri</h2>
            <p className="mt-2">
              Bu politika zaman zaman güncellenebilir. Önemli değişikliklerde sizi bilgilendireceğiz.
              Güncel versiyonu her zaman bu sayfada bulabilirsiniz.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
