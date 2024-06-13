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
import SignInPage from './pages/sign-in/sign-in.page';
import SignUpPage from './pages/sign-up/sign-up.page';
import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
};

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
        path:":branchName/category/:categoryId",
        element:<StockPage/>
      },  
    ],
    
  },
  {
    path:"/sign-in",
    element:<SignInPage/>,
  },
  {
    path:"/sign-up",
    element:<SignUpPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router}/>
    </ClerkProvider>
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
