'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerifyEmail({ result }: { result: string }) {
  const searchParams = useSearchParams();
  const verificationToken = searchParams.get('verification_token');
  const userId = searchParams.get('userId');
  const router = useRouter();

  console.log(`initial function : ${verificationToken}, ${userId}`);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/verifySignin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          verificationToken: verificationToken,
          userId: userId,
        }),
      });
      const json = await res.json();
      const result = json?.message;

      if (result === 'success') {
        alert('User successfully verified! Redirecting to Login Page');
        router.push('/login');
      } else {
        alert(`Error verifying : ${result}`);
        router.push('/signup');
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Checking Verification...</h1>
    </div>
  );
}
