import type { Metadata } from 'next';
import EcommerceContent from './EcommerceContent';

export const metadata: Metadata = {
  title: 'E-Ticaret Çözümleri',
  description: 'Dönüşüm odaklı e-ticaret web sitesi tasarımı ve CRO optimizasyonu. Satış üreten e-ticaret altyapısı kurun.',
  keywords: [
    'e-ticaret web tasarım',
    'e-ticaret sitesi kurma',
    'dönüşüm odaklı e-ticaret',
    'b2b e-ticaret',
    'b2c e-ticaret',
    'e-ticaret optimizasyonu',
    'CRO e-ticaret',
  ],
  openGraph: {
    title: 'E-Ticaret Çözümleri | Webtier',
    description: 'Dönüşüm odaklı e-ticaret web sitesi tasarımı ve CRO optimizasyonu. Satış üreten e-ticaret altyapısı kurun.',
    type: 'website',
  },
};

export default function EcommercePage() {
  return <EcommerceContent />;
}
