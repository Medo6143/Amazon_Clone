import React from 'react';
import amazonLogo from '../../assets/Amazon-Logo-768x432.png';
import'../../styles/footer.css';
export const Footer = () => {
  return (
    <footer className="footer-section ">
      {/* Back to Top */}
      <div className="text-center py-3 back-to-top">
        <a href="#">Back to Top</a>
      </div>

      {/* Main Links */}
      <div className="footer-links text-light py-5">
        <div className="container">
          <div className="row text-start">
            {/* Column 1 */}
            <div className="col-6 col-md-3">
              <h6>Get to know Us</h6>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press Releases</a></li>
                <li><a href="#">Amazon Science</a></li>
              </ul>
            </div>
            {/* Column 2 */}
            <div className="col-6 col-md-3">
              <h6>Connect with Us</h6>
              <ul>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Instagram</a></li>
              </ul>
            </div>
            {/* Column 3 */}
            <div className="col-6 col-md-3">
              <h6>Make Money with Us</h6>
              <ul>
                <li><a href="#">Sell on Amazon</a></li>
                <li><a href="#">Amazon Accelerator</a></li>
                <li><a href="#">Build Your Brand</a></li>
                <li><a href="#">Amazon Global Selling</a></li>
                <li><a href="#">Supply to Amazon</a></li>
                <li><a href="#">Affiliate Program</a></li>
                <li><a href="#">Fulfillment</a></li>
                <li><a href="#">Advertise Products</a></li>
              </ul>
            </div>
            {/* Column 4 */}
            <div className="col-6 col-md-3">
              <h6>Let Us Help You</h6>
              <ul>
                <li><a href="#">Your Account</a></li>
                <li><a href="#">Returns Center</a></li>
                <li><a href="#">Product Alerts</a></li>
                <li><a href="#">Purchase Protection</a></li>
                <li><a href="#">App Download</a></li>
                <li><a href="#">Help</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Logo and Country */}
      <div className="footer-bottom text-center py-3">
        <img src={amazonLogo} alt="Amazon" className="amazon-logo-footer" />
        <div className="language-selector d-inline-block mx-3">🌐 English</div>
        <div className="country-selector d-inline-block">🇮🇳 India</div>
      </div>

      {/* Extra Services */}
      <div className="footer-extras py-3">
        <div className="container">
          <div className="row text-start">
            {[
              ['AbeBooks', 'Books, art', '& collectibles'],
              ['Amazon Web Services', 'Scalable Cloud', 'Computing Services'],
              ['Audible', 'Download', 'Audio Books'],
              ['IMDb', 'Movies, TV', '& Celebrities'],
              ['Shopbop', 'Designer', 'Fashion Brands'],
              ['Amazon Business', 'Everything For', 'Your Business'],
              ['Prime Now', '2-Hour Delivery', 'on Everyday Items'],
              ['Amazon Prime Music', '100 million songs, ad-free', 'Over 15 million podcast episodes'],
            ].map(([title, line1, line2], index) => (
              <div className="col-6 col-md-3 mb-3" key={index}>
                <p><strong>{title}</strong><br />{line1}<br />{line2}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-muted py-3">
        <small>
          Conditions of Use & Sale &nbsp; | &nbsp; Privacy Notice &nbsp; | &nbsp; Interest-Based Ads<br />
          © 1996-2024, Amazon.com, Inc. or its affiliates
        </small>
      </div>
    </footer>
  );
};
