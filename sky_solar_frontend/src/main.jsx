import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
//import StockPage from './pages/stock-page';
//import BranchPage from './pages/branchpage';
import CategoryPage from './pages/categorypage';
import MainLayout from './component/shared/mainlayout';
import HomePage from './pages/homepage'; // Import the HomePage component
import StockPage from './pages/stockpage';

const router = createBrowserRouter([
  {
    element:<MainLayout/>,
    children:[
      {
        path:"/",
        element:<HomePage/>,
      },
      {
        path:":branchName/category",  
        element:<CategoryPage/>,
      },
      /*{
        path:"Matara/category",
        element:<CategoryPage/>
      },
      {
        path:"Buttala/category",
        element:<CategoryPage/>
      },*/
      {
        path:"category/:categoryId",
        element:<StockPage/>
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
