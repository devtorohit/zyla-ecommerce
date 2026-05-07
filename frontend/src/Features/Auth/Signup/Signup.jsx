import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthInput from '../../../Components/Authinput/AuthInput'
import API from '../../../API/api'
import "./Signup.css"
import { useAuth } from '../../../Context/AuthContext'
const Signup = () => {
    const [form, setform] = useState({ username: "", email: "", password: "" });
    const [error, seterror] = useState({});
    const [successMsg, setSuccessMsg] = useState("");
    const [loading, setloading] = useState(false)
    const navigate = useNavigate();
    const {Signup} = useAuth()
    const validate = () => {
        const errs = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const capRegex = /[A-Z]/;
        const specRegex = /[!@#$%^&*]/;

        // 1. Username Validation
        if (!form.username.trim()) {
            errs.username = "Username is required";
        }

        // 2. Email Validation (Optimized)
        if (!form.email) {
            errs.email = "Email is required";
        } else if (!emailRegex.test(form.email)) {
            errs.email = "Invalid Email format";
        }

        // 3. Password Validation (Optimized & Clean)
        if (!form.password) {
            errs.password = "Password is required";
        } else if (form.password.length < 8) {
            errs.password = "Min 8 characters required";
        } else if (!capRegex.test(form.password) || !specRegex.test(form.password)) {
            errs.password = "Use at least one [A-Z] and [@ # $ % & *]";
        }
        seterror(errs);
        return Object.keys(errs).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        seterror({});
        setSuccessMsg("")
        setform((prev) => ({ ...prev, [name]: value }))
        if (error[name]) {
            seterror((prev) => ({ ...prev, [name]: "" }))
        }
        if (error.server) {
            seterror((prev) => ({ ...prev, server: "" }))
        }
        if (successMsg) {
            setSuccessMsg("");
        }
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        seterror({});
        setSuccessMsg("");
        if (validate()) {
            setloading(true);
            const result = await Signup(form);

            if(result.success){
                setSuccessMsg(result.message);
                setTimeout(() => navigate('/dashboard'), 2000);
            }
            else{
                setloading(false);
                seterror({server:result.message})
            }
        }
    }
    return (
        <>
            <div className="auth-header">
                <h2>Join Us!</h2>
                <p>Create an account to start shopping</p>
            </div>

            <form onSubmit={handlesubmit}>
                <AuthInput
                    label="Username"
                    type="text"
                    name="username"
                    value={form.username}
                    icon="ri-user-line"
                    onChange={handleChange}
                    placeholder="Enter Username"
                    error={error.username}
                />
                <AuthInput
                    label="Email Address"
                    type="email"
                    name="email"
                    value={form.email}
                    icon="ri-mail-line"
                    onChange={handleChange}
                    placeholder="example@mail.com"
                    error={error.email}
                />
                <AuthInput
                    label="Password"
                    type="password"
                    name="password"
                    value={form.password}
                    icon="ri-user-line"
                    onChange={handleChange}
                    placeholder="Enter Password"
                    error={error.password}
                />
                <button type="submit" className="submit-btn">
                    {loading ? "Creating Account..." : "Create Account"}
                </button>
            </form>

            <p className="auth-footer">
                Already have an account? <Link to="/auth/login">Login here</Link>
            </p>
            {successMsg && <p className='success-msg'>{successMsg}</p>}
            {error.server && <p className='error-msg'>{error.server}</p>}
        </>
    )
}

export default Signup