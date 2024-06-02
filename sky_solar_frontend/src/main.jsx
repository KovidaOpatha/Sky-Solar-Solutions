import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import MainLayout from './layout/main.layout.jsx'
import rootLayout from './layout/root.layout.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/home.page.jsx'
import Navigation from './component/shared/navigation.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <rootLayout/>,
    
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
