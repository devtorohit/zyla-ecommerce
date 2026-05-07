import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Authlayout from './Features/Auth/AuthLayout/Authlayout';
import Login from './Features/Auth/Login/Login';
import Signup from './Features/Auth/Signup/Signup';

import Dashboard from './Components/Dashboard/Dashboard';
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="/auth/signup" />} />

      <Route path='/auth' element={<Authlayout />}>
        <Route path='login' element={<Login />}></Route>
        <Route path='signup' element={<Signup />}></Route>
      </Route>

      <Route path='/dashboard' element={<Dashboard/>}></Route>
    </Routes>
  )
}

export default App