import React from 'react';
import { Link } from 'react-router-dom';

const SignInSignUpPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome</h1>
        <div className="mb-4">
          <Link to="/sign-in" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
            Sign In
          </Link>
          <Link to="/sign-up" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUpPage;
