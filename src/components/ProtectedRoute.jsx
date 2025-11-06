import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import the new hook

// This component wraps the routes you want to protect
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  
  // Outlet renders the child route element (e.g., <HomePage />)
  // If not authenticated, navigate to the '/' (LandingPage)
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;