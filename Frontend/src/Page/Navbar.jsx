import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import CartContext from './CartContext';
import { FcSearch } from "react-icons/fc";
import { IoIosLogIn } from "react-icons/io";
import { MdRoundaboutRight } from "react-icons/md";
import { IoIosCart } from "react-icons/io";
import { FaShoppingBag, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [inputvalue, setInputValue] = React.useState("");
  const [searchedProducts, setSearchedProducts] = React.useState([]);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { cart, products, isLoggedIn, logout, user } = useContext(CartContext);

  const closeMenu = () => setIsMenuOpen(false);

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
      <div className="navbar-shell">
        <div className='search-var'>
          <FcSearch className="search-icon" />
          <input value={inputvalue} onChange={handleChange} type="text" placeholder="Search cakes, gifts and more" name="search2" />

          {searchedProducts.length > 0 && (
            <div className="search-dropdown">
              {searchedProducts.map(product => (
                <Link key={product.id || product._id} to={`/product/${product.id || product._id}`} className="search-item" onClick={() => { setInputValue(''); setSearchedProducts([]); closeMenu(); }}>
                  {product.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          className="navbar-toggle"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((value) => !value)}
        >
          {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        <div className={`navbar-menu ${isMenuOpen ? "is-open" : ""}`}>
          <div className="navbar-links">
            <Link to="/product" className='h1' onClick={closeMenu}><FaShoppingBag size={21} />Products</Link>
            <Link to="/about" className='h1' onClick={closeMenu}><MdRoundaboutRight size={22} />About</Link>

            {isLoggedIn ? (
              <>
                <span className='h1 nav-user'><FaUserCircle size={21} />Hi, {user?.name?.split(' ')[0] || "User"}</span>
                <button onClick={() => { logout(); closeMenu(); }} className='h1'><IoIosLogIn size={22} />Logout</button>
              </>
            ) : (
              <Link to="/login" className='h1' onClick={closeMenu}><IoIosLogIn size={22} />Log In</Link>
            )}
            <Link to="/userdashboard" className='h1' onClick={closeMenu}><FaUserCircle size={21} />Dashboard</Link>

            <Link to="/addtocart" className='h1 cart-link' onClick={closeMenu}><IoIosCart size={23} />Cart <span>{cart.length}</span></Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
