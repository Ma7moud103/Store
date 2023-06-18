import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Components/LogIn/Login.jsx";
import ProductDetails from "./Components/ProductDetails/ProductDetails.jsx";
import Products from "./Components/Products/Products.jsx";
import Register from "./Components/Register/Register.jsx";
import MainLayout from "./Layoutes/MainLayout/MainLayout.jsx";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import { ToastContainer } from 'react-toastify';
import Card from "./Components/Card/Card.jsx";
import Checkout from "./Components/Checkout/Checkout.jsx";
import Categories from "./Components/Categories/Categories.jsx"
import { useEffect, useState } from "react";
import Protected from "./Components/Protected/Protected.jsx";
import CardContextProvider from "./Context/CardContext.js";
import Notfound from "./Components/Notfound/Notfound.jsx"
export default function App() {

  let routes = createBrowserRouter([
    {
      path: '',
      element: <MainLayout />,
      children: [
        { index: true, element: <Protected><HomePage /></Protected> },
        { path: "home", element: <Protected><HomePage /></Protected> },
        { path: "products", element: <Protected><Products /></Protected> },
        { path: "product-details/:id", element: <Protected> <ProductDetails /></Protected> },
        {
          path: 'categories', element: <Protected><Categories /></Protected>
        },
        { path: "register", element: <Register /> },
        { path: "card", element: <Protected><Card /></Protected> },
        { path: "checkout", element: <Checkout /> },
        { path: "login", element: <Login /> },
        { path: "*", element: <Notfound /> }
      ]
    }
  ])

  return (
    <>
      <ToastContainer theme="colored" />
      <CardContextProvider>
        <RouterProvider router={routes} />

      </CardContextProvider>
    </>
  );
}