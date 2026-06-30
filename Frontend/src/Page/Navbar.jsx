import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import CartContext from './CartContext';
import { FcSearch } from "react-icons/fc";
import { IoIosLogIn } from "react-icons/io";
import { MdRoundaboutRight } from "react-icons/md";
import { IoIosCart } from "react-icons/io";
import { FaShoppingBag } from "react-icons/fa";

const Navbar = () => {
  const [inputvalue, setInputValue] = React.useState("");
  const [searchedProducts, setSearchedProducts] = React.useState([]);
  const { cart, products, isLoggedIn, logout, user } = useContext(CartContext);


  function handleChange(e) {
    setInputValue(e.target.value);
    if (e.target.value === "") {
      setSearchedProducts([]);
      return;
    }
    const filtered = products.filter(product => product.title.toLowerCase().startsWith(e.target.value.toLowerCase()));
    setSearchedProducts(filtered);
  }

  return (
    <nav className="navbar">
      <Link to="/product" className='h1'><FaShoppingBag size={25} />Products</Link>

      <div className='search-var'>
        <FcSearch style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", height: "30px", width: "30px" }} />
        <input value={inputvalue} onChange={handleChange} type="text" placeholder="Search for Products, Brands and More" name="search2" />

        {searchedProducts.length > 0 && (
          <div className="search-dropdown">
            {searchedProducts.map(product => (
              <Link key={product.id} to={`/product/${product.id}`} className="search-item" onClick={() => { setInputValue(''); setSearchedProducts([]); }}>
                {product.title}
              </Link>
            ))}
          </div>
        )}
      </div>

      <Link to="/about" className='h1'><MdRoundaboutRight size={25} />About</Link>

      {isLoggedIn ? (
        <>
          <span className='h1'>Welcome, {user?.name.split(' ')[0]}</span>
          <button onClick={logout} className='h1'><IoIosLogIn size={25} />Logout</button>
        </>
      ) : (
        <Link to="/login" className='h1'><IoIosLogIn size={25} />Log In</Link>
      )}
      <Link to="/userdashboard" className='h1'><IoIosLogIn size={25} />Dashboard</Link>

      <Link to="/addtocart" className='h1'><IoIosCart size={25} />Cart {(cart.length)} </Link>
    </nav>
  )
}

export default Navbar
