import React, { useState } from 'react';

const ReserveOverlay = ({ categories, onClose, onReserve }) => {
  const [selectedProducts, setSelectedProducts] = useState(categories.map(category => ({
    categoryId: category._id, // Use _id instead of id
    products: [{ productId: category.items[0]?._id || null, quantity: 0 }], // Use items instead of products
  })));

  const handleProductChange = (categoryId, productId, quantity, index) => {
    setSelectedProducts(prevSelected => prevSelected.map(category =>
      category.categoryId === categoryId
        ? {
          ...category,
          products: category.products.map((product, i) =>
            i === index ? { productId, quantity } : product
          ),
        }
        : category
    ));
  };

  const addProductInput = (categoryId) => {
    setSelectedProducts(prevSelected => prevSelected.map(category =>
      category.categoryId === categoryId
        ? {
          ...category,
          products: [...category.products, { productId: (category.items && category.items.length > 0) ? category.items[0]._id : null, quantity: 0 }],
        }
        : category
    ));
  };


  const handleReserve = () => {
    const reservation = selectedProducts.flatMap(category =>
      category.products.map(product => ({
        categoryId: category.categoryId,
        productId: product.productId,
        quantity: product.quantity,
      }))
    );
    onReserve(reservation);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">Reserve Stock</h2>
        {categories.map((category, catIndex) => (
          <div key={category._id} className="mb-4"> {/* Use _id instead of id */}
            <h3 className="text-lg font-semibold mb-2">{category.category}</h3> {/* Use category instead of name */}
            {selectedProducts[catIndex].products.map((product, index) => (
              <div key={index} className="flex items-center mb-2">
                <span className="flex-grow">{`Product ${index + 1}`}</span>
                <select
                  value={product.productId || ''}
                  className="mr-2 p-2 border rounded-md"
                  onChange={(e) =>
                    handleProductChange(category._id, e.target.value, product.quantity, index) // Use _id instead of id
                  }
                >
                  {category.items.map(p => ( // Use items instead of products
                    <option key={p._id} value={p._id}> {/* Use _id instead of id */}
                      {p.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min="0"
                  placeholder="Quantity"
                  value={product.quantity}
                  className="w-20 p-2 border rounded-md"
                  onChange={(e) =>
                    handleProductChange(category._id, product.productId, parseInt(e.target.value, 10), index) // Use _id instead of id
                  }
                />
              </div>
            ))}
            <button
              onClick={() => addProductInput(category._id)} // Use _id instead of id
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Product
            </button>
          </div>
        ))}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Close
          </button>
          <button
            onClick={handleReserve}
            className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReserveOverlay;
