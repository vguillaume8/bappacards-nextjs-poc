import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_PREFIXES = [
  '/dashboard',
  '/contacts',
  '/analytics',
  '/my-subscription',
  '/group/',
  '/admin/',
  '/staff/',
  '/affiliate',
];

function isProtected(pathname: string): boolean {
  return PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function hasAuthCookie(request: NextRequest): boolean {
  return request.cookies.has('auth-token');
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtected(pathname)) {
    return NextResponse.next();
  }

  if (!hasAuthCookie(request)) {
    const loginUrl = new URL('/log-in', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/contacts/:path*',
    '/analytics/:path*',
    '/my-subscription/:path*',
    '/group/:path*',
    '/admin/:path*',
    '/staff/:path*',
    '/affiliate/:path*',
  ],
};
