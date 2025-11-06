// src/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Create the authentication context
const AuthContext = createContext();

// 2. Create a mock user for demonstration purposes.
// This allows you to see what the app looks like when a user is "logged in".
const mockUser = {
    uid: 'mock-user-123',
    email: 'demo@example.com',
    displayName: 'Demo User',
    isAnonymous: false // Set to true if you want to simulate an anonymous user
};

// 3. Custom hook to easily access the auth context
export const useAuth = () => useContext(AuthContext);

// 4. Create the AuthProvider component
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // This effect simulates checking for a user's session on app load.
    useEffect(() => {
        // Simulate a network delay to show a loading state
        const timer = setTimeout(() => {
            // By default, no one is logged in (user is null).
            // To simulate a logged-in state for testing, you could uncomment the line below:
            // setCurrentUser(mockUser);
            // setIsAuthenticated(true);
            setLoading(false);
        }, 1000); // 1-second delay

        // Cleanup function
        return () => clearTimeout(timer);
    }, []);

    // Mock sign-in function
    const signIn = async () => {
        setLoading(true);
        console.log('[Mock Auth] Sign-In Attempt...');
        // Simulate an API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCurrentUser(mockUser); // Simulate successful login
        setIsAuthenticated(true);
        setLoading(false);
    };

    // Mock sign-out function
    const signOut = async () => {
        setLoading(true);
        console.log('[Mock Auth] Sign-Out');
        // Simulate an API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setCurrentUser(null);
        setIsAuthenticated(false);
        setLoading(false);
    };

    // The value that will be supplied to all children components.
    // This structure is designed to match your original Firebase-based context
    // to prevent breaking changes in other components.
    const value = {
        currentUser,
        isAuthenticated,
        loading,
        signIn,
        signOut,
        auth: null,      // Firebase auth is now null
        db: null,        // Firebase db is now null
        appId: 'mock-app-id', // A mock app ID
        userId: currentUser?.uid || 'anonymous',
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? (
                <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
                    <div className="text-xl text-indigo-500 dark:text-indigo-400">
                        Initializing authentication...
                    </div>
                </div>
            ) : children}
        </AuthContext.Provider>
    );
};