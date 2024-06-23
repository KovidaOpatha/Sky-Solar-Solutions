import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const branches = [
    { id: 1, name: 'Galle' },
    { id: 2, name: 'Matara' },
    { id: 3, name: 'Buttala' },
    // Add more branches as needed
  ];

  const navigate = useNavigate();

  useEffect(() => {
    // Disable scrolling when HomePage component mounts
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when HomePage component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleBranchClick = (branchName) => {
    navigate(`${branchName}/category`);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white p-8 overflow-hidden">
      <h1 className="text-4xl font-bold text-orange-600 mb-8 text-center">Our Branches</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-screen-lg p-8">
        {branches.map(branch => (
          <div
            key={branch.id}
            className="w-full h-32 sm:h-40 md:h-48 lg:h-48 flex items-center justify-center bg-orange-500 text-white text-2xl font-bold cursor-pointer rounded-md shadow-lg transition-transform transform hover:scale-105 hover:bg-green-600 active:scale-95"
            onClick={() => handleBranchClick(branch.name)}
          >
            <div className="text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl p-2 leading-tight">
              {branch.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;