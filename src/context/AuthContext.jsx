
// Supabase-based AuthContext
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import bcrypt from 'bcryptjs';

// Create the Auth context
const AuthContext = createContext();

// Create a custom hook to use the Auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
  const register = async (name, email, password) => {
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
  const login = async (email, password) => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data.user;
  };

  // Admin login: check fixed credentials against admin_users table and securely check the password with bcrypt
  const adminLogin = async (email, password) => {
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
