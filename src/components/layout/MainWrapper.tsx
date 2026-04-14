'use client';

import { usePathname } from 'next/navigation';

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '/tr' || pathname === '/en';

  return (
    <main
      className="relative w-full overflow-x-clip"
      style={isHome ? undefined : { backgroundColor: '#ffffff', color: '#0F172A', colorScheme: 'light' }}
    >
      {children}
    </main>
  );
}
