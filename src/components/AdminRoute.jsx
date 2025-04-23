
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { currentUser, isAdmin } = useAuth();

  console.log("AdminRoute check - currentUser:", currentUser);
  console.log("AdminRoute check - isAdmin:", isAdmin);

  // If no user at all, redirect to admin login
  if (!currentUser) {
    console.log("AdminRoute - No current user, redirecting to admin login");
    return <Navigate to="/admin/login" />;
  }

  // If user exists but is not admin, redirect to homepage
  if (!isAdmin) {
    console.log("AdminRoute - User is not admin, redirecting to homepage");
    return <Navigate to="/" />;
  }

  // User exists and is admin
  console.log("AdminRoute - Access granted to admin");
  return children;
};

export default AdminRoute;
