// app/api/hello/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/db';
import { compareAsc } from 'date-fns'; // You can use date-fns for date comparison, or use vanilla JS

export async function POST(request: NextRequest) {
  const data = await request.json();
  const verificationToken = data?.verificationToken;
  const userId = data?.userId;

  if (!verificationToken || !userId) {
    return NextResponse.json({
      message: 'Verification Failed. Invalid verification Token or user Id',
      status: false,
    });
  } else {
    try {
      // Check if a user with the same email already exists
      const existingUser = await prisma.user.findUnique({
        where: {
          id: Number(userId),
        },
      });
      console.log(
        `verification token : ${existingUser?.verifyToken}, tokenttl : ${existingUser?.TokenTTL}`
      );
      console.log(`sent verification token : ${verificationToken}`);

      // If a user exists with the same email
      if (existingUser) {
        const userVerificationToken = existingUser.verifyToken;

        // Check if the user is not verified and TokenTTL has expired
        const now = new Date();

        if (compareAsc(new Date(existingUser.TokenTTL), now) < 0) {
          // If verified is false and TokenTTL is expired, update the existing user
          console.log(`previous token expired`);
          return NextResponse.json({ message: 'Token expired.', status: 409 });
        } else if (existingUser.verified === true) {
          // User exists and is either verified or TokenTTL is still valid
          return NextResponse.json(
            { message: 'User already verified' },
            { status: 409 }
          );
        } else if (userVerificationToken === verificationToken) {
          await prisma.user.update({
            where: {
              id: Number(userId),
            },
            data: {
              verified: true,
            },
          });
          return NextResponse.json({ message: 'success', status: 200 });
        } else {
          return NextResponse.json({
            message: 'verification Token not verified',
            status: 401,
          });
        }
      } else {
        // No existing user,
        console.log(`user does not exits`);
        return NextResponse.json({
          message: 'User does not exist for particular userId',
          status: 409,
        });
      }
    } catch (error) {
      console.error('Error creating user:', error);
      return NextResponse.json({
        message: 'Error creating user',
        status: 500,
      });
    }
  }
}
