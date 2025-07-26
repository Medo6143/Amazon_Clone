// src/routes/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();


  return user ? children : <Navigate to="/login" replace />;
}
