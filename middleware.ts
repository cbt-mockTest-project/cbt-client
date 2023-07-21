import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  if (
    request.nextUrl.pathname.startsWith('/me') ||
    request.nextUrl.pathname.startsWith('/exam/selectedresult') ||
    request.nextUrl.pathname.startsWith('/exam/write') ||
    request.nextUrl.pathname.startsWith('/data/register')
  ) {
    if (!request.cookies.get('jwt-token')) {
      return NextResponse.redirect(new URL('/mobile/login', request.url));
    }
  }
}
