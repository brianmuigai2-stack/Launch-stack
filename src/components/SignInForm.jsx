import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Need this import for useAuth

const SignInForm = ({ onSuccessfulSignIn }) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Added name, though often collected at signup

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 💡 Simulated Sign-in Logic:
    // In a real app, you would send email/password to an API here.
    console.log(`Attempting sign-in for: ${email}`);
    
    // For now, we simulate success and call the global signIn function
    signIn(); 
    
    // Optional: Call a callback to close a modal or redirect
    if (onSuccessfulSignIn) {
      onSuccessfulSignIn();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white dark:bg-gray-700 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">Sign In / Register</h3>

      {/* Name Field (Optional for sign-in, but added for clarity) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name (Optional)</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
      >
        Sign In and Access Tools
      </button>
    </form>
  );
};

export default SignInForm;