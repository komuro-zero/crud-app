// app/api/hello/route.ts
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    const data = await request.json();
    const username = data?.username;
    const password = data?.password;
    if (password === "fail" || password === "false"){
        return NextResponse.json({message: "Login Failed"})
    } else if (password === "error"){
        return NextResponse.error() 
    } else {
        return NextResponse.json({ message: 'Login Success' });
    }
}   