import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StockPage from './pages/stockpage';
import BranchPage from './pages/branchpage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<StockPage />} />
        <Route path="/category/:categoryId" element={<BranchPage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
