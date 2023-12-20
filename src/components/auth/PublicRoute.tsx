import { useAuth } from "@/contexts/AuthContext";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const context = useAuth();

  if (!context) {
    return null;
  }

  const { user } = context;

  if (user && !user.emailVerified && location.pathname!=="/verify") {
    return <Navigate to="/verify" />;
  }

  if (user && user.emailVerified) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;
