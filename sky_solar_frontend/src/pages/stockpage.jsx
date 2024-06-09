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
    <div className="flex flex-wrap justify-center p-8">
      {categories.map(category => (
        <div
          key={category.id}
          className="w-40 h-40 flex items-center justify-center m-4 bg-orange-500 text-white text-xl font-bold cursor-pointer rounded-md shadow-lg hover:bg-orange-700"
          onClick={() => handleCategoryClick(category.id)}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default StockPage;
