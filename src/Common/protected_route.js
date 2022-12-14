import { useAuth } from "Auth/auth_provider";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();
  
    if (!token) {
      return <Navigate to="/home" replace />;
    }
  
    return children;
  };
  export default ProtectedRoute;