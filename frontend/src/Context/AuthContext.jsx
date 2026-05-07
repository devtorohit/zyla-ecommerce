import React, { createContext, useContext, useState, useEffect } from 'react'
import API from "../API/api"
const AuthContext = createContext();

export const Authprovider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setloading] = useState(true);

    const chekAuth = async () => {
        try {
            const res = await API.get("/user/get-profile");
            setUser(res.data)
        } catch (error) {
            setUser(null)
        }
        finally {
            setloading(false)
        }
    }

    useEffect(() => {
        chekAuth()
    }, [])

    const Signup = async (formdata) => {
        try {
            const res = await API.post("/auth/signup", formdata);
            setUser(res.data.user);
            return { success: true, message: res.data.message }
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Signup Failed" }
        }
    }

    const Login = async (formdata) => {
        try {
            const res = await API.post("/auth/login", formdata);
            setUser(res.data.user);
            return { success: true, message: res.data.message }
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Login Failed" }
        }
    }

    const Logout = async () => {
        try {
            await API.post("/auth/logout");
            setUser(null);
            window.location.href = "/auth/login";
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, Logout, Signup, Login }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);