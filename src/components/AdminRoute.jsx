
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { currentUser, isAdmin } = useAuth();

  // If no user at all, redirect to admin login
  if (!currentUser) {
    return <Navigate to="/admin/login" />;
  }

  // If user exists but is not admin, redirect to homepage
  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  // User exists and is admin
  return children;
};

export default AdminRoute;
