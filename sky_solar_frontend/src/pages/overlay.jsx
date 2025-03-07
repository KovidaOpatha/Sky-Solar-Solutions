import React, { useState } from 'react';
import axios from 'axios';

const Overlay = ({ category, branchName, onClose }) => {
  const [products, setProducts] = useState(category.items);

  const handleSave = async () => {
    try {
      await Promise.all(products.map(product => {
        return axios.post(`http://127.0.0.1:8000/stocks/${branchName}`, {
          productId: product._id,
          remainingStock: product.remainingStock
        });
      }));
      console.log(branchName);
      alert('Stock updated successfully');
      onClose();
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('Failed to update stock');
    }
  };

  const handleStockChange = (productId, e) => {
    const newProducts = products.map(product => {
      if (product._id === productId) {
        return { ...product, remainingStock: parseInt(e.target.value) };
      }
      return product;
    });
    setProducts(newProducts);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-3xl h-5/6 overflow-hidden">
        <h2 className="text-2xl font-bold mb-4">Manage Stock</h2>
        <div className="w-full p-2 rounded-md shadow-sm border-4 border-orange-500 mb-4 h-5/6 overflow-y-auto">
          <h3 className="text-lg font-bold text-orange-500 text-center mb-2">{category.category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map(product => (
              <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-black">
                <div className="flex justify-between items-center p-4">
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={product.remainingStock}
                      onChange={(e) => handleStockChange(product._id, e)}
                      className="border border-black px-2 py-1 w-24 sm:w-32 h-10 flex items-center justify-center rounded-md"
                      max="9999" // Added max attribute for 4-digit limit
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
            Close
          </button>
          <button onClick={handleSave} className="bg-orange-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
