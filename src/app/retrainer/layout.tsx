import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Retrainer (Sürekli CRO)',
  description: 'Aylık CRO (Dönüşüm Oranı Optimizasyonu) hizmeti ile web sitenizin performansını sürekli artırın ve satışlarınızı maksimize edin.',
  keywords: [
    'retrainer',
    'cro hizmeti',
    'sürekli optimizasyon',
    'dönüşüm oranı optimizasyonu',
    'aylık cro',
    'web site performansı',
    'a/b testi',
    'kullanıcı deneyimi optimizasyonu',
  ],
  openGraph: {
    title: 'Retrainer (Sürekli CRO) | Webtier',
    description: 'Aylık CRO (Dönüşüm Oranı Optimizasyonu) hizmeti ile web sitenizin performansını sürekli artırın ve satışlarınızı maksimize edin.',
    type: 'website',
  },
};

export default function RetrainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
