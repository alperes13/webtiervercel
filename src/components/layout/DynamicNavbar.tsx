'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function DynamicNavbar() {
  const pathname = usePathname();
  
  // Hide global navbar on dashboard
  if (pathname?.startsWith('/dashboard')) {
    return null;
  }
  
  return <Navbar />;
}
