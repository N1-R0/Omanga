// src/contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);
      
      try {
        setUser(firebaseUser);
        
        if (firebaseUser) {
          // Get user profile from Firestore
          const profile = await authService.getUserDocument(firebaseUser.uid);
          setUserProfile(profile);
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        console.error('Error in auth state change:', error);
        setUserProfile(null);
      } finally {
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const signUp = async (data) => {
    setIsLoading(true);
    try {
      const result = await authService.signUp(data);
      if (result.success && result.user) {
        setUserProfile(result.user);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data) => {
    setIsLoading(true);
    try {
      const result = await authService.login(data);
      if (result.success && result.user) {
        setUserProfile(result.user);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const result = await authService.logout();
      if (result.success) {
        setUser(null);
        setUserProfile(null);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email) => {
    return await authService.resetPassword(email);
  };

  const updateProfile = async (updates) => {
    const result = await authService.updateProfile(updates);
    
    if (result.success) {
      await refreshUserProfile();
    }
    
    return result;
  };

  const refreshUserProfile = async () => {
    if (user) {
      try {
        const profile = await authService.getUserDocument(user.uid);
        setUserProfile(profile);
      } catch (error) {
        console.error('Error refreshing user profile:', error);
      }
    }
  };

  const value = {
    // State
    user,
    userProfile,
    isLoading,
    isAuthenticated: !!user,

    // Actions
    signUp,
    login,
    logout,
    resetPassword,
    updateProfile,
    refreshUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;