import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const branches = [
    { id: 1, name: 'Galle' },
    { id: 2, name: 'Matara' },
    { id: 3, name: 'Buttala' },
    // Add more branches as needed
  ];

  const navigate = useNavigate();

  const handleBranchClick = (branchId) => {
    // Navigate to the branch-specific page (assuming you have routes set up for each branch)
    navigate(`/branch/${branchId}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white p-8">
      <h1 className="text-4xl font-bold text-orange-600 mb-8">Our Branches</h1>
      <div className="flex flex-wrap justify-center">
        {branches.map(branch => (
          <div
            key={branch.id}
            className="w-48 h-48 flex items-center justify-center m-4 bg-orange-500 text-white text-2xl font-bold cursor-pointer rounded-md shadow-lg transition-transform transform hover:scale-105 hover:bg-orange-600 active:scale-95"
            onClick={() => handleBranchClick(branch.id)}
          >
            {branch.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
