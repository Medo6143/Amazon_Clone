import React, { useState, useEffect } from 'react';
import '../styles/LoginPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import amazonLogo from '../assets/Amazon-Logo-768x432.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth/login'; 

export default function LoginPage({ switchToCreate, prefillData }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (prefillData?.emailOrPhone) {
      setEmail(prefillData.emailOrPhone);
    }
  }, [prefillData]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      return toast.error('Please fill in all fields', { position: 'top-center' });
    }

    setLoading(true);
    try {
      const user = await login({
        email: email.trim(),
        password,
        checkVerified: false,   
      });

      toast.success('Logged in successfully!', { position: 'top-center' });


      navigate('/');
    } catch (err) {
      toast.error(mapFirebaseError(err), { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center min-vh-100">
      <ToastContainer />
      <div className="login-box p-4 rounded shadow bg-white">
        <div className="text-center mb-3">
          <img src={amazonLogo} alt="Amazon" className="amazon-logo" />
        </div>

        <h4 className="mb-3">Sign in</h4>

        <form onSubmit={handleLogin}>
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="form-label">Password</label>
          <div className="input-group mb-3">
            <input
              type={showPwd ? 'text' : 'password'}
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPwd((p) => !p)}
              tabIndex={-1}
            >
              {showPwd ? 'Hide' : 'Show'}
            </button>
          </div>

          <button type="submit" className="btn btn-warning w-100 mb-3" disabled={loading}>
          {loading ? 'Signing in...' : 'Continue'}
          </button>

          <p className="small">
            By continuing, you agree to Amazon’s <a href="#">Conditions of Use</a> and{' '}
            <a href="#">Privacy Notice</a>.
          </p>

          <a href="/forgot-password" className="small text-primary">► Need help?</a>

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

// ---------- Helpers ----------
function mapFirebaseError(err) {
  const code = err?.code || '';
  switch (code) {
    case 'auth/invalid-email':
      return 'Invalid email address.';
    case 'auth/user-disabled':
      return 'This user has been disabled.';
    case 'auth/user-not-found':
      return 'No user found with this email.';
    case 'auth/wrong-password':
      return 'Wrong password.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Try again later.';
    default:
      return err?.message || 'Something went wrong.';
  }
}
