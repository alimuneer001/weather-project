"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setAuthCookie, removeAuthCookie, hasAuthCookie } from '@/utils/cookies';

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

  // Check if user is logged in on initial load and fetch user data if needed
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (hasAuthCookie()) {
          // Fetch the current user data from the API
          const response = await fetch('/api/auth/me');
          if (response.ok) {
            const data = await response.json();
            if (data.user) {
              setUser(data.user);
            }
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Sign up function - now just updates the context with user data from the API
  const signup = (userData) => {
    setUser(userData);
    return userData;
  };

  // Login function - now just updates the context with user data from the API
  const login = (userData) => {
    setUser(userData);
    return userData;
  };

  // Logout function
  const logout = async () => {
    try {
      // Call the logout API endpoint
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      setUser(null);
      removeAuthCookie();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
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
