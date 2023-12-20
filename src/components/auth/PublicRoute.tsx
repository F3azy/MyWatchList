import { useAuth } from "@/contexts/AuthContext";
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const context = useAuth();

  if (!context) {
    return null;
  }

  const { user } = context;

  if (user != null && user.emailVerified) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
