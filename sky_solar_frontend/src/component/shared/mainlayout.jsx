import React from 'react';
import NavigationBar from './navigationbar';
import Sidebar from './sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      <NavigationBar />
      <div className="flex">
        <Sidebar />
        <main className="ml-64 mt-16 p-8 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
