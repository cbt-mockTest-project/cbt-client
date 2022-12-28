import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  if (request.nextUrl.pathname.startsWith('/me')) {
    if (!request.cookies.get('jwt-token')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}
