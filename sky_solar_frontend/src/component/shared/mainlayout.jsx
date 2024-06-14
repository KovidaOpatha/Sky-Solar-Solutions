import React from 'react';
import NavigationBar from './navigationbar';
import { useAuth } from '@clerk/clerk-react'; 
import {   Outlet } from 'react-router-dom';
import SignInSignUpPage from '../../pages/starterpage';

const MainLayout = () => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <SignInSignUpPage/>;
  }
  return (
    <div>
      <NavigationBar />
      <div className="flex">
       
        <main className=" mt-16 p-8 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
