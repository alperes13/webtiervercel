'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

/**
 * A client-side wrapper for the Footer that hides it on the home page.
 * This allows the home page to render its own Footer inside its custom 
 * SharedBackgroundWrapper for a seamless mesh-gradient background experience.
 */
export default function DynamicFooter() {
  const pathname = usePathname();
  
  // Hide global footer on Home page only
  if (pathname === '/' || pathname === '/tr' || pathname === '/en') {
    return null;
  }
  
  return <Footer />;
}
