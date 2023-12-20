import { useAuth } from "@/contexts/AuthContext";
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
  const context = useAuth();

  if (!context) {
    return null;
  }

  const { user } = context;

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (!user?.emailVerified) {
    return <Navigate to="/verify" />;
  }

  return children;
};

export default PrivateRoutes;
