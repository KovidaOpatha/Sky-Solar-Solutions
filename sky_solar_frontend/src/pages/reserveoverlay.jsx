import React, { useState } from 'react';
import axios from 'axios';
import { FiTrash2 } from 'react-icons/fi';

const ReserveOverlay = ({ categories, branchName, onClose }) => {
  const [selectedProducts, setSelectedProducts] = useState({});

  const handleProductChange = (categoryId, productId, quantity) => {
    const product = categories.find(category => category._id === categoryId)?.items.find(item => item._id === productId);
    if (!product) return;

    if (quantity >= 0 && quantity <= product.remainingStock) {
      setSelectedProducts(prevSelected => ({
        ...prevSelected,
        [categoryId]: {
          ...prevSelected[categoryId],
          [productId]: quantity,
        },
      }));
    } else if (quantity < 0) {
      setSelectedProducts(prevSelected => ({
        ...prevSelected,
        [categoryId]: {
          ...prevSelected[categoryId],
          [productId]: 0,
        },
      }));
    } else {
      setSelectedProducts(prevSelected => ({
        ...prevSelected,
        [categoryId]: {
          ...prevSelected[categoryId],
          [productId]: Math.min(product.remainingStock, quantity),
        },
      }));
    }
  };

  const removeProduct = (categoryId, productId) => {
    setSelectedProducts(prevSelected => {
      const updatedCategorySelection = { ...prevSelected[categoryId] };
      delete updatedCategorySelection[productId];
      return {
        ...prevSelected,
        [categoryId]: updatedCategorySelection,
      };
    });
  };

  const handleReserve = async () => {
    try {
      const updates = [];
      for (const categoryId in selectedProducts) {
        for (const productId in selectedProducts[categoryId]) {
          const quantity = selectedProducts[categoryId][productId];
          if (quantity > 0) {
            updates.push({
              productId,
              remainingStock: categories
                .find(category => category._id === categoryId)
                .items.find(product => product._id === productId).remainingStock - quantity,
            });
          }
        }
      }
  
      await Promise.all(
        updates.map(update => axios.post(`https://sky-solar-solutions-back-end-production.up.railway.app/stocks/${branchName}`, update))
      );
      alert('Stock reserved successfully');
      onClose();
    } catch (error) {
      console.error('Error reserving stock:', error);
      alert('Failed to reserve stock');
    }
  };
  
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg w-11/12 max-w-3xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Reserve Stock</h2>
        {categories.map(category => (
          <div key={category._id} className="mb-4">
            <h3 className="text-lg font-bold text-orange-500 mb-2">{category.category}</h3>
            <div className="border border-gray-300 rounded-md p-2">
              <select
                className="w-full p-2 border rounded-md mb-2"
                onChange={(e) => {
                  const productId = e.target.value;
                  const categoryId = category._id;
                  const currentCategorySelection = selectedProducts[categoryId] || {};
                  const currentQuantity = currentCategorySelection[productId] || 0;
                  const newQuantity = currentQuantity + 1; // Increase quantity by 1
                  handleProductChange(categoryId, productId, newQuantity);
                }}
              >
                <option value="">Select Product</option>
                {category.items
                  .filter(product => product.remainingStock > 0)
                  .map(product => (
                    <option key={product._id} value={product._id} disabled={selectedProducts[category._id]?.[product._id]}>
                      {product.name}
                    </option>
                  ))}
              </select>
              {selectedProducts[category._id] && category.items.map(product => {
                if (selectedProducts[category._id][product._id]) {
                  const quantity = selectedProducts[category._id][product._id];
                  return (
                    <div key={product._id} className="flex items-center mb-2 border-t border-gray-300 pt-2">
                      <span className="mr-2">{product.name}</span>
                      <span className="mr-2">(Available: {product.remainingStock})</span>
                      <div className="flex items-center ml-auto">
                        <input
                          type="number"
                          min="0"
                          value={quantity}
                          onChange={(e) => handleProductChange(category._id, product._id, parseInt(e.target.value, 10))}
                          onClick={(e) => e.target.select()} // Selects the existing value on click
                          className="w-20 p-2 border rounded-md mr-2 text-right"
                        />
                        <FiTrash2
                          className="text-red-500 cursor-pointer"
                          onClick={() => removeProduct(category._id, product._id)}
                        />
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </div>
        ))}
        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Close
          </button>
          <div className="w-4" /> {/* Spacer */}
          <button
            onClick={handleReserve}
            className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReserveOverlay;
