import { useAuth } from "@/contexts/AuthContext";
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
  const context = useAuth();

  if (!context) {
    return null;
  }

  const { user } = context;

  if(!user) {
    return <Navigate to="/signin" />
  }

  return children;
};

export default PrivateRoutes;
