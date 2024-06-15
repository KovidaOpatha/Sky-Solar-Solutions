import React from 'react';
import { Link } from 'react-router-dom';
import logo from '/src/assets/skysolarlogo.png';

const SignInSignUpPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-orange-400 to-orange-600">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg">
        <img src={logo} alt="SkySolar Logo" className="mx-auto mb-6 w-48 h-48 object-contain" />
        <p className="text-lg mb-8 text-gray-600">Please sign in or sign up to continue</p>
        <div className="mb-4 flex justify-center space-x-4">
          <Link to="/sign-in" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300 transform hover:scale-105">
            Sign In
          </Link>
          <Link to="/sign-up" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300 transform hover:scale-105">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUpPage;
