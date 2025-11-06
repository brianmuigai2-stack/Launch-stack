import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Path is correct, adding extension for stability

const EmailPasswordForm = () => {
  const { signInWithEmail, signUpWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        setLoading(false);
        return;
    }

    try {
      if (isSigningUp) {
        // Attempt to create a new user
        await signUpWithEmail(email, password);
      } else {
        // Attempt to sign in an existing user
        await signInWithEmail(email, password);
      }
      
    } catch (err) {
      console.error(err);
      // Firebase error handling
      let errorMessage = "An unknown error occurred.";
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        errorMessage = "Invalid email or password.";
      } else if (err.code === 'auth/email-already-in-use') {
        errorMessage = "This email is already registered. Please sign in.";
      } else if (err.code === 'auth/weak-password') {
        errorMessage = "Password is too weak. Must be at least 6 characters.";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        {isSigningUp ? 'Create Your Account' : 'Sign In'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="you@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="Min 6 characters"
          />
        </div>

        {error && (
          <div className="p-3 text-sm font-medium text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-300 rounded-lg">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition duration-200 ${
            loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          }`}
        >
          {loading ? 'Processing...' : (isSigningUp ? 'Sign Up' : 'Sign In')}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <button
          onClick={() => setIsSigningUp(!isSigningUp)}
          className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline"
        >
          {isSigningUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
        </button>
      </div>
    </div>
  );
};

export default EmailPasswordForm;