import React from 'react';
import { useNavigate } from 'react-router-dom';

const StockPage = () => {
  const categories = [
    { id: 1, name: 'SOLAR PANELS' },
    { id: 2, name: 'INVERTERS' },
    { id: 3, name: 'ALUMINIUM' },
    { id: 4, name: 'PVC' },
    // Add more categories as needed
  ];

  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="flex-grow flex flex-col justify-center items-center bg-white p-8 overflow-hidden">
      <h1 className="text-4xl font-bold text-orange-600 mb-8">Product Categories</h1>
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
    </div>
  );
};

export default StockPage;
