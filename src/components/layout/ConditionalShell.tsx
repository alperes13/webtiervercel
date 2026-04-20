'use client';

import { usePathname } from 'next/navigation';
import DynamicNavbar from './DynamicNavbar';
import DynamicFooter from './DynamicFooter';
import MainWrapper from './MainWrapper';

export default function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/adminpanel') || pathname?.startsWith('/maintenance');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <DynamicNavbar />
      <MainWrapper>{children}</MainWrapper>
      <DynamicFooter />
    </>
  );
}
