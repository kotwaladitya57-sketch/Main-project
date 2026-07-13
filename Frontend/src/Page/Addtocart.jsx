import React, { useContext } from 'react'
import Navbar from './Navbar'
import CartContext from './Cartcontext'
import { FaOpencart } from "react-icons/fa6";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


const Addtocart = () => {
  const { cart, removeItemFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="cart-header">
        <h1 className='h1' style={{ textAlign: 'center', fontSize: '40px', marginTop: '20px', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>My Cart</h1>
        <FaOpencart size={60} style={{ display: 'block', margin: '0 auto 20px auto', color: 'white', filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' }} />
      </div>

      {cart.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.5rem', color: 'white', fontWeight: 'bold' }}>Your cart is empty.</p>
      ) : (
        <div className="cart-container">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.thumbnail} alt={item.title} />
              <div className="cart-details">
                <h2>{item.title}</h2>
                <h3>Price: <FaIndianRupeeSign size={18} />{item.price}</h3>
                <p>Quantity: {item.quantity || 1}</p>
              </div>
              <button id='btnR' onClick={() => removeItemFromCart(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Addtocart
