import React, { useState } from 'react';
import "./AuthInput.css";

const AuthInput = ({ label, type, name, value, icon, onChange, placeholder, error }) => {

    const [showPassword, setShowPassword] = useState(false)
    const ispassword = type === "password";
    const inputType = ispassword && showPassword ? "text" : type
    return (
        <div className='input-group'>
            <label>{label}</label>
            <div className='input-wrapper'>
                <input type={inputType}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                />
                {
                    ispassword ? (
                        <i
                            onClick={() => setShowPassword(!showPassword)}
                            className={showPassword ? "ri-eye-line input-icon" : "ri-eye-off-line input-icon"}>
                        </i>
                    )
                        :
                        (
                            <i className={`${icon} input-icon`}></i>
                        )
                }
            </div>
            {error && <small className="error-text">{error}</small>}
        </div>
    )
}

export default AuthInput