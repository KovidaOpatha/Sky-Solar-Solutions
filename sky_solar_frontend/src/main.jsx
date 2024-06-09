import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import StockPage from './pages/stockpage';
import BranchPage from './pages/branchpage';
import MainLayout from './component/shared/mainlayout';
import HomePage from './pages/homepage'; // Import the HomePage component

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} /> {/* Set HomePage as the default page */}
          <Route path="stock" element={<StockPage />} />
          {/* <Route path="categories" element={<CategoriesPage />} /> */}
          <Route path="category/:categoryId" element={<BranchPage />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
);
