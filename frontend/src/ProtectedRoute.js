// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom'; // Import Navigate instead of Redirect
import { useAuth } from './PrivateRoute';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loggedIn } = useAuth();

  return (
    <Route
      {...rest}
      element={loggedIn ? <Component /> : <Navigate to="/login" />} // Use Navigate instead of Redirect
    />
  );
};

export default ProtectedRoute;
