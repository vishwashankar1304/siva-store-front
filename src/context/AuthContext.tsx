
// Supabase-based AuthContext
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import bcrypt from 'bcryptjs';
import { User } from '@supabase/supabase-js';

// Define types for our context
interface AuthContextType {
  session: any;
  currentUser: User | null | any;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<User>;
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
  const [session, setSession] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<User | null | any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize Supabase auth state on mount
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setCurrentUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setCurrentUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Register user via Supabase Auth, plus create profile name
  const register = async (name: string, email: string, password: string) => {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    });
    if (error) throw error;
    return data.user;
  };

  // Login user via Supabase Auth
  const login = async (email: string, password: string) => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data.user;
  };

  // Admin login: check fixed credentials against admin_users table and securely check the password with bcrypt
  const adminLogin = async (email: string, password: string) => {
    // Query admin_users table for this email
    const { data, error } = await supabase
      .from('admin_users')
      .select('id, email, password')
      .eq('email', email)
      .maybeSingle();

    if (!data)
      throw new Error('Invalid admin credentials');

    // data.password is hashed, check match
    const passwordValid = await bcrypt.compare(password, data.password);
    if (!passwordValid)
      throw new Error('Invalid admin credentials');

    // Simulate admin user object (no session, separate from app users)
    setCurrentUser({ id: data.id, email: data.email, name: data.email.split('@')[0], isAdmin: true });
    // session is null for admin
    setSession(null);
    localStorage.setItem('adminUser', JSON.stringify({ id: data.id, email: data.email }));

    return true;
  };

  // Logout
  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setCurrentUser(null);
    localStorage.removeItem('adminUser');
  };

  // On provider mount: check for admin login via localStorage
  useEffect(() => {
    if (!session && !currentUser) {
      const admin = localStorage.getItem('adminUser');
      if (admin) {
        try {
          const obj = JSON.parse(admin);
          setCurrentUser({ ...obj, isAdmin: true });
        } catch {
          setCurrentUser(null);
        }
      }
    }
  }, [session, currentUser]);

  const value = {
    session,
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
