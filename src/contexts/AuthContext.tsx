import React, { useContext } from "react";
import { auth } from "@/firebase";

const AuthContext = React.createContext<null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
