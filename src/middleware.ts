import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

const protectedPaths = ['/gaming'];

export default function middleware(req: NextRequest) {
  const token = req.cookies.get('token');
  console.log('token', token);
  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path)) && !token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
  //   else if (token) {
  //     try {
  //       const verified = decodeToken(token.value);
  //       console.log('verified', verified);
  //       if (req.nextUrl.pathname === '/auth/login') {
  //         return NextResponse.redirect(new URL('/gaming', req.url));
  //       }
  //       return NextResponse.next();
  //     } catch (error) {
  //       console.log('error', error);
  //       deleteCookie('token');
  //       return NextResponse.redirect(new URL('/auth/login', req.url));
  //     }
  //   }
  return NextResponse.next();
}
