import React, { useState, useContext } from 'react'
import Navbar from './Navbar'
import { FaPaperPlane } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import CartContext from './CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Flip, Slide, toast, Zoom } from "react-toastify";


const Login = () => {
    const { login } = useContext(CartContext);
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (!data.email || !data.password) {
            return alert("Email and Password are required");
        }

        axios.post("http://localhost:3000/users/login", data)
            .then((response) => {
                console.log("Login Success:", response.data);
                login(response.data);
                toast.success("LogIn successfully", {
                    position: "top-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Zoom,
                });
                // Call login from context which handles persistence
                navigate('/product');
            })
            .catch((err) => {
                console.error(err.message);
                const errorMsg = err.response?.data || err.message || "Something went wrong";
                toast.error('LogIn Failed', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Flip,
                });
            });
    }

    return (

        <div>
            <Navbar />
            <div className="form-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 60px)' }}>
                <form id="form">
                    <h1 style={{ marginBottom: "10px", fontSize: "32px", fontWeight: "bold", textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>Welcome Back</h1>
                    <p style={{ marginBottom: "40px", fontSize: "16px", color: "rgba(255,255,255,0.8)" }}>Log in to access your account</p>

                    <div className="input-container">
                        <FaUser className="icon" size={20} />
                        <input id="name" type="text" placeholder="Name" onChange={(e) => setData({ ...data, name: e.target.value })} required />
                    </div>

                    <div className="input-container">
                        <FaEnvelope className="icon" size={20} />
                        <input id="email" type="email" placeholder="Email" onChange={(e) => setData({ ...data, email: e.target.value })} required />
                    </div>

                    <div className="input-container">
                        <CiLock className="icon" size={22} />
                        <input id="password" type="password" placeholder="Password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} required />
                    </div>

                    <button type="submit" id='btn' onClick={handleLoginSubmit}>Login <FaPaperPlane style={{ marginLeft: "8px", verticalAlign: "middle" }} /></button>
                </form>
            </div>
        </div>
    )
}

export default Login
