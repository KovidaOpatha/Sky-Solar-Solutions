import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../src/assets/skysolarlogo.jpg'

const NavigationBar = () => {
  return (
    <nav className="bg-orange-500 text-white p-4 shadow-lg fixed top-0 left-0 w-full z-10 md:h-20">
      <div className="container mx-auto flex justify-between items-center h-full">
        <Link to="/" className="text-2xl font-bold">
          <img src={logo} alt="logo" className='w-24 h-auto' />
        </Link>
        <div className=" md:flex space-x-4"> {/* Hide on mobile */}
          <Link to="/stock" className="hover:text-gray-300">Stock</Link>
          <Link to="/about" className="hover:text-gray-300">About</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
