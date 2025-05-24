import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = path === '/login' || path === '/signup';
  
  // Get the token from the cookies
  const authCookie = request.cookies.get('auth');
  const isAuthenticated = !!authCookie && authCookie.value === 'true';
  
  // If the path is not public and the user is not authenticated, redirect to login
  if (!isPublicPath && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // If the path is public and the user is authenticated, redirect to home
  if (isPublicPath && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // Otherwise, continue with the request
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/',
    '/about',
    '/services',
    '/portfolio',
    '/contact',
    '/login',
    '/signup'
  ],
};
