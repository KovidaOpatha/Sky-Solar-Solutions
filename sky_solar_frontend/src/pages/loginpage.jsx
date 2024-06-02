import React from 'react';

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <h1 className="mb-8 text-2xl font-bold text-black">LOGIN</h1>
      <input
        type="text"
        className="mb-4 border border-orange-400 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        placeholder="Username"
      />
      <input
        type="password"
        className="border border-orange-400 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        placeholder="Password"
      />
      <button
        className="mt-6 bg-orange-400 text-white p-2 rounded-md shadow-sm hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        Login
      </button>
      <div className="mt-4 flex items-center">
        <span className="mr-2">Don't have an account?</span>
        <button
          className="text-orange-400 font-bold focus:outline-none"
        >
          Register
        </button>
      </div>
    </div>
  );
}