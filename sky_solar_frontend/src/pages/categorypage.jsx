import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReserveOverlay from './reserveoverlay';
import RestockOverlay from './restockoverlay';
import AddItemsOverlay from './additems'; // Import the new AddItemsOverlay

const CategoryPage = () => {
  const { branchName } = useParams();
  const [categories, setCategories] = useState([]);
  const [showReserveOverlay, setShowReserveOverlay] = useState(false);
  const [showRestockOverlay, setShowRestockOverlay] = useState(false);
  const [showAddItemsOverlay, setShowAddItemsOverlay] = useState(false); // State for Add Items overlay
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/stocks/${branchName}`);
        if (response.data && response.data.length > 0) {
          setCategories(response.data[0].categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [branchName]);

  const handleCategoryClick = (categoryId) => {
    navigate(`/${branchName}/category/${categoryId}`);
  };

  const handleReserveClick = () => {
    setShowReserveOverlay(true);
  };

  const handleRestockClick = () => {
    setShowRestockOverlay(true);
  };

  const handleAddItemsClick = () => {
    setShowAddItemsOverlay(true);
  };

  const handleReserve = (selectedProducts) => {
    console.log('Reserved products:', selectedProducts);
    setShowReserveOverlay(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (categories.length === 0) {
    return <div>No categories found.</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center bg-white p-8 overflow-hidden">
      <h1 className="text-4xl font-bold text-orange-600 mb-8 text-center">Product Categories</h1>
      <div className="flex mb-8">
        <button
          onClick={handleReserveClick}
          className="mr-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Reserve Stock
        </button>
        <button
          onClick={handleRestockClick}
          className="mr-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Restock
        </button>
        <button
          onClick={handleAddItemsClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Items
        </button>
      </div>
      <div className="flex justify-center overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-screen-lg p-4">
          {categories.map((category) => (
            <div
              key={category._id}
              className="w-full h-32 flex items-center justify-center bg-orange-500 text-white text-2xl font-bold cursor-pointer rounded-md shadow-lg transition-transform transform hover:scale-105 hover:bg-green-600 active:scale-95 sm:w-40 md:w-48 md:h-48"
              onClick={() => handleCategoryClick(category._id)}
            >
              {category.category}
            </div>
          ))}
        </div>
      </div>
      {showReserveOverlay && (
        <ReserveOverlay categories={categories} onClose={() => setShowReserveOverlay(false)} onReserve={handleReserve} />
      )}
      {showRestockOverlay && (
        <RestockOverlay categories={categories} branchName={branchName} onClose={() => setShowRestockOverlay(false)} />
      )}
      {showAddItemsOverlay && (
        <AddItemsOverlay categories={categories} branchName={branchName} onClose={() => setShowAddItemsOverlay(false)} />
      )}
    </div>
  );
};

export default CategoryPage;
