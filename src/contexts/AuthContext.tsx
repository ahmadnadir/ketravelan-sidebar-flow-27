
import { createContext, useContext, useState, ReactNode } from "react";

type UserRole = "traveler" | "agent";

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  setAuthenticated: (value: boolean) => void;
  setUserRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Default to true for demo
  const [userRole, setUserRole] = useState<UserRole>("traveler"); // Default role

  const setAuthenticated = (value: boolean) => {
    setIsAuthenticated(value);
  };

  const setUserRole = (role: UserRole) => {
    setUserRole(role);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        setAuthenticated,
        setUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
