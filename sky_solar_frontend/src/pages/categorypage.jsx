import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReserveOverlay from './reserveoverlay';

const CategoryPage = () => {
  const categories = [
    { id: 1, name: 'SOLAR PANELS', products: [{ id: 1, name: 'JINKO 560W' }, { id: 2, name: 'JINKO 590W' }] },
    { id: 2, name: 'INVERTERS', products: [{ id: 3, name: 'INVERTER 1' }, { id: 4, name: 'INVERTER 2' }] },
    { id: 3, name: 'ALUMINIUM', products: [{ id: 5, name: 'ALUMINIUM 1' }, { id: 6, name: 'ALUMINIUM 2' }] },
    { id: 4, name: 'PVC', products: [{ id: 7, name: 'PVC 1' }, { id: 8, name: 'PVC 2' }] },
    // Add more categories as needed
  ];

  const navigate = useNavigate();
  const [showReserveOverlay, setShowReserveOverlay] = useState(false);

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  const handleReserveClick = () => {
    setShowReserveOverlay(true);
  };

  const handleReserve = (selectedProducts) => {
    // Handle reservation logic here
    console.log('Reserved products:', selectedProducts);
    setShowReserveOverlay(false);
  };

  return (
    <div className="flex-grow flex flex-col justify-center items-center bg-white p-8 overflow-hidden">
      <h1 className="text-4xl font-bold text-orange-600 mb-8">Product Categories</h1>
      <button
        onClick={handleReserveClick}
        className="mb-8 bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Reserve Stock
      </button>
      <div className="flex flex-wrap justify-center overflow-hidden">
        {categories.map(category => (
          <div
            key={category.id}
            className="w-48 h-48 flex items-center justify-center m-4 bg-orange-500 text-white text-2xl font-bold cursor-pointer rounded-md shadow-lg transition-transform transform hover:scale-105 hover:bg-orange-600 active:scale-95"
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </div>
        ))}
      </div>
      {showReserveOverlay && (
        <ReserveOverlay
          categories={categories}
          onClose={() => setShowReserveOverlay(false)}
          onReserve={handleReserve}
        />
      )}
    </div>
  );
};

export default CategoryPage;
