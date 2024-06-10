import React from 'react';

const Overlay = ({ category, onClose, onSave }) => {
  return (
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
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
            Close
          </button>
          <button onClick={onSave} className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
