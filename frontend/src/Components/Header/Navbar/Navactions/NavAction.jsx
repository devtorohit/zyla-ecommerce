import React from 'react';
import {useNavigate} from 'react-router-dom'
import "./Navaction.css";
import Profilemenu from './ProfileMenu/Profilemenu';
import {useAuth} from "../../../../Context/AuthContext"
const NavAction = () => {
  const navigate = useNavigate()
  const {user} = useAuth();
  console.log("Current User in NavAction:", user);
  return (
    <div className='nav-action'>
      {!user ? (
        <div className='nav-auth-section'>
          <button className='signin-btn' onClick={() => navigate('/auth/login')}>
            Sign In
          </button>
        </div>
      ):
      (
        <div className='profile-wrapper'>
          <Profilemenu user = {user}/>
        </div>
      )}
      <div className="nav-cart">
        <div className="cart-icon-container">
          <i className="ri-shopping-cart-2-line"></i>
          <span className="cart-count">0</span>
        </div>
        <span className="nav-line-2">Cart</span>
      </div>
    </div>
  )
}

export default NavAction