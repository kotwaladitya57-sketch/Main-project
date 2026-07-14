import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Slide, toast } from 'react-toastify';
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

        // Frontend validation — show clear messages to user
        if (!formData.name || !formData.email || !formData.password || !formData.age) {
            return toast.error("Please fill all fields", {
                position: "top-center", autoClose: 3000, theme: "dark", transition: Slide,
            });
        }
        if (formData.name.length < 3 || formData.name.length > 20) {
            return toast.error("Name must be between 3 and 20 characters", {
                position: "top-center", autoClose: 3000, theme: "dark", transition: Slide,
            });
        }
        if (formData.password.length < 5) {
            return toast.error("Password must be at least 5 characters", {
                position: "top-center", autoClose: 3000, theme: "dark", transition: Slide,
            });
        }
        const ageNum = parseInt(formData.age, 10);
        if (isNaN(ageNum) || ageNum < 1 || ageNum > 100) {
            return toast.error("Age must be a number between 1 and 100", {
                position: "top-center", autoClose: 3000, theme: "dark", transition: Slide,
            });
        }

        const API_BASE_URL = import.meta.env.VITE_API_URL || "https://main-project-lh90.onrender.com";

        // Convert age to number before sending to backend
        const payload = {
            ...formData,
            age: ageNum,
        };

        axios.post(`${API_BASE_URL}/users/register`, payload)
            .then((response) => {
                console.log("Registration success:", response.data);
                toast.success("Registration successful! Please login.", {
                    position: "top-left",
                    autoClose: 2000,
                    theme: "dark",
                    transition: Slide,
                });
                setTimeout(() => navigate('/login'), 2100);
            })
            .catch((err) => {
                console.error("Registration error:", err.response);
                const errorMsg = err.response?.data || err.message || "Registration Failed";
                toast.error(String(errorMsg), {
                    position: "top-center",
                    autoClose: 3000,
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
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name (3–20 chars)"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <FaEnvelope className="icon" size={20} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter a valid email (e.g. abc@gmail.com)"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <FaCalendarAlt className="icon" size={20} />
                        <input
                            type="number"
                            name="age"
                            placeholder="Enter your age (1–100)"
                            min="1"
                            max="100"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <CiLock className="icon" size={22} />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password (min 5 characters)"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" id="btn">
                        Register <FaPaperPlane style={{ marginLeft: "8px", verticalAlign: "middle" }} />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;