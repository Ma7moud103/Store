import React, { useContext, useEffect, useState } from 'react'
import logo from "../../images/freshcart-logo.svg"
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom';

import "./navbar.css";
import { CardContext } from '../../Context/CardContext';

export default function Navbar({ logout }) {


  let { numOfCartItem, userData } = useContext(CardContext)

  return <>
    <nav className="navbar navbar-expand-lg navbar-light bg-main-light ">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="logo" />
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">



          {userData !== null ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link " aria-current="page" to="/home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " aria-current="page" to="/products">Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " aria-current="page" to="/categories">Categories</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " aria-current="page" to="/brands">Brands</NavLink>
            </li>
          </ul> : null}

          <ul className="navbar-nav ms-auto mt-2 mb-2 mb-lg-0">

            <Link to="/card" type="button" className="btn position-relative border-0 position-relative me-2">
              Card
              <i className="fa-solid fa-cart-shopping fa-lg" />
              <div className="badge bg-main position-absolute top-0 end-0">{numOfCartItem}</div>
            </Link>



            <li className='nav-item d-flex align-items-center'>
              <i className="fa-brands fa-facebook"></i>
              <i className='fa-brands mx-2 fa-twitter'></i>
              <i className='fa-brands mx-2 fa-instagram'></i>
              <i className='fa-brands mx-2 fa-tiktok'></i>
              <i className='fa-brands mx-2 fa-linkedin'></i>
              <i className='fa-brands mx-2 fa-youtube'></i>
            </li>



            {userData === null ? <>
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="login">LogIn</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="register">Register</NavLink>
              </li> </> :
              <li className="nav-item">
                <span className="nav-link  cursor-pointer " aria-current="page" onClick={logout}>LogOut</span>
              </li>}

          </ul>
        </div>
      </div>
    </nav>
  </>

}
