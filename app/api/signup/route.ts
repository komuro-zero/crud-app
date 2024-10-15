// app/api/hello/route.ts
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { encrypt } from '@/lib/jwt'; // Import the shared encrypt function
import { hashPassword } from '@/utils/hashPassword';
import crypto from 'crypto';
import prisma from '@/utils/db';
import sendEmail from '@/utils/sendEmail';

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
    return NextResponse.json({ message: 'Login Failed' });
  } else {
    try {
      // Create a new user in the database
      console.log(`creating new user`);
      const newUser = await prisma.user.create({
        data: {
          email: username,
          password: hashedPassword,
          verifyToken: verifyToken,
          TokenTTL: tokenTTL,
        },
      });

      console.log(`creating verification link`);
      const verificationLink = `${process.env.BASE_URL}/verify_email?verification_token=${verificationToken}&userId=${newUser.id}`;
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
