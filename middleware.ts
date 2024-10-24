import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/jwt'; // Import the shared decrypt function

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (path.startsWith('/_next/') || path.startsWith('/static/')) {
    return NextResponse.next(); // Skip middleware for static files
  }
  const protectedRoutes = ['/', '/punch', '/api/punch'];
  const sessionCookie = cookies().get('session')?.value;
  const httpsRedirectUrl = `http://localhost:3000/login`;
  console.log(`inside middleware. session : ${sessionCookie}, ${path}`);

  // Bypass middleware for static files
  if (protectedRoutes.includes(path)) {
    if (!sessionCookie) {
      console.log('no session cookie');
      return NextResponse.redirect(httpsRedirectUrl);
    }
    // If a session cookie is found, check for validity
    try {
      if (sessionCookie) {
        const decryptedCookie = await decrypt(sessionCookie);
        console.log(decryptedCookie);
        // Check if the session has expired
        if (new Date(decryptedCookie?.expires) < new Date()) {
          console.log('expired redirecting');
          return NextResponse.redirect(httpsRedirectUrl);
        } else {
          console.log('not expired');
          return NextResponse.next();
        }
      } else {
        console.log('undefined cookie');
        return NextResponse.redirect(httpsRedirectUrl);
      }
    } catch (error) {
      // If there's an error parsing the cookie, redirect to login
      console.log(`error with cookie handling : ${error}`);
      return NextResponse.redirect(httpsRedirectUrl);
    }
  }
  // If no session cookie is found, or the route is protected, redirect to login

  console.log('no cookie check');
  // If session is valid, proceed
  return NextResponse.next();
}
