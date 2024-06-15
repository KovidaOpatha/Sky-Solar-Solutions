import React, { useState } from 'react';
import axios from 'axios';

const AddCategoryOverlay = ({ branchName, onClose }) => {
    const [categoryName, setCategoryName] = useState('');

    const handleAddCategory = async () => {
        if (!categoryName.trim()) {
            alert('Category name is required.');
            return;
        }

        try {
            await axios.post(`https://sky-solar-solutions-back-end-production.up.railway.app/stocks/${branchName}/add-category`, { categoryName, branchName });
            onClose();
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Add Category</h2>
                <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="border p-2 rounded w-full mb-4"
                    placeholder="Category Name"
                />
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm mr-2 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddCategory}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        Add Category
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddCategoryOverlay;
