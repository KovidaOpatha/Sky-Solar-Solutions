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
            await axios.post(`http://127.0.0.1:8000/stocks/${branchName}/add-category`, { categoryName, branchName });
            //onCategoryAdded(); // Callback to refresh categories
            onClose();
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Add Category</h2>
                <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="border p-2 rounded w-full mb-4"
                    placeholder="Category Name"
                />
                <button
                    onClick={handleAddCategory}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Add Category
                </button>
                <button
                    onClick={onClose}
                    className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default AddCategoryOverlay;
