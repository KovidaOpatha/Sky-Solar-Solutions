import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const StockPage = () => {
  const { categoryId } = useParams();
  const [showOverlay, setShowOverlay] = useState(false);

  const categories = [
    {
      id: 1,
      name: 'SOLAR PANELS',
      products: [
        { id: 1, name: 'JINKO 560W', stock: 100 },
        { id: 2, name: 'JINKO 590W', stock: 200 },
        { id: 3, name: 'JA 560W', stock: 150 },
        { id: 4, name: 'JA 560W', stock: 120 },
      ]
    },
    {
      id: 2,
      name: 'INVERTERS',
      products: [
        { id: 1, name: 'Product 3', stock: 70 },
        { id: 2, name: 'Product 4', stock: 90 },
        { id: 3, name: 'Product 4', stock: 95 },
        { id: 4, name: 'JINKO 560W', stock: 110 },
      ]
    },
    {
      id: 3,
      name: 'ALUMINIUM',
      products: [
        { id: 1, name: 'Product 3', stock: 75 },
        { id: 2, name: 'Product 4', stock: 85 },
        { id: 3, name: 'Product 4', stock: 95 },
        { id: 4, name: 'JINKO 560W', stock: 130 },
      ]
    },
    {
      id: 4,
      name: 'PVC',
      products: [
        { id: 1, name: 'Product 1', stock: 50 },
        { id: 2, name: 'Product 2', stock: 60 }
      ]
    },
    // Add more categories as needed
  ];

  const category = categories.find(category => category.id === parseInt(categoryId));

  if (!category) {
    return <div>Category not found</div>;
  }

  const handleManageStockClick = () => {
    setShowOverlay(true);
  };

  const handleSave = () => {
    // Handle save logic here
    setShowOverlay(false);
  };

  return (
    <div className="flex flex-col justify-center items-center px-4 py-8">
      <div className="mb-4 flex justify-end w-full">
        <button onClick={handleManageStockClick} className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Manage Stock
        </button>
      </div>
      {showOverlay && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">Manage Stock</h2>
            <div className="w-full p-2 rounded-md shadow-sm border-4 border-orange-500 mb-4">
              <h3 className="text-lg font-bold text-orange-500 text-center mb-2">{category.name}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {category.products.map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-black">
                    <div className="flex justify-between items-center p-4">
                      <div className="flex-grow">
                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="number"
                          defaultValue={product.stock}
                          className="border border-black px-2 py-1 w-32 h-10 flex items-center justify-center rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button onClick={() => setShowOverlay(false)} className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                Close
              </button>
              <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-full p-2 rounded-md shadow-sm border-4 border-orange-500 mb-4">
        <h3 className="text-lg font-bold text-orange-500 text-center mb-2">{category.name}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {category.products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-black">
              <div className="flex justify-between items-center p-4">
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                </div>
                <div className="flex items-center">
                  <div className="border border-black px-2 py-1 w-16 h-10 flex items-center justify-center rounded-md">
                    <span className="text-gray-800 font-bold text-xl">{product.stock}</span>
                  </div>
                  {/* Removed the settings button here */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockPage;
