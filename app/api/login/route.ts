// app/api/hello/route.ts
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { encrypt } from '@/lib/jwt';  // Import the shared encrypt function


export async function POST(request: NextRequest) {
    const data = await request.json();
    const username = data?.username;
    const password = data?.password;
    if (password === "fail" || password === "false"){
        return NextResponse.json({message: "Login Failed"})
    } else if (password === "error"){
        return NextResponse.error() 
    } else {
        const expires = new Date(Date.now() + 60 * 1000);
        const user = {"username": username}
        const session = await encrypt({user,expires})
        cookies().set("session", session, { expires, httpOnly: true });

        return NextResponse.json({ message: 'Login Success' });

    }
}   