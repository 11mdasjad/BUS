import { NextResponse } from 'next/server';

export function middleware() {
  // Allow direct access to all pages without forcing login
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
