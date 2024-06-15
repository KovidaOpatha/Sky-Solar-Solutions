import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReserveOverlay from './reserveoverlay';
import RestockOverlay from './restockoverlay';
import AddItemsOverlay from './additems'; // Import the new AddItemsOverlay
import AddCategoryOverlay from './overlay/addcategoryoverlay';
import { useUser } from '@clerk/clerk-react';


const CategoryPage = () => {
  const {user} = useUser();
  const { branchName } = useParams();
  const [categories, setCategories] = useState([]);
  const [showReserveOverlay, setShowReserveOverlay] = useState(false);
  const [showRestockOverlay, setShowRestockOverlay] = useState(false);
  const [showAddItemsOverlay, setShowAddItemsOverlay] = useState(false); // State for Add Items overlay
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
  };

  const handleAddCategoryClick = () => {
    setShowAddCategoryOverlay(true);
  };


  //handle close
  const handleAddItemClose = async () => {
    setShowAddItemsOverlay(false);
    const response = await axios.get(`http://127.0.0.1:8000/stocks/${branchName}`);
    if (response.data && response.data.length > 0) {
        setCategories(response.data[0].categories);
    }
};

const handleAddCategoryClose = async () => {
  setShowAddCategoryOverlay(false);
  const response = await axios.get(`http://127.0.0.1:8000/stocks/${branchName}`);
  if (response.data && response.data.length > 0) {
    setCategories(response.data[0].categories);
  }
};

  if (loading) {
    return <div>Loading...</div>;
  }

  if (categories.length === 0) {
    console.log(categories)
    return <div>No categories found.</div>;
    
  }
  if (user?.publicMetadata?.role !== 'admin') {
    console.log("not admin");
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
      </div>
      <div className="flex justify-center overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-screen-lg p-8">
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
    </div>
    );
  }

  // If the user does not have the admin role, redirect them to the home page
  


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
        <button
          onClick={handleAddCategoryClick}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Category
        </button>
      </div>
      <div className="flex justify-center overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-screen-lg p-8">
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
        <AddItemsOverlay categories={categories} branchName={branchName} onClose={handleAddItemClose} />
      )}
      {showAddCategoryOverlay && (
        <AddCategoryOverlay branchName={branchName} onClose={handleAddCategoryClose}/>
      )}
    </div>
  );
};

export default CategoryPage;
