import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow unauthenticated access to public resources
  // This ensures Google Search Console and other crawlers can access sitemap.xml
  const publicPaths = [
    '/sitemap.xml',
    '/robots.txt',
    '/favicon.ico',
  ];

  if (publicPaths.some(path => pathname === path)) {
    return NextResponse.next();
  }

  // Allow all other requests to proceed
  // Add your authentication logic here if needed for protected routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
