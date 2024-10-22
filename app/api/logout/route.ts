import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt'; // Ensure bcrypt is installed and used for password comparison
import prisma from '@/utils/db'; // Import the Prisma client
import { comparePassword } from '@/utils/hashPassword';
import { encrypt } from '@/lib/jwt';

export async function POST() {
  try {
    // Set the session cookie
    cookies().delete('session');
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
