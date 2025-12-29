import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";
import Navbar from "../components/Navbar";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render a simple authenticated layout with Navbar
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default PrivateRoute;
