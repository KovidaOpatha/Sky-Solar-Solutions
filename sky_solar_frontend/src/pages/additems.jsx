import React, { useState } from 'react';
import axios from 'axios';

const AddItemsOverlay = ({ categories, branchName, onClose }) => {
  const [productName, setProductName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]._id);

  const handleAddItem = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/stocks/${branchName}/add-item`, {
        categoryId: selectedCategory,
        productName: productName,
      });
      if (response.status === 201) {
        alert('Item added successfully');
        onClose();
      }
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">Add New Item</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
            Close
          </button>
          <button onClick={handleAddItem} className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItemsOverlay;
