import type { Metadata } from 'next';
import EcommerceContent from './EcommerceContent';

export const metadata: Metadata = {
  title: 'E-Ticaret Çözümleri',
  description: 'Dönüşüm odaklı e-ticaret web sitesi tasarımı ve CRO optimizasyonu. Satış üreten e-ticaret altyapısı kurun.',
};

export default function EcommercePage() {
  return <EcommerceContent />;
}
