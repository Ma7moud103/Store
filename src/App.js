import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
import Categories from "./Components/Categories/Categories.jsx"
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import Protected from "./Components/Protected/Protected.jsx";

export default function App() {
  const [userData, setuserData] = useState(null)


  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveUserData()
    }
  }, [])

  function saveUserData() {
    let token = localStorage.getItem("token")
    let decode = jwtDecode(token)
    setuserData(decode)
  }

  let routes = createBrowserRouter([
    {
      path: '',
      element: <MainLayout userData={userData} />,
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
        { path: "login", element: <Login saveUserData={saveUserData} Login /> }
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