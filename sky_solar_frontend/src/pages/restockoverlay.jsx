import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RestockOverlay = ({ categories, branchName, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [updatedProducts, setUpdatedProducts] = useState(
    categories.reduce((acc, category) => {
      acc[category._id] = category.items.map(product => ({ ...product, newStock: 0 }));
      return acc;
    }, {})
  );

  useEffect(() => {
    setSelectedCategory(categories[0]);
    setUpdatedProducts(
      categories.reduce((acc, category) => {
        acc[category._id] = category.items.map(product => ({ ...product, newStock: 0 }));
        return acc;
      }, {})
    );
  }, [categories]);

  const handleSave = async () => {
    try {
      const updates = [];
      for (const category of categories) {
        const updatedProductsToSend = updatedProducts[category._id].filter(product => product.newStock !== 0);
        updates.push(
          ...updatedProductsToSend.map(product => ({
            productId: product._id,
            remainingStock: product.remainingStock + product.newStock
          }))
        );
      }

      await Promise.all(
        updates.map(update => axios.post(`http://127.0.0.1:8000/stocks/${branchName}`, update))
      );
      // window.location.reload(); // Reload the page to reflect the updated stock
      alert('Stock updated successfully');
      onClose();
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('Failed to update stock');
    }
  };

  const handleCategoryChange = categoryId => {
    const selected = categories.find(category => category._id === categoryId);
    setSelectedCategory(selected);
  };

  const handleStockChange = (productId, e) => {
    const inputValue = e.target.value;
    const newStockValue = inputValue === '' ? 0 : parseInt(inputValue);
    const newProducts = { ...updatedProducts };
    newProducts[selectedCategory._id] = updatedProducts[selectedCategory._id].map(product => {
      if (product._id === productId) {
        return { ...product, newStock: newStockValue };
      }
      return product;
    });
    setUpdatedProducts(newProducts);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">Restock Inventory</h2>
        <div className="w-full p-2 rounded-md shadow-sm border-4 border-orange-500 mb-4">
          <h3 className="text-lg font-bold text-orange-500 text-center mb-2">Select Category</h3>
          <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4">
            {categories.map(category => (
              <button
                key={category._id}
                onClick={() => handleCategoryChange(category._id)}
                className={`px-4 py-2 rounded-md shadow-sm focus:outline-none ${
                  selectedCategory._id === category._id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white'
                } mb-2 sm:mb-0`}
              >
                {category.category}
              </button>
            ))}
          </div>
        </div>
        {selectedCategory && (
          <div className="w-full p-2 rounded-md shadow-sm border-4 border-orange-500 mb-4 overflow-y-auto max-h-80">
            <h3 className="text-lg font-bold text-orange-500 text-center mb-2">{selectedCategory.category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {updatedProducts[selectedCategory._id].map(product => (
                <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-black">
                  <div className="flex justify-between items-center p-4">
                    <div className="flex-grow">
                      <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="number"
                        value={product.newStock}
                        onChange={e => handleStockChange(product._id, e)}
                        className="border border-black px-2 py-1 w-16 h-10 flex items-center justify-center rounded-md mr-2"
                      />
                      <span>{product.remainingStock + product.newStock}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            className="bg-orange-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestockOverlay;
