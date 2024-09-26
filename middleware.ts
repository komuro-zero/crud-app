import { NextRequest, NextResponse } from 'next/server';
import { cookies } from "next/headers";

export default function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const protectedRoutes = ["/"];
    const sessionCookie = cookies().get('session')?.value;
    const httpsRedirectUrl = `http://localhost:3000/login`;
    console.log(`inside middleware. session : ${sessionCookie}, ${path}`)
    
    if (protectedRoutes.includes(path)){
        if (!sessionCookie) {
            console.log("no session and no login")
            return NextResponse.redirect(httpsRedirectUrl);
        }
        // If a session cookie is found, check for validity
        try {
            if (sessionCookie){
                console.log("found cookie")
                const sessionData = JSON.parse(sessionCookie); // Assuming the session cookie is JSON
                
                // Check if the session has expired
                if (new Date(sessionData.expires) < new Date()) {
                    console.log("expired redirecting")
                    return NextResponse.redirect(httpsRedirectUrl);
                }
            } else{
                console.log("undefined cookie")
                return NextResponse.redirect(httpsRedirectUrl)
            }
        } catch (error) {
            // If there's an error parsing the cookie, redirect to login
            return NextResponse.redirect(httpsRedirectUrl);
        }
    }
    // If no session cookie is found, or the route is protected, redirect to login
    
    // If session is valid, proceed
    return NextResponse.next();
}