import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../src/assets/skysolarlogo.jpg'

import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const NavigationBar = () => {
  return (
    <nav className="bg-orange-500 text-white p-4 shadow-lg fixed top-0 left-0 w-full z-10 md:h-20">
      <div className="container mx-auto flex justify-between items-center h-full">
        <Link to="/" className="text-2xl font-bold">
          <img src={logo} alt="logo" className='w-24 h-auto' />
        </Link>
        <div className="flex space-x-4 items-center"> {/* Hide on mobile */}
          <div className="flex gap-x-4 items-center">
                <SignedIn>
                    <UserButton afterSignOutUrl="/sign-in"/>
                </SignedIn>
                <SignedOut>
                    <Link to={"/sign-in"}>Sign In</Link>
                    <button asChild>
                        <Link to={"/sign-up"}>Sign Up</Link>
                    </button>
                </SignedOut>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
