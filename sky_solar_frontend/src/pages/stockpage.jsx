import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Overlay from './overlay'; // Import the Overlay component
import { useUser } from '@clerk/clerk-react';

const StockPage = () => {
  const {user} = useUser();
  const { categoryId, branchName } = useParams(); // Fetch categoryId and branchName from URL
  const [category, setCategory] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/stocks/${branchName}`);
        const foundCategory = response.data[0]?.categories.find(cat => cat._id === categoryId);
        setCategory(foundCategory);
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    fetchCategory();
  }, [categoryId, branchName]); // Add branchName to dependency array

  const handleManageStockClick = () => {
    setShowOverlay(true);
  };

  const handleSave = async () => {
    // Handle save logic here
    // window.location.reload(); // Reload the page to reflect the updated stock
    setShowOverlay(false);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/stocks/${branchName}`);
      const foundCategory = response.data[0]?.categories.find(cat => cat._id === categoryId);
      setCategory(foundCategory);
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  if (!category) {
    return <div>Loading...</div>;
  }

  if (user?.publicMetadata?.role !== 'admin') {
    console.log("not admin");
    return (
      <div className="flex flex-col justify-center items-center px-4 py-8">

      {showOverlay && (
        <Overlay
          category={category}
          branchName = {branchName}
          // onClose={() => setShowOverlay(false)}
          onClose={handleSave}
        />
      )}
      <div className="w-full p-2 rounded-md shadow-sm border-4 border-orange-500 mb-4">
        <h3 className="text-lg font-bold text-orange-500 text-center mb-2">{category.category}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {category.items.map(product => (
            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-black">
              <div className="flex justify-between items-center p-4">
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                </div>
                <div className="flex items-center">
                  <div className="border border-black px-2 py-1 w-16 h-10 flex items-center justify-center rounded-md">
                    <span className="text-gray-800 font-bold text-xl">{product.remainingStock}</span>
                  </div>
                  {/* Removed the settings button here */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    )};

  return (
    <div className="flex flex-col justify-center items-center px-4 py-8">
      <div className="mb-4 flex justify-end w-full">
        <button
          onClick={handleManageStockClick}
          className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Manage Stock
        </button>
      </div>
      {showOverlay && (
        <Overlay
          category={category}
          branchName={branchName}
          onClose={handleSave}
        />
      )}
      <div className="w-full p-2 rounded-md shadow-sm border-4 border-orange-500 mb-4">
        <h3 className="text-lg font-bold text-orange-500 text-center mb-2">{category.category}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {category.items.map(product => (
            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-black">
              <div className="flex justify-between items-center p-4">
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                </div>
                <div className="flex items-center">
                  <div className="border border-black px-2 py-1 w-16 h-10 flex items-center justify-center rounded-md">
                    <span className="text-gray-800 font-bold text-xl">{product.remainingStock}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockPage;
