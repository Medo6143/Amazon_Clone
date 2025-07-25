import React, { useState, useEffect } from 'react';
import '../../styles/LoginPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import amazonLogo from '../../assets/Amazon-Logo-768x432.png';

export default function LoginPage({ switchToCreate, prefillData }) {
  const [emailOrPhone, setEmailOrPhone] = useState('');

  useEffect(() => {
    if (prefillData?.emailOrPhone) {
      setEmailOrPhone(prefillData.emailOrPhone);
    }
  }, [prefillData]);

  const handleLogin = (e) => {
    e.preventDefault();
    alert('Logged in with: ' + emailOrPhone);
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center min-vh-100">
      <div className="login-box p-4 rounded shadow bg-white">
        <div className="text-center mb-3">
          <img src={amazonLogo} alt="Amazon" className="amazon-logo" />
        </div>
        <h4 className="mb-3">Sign in</h4>
        <form onSubmit={handleLogin}>
          <label className="form-label">Email or mobile phone number</label>
          <input
            type="text"
            className="form-control mb-3"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
          />
          <button type="submit" className="btn btn-warning w-100 mb-3">
            Continue
          </button>
          <p className="small">
            By continuing, you agree to Amazon’s <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>.
          </p>
          <a href="#" className="small text-primary">► Need help?</a>
          <hr />
          <div className="small mb-2 fw-bold">Buying for work?</div>
          <a href="#" className="small text-primary d-block mb-3">Shop on Amazon Business</a>
          <hr />
          <p className="text-center small text-muted mb-2">New to Amazon?</p>
          <button
            type="button"
            onClick={switchToCreate}
            className="btn btn-light border w-100"
          >
            Create your Amazon account
          </button>
        </form>
      </div>
    </div>
  );
}
