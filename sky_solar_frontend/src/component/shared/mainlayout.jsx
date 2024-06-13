import React from 'react';
import NavigationBar from './navigationbar';

import { Outlet } from 'react-router-dom';

const MainLayout = () => {
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
