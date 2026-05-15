import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Never intercept admin panel, API routes, or static files
  if (
    pathname.startsWith('/adminpanel') ||
    pathname.startsWith('/api/') ||
    pathname === '/maintenance' ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  try {
    // Fetch maintenance mode state from an internal API route
    // Cache heavily since middleware runs on every request
    const url = new URL('/api/public/maintenance', request.url);
    const res = await fetch(url, {
      next: { 
        revalidate: 60,
        tags: ['maintenance']
      } 
    });
    
    if (res.ok) {
      const data = await res.json();
      if (data?.maintenance_mode) {
        return NextResponse.redirect(new URL('/maintenance', request.url));
      }
    }
  } catch (error) {
    console.error('Middleware maintenance check failed:', error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
