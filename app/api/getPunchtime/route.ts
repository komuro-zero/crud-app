import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/db'; // Import the Prisma client
import { comparePassword } from '@/utils/hashPassword';
import { decrypt } from '@/lib/jwt';

export async function POST() {
  const sessionToken = cookies().get('session')?.value;
  console.log(`${sessionToken}`);
  if (sessionToken) {
    try {
      const tokenData = await decrypt(sessionToken);
      const currentUser = tokenData?.user;
      console.log(`current user : ${tokenData}, ${tokenData?.expires}`);
      // Find the user in the database
      const user = await prisma.user.findUnique({
        where: {
          email: currentUser, // Assuming email is used as the username
        },
      });

      const punchTimeArray = await prisma.punchTime.findMany({
        where: {
          userId: user?.id,
        },
      });
      console.log(`got punch time ${punchTimeArray}`);

      return NextResponse.json(
        {
          message: 'get punctime successful',
          success: true,
          data: punchTimeArray,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error during gettng time:', error);
      return NextResponse.json(
        { message: 'Internal server error', success: false },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      {
        message: 'No session Token error',
        success: false,
      },
      { status: 500 }
    );
  }
}
