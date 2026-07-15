import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { Flip, Slide, toast, Zoom } from "react-toastify";
import axios from "axios";
import productData from "./data.js";

const CartContext = createContext();

export default CartContext;

const CartProvider = ({ children }) => {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        try {
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (e) {
            console.error("Failed to parse cart from localStorage", e);
            return [];
        }
    });

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        try {
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (e) {
            console.error("Failed to parse user from localStorage", e);
            return null;
        }
    });
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token") || !!localStorage.getItem("user"));

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Fetch products from backend
    useEffect(() => {
        const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
        axios.get(`${API_BASE_URL}/product`)
            .then(res => {
                // Normalize data to match components' expectations (e.g., title, thumbnail, id)
                const normalized = res.data.map(item => ({
                    ...item,
                    id: item._id, // Map MongoDB _id to id for routing
                    // title, thumbnail, and images now match the schema directly
                }));
                setProducts(normalized);
            })
            .catch(err => {
                console.error("Failed to fetch products:", err);
                // Fallback to local data if server is down
                setProducts(productData);
            });
    }, []);

    const addToCart = (e, product) => {
        e.preventDefault();

        if (cart.find(item => item.id === product.id)) {
            setCart(cart.map(ele => {
                if (ele.id === product.id) {
                    return { ...ele, quantity: ele.quantity + 1 }
                } else { return ele; }
            }))
            toast.info(`${product.title} quantity increased!`, {
                position: "top-right",
                autoClose: 2000,
                theme: "dark",
                transition: Slide,
            });

        } else {
            setCart([...cart, { ...product, quantity: 1 }])
            toast.success(`${product.title} has been added to the cart!`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Slide,
            });
        }

    };

    const removeItemFromCart = (Id) => {
        setCart(currentCart => currentCart.filter(ele => ele.id !== Id));
        toast.warn('Item Remove from cart', {
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
        navigate('/product');
    };

    const login = (userData) => {
        setIsLoggedIn(true);

        let userToSet = null;
        let tokenToSet = null;

        if (userData.user) {

            userToSet = userData.user;
            tokenToSet = userData.token;
        } else {
            userToSet = userData;
        }

        if (userToSet) {
            setUser(userToSet);
            localStorage.setItem("user", JSON.stringify(userToSet));
        }

        if (tokenToSet) {
            localStorage.setItem("token", tokenToSet);
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate('/login');
    };


    return (
        <CartContext.Provider value={{ addToCart, removeItemFromCart, products, cart, login, logout, isLoggedIn, user }}>
            {children}
        </CartContext.Provider>
    )
}
export { CartProvider };
