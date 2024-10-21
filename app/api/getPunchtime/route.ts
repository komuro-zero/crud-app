import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/db'; // Import the Prisma client
import { comparePassword } from '@/utils/hashPassword';
import { decrypt } from '@/lib/jwt';

interface PunchProps {
  timeArray: Date[];
}

const segmentTimes = (punchProps: PunchProps) => {
  return punchProps.map((time) => {
    const year = time.getFullYear().toString();
    const month = (time.getMonth() + 1).toString(); // Months are zero-based, so add 1
    const day = time.getDate().toString();
    const hour = time.getHours();
    const minute = time.getMinutes();

    return {
      year,
      month,
      day,
      hourMinute: `${hour}:${minute.toString().padStart(2, '0')}`, // Ensures two-digit minutes
    };
  });
};

export async function POST() {
  const sessionToken = cookies().get('session')?.value;
  console.log(`${sessionToken}`);
  if (sessionToken) {
    try {
      const tokenData = await decrypt(sessionToken);
      const currentUser = tokenData?.user;
      console.log(`current user : ${tokenData?.user}, ${tokenData?.expires}`);
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
      const punchTimes = punchTimeArray
        .map((element) => element?.punchTime)
        .sort((a, b) => b - a);
      console.log(`in punctime ${punchTimes}`);
      const segmentedTimes = segmentTimes(punchTimes);

      return NextResponse.json(
        {
          message: 'success',
          success: true,
          data: segmentedTimes,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error during gettng time:', error);
      return NextResponse.json(
        { message: 'Internal server error', success: false, data: [] },
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
