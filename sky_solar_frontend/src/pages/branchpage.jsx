import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const BranchPage = () => {
  const categories = [
    {
      id: 1,
      name: 'SOLAR PANELS',
      description: 'Description of Category 1',
      products: [
        {
          id: 1,
          name: 'JINKO 560W',
          description: 'Description of Product 1',
          price: '$10',
          stock: 100
        },
        {
          id: 2,
          name: 'JINKO 590W',
          description: 'Description of Product 2',
          price: '$20',
          stock: 200
        },
        {
          id: 3,
          name: 'JA 560W',
          description: 'Description of Product 1',
          price: '$10',
          stock: 150
        },
        {
          id: 4,
          name: 'JA 560W',
          description: 'Description of Product 1',
          price: '$10',
          stock: 120
        },
      ]
    },
    {
      id: 2,
      name: 'INVERTERS',
      description: 'Description of Category 2',
      products: [
        {
          id: 1,
          name: 'Product 3',
          description: 'Description of Product 3',
          price: '$30',
          stock: 80
        },
        {
          id: 2,
          name: 'Product 4',
          description: 'Description of Product 4',
          price: '$40',
          stock: 90
        },
        {
          id: 3,
          name: 'Product 4',
          description: 'Description of Product 4',
          price: '$40',
          stock: 95
        },
        {
          id: 4,
          name: 'JINKO 560W',
          description: 'Description of Product 1',
          price: '$10',
          stock: 110
        },
      ]
    },
    {
      id: 3,
      name: 'ALUMINIUM',
      description: 'Description of Category 1',
      products: [
        {
          id: 1,
          name: 'Product 3',
          description: 'Description of Product 3',
          price: '$30',
          stock: 75
        },
        {
          id: 2,
          name: 'Product 4',
          description: 'Description of Product 4',
          price: '$40',
          stock: 85
        },
        {
          id: 3,
          name: 'Product 4',
          description: 'Description of Product 4',
          price: '$40',
          stock: 95
        },
        {
          id: 4,
          name: 'JINKO 560W',
          description: 'Description of Product 1',
          price: '$10',
          stock: 130
        },
      ]
    },
    {
      id: 4,
      name: 'PVC',
      description: 'Description of Category 1',
      products: [
        {
          id: 1,
          name: 'Product 1',
          description: 'Description of Product 1',
          price: '$10',
          stock: 50
        },
        {
          id: 2,
          name: 'Product 2',
          description: 'Description of Product 2',
          price: '$20',
          stock: 60
        }
      ]
    },
    // Add more categories as needed
  ];

  return (
    <div className="flex flex-col justify-center items-center px-4 py-8">
      {categories.map(category => (
        <div key={category.id} className="w-full p-2 rounded-md shadow-sm border-4 border-orange-500 mb-4">
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
                    <button className="ml-2 bg-orange-400 text-white px-4 py-2 rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500">
                      <FontAwesomeIcon icon={faCog} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BranchPage;
