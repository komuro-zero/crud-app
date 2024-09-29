// app/api/hello/route.ts
import { NextRequest, NextResponse } from "next/server";
import { encrypt,decrypt } from '@/lib/jwt';  // Import the shared encrypt function


export async function POST(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;
  
    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 60 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
      name: "session",
      value: await encrypt(parsed),
      httpOnly: true,
      expires: parsed.expires,
    });
    return res;
  }