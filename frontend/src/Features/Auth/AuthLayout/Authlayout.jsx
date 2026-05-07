import React from 'react'
import "./AuthLayout.css"
import { Outlet } from 'react-router-dom'
const Authlayout = () => {
    return (
        <div className='auth-wrap'>
            <div className="auth-container">
                <div className="auth-content">
                    <h1>Elevate Your <span className="highlight">Shopping</span> Experience.</h1>
                    <p>Discover curated collections, exclusive deals, and a seamless checkout process designed just for you.</p>

                    <div className="auth-features">
                        <div className="feature"><i className="ri-checkbox-circle-fill"></i> Fast Delivery</div>
                        <div className="feature"><i className="ri-checkbox-circle-fill"></i> Secure Payments</div>
                    </div>
                </div>
                <div className="auth-card">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Authlayout