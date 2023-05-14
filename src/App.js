import { RouterProvider,createBrowserRouter, createHashRouter } from "react-router-dom";
import Login from "./Components/LogIn/Login.jsx";
import ProductDetails from "./Components/ProductDetails/ProductDetails.jsx";
import Products from "./Components/Products/Products.jsx";
import Register from "./Components/Register/Register.jsx";
import MainLayout from "./Layoutes/MainLayout/MainLayout.jsx";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import { ToastContainer } from 'react-toastify';
  import CardContextProvider from "./Components/Context/CardContext.js";
import Card from "./Components/Card/Card.jsx";
import Checkout from "./Components/Checkout/Checkout.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import Categories from "./Components/Categories/Categories.jsx"
import Brands from "./Components/Brands/Brands.jsx"
import jwtDecode from "jwt-decode";
import { useState } from "react";




export default function App() {

    const [userData, setuserData] = useState(null)

  function Usertoken() {
    let token = localStorage.getItem("token")
    let decode = setuserData(token)
    console.log(decode);
  }


  let routes = createHashRouter([
    {
      path:'',
      element: <MainLayout />,
      children: [
        { index: true, element: <ProtectedRoute><HomePage/></ProtectedRoute> },
        { path: "products", element: <ProtectedRoute><Products  /></ProtectedRoute> },
        { path: "product-details/:id", element: <ProductDetails /> },
        {path:'categories' ,element:<ProtectedRoute><Categories/></ProtectedRoute>},
        {path:'brands' ,element:<ProtectedRoute><Brands/></ProtectedRoute>},
        { path: "register", element: <Register/> },
        { path: "login", element: <Login Usertoken = {Usertoken} /> },
        { path: "card", element:<ProtectedRoute><Card/></ProtectedRoute> }, 
        { path: "checkout", element: <Checkout /> },
      ]
    } 
  ]) 
  return (
    <>  
      
      <ToastContainer theme="colored"/>
      
      <CardContextProvider>
      <RouterProvider router={routes}/>
      </CardContextProvider>
    </>
  );
}