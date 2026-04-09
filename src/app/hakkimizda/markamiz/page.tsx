import type { Metadata } from 'next';
import BrandContent from './BrandContent';

export const metadata: Metadata = {
  title: 'Markamız | Webtier',
  description: 'Webtier\'ın hikayesi, misyonu, vizyonu ve değerleri. Türkiye\'nin CRO odaklı web ajansı hakkında her şey.',
};

export default function BrandPage() {
  return <BrandContent />;
}
