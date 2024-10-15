import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt'; // Ensure bcrypt is installed and used for password comparison
import prisma from '@/utils/db'; // Import the Prisma client
import { comparePassword } from '@/utils/hashPassword';
import { encrypt } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  const data = await request.json();
  const username = data?.username;
  const password = data?.password;

  if (!username || !password) {
    return NextResponse.json({
      message: 'Missing username or password',
      success: false,
    });
  }

  try {
    // Find the user in the database
    const user = await prisma.user.findUnique({
      where: {
        email: username, // Assuming email is used as the username
      },
    });

    // If the user is not found, return an error
    if (!user) {
      return NextResponse.json(
        { message: 'User not found', success: false },
        { status: 404 }
      );
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await comparePassword(password, user.password);

    // If the password is incorrect, return an error
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid credentials', success: false },
        { status: 401 }
      );
    }

    // Create a JWT token for the session
    const expires = new Date(Date.now() + 30 * 60 * 1000); // Session expires in 30 minute
    const session = await encrypt({ expires: expires, user: user.email });

    // Set the session cookie
    cookies().set('session', session, { expires, httpOnly: true });

    // Return a success response
    return NextResponse.json(
      { message: 'Login successful', success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { message: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}
