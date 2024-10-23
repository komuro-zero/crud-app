'use client';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('password and confirmation password does not match!');
    } else {
      const loginResponse = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
      });
      const waitedResponse = await loginResponse?.json();
      const returnedMessage = waitedResponse?.message;

      if (!loginResponse.ok) {
        alert(`Error when signing up : ${returnedMessage}`);
        return;
      }
      if (returnedMessage === 'Login Success') {
        console.log('signup was ok');
        router.push('/');
        console.log('router.push executed');
      } else {
        alert(`Signup failed ${returnedMessage}`);
      }
    }
  };

  const handleUsername = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePassword = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="w-full max-w-xs flex justify-center flex-col m-auto h-screen">
      <form
        className="bg-slate-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-4xl font-bold text-white mb-6">
          Signup
        </h1>
        <div className="mb-4">
          <label className="block text-light-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            onChange={handleUsername}
          ></input>
        </div>
        <div className="mb-6">
          <label className="block text-light-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-slate-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            onChange={handlePassword}
          ></input>
          <p className="text-red-500 text-xs italic">
            Please choose a password.
          </p>
        </div>
        <div className="mb-6">
          <label className="block text-light-700 text-sm font-bold mb-2">
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-slate-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            onChange={handleConfirmPassword}
          ></input>
          <p className="text-red-500 text-xs italic">
            Please confirm your password.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-slate-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Signup
          </button>
        </div>
      </form>
      <div className="justify-content text-center">
        Already have an account?<br></br>
        <a href="/login" className="underline">
          Log In
        </a>
      </div>
    </div>
  );
}
