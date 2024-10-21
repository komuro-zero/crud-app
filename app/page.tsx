'use client';
import { Mali } from 'next/font/google';
import Head from 'next/head';
import { BiSolidUserPlus } from 'react-icons/bi';
import Table from '@/components/timeTable';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [punchTime, setPunchTime] = useState([]);

  const goToPunch = async () => {
    router.push('/punch');
  };
  let data = [];
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/getPunchtime', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await res.json();
      const result = json?.message;
      console.log(`${json.data}`);

      if (result === 'success') {
        setPunchTime(json.data);
        alert('User successfully verified! Redirecting to Login Page');
      } else {
        alert(`Error verifying : ${result}`);
      }
    };
    fetchData();
  }, []);
  return (
    <section>
      <main className="py-5">
        <h1 className="text-xl md:text-5xl text-center font-bold py-10">
          Dakoku Records
        </h1>
        <div className="container mx-auto flex justify-between py-5 border-b">
          <div className="left flex gap-3">
            <Link href="/punch">
              <button className="flex bg-inidgo-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-gray-800">
                Punch In{' '}
                <span>
                  <BiSolidUserPlus size={23}></BiSolidUserPlus>
                </span>
              </button>
            </Link>
          </div>
          {/* collapable form */}
        </div>
        {/* table */}
        <div className="container mx-auto">
          <Table timeArray={punchTime}></Table>
        </div>
      </main>
    </section>
  );
}
