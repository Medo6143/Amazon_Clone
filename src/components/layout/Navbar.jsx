import React, { useState, useEffect } from 'react';
import {
  FaMapMarkerAlt,
  FaSearch,
  FaBars,
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaBoxOpen,
  FaTimes,
  FaGlobe
} from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import amazonLogo from '../../assets/White-Amazon-Logo-PNG-HD-Quality.png';
import '../../styles/navbar.css';
import { useAuth } from '../../services/context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { useCart } from '../../hooks/useproductCart';
import { useWishlist } from '../../hooks/useWishlist';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { cartItems } = useCart();
  const { items } = useWishlist()

  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleSearch = () => setShowSearch(!showSearch);

  useEffect(() => {
    setMobileMenuOpen(false);
    setShowSearch(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = () => {
    if (searchTerm.trim) {
      navigate(`/products/${searchTerm}`);

    };
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="navbar-modern bg-dark text-white sticky-top">
      {/* Top Navigation */}
      <div className="container-fluid py-2 px-3">
        {/* Mobile Header Row */}
        <div className="d-flex justify-content-between align-items-center d-md-none">
          <button className="btn btn-outline-light p-2" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <Link to="/" className="mx-auto">
            <img src={amazonLogo} alt="Amazon" className="mobile-logo" />
          </Link>

          <div className="d-flex">
            <button className="btn btn-outline-light p-2 me-2" onClick={toggleSearch}>
              <FaSearch />
            </button>
            <Link to="/cart" className="position-relative">
              <FaShoppingCart className="text-white" />
              <span className="badge bg-warning text-dark rounded-pill position-absolute top-0 start-100 translate-middle">
                {cartItems.length}
              </span>
            </Link>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="d-none d-md-flex flex-wrap justify-content-between align-items-center gap-3">
          <div className="d-flex align-items-center gap-3">
            <Link to="/">
              <img src={amazonLogo} alt="Amazon" className="desktop-logo ms-3 mt-1" />
            </Link>
            <div className="d-flex align-items-start">
              <FaMapMarkerAlt className="me-1 mt-1" />
              <div style={{ lineHeight: '1' }}>
                <small className="text-muted">Deliver to</small>
                <div><strong>Cairo</strong></div>
              </div>
            </div>
          </div>

          <div className="search-bar flex-grow-1">
            <div className="input-group">
              <input type="text" className="form-control rounded-lg" placeholder="Search Amazon"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value) }}
                onKeyDown={handleKeyPress} />
              <button className="btn btn-warning rounded-end px-3"
                onClick={handleSearch}>
                <FaSearch />
              </button>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="lang d-flex align-items-center">
              <FaGlobe className="me-1" />
              <span>EN</span>
            </div>

            <div className="dropdown-center account-dropdown">
              <button className="btn btn-link text-white dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown">
                <div className="text-start">
                  <small>Hello, {user?.displayName || 'Guest'}</small>
                  <div><strong>Account</strong></div>
                </div>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link to="/profile" className="dropdown-item">Your Profile</Link></li>
                <li><Link to="/cart" className="dropdown-item">Your Orders</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>

            <Link to="/wishlist" className="text-white position-relative nav-icon">
              <FaHeart />
              <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
                {items.length}
              </span>
            </Link>

            <Link to="/cart" className="text-white d-flex align-items-center nav-icon position-relative">
              <FaShoppingCart />
              <span className="badge bg-warning text-dark rounded-pill position-absolute top-0 start-100 translate-middle">
                {cartItems.length}
              </span>
              <span className="ms-1"><strong>Cart</strong></span>
            </Link>

            <Link to="/products" className="btn btn-success btn-sm d-flex align-items-center">
              <FaBoxOpen className="me-1" />
              Products
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        {showSearch && (
          <div className="mobile-search-bar mt-2 d-md-none">
            <div className="input-group">
              <input type="text" className="form-control rounded-lg" placeholder="Search Amazon"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value) }}
                onKeyDown={handleKeyPress} />
              <button className="btn btn-warning rounded-end px-3"
                onClick={handleSearch}>
                <FaSearch />
              </button>

            </div>
          </div>
        )}
      </div>



      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu bg-dark p-3 d-md-none">
          <div className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center gap-2 mb-2">
              <FaUser className="text-warning" />
              <span className="text-white">Hello, {user?.displayName || 'Sign In'}</span>
            </div>

            <h6 className="text-white">Shop By Department</h6>
            <Link to="/products" className="nav-link d-flex align-items-center">
              <FaBoxOpen className="me-2" />
              All Products
            </Link>

            <Link to="/wishlist" className="nav-link d-flex align-items-center">
              <FaHeart className="me-2" />
              Wishlist
            </Link>

            <h6 className="text-white mt-3">Account & Settings</h6>
            <Link to="/profile" className="nav-link">Your Profile</Link>
            <button className="nav-link text-danger text-start p-0 border-0 bg-transparent" onClick={handleLogout}>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
