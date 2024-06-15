import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RestockOverlay = ({ categories, branchName, onClose }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [updatedProducts, setUpdatedProducts] = useState(
    categories.reduce((acc, category) => {
      acc[category._id] = category.items.map(product => ({ ...product, newStock: 0 }));
      return acc;
    }, {})
  );

  useEffect(() => {
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
      alert('Stock updated successfully');
      onClose();
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('Failed to update stock');
    }
  };

  const handleCategoryChange = (direction) => {
    setSelectedCategoryIndex(prevIndex => {
      if (direction === 'left') {
        return (prevIndex === 0) ? categories.length - 1 : prevIndex - 1;
      } else {
        return (prevIndex === categories.length - 1) ? 0 : prevIndex + 1;
      }
    });
  };

  const handleStockChange = (productId, e) => {
    const inputValue = e.target.value;
    const newStockValue = inputValue === '' ? 0 : parseInt(inputValue);
    const newProducts = { ...updatedProducts };
    newProducts[categories[selectedCategoryIndex]._id] = updatedProducts[categories[selectedCategoryIndex]._id].map(product => {
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
        <div className="w-full p-2 rounded-md shadow-sm border-4 border-orange-500 mb-4 flex items-center justify-between">
          <button onClick={() => handleCategoryChange('left')} className="p-2 rounded-md bg-gray-300 hover:bg-gray-400 focus:outline-none">
            &lt;
          </button>
          <h3 className="text-lg font-bold text-orange-500 text-center mb-2">{categories[selectedCategoryIndex].category}</h3>
          <button onClick={() => handleCategoryChange('right')} className="p-2 rounded-md bg-gray-300 hover:bg-gray-400 focus:outline-none">
            &gt;
          </button>
        </div>
        {categories[selectedCategoryIndex] && (
          <div className="w-full p-2 rounded-md shadow-sm border-4 border-orange-500 mb-4 overflow-y-auto max-h-80">
            <h3 className="text-lg font-bold text-orange-500 text-center mb-2">{categories[selectedCategoryIndex].category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {updatedProducts[categories[selectedCategoryIndex]._id].map(product => (
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
