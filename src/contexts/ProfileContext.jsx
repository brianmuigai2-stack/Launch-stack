// src/ProfileContext.jsx

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const { currentUser, isAuthenticated, userId } = useAuth();
  
  const [userProfile, setUserProfile] = useState({
    name: 'Guest User',
    email: 'guest@example.com',
    pictureUrl: 'https://i.pravatar.cc/150?img=5', 
    isSynced: false, // Represents if the profile is "loaded" for a logged-in user
    isLoading: true, // Loading state for profile data
  });

  // --- 1. Load Profile from Mock "Backend" on Auth Change ---
  useEffect(() => {
    // Set loading to true whenever auth state changes
    setUserProfile(prev => ({ ...prev, isLoading: true }));

    if (isAuthenticated && userId && userId !== 'anonymous') {
        // Simulate a network delay to fetch profile data
        const timer = setTimeout(() => {
            console.log("[Mock Profile] Loading profile for user:", userId);
            
            // Initialize with data from the mock AuthContext
            const initialName = currentUser?.displayName || 'Indie Hacker';
            const initialEmail = currentUser?.email || 'user@launchstack.com';
            const initialAvatarIndex = Math.abs(userId.charCodeAt(0) % 10) + 1;
            const initialPictureUrl = currentUser?.photoURL || `https://i.pravatar.cc/150?img=${initialAvatarIndex}`;

            setUserProfile({
                name: initialName,
                email: initialEmail,
                pictureUrl: initialPictureUrl,
                isSynced: true, // Profile is now considered "loaded" or "synced"
                isLoading: false,
            });
        }, 1000); // 1-second delay

        return () => clearTimeout(timer);

    } else {
        // Reset to guest state if logged out or anonymous
        setUserProfile({
            name: 'Guest User',
            email: 'guest@example.com',
            pictureUrl: 'https://i.pravatar.cc/150?img=5',
            isSynced: false,
            isLoading: false,
        });
    }
  }, [isAuthenticated, userId, currentUser]);


  // --- 2. Save Profile to Mock "Backend" ---
  const saveProfile = useCallback(async (newName, newPictureUrl) => {
    if (!isAuthenticated || userId === 'anonymous') {
      console.warn("[Mock Profile] Cannot save: User not authenticated.");
      return false;
    }
    
    console.log("[Mock Profile] Attempting to save profile...");
    console.log("[Mock Profile] New Name:", newName);
    console.log("[Mock Profile] New Picture URL:", newPictureUrl);
    
    // Simulate a network request delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Update the local state with the new profile data
    setUserProfile(prev => ({
        ...prev,
        name: newName,
        pictureUrl: newPictureUrl,
    }));
    
    console.log("[Mock Profile] Profile saved successfully!");
    return true;
  }, [isAuthenticated, userId]);


  const value = {
    userProfile,
    saveProfile,
    isLoading: userProfile.isLoading,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};