import React, { useState } from 'react';
import '../../styles/CreateAccount.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import amazonLogo from '../../styles/LoginPage.css';

const CreateAccount = ({ onAccountCreated }) => {
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();

    if (!name || !emailOrPhone || !password) {
      alert('Please fill in all fields');
      return;
    }

    onAccountCreated({ name, emailOrPhone });
  };

  return (
    <div className="create-account-container d-flex justify-content-center align-items-center min-vh-100">
      <div className="form-box p-4 rounded shadow-sm bg-white">
        <div className="text-center mb-3">
          <img src={amazonLogo} alt="Amazon Logo" className="amazon-logo mb-2" />
        </div>

        <h4 className="mb-3">Create Account</h4>

        <form onSubmit={handleCreate}>
          <div className="mb-3">
            <label className="form-label">Your name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email or mobile number</label>
            <input
              type="text"
              className="form-control"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-warning w-100 mb-3">
            Verify mobile number
          </button>
        </form>

        <div className="mb-3">
          <strong>Buying for work?</strong><br />
          <a href="#" className="text-primary">Create a free business account</a>
        </div>

        <div className="mb-2">
          Already have an account? <a href="#" className="text-primary" onClick={() => onAccountCreated({})}>Sign in ▸</a>
        </div>

        <p className="text-muted small">
          By creating an account or logging in, you agree to Amazon's<br />
          <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>.
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;
