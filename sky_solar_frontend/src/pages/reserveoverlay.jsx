import React, { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';

const ReserveOverlay = ({ categories, onClose, onReserve }) => {
  const [selectedProducts, setSelectedProducts] = useState({});

  const handleProductChange = (categoryId, productId, quantity) => {
    setSelectedProducts(prevSelected => ({
      ...prevSelected,
      [categoryId]: {
        ...prevSelected[categoryId],
        [productId]: quantity,
      },
    }));
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

  const handleReserve = () => {
    const reservation = Object.keys(selectedProducts).flatMap(categoryId =>
      Object.keys(selectedProducts[categoryId]).map(productId => ({
        categoryId,
        productId,
        quantity: selectedProducts[categoryId][productId],
      }))
    );
    onReserve(reservation);
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
                  if (productId && !currentCategorySelection[productId]) {
                    handleProductChange(categoryId, productId, 1);
                  }
                }}
              >
                <option value="">Select Product</option>
                {category.items.map(product => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </select>
              {selectedProducts[category._id] && Object.keys(selectedProducts[category._id]).map(productId => {
                const quantity = selectedProducts[category._id][productId];
                if (quantity > 0) {
                  return (
                    <div key={productId} className="flex items-center mb-2 border-t border-gray-300 pt-2">
                      <span className="mr-2">{category.items.find(item => item._id === productId).name}</span>
                      <div className="flex items-center ml-auto">
                        <input
                          type="number"
                          min="0"
                          value={quantity}
                          onChange={(e) => handleProductChange(category._id, productId, parseInt(e.target.value, 10))}
                          className="w-20 p-2 border rounded-md mr-2 text-right"
                        />
                        <FiTrash2
                          className="text-red-500 cursor-pointer"
                          onClick={() => removeProduct(category._id, productId)}
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
