import React from 'react'

export default function Registerpage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <h1 className="mb-8 text-2xl font-bold text-black">REGISTER</h1>
      <input
        type="text"
        className="mb-4 w-80 border border-orange-400 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        placeholder="First name"
      />
      <input
        type="text"
        className="mb-4 w-80 border border-orange-400 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        placeholder="Last name"
      />
      <input
        type="text"
        className="mb-4 w-80 border border-orange-400 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        placeholder="Email"
      />
      <input
        type="password"
        className="w-80 border border-orange-400 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        placeholder="Password"
      />
      <button
        className="mt-6 bg-orange-400 text-white p-2 rounded-md shadow-sm hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        Register
      </button>
      <div className="mt-4 flex items-center">
        <span className="mr-2">If you already have an account</span>
        <button
          className="text-orange-400 font-bold focus:outline-none"
        >
          Sign in
        </button>
      </div>
    </div>
  )
}