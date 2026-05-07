import React, { useState } from 'react'
import "./Profilemenu.css";
import { useAuth } from "../../../../../Context/AuthContext";
import { useNavigate } from 'react-router-dom';

const Profilemenu = ({ user }) => {
  const { Logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await Logout();
    navigate('/auth/login')
  }
  let [isopen, setisopen] = useState(false)
  return (
    <div className='profile-container' onClick={() => setisopen(!isopen)}>
      <div className="profile-trigger">
        <div className="proflie-pic-small">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <span className='profile-name'>howdy , {user.username}</span>
      </div>

      {isopen && (
        <div className='profile-dropdown'>
          <h4 className="dropdown-title">My Account</h4>
          <ul>
            <li><i className="ri-user-line"></i>My Profile</li>
            <li><i className="ri-heart-line"></i>Wishlist</li>
            <li className="logout-link" onClick={handleLogout}><i className="ri-logout-box-r-line"></i>Logout</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Profilemenu