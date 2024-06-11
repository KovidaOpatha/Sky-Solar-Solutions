import React, { useState } from 'react';

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
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg w-full md:max-w-3xl">
        <h2 className="text-lg md:text-2xl font-bold mb-4">Reserve Stock</h2>
        {categories.map(category => (
          <div key={category._id} className="mb-4 overflow-y-auto max-h-80">
            <h3 className="text-md md:text-lg font-semibold mb-2">{category.category}</h3>
            <select
              className="w-full md:w-auto mb-2 p-2 border rounded-md"
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
                  <div key={productId} className="flex items-center mb-2">
                    <span className="mr-2">{category.items.find(item => item._id === productId).name}</span>
                    <input
                      type="number"
                      min="0"
                      value={quantity}
                      onChange={(e) => handleProductChange(category._id, productId, parseInt(e.target.value, 10))}
                      className="w-20 p-2 border rounded-md mr-2"
                    />
                    <button
                      onClick={() => removeProduct(category._id, productId)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        ))}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="w-full md:w-auto bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Close
          </button>
          <button
            onClick={handleReserve}
            className="w-full md:w-auto bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReserveOverlay;
