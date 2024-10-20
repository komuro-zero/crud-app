// app/api/hello/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { hashPassword } from '@/utils/hashPassword';
import crypto from 'crypto';
import prisma from '@/utils/db';
import sendEmail from '@/utils/sendEmail';
import { compareAsc } from 'date-fns'; // You can use date-fns for date comparison, or use vanilla JS

export async function POST(request: NextRequest) {
  const data = await request.json();
  const username = data?.username;
  const password = data?.password;
  const hashedPassword = await hashPassword(password);
  const verificationToken = crypto.randomBytes(20).toString('hex');
  const verifyToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');
  const tokenTTL = new Date(Date.now() + 30 * 60 * 1000);

  if (!password || !username) {
    return NextResponse.json({
      message: 'Signup Failed. Invalid Username or Password',
      success: false,
    });
  } else {
    try {
      // Check if a user with the same email already exists
      const existingUser = await prisma.user.findUnique({
        where: {
          email: username,
        },
      });

      let newUser = { email: '', id: 0 };

      // If a user exists with the same email
      if (existingUser) {
        // Check if the user is not verified and TokenTTL has expired
        const now = new Date();

        if (
          existingUser.verified === false &&
          compareAsc(new Date(existingUser.TokenTTL), now) < 0
        ) {
          // If verified is false and TokenTTL is expired, update the existing user
          console.log(
            `Updating existing user with new credentials because previous token expired`
          );

          newUser = await prisma.user.update({
            where: {
              email: username,
            },
            data: {
              password: hashedPassword,
              verifyToken: verifyToken,
              TokenTTL: tokenTTL,
            },
          });
        } else if (existingUser.verified === true) {
          // User exists and is either verified or TokenTTL is still valid
          return NextResponse.json(
            { message: 'User already exists' },
            { status: 409 }
          );
        } else {
          return NextResponse.json(
            { message: 'User not verified.' },
            { status: 409 }
          );
        }
      } else {
        // No existing user, so create a new user
        console.log(`Creating new user`);
        newUser = await prisma.user.create({
          data: {
            email: username,
            password: hashedPassword,
            verifyToken: verifyToken,
            TokenTTL: tokenTTL,
          },
        });
      }

      console.log(`creating verification link`);
      const verificationLink = `${process.env.BASE_URL}/verify_email?verification_token=${verifyToken}&userId=${newUser.id}`;
      console.log(`verification link created : ${verificationLink}`);
      await sendEmail(
        newUser?.email,
        'Email Verification for Dakoku',
        `Please click on the link to verify your email : ${verificationLink}`
      );
      console.log(`mail sent `);
      return NextResponse.json({
        message: 'User created successfully',
        success: true,
        user: newUser,
      });
    } catch (error) {
      console.error('Error creating user:', error);
      return NextResponse.json({
        message: 'Error creating user',
        success: false,
      });
    }
  }
}
