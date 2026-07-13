import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './TempNavbar'
import { FaStar, FaShoppingCart } from "react-icons/fa";
import CartContext from './CartContext';
import products from './data.js';

const Deatil = () => {
    const { id } = useParams()
    const { addToCart, products } = useContext(CartContext);
    const [data, setData] = useState(null);

    useEffect(() => {
        // Find product in the context's product list
        // id from params is a string (Mongo _id)
        const foundProduct = products.find(p => p.id === id);
        setData(foundProduct);
    }, [id, products]);

    if (!data) {
        return (
            <div>
                <Navbar />
                <h1 className='page-title'>Loading...</h1>
            </div>
        )
    }

    return (
        <div>
            <Navbar />
            <div className="detail-wrapper">
                <div className="detail-image-section">
                    <img className="detail-main-image" src={data.thumbnail} alt={data.title} />
                    <div className="thumbnail-strip">
                        {data.images && data.images.slice(0, 5).map((img, index) => (
                            <img key={index} className="thumbnail-img" src={img} alt={`${data.title} ${index + 1}`} />
                        ))}
                    </div>
                </div>
                <div className="detail-info-section">
                    <h2 className="detail-title">{data.title}</h2>
                    <h3 className="detail-category">{data.category}</h3>
                    <div className="detail-rating">
                        <FaStar /> {data.rating} / 5
                    </div>
                    <div className="detail-price">${data.price}</div>
                    <p className="detail-desc">{data.description}</p>
                    <button className='btn-buy' style={{ maxWidth: '300px' }} onClick={(e) => addToCart(e, data)}>
                        Add to Cart <FaShoppingCart size={22} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Deatil
