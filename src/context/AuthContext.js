"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setAuthCookie, removeAuthCookie } from '@/utils/cookies';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component that wraps the app and makes auth object available to any child component that calls useAuth()
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Sign up function
  const signup = (email, password, name) => {
    // In a real app, this would be an API call to create a user
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      // In a real app, you would never store the password in local storage
      // This is just for demonstration purposes
      password
    };
    
    localStorage.setItem('user', JSON.stringify(newUser));
    setAuthCookie(); // Set the auth cookie
    setUser(newUser);
    return newUser;
  };

  // Login function
  const login = (email, password) => {
    // In a real app, this would be an API call to validate credentials
    const storedUser = localStorage.getItem('user');
    
    if (!storedUser) {
      throw new Error('No user found. Please sign up first.');
    }
    
    const user = JSON.parse(storedUser);
    
    if (user.email !== email || user.password !== password) {
      throw new Error('Invalid email or password');
    }
    
    setAuthCookie(); // Set the auth cookie
    setUser(user);
    return user;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    removeAuthCookie(); // Remove the auth cookie
    router.push('/login');
  };

  // Value object that will be passed to any consumer components
  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
