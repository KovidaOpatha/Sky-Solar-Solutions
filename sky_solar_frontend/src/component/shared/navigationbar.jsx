import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav className="bg-orange-500 text-white p-4 shadow-lg fixed top-0 left-0 w-full z-10 md:h-20">
      <div className="container mx-auto flex justify-between items-center h-full">
        <Link to="/" className="text-2xl font-bold">
          Sky Solar Solutions
        </Link>
        <div className="hidden md:flex space-x-4"> {/* Hide on mobile */}
          <Link to="/stock" className="hover:text-gray-300">Stock</Link>
          <Link to="/about" className="hover:text-gray-300">About</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
