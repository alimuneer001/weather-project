import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = path === '/login' || path === '/signup';
  
  // Get the token from the cookies
  const authCookie = request.cookies.get('auth');
  const isAuthenticated = !!authCookie && authCookie.value === 'true';
  
  console.log(`Path: ${path}, isPublicPath: ${isPublicPath}, isAuthenticated: ${isAuthenticated}`);
  
  // If the path is not public and the user is not authenticated, redirect to login
  if (!isPublicPath && !isAuthenticated) {
    console.log('Redirecting to login page');
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // If the path is public and the user is authenticated, redirect to home
  if (isPublicPath && isAuthenticated) {
    console.log('Redirecting to home page');
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // Otherwise, continue with the request
  return NextResponse.next();
}

// Configure which paths the middleware should run on
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
