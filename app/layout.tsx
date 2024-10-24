'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { IoIosTimer } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const logout = async () => {
    const logoutResponse = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    router.refresh();
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-gray-800">
          <div className="container mx-auto flex justify-between items-center py-5">
            <a href="/">
              <span className="flex items-center space-x-2">
                <span className="text-white">Dakoku App</span>
                <IoIosTimer size={23} color="white" />
              </span>
            </a>
            {loggedIn ? (
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={logout}
              >
                <span className="flex items-center space-x-2">
                  <span>Logout</span>
                </span>
              </button>
            ) : (
              <span></span>
            )}
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
