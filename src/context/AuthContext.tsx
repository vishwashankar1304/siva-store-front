
import React, { createContext, useContext, useEffect, useState } from 'react';

// Define types for our context
interface AuthContextType {
  currentUser: any;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<any>;
  register: (name: string, email: string, password: string) => Promise<any>;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

// Create the Auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a custom hook to use the Auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize auth state on mount
  useEffect(() => {
    // Check for admin user in localStorage
    const admin = localStorage.getItem('adminUser');
    if (admin) {
      try {
        const obj = JSON.parse(admin);
        setCurrentUser({ ...obj, isAdmin: true });
      } catch (error) {
        console.error("Error parsing admin user from localStorage:", error);
        setCurrentUser(null);
      }
    }
    setLoading(false);
  }, []);

  // Register user - to be implemented with MongoDB
  const register = async (name: string, email: string, password: string) => {
    // Mock implementation for now
    console.log("Register called with:", name, email);
    return { id: 'temp-user-id', email, name };
  };

  // Login user - to be implemented with MongoDB
  const login = async (email: string, password: string) => {
    // Mock implementation for now
    console.log("Login called with:", email);
    return { id: 'temp-user-id', email };
  };

  // Admin login - to be implemented with MongoDB
  const adminLogin = async (email: string, password: string) => {
    // This is now handled in the AdminLogin component
    return true;
  };

  // Logout
  const logout = async () => {
    localStorage.removeItem('adminUser');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser && !currentUser.isAdmin,
    isAdmin: !!currentUser?.isAdmin,
    login,
    register,
    adminLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
