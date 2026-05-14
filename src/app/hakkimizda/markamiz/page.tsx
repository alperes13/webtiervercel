import type { Metadata } from 'next';
import BrandContent from './BrandContent';

export const metadata: Metadata = {
  title: 'Markamız',
  description: 'Webtier\'ın hikayesi, misyonu, vizyonu ve değerleri. Türkiye\'nin CRO odaklı web ajansı hakkında her şey.',
  keywords: [
    'webtier hakkında',
    'webtier kimdir',
    'cro ajansı',
    'dönüşüm optimizasyonu ajansı',
    'web tasarım ajansı',
    'webtier vizyon',
    'webtier misyon',
  ],
  openGraph: {
    title: 'Markamız | Webtier',
    description: 'Webtier\'ın hikayesi, misyonu, vizyonu ve değerleri. Türkiye\'nin CRO odaklı web ajansı hakkında her şey.',
    type: 'profile',
  },
};

export default function BrandPage() {
  return <BrandContent />;
}
