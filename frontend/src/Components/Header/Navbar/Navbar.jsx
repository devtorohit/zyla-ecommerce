import React from 'react';
import "./Navbar.css";
import Searchbar from "./Searchbar/Searchbar"
import NavAction from './Navactions/NavAction';
const Navbar = () => {
  return (
    <nav className='nav-container'>
      <div className="nav-top">
        <div className="logo">
          ZY<span>LA</span>
        </div>
        <Searchbar />
        <div className="right">
          <NavAction />
        </div>
      </div>
      <div className="nav-bottom">
        <ul className='nav-links'>
          <li>All</li>
          <li>Men Fashion</li>
          <li>Women Fashion</li>
          <li>Electronics</li>
          <li>Home & Kitchen</li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar