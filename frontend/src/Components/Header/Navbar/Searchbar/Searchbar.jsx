import React from 'react'
import './Searchbar.css'
const Searchbar = () => {
  return (
    <div className='search-container'>
      <input
        type="text"
        className='search-input'
        placeholder='Search for products, brands and more' />
      <div className='search-icon-box'>
        <i className="ri-search-line"></i>
      </div>
    </div>
  )
}

export default Searchbar