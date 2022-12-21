import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  if (
    request.nextUrl.pathname.startsWith('/me') ||
    (!request.nextUrl.pathname.startsWith('/exam/solution') &&
      request.nextUrl.pathname.startsWith('/exam'))
  ) {
    if (!request.cookies.get('jwt-token')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}
