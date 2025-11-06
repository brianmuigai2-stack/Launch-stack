import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../contexts/ProfileContext';
import EmailPasswordForm from '../components/EmailPasswordForm';

const ProfilePage = () => {
  const { isAuthenticated, currentUser } = useAuth();
  // Using the new isLoading state from the Profile context
  const { userProfile, saveProfile, isLoading: isProfileLoading } = useProfile();

  const [nameInput, setNameInput] = useState(userProfile.name);
  const [pictureInput, setPictureInput] = useState(userProfile.pictureUrl);
  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'saving', 'success', 'error'
  
  // Sync local input state with context state
  React.useEffect(() => {
    setNameInput(userProfile.name);
    setPictureInput(userProfile.pictureUrl);
  }, [userProfile.name, userProfile.pictureUrl]);


  const handleSave = async (e) => {
    e.preventDefault();
    setSaveStatus('saving');
    
    // Call the permanent save function
    const success = await saveProfile(nameInput, pictureInput);
    
    if (success) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus(null), 3000);
        setIsEditing(false);
    } else {
        setSaveStatus('error');
        setTimeout(() => setSaveStatus(null), 5000);
    }
  };
  
  // --- Render Unauthenticated State (Shows Auth Form) ---
  if (!isAuthenticated) {
    return (
      <div className="py-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-10">
          Account Access
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
          Please sign in or create an account to manage your profile and stack.
        </p>
        <EmailPasswordForm />
      </div>
    );
  }

  // --- Render Loading State ---
  if (isProfileLoading) {
    return (
        <div className="flex items-center justify-center py-20 text-indigo-600 dark:text-indigo-400">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Loading Profile Data...
        </div>
    );
  }

  // --- Render Authenticated State ---
  return (
    <div className="max-w-3xl mx-auto py-6">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
        Your Profile
      </h1>
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 md:p-10">
        
        {/* Profile Header */}
        <div className="flex items-center space-x-6 pb-6 border-b dark:border-gray-700">
          <img 
            className="h-24 w-24 rounded-full object-cover border-4 border-indigo-500 dark:border-indigo-400"
            src={userProfile.pictureUrl}
            alt={`${userProfile.name}'s avatar`}
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{userProfile.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{userProfile.email}</p>
            <p className="text-xs mt-1 text-indigo-600 dark:text-indigo-400">User ID: {currentUser.uid}</p>
          </div>
        </div>
        
        {/* Editing/Display Form */}
        <form onSubmit={handleSave} className="space-y-6 pt-6">
            
            {/* Status Message */}
            {saveStatus === 'success' && (
                <div className="p-3 text-sm font-medium text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-300 rounded-lg">
                    ✅ Profile successfully saved!
                </div>
            )}
            {saveStatus === 'error' && (
                <div className="p-3 text-sm font-medium text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-300 rounded-lg">
                    ❌ Error saving profile. Please check the console.
                </div>
            )}


            {/* Name Field */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input
                    id="name"
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    readOnly={!isEditing}
                    className={`mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white ${isEditing ? 'border-gray-300 dark:border-gray-600' : 'border-transparent bg-gray-50 dark:bg-gray-900/50'}`}
                />
            </div>
            
            {/* Picture URL Field */}
            <div>
                <label htmlFor="pictureUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Picture URL</label>
                <input
                    id="pictureUrl"
                    type="url"
                    value={pictureInput}
                    onChange={(e) => setPictureInput(e.target.value)}
                    readOnly={!isEditing}
                    className={`mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white ${isEditing ? 'border-gray-300 dark:border-gray-600' : 'border-transparent bg-gray-50 dark:bg-gray-900/50'}`}
                />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
                {isEditing ? (
                    <>
                        <button 
                            type="button" 
                            onClick={() => { setIsEditing(false); setNameInput(userProfile.name); setPictureInput(userProfile.pictureUrl); }}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150"
                            disabled={saveStatus === 'saving'}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:bg-indigo-700 transition duration-150 disabled:bg-indigo-400"
                            disabled={saveStatus === 'saving'}
                        >
                            {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
                        </button>
                    </>
                ) : (
                    <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-indigo-600 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:bg-indigo-700 transition duration-150"
                    >
                        Edit Profile
                    </button>
                )}
            </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;