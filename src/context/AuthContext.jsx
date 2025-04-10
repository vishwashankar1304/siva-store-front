
import { createContext, useContext, useState, useEffect } from 'react';

// Create the Auth context
const AuthContext = createContext();

// Create a custom hook to use the Auth context
export const useAuth = () => useContext(AuthContext);

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function (simulated)
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simulating API call
      setTimeout(() => {
        // For demo: accept any email with password "password123"
        if (password === "password123") {
          const user = { 
            id: "123", 
            name: email.split('@')[0], 
            email: email,
            isAdmin: email === "admin@example.com"
          };
          
          setCurrentUser(user);
          localStorage.setItem('user', JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 500);
    });
  };

  // Register function (simulated)
  const register = (name, email, password) => {
    return new Promise((resolve, reject) => {
      // Simulating API call
      setTimeout(() => {
        const user = { 
          id: "123", 
          name: name, 
          email: email,
          isAdmin: false
        };
        
        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        resolve(user);
      }, 500);
    });
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  // Value to be provided by the context
  const value = {
    currentUser,
    login,
    register,
    logout,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
