import  { useContext, useEffect, useRef } from 'react'
import logo from "../../images/freshcart-logo.svg"
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom';
import "./navbar.css";
import { CardContext } from '../../Context/CardContext';

export default function Navbar({ logout }) {


  let { numOfCartItem, userData } = useContext(CardContext)
  const togglerRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (navRef.current.contains(e.target)) return;
      else togglerRef.current.classList.remove("show");
    }, true)
  })

  const handleClick = () => {
    togglerRef.current.classList.remove("show");
  }
  return <>
    <nav ref={navRef} className="navbar   navbar-expand-lg navbar-light bg-main-light  position-fixed w-100 ">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="logo" />
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div ref={togglerRef} className="collapse navbar-collapse " id="navbarSupportedContent">



          {userData !== null ? <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-center ">
            <li className="nav-item ">
              <NavLink onClick={handleClick} className="nav-link " aria-current="page" to="/home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink onClick={handleClick} className="nav-link " aria-current="page" to="/products">Products</NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink onClick={handleClick} className="nav-link " aria-current="page" to="/games">Games</NavLink>
            </li> */}
            {/* <li className="nav-item">
              <NavLink onClick={handleClick} className="nav-link " aria-current="page" to="/brands">Brands</NavLink>
            </li> */}
          </ul> : null}

          <ul className="navbar-nav ms-auto mt-2 mb-2 mb-lg-0 text-center">

            <Link onClick={handleClick} to="/card" type="button" className=" cursor-pointer position-relative border-0 position-relative me-2 mt-lg-2">
              Card
              <i className="fa-solid fa-cart-shopping fa-lg" />
              <span className="badge bg-main position-absolute " style={{ top: "-10px", right: "44%" }}>{numOfCartItem}</span>
            </Link>





            {userData === null ? <>
              <li className="nav-item">
                <NavLink onClick={handleClick} className="nav-link " aria-current="page" to="login">LogIn</NavLink>
              </li>
              <li className="nav-item">
                <NavLink onClick={handleClick} className="nav-link " aria-current="page" to="register">Register</NavLink>
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
