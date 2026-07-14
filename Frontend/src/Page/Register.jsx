import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Slide, ToastContainer, toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaPaperPlane, FaCalendarAlt } from "react-icons/fa";
import { CiLock } from "react-icons/ci";


function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        age: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
        axios.post(`${API_BASE_URL}/users/register`, formData)
            .then((response) => {
                console.log(response.data);
                toast.success("Registration successful!", {
                    position: "top-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Slide,
                });
                navigate('/Login');
            })
            .catch((err) => {
                console.error(err.response);
                const errorMsg = err.response?.data || "Registration Failed";
                toast.error(errorMsg, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Slide,
                });
            });
    };

    return (
        <div>
            <Navbar />
            <div className="form-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 60px)' }}>
                <form id="form" onSubmit={handleSubmit}>
                    <h1 style={{ marginBottom: "10px", fontSize: "32px", fontWeight: "bold", textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>Create Account</h1>
                    <p style={{ marginBottom: "40px", fontSize: "16px", color: "rgba(255,255,255,0.8)" }}>Join us to get started</p>

                    <div className="input-container">
                        <FaUser className="icon" size={20} />
                        <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className="input-container">
                        <FaEnvelope className="icon" size={20} />
                        <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
                    </div>

                    <div className="input-container">
                        <FaCalendarAlt className="icon" size={20} />
                        <input type="number" name="age" placeholder="Enter your age" value={formData.age} onChange={handleChange} required />
                    </div>

                    <div className="input-container">
                        <CiLock className="icon" size={22} />
                        <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
                    </div>

                    <button type="submit" id="btn">Register <FaPaperPlane style={{ marginLeft: "8px", verticalAlign: "middle" }} /></button>
                </form>
            </div>
        </div>
    );
}

export default Register;