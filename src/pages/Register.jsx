import React, { useState } from 'react';
import '../styles/CreateAccount.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import amazonLogo from '../assets/Amazon-Logo-768x432.png';
import { createAccount } from '../services/auth/createAccount'; // <-- صحّح المسار
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from 'react-router-dom';

const CreateAccount = ({ onAccountCreated, onGoToSignIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      return toast.error('Please fill in all fields', { position: 'top-center' });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return toast.error('Please enter a valid email address', { position: 'top-center' });
    }

    setLoading(true);
    try {
      const user = await createAccount({
        name: name.trim(),
        email: email.trim(),
        password,
        verifyEmail: true,
      });

      toast.success('Account created successfully! Check your email to verify.', {
        position: 'top-center',
      });

      onAccountCreated?.(user);
      navigate('/login')
    } catch (err) {
      toast.error(err?.message || 'Something went wrong.', {
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoToSignIn = (e) => {
    e.preventDefault();
    onGoToSignIn?.(); 
  };

  return (
    <div className="create-account-container d-flex justify-content-center align-items-center min-vh-100">
      <ToastContainer />
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
          <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <button
            type="submit"
            className="btn btn-warning w-100 mb-3"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create account'}
          </button>
        </form>

        <div className="mb-3">
          <strong>Buying for work?</strong><br />
          <a href="#" className="text-primary">Create a free business account</a>
        </div>

        <div className="mb-2">
          Already have an account?{' '}
          <a href="#" className="text-primary" onClick={handleGoToSignIn}>
            Sign in ▸
          </a>
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
