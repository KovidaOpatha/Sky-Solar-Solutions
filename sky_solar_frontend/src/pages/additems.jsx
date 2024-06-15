import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AddItemsOverlay = ({ categories, onClose }) => {
    const { branchName } = useParams();

    const [category, setCategory] = useState(categories[0]._id); // Default to the first category
    const [itemName, setItemName] = useState('');
    const [remainingStock, setRemainingStock] = useState(0);

    const handleAddItem = async (e) => {
        e.preventDefault();

        const newItem = {
            name: itemName,
            remainingStock: parseInt(remainingStock, 10),
        };

        try {
            const response = await axios.post(`https://sky-solar-solutions-back-end-production.up.railway.app/stocks/${branchName}/add-item`, {
                branchName,
                categoryId: category,
                newItem,
            });
            if (response.status === 200) {
                onClose();
            }
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg border border-gray-300 w-full max-w-md">
                <div className="p-8">
                    <h2 className="text-3xl font-semibold mb-6 text-gray-800">Add New Item</h2>
                    <form onSubmit={handleAddItem}>
                        <div className="mb-6">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                            >
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">Item Name</label>
                            <input
                                id="itemName"
                                type="text"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="remainingStock" className="block text-sm font-medium text-gray-700">Remaining Stock</label>
                            <input
                                id="remainingStock"
                                type="number"
                                value={remainingStock}
                                onChange={(e) => setRemainingStock(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm mr-2 hover:bg-gray-600 transition duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-orange-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-orange-600 transition duration-300"
                            >
                                Add Item
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddItemsOverlay;
