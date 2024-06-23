import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReserveOverlay from './reserveoverlay';
import RestockOverlay from './restockoverlay';
import AddItemsOverlay from './additems'; // Import the new AddItemsOverlay
import AddCategoryOverlay from './overlay/addcategoryoverlay';
import { useUser } from '@clerk/clerk-react';

const CategoryPage = () => {
  const { user } = useUser(); // Assuming you have a custom hook for user authentication
  const { branchName } = useParams();
  const [categories, setCategories] = useState([]);
  const [showReserveOverlay, setShowReserveOverlay] = useState(false);
  const [showRestockOverlay, setShowRestockOverlay] = useState(false);
  const [showAddItemsOverlay, setShowAddItemsOverlay] = useState(false);
  const [showAddCategoryOverlay, setShowAddCategoryOverlay] = useState(false);
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
    handleClose();
  };

  const handleAddCategoryClick = () => {
    setShowAddCategoryOverlay(true);
  };

  // Handle close
  const handleClose = async () => {
    setShowAddItemsOverlay(false);
    setShowAddCategoryOverlay(false);
    setShowReserveOverlay(false);
    setShowRestockOverlay(false);
    setLoading(true);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (categories.length === 0) {
    console.log(categories);
    return <div>No categories found.</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center bg-white p-8 overflow-hidden">
      <h1 className="text-4xl font-bold text-orange-600 mb-8 text-center">Product Categories {branchName}</h1>
      <div className="flex flex-col space-y-2 mb-8 md:flex-row md:space-y-0 md:space-x-2">
        <div className="flex flex-wrap justify-center md:justify-start">
          <button
            onClick={handleReserveClick}
            className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-2 md:mr-2"
          >
            Reserve Stock
          </button>
          {user?.publicMetadata?.role === 'admin' && (
            <>
              <button
                onClick={handleRestockClick}
                className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-2 md:mr-2"
              >
                Restock
              </button>
              <button
                onClick={handleAddItemsClick}
                className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-2 md:mr-2"
              >
                Add Items
              </button>
              <button
                onClick={handleAddCategoryClick}
                className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-2 md:mr-2"
              >
                Add Category
              </button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-center overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-screen-lg p-8">
          {categories.map((category) => (
            <div
              key={category._id}
              className="w-full h-32 sm:h-40 md:h-48 lg:h-48 flex items-center justify-center bg-orange-500 text-white text-2xl font-bold cursor-pointer rounded-md shadow-lg transition-transform transform hover:scale-105 hover:bg-green-600 active:scale-95"
              onClick={() => handleCategoryClick(category._id)}
            >
              <div className="text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl p-2 leading-tight">
                {category.category}
              </div>
            </div>
          ))}
        </div>
      </div>
      {showReserveOverlay && (
        <ReserveOverlay categories={categories} branchName={branchName} onClose={handleClose} onReserve={handleReserve} />
      )}
      {showRestockOverlay && (
        <RestockOverlay categories={categories} branchName={branchName} onClose={handleClose} />
      )}
      {showAddItemsOverlay && (
        <AddItemsOverlay categories={categories} branchName={branchName} onClose={handleClose} />
      )}
      {showAddCategoryOverlay && (
        <AddCategoryOverlay branchName={branchName} onClose={handleClose} />
      )}
    </div>
  );
};

export default CategoryPage;