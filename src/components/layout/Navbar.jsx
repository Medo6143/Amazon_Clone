import React from 'react';
import {
  FaMapMarkerAlt,
  FaSearch,
  FaBars,
  FaShoppingCart,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import amazonLogo from '../../assets/Amazon-Logo-768x432.png';
import '../../styles/navbar.css';
import { FaHeart } from 'react-icons/fa'

export const Navbar = () => {

  return (
    <header className="bg-dark text-white">
      <div className="container-fluid px-3">
        {/* Top Navbar */}
        <div className="d-flex flex-wrap justify-content-between align-items-center py-2 gap-3">
          {/* Logo & Location */}
          <div className="d-flex align-items-center gap-3 flex-shrink-0">
            <img
              src={amazonLogo}
              alt="Amazon"
              className="amazon-logo"
            />
            <div className="location d-none d-md-flex align-items-start">
              <FaMapMarkerAlt className="me-1 mt-1" />
              <div style={{ lineHeight: '1' }}>
                <small>Delivering to Surat 394210</small>
                <div><strong>Update location</strong></div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="search-bar d-flex flex-grow-1 flex-shrink-1">
            <select className="form-select category-select">
              <option>All</option>
              <option>Books</option>
              <option>Electronics</option>
            </select>
            <input
              type="text"
              className="form-control"
              placeholder="Search Amazon"
            />
            <button className="btn btn-warning">
              <FaSearch />
            </button>
          </div>

          {/* Right Side Icons */}
          <div className="d-flex align-items-center gap-3 flex-shrink-0">
            <div className="lang d-flex align-items-center d-none d-sm-flex">
              <img
                src="https://flagcdn.com/in.svg"
                alt="India Flag"
                style={{ width: '20px', height: '15px' }}
                className="me-1"
              />
              <span>EN</span>
            </div>

            <div className="account text-white d-none d-md-block">
              <small>Hello, sign in</small>
              <div><strong>Account & Lists ▾</strong></div>
            </div>

            <div className="returns text-white d-none d-md-block">
              <small>Returns</small>
              <div><strong>& Orders</strong></div>
            </div>
            <Link to="/wishlist" className="nav-link position-relative">
              <FaHeart size={20} />
            </Link>
            <Link to="/cart" className="no-underline">
              <div className="cart d-flex align-items-center text-white">
                <FaShoppingCart className="me-1 " />
                <strong>Cart</strong>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="bottom-navbar bg-secondary text-white px-3 py-2">
        <div className="container-fluid">
          <div className="d-flex flex-wrap align-items-center gap-3 justify-content-center justify-content-md-start text-center text-md-start">
            <div className="d-flex align-items-center gap-1">
              <FaBars />
              <span>All</span>
            </div>
            <span>Amazon miniTV</span>
            <span>Sell</span>
            <span>Best Sellers</span>
            <span>Today's Deals</span>
            <span>Mobiles</span>
            <span className="d-none d-sm-inline">Customer Service</span>
            <span>Prime ▾</span>
            <span className="d-none d-sm-inline">Electronics</span>
            <span className="d-none d-sm-inline">Fashion</span>
            <span className="d-none d-md-inline">New Releases</span>
            <span className="d-none d-md-inline">Home & Kitchen</span>
            <span className="d-none d-md-inline">Amazon Pay</span>
          </div>
        </div>
      </div>
    </header>
  );
};
