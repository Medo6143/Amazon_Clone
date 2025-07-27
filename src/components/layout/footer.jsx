import React from 'react';
import amazonLogo from '../../assets/Amazon-Logo-768x432.png';
import '../../styles/footer.css';

export const Footer = () => {
  return (
    <footer className="footer-section mt-5">
      <div className="text-center py-3 back-to-top">
        <a href="#">Back to Top</a>
      </div>

      <div className="footer-links text-light py-5">
        <div className="container">
          <div className="row text-start">
            
            <div className="col-6 col-md-3">
              <h6>Get to know Us</h6>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press Releases</a></li>
                <li><a href="#">Amazon Science</a></li>
              </ul>
            </div>
            
            <div className="col-6 col-md-3">
              <h6>Connect with Us</h6>
              <ul>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Instagram</a></li>
              </ul>
            </div>
            
            <div className="col-6 col-md-3">
              <h6>Make Money with Us</h6>
              <ul>
                <li><a href="#">Sell on Amazon</a></li>
                <li><a href="#">Sell under Amazon Accelerator</a></li>
                <li><a href="#">Protect and Build Your Brand</a></li>
                <li><a href="#">Amazon Global Selling</a></li>
                <li><a href="#">Supply to Amazon</a></li>
                <li><a href="#">Become an Affiliate</a></li>
                <li><a href="#">Fulfilment by Amazon</a></li>
                <li><a href="#">Advertise Your Products</a></li>
                <li><a href="#">Amazon Pay on Merchants</a></li>
              </ul>
            </div>
            
            <div className="col-6 col-md-3">
              <h6>Let Us Help You</h6>
              <ul>
                <li><a href="#">Your Account</a></li>
                <li><a href="#">Returns Center</a></li>
                <li><a href="#">Recalls and Product Safety Alerts</a></li>
                <li><a href="#">100% Purchase Protection</a></li>
                <li><a href="#">Amazon App Download</a></li>
                <li><a href="#">Help</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

   
      <hr className="m-0" />

      <div className="footer-bottom text-center py-4">
        <img src={amazonLogo} alt="Amazon" className="amazon-logo-footer mb-2" />
        <div className="d-flex justify-content-center align-items-center gap-3 mt-2 flex-wrap">
          <div className="language-selector">🌐 English</div>
          <div className="country-selector">🇮🇳 India</div>
        </div>
      </div>

      <div className="footer-extras py-4">
        <div className="container">
          <div className="row text-start">
            {[
              ['AbeBooks', 'Books, art', '& collectibles'],
              ['Amazon Web Services', 'Scalable Cloud', 'Computing Services'],
              ['Audible', 'Download', 'Audio Books'],
              ['IMDb', 'Movies, TV', '& Celebrities'],
              ['Shop bop', 'Designer', 'Fashion Brands'],
              ['Amazon Business', 'Everything For', 'Your Business'],
              ['Prime Now', '2-Hour Delivery', 'on Everyday Items'],
              ['Amazon Prime Music', '100 million songs, ad-free', 'Over 15 million podcast episodes'],
            ].map(([title, line1, line2], idx) => (
              <div className="col-6 col-md-3 mb-3" key={idx}>
                <p className="mb-1"><strong>{title}</strong></p>
                <p className="mb-0">{line1}</p>
                <p>{line2}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center py-3 copyright">
        <small>
          Conditions of Use & Sale &nbsp; | &nbsp; Privacy Notice &nbsp; | &nbsp; Interest-Based Ads<br />
          © 1996-2024, Amazon.com, Inc. or its affiliates
        </small>
      </div>
    </footer>
  );
};