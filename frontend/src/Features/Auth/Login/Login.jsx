import React, { useState } from 'react';
import API from '../../../API/api';
import './Login.css';
import AuthInput from '../../../Components/Authinput/AuthInput'
import { useNavigate , Link} from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext';
const Login = () => {

  const [form, setform] = useState({ email: "", password: "" });
  const [error, seterror] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setloading] = useState(false);
  const { Login } = useAuth()
  const navigate = useNavigate()
  const validate = () => {
    const errs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email) {
      errs.email = "Email is required"
    }
    else if (!emailRegex.test(form.email)) {
      errs.email = "Invalid Email format"
    }

    // password
    if (!form.password) errs.password = "Password is required";
    seterror(errs)

    return Object.keys(errs).length === 0;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setform((prev) => ({ ...prev, [name]: value }));

    if (error[name]) {
      seterror(prev => ({ ...prev, [name]: "" }));
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
      setloading(true)
      const result = await Login(form);
      if (result.success) {
        setSuccessMsg(result.message);
        setTimeout(() => navigate('/dashboard'), 2000);
      }
      else {
        setloading(false);
        seterror({ server: result.message })
      }
    }
  }

  return (
    <div className="login-form-container">
      <div className="login-header">
        <h2>Welcome Back</h2>
        <p>Sign in to continue shopping</p>
      </div>

      <form onSubmit={handlesubmit}>
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
        <button type="submit" className="submit-btn">Login</button>
      </form>
      <p className="auth-footer">
        Don't have an account? <Link to="/auth/signup">Signup here</Link>
      </p>
      {successMsg && <p className='success-msg'>{successMsg}</p>}
      {error.server && <p className='error-msg-server'>{error.server}</p>}
    </div>
  );
};

export default Login;