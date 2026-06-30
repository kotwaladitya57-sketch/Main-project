import React, { useContext } from 'react'
import Navbar from './navbar'
import { Link, useNavigate } from 'react-router-dom'
import CartContext from './CartContext'
import { FaShoppingCart } from "react-icons/fa";
import { FaShopify } from "react-icons/fa";

const Products = () => {

    const { addToCart, products } = useContext(CartContext);

    return (
        <div>
            <Navbar />
            <h1 className='page-title'>Our Exclusive Products</h1>

            <div className="products-wrapper">
                {
                    products.map((ele) => {
                        return (
                            <Link to={`/product/${ele.id}`} key={ele.id} className='product-card'>
                                <div className="product-image-container">
                                    <img className='product-image' src={ele.thumbnail} alt={ele.title} />
                                </div>
                                <div className='product-info'>
                                    <h2 className='product-title'>{ele.title}</h2>
                                    <h3 className='product-category'>{ele.category}</h3>
                                    <div className='product-price'> ${ele.price}</div>
                                    <p className='product-desc'>{ele.description}</p>
                                    <div className='action-buttons'>
                                        <button className='btn-buy' onClick={(e) => { e.preventDefault(); }}>Buy Now <FaShopify size={22} /> </button>
                                        <button className='btn-cart' onClick={(e) => { e.preventDefault(); addToCart(e, ele); }}>Add to Cart <FaShoppingCart size={22} /> </button>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Products

