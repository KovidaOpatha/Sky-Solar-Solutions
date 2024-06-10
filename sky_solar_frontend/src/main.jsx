import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import StockPage from './pages/stockpage';
import BranchPage from './pages/branchpage';
import MainLayout from './component/shared/mainlayout';
import HomePage from './pages/homepage'; // Import the HomePage component

const router = createBrowserRouter([
  {
    element:<MainLayout/>,
    children:[
      {
        path:"/",
        element:<HomePage/>,
      },
      {
        path:"galle/category",
        element:<StockPage/>,
      },
      {
        path:"Matara/category",
        element:<StockPage/>
      },
      {
        path:"Buttala/category",
        element:<StockPage/>
      },
      {
        path:"galle/category/stock",
        element:<BranchPage/>
      }
      
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)

/*ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} /> {/* Set HomePage as the default page }
          <Route path="stock" element={<StockPage />} />
          {/* <Route path="categories" element={<CategoriesPage />} /> }
          <Route path="category/:categoryId" element={<BranchPage />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
);*/
