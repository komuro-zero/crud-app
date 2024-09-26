// app/api/hello/route.ts
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function POST(request: NextRequest) {
    const data = await request.json();
    const username = data?.username;
    const password = data?.password;
    if (password === "fail" || password === "false"){
        return NextResponse.json({message: "Login Failed"})
    } else if (password === "error"){
        return NextResponse.error() 
    } else {
        const expires = new Date(Date.now() + 10 * 1000);
        const user = {"username": username}
        const session = await encrypt({user,expires})
        cookies().set("session", session, { expires, httpOnly: true });

        return NextResponse.json({ message: 'Login Success' });

    }
}   