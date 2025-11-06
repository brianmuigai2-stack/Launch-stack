import React from 'react';
import { Link } from 'react-router-dom';
import SignInForm from '../components/SignInForm';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'; 

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSuccessfulSignIn = () => {
    // Navigate to the tools page after successful sign-in
    navigate('/tools');
  };

  return (
    <div className="min-h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      
      {/* --- Main Layout Grid --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-2 gap-10 items-start">
        
        {/* --- Left Column: Marketing & Value Proposition --- */}
        <div className="py-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-4">
                LaunchStack: Stop Guessing. Start Scaling. 🚀
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
                The curated, battle-tested toolkit designed specifically for solo founders and indie hackers. 
                Find the exact software you need to launch, monetize, and grow, **without the technical debt.**
            </p>

            {/* --- NEW: Category Breakdown Section --- */}
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-10 border-b pb-2 dark:border-gray-700">
                What's In The Stack?
            </h2>
            <div className="space-y-6">
                <CategoryHighlight icon="☁️" title="Hosting & Deployment" description="Choose reliable infrastructure with zero-config deployment. Includes solutions like **Vercel**, **Netlify**, and **DigitalOcean**." />
                <CategoryHighlight icon="💰" title="Payments & Commerce" description="Secure billing, subscription management, and global tax compliance. Featuring services like **Stripe**, **Paddle**, and **Lemon Squeezy**." />
                <CategoryHighlight icon="📧" title="Marketing & Outreach" description="Tools to build your audience, send transactional emails, and automate workflows. Find **ConvertKit**, **Resend**, and **Mailchimp** alternatives." />
                <CategoryHighlight icon="📊" title="Analytics & SEO" description="Gain insights without invading privacy. From simple privacy-focused analytics like **Plausible** to deep dive SEO tools like **Ahrefs**." />
                <CategoryHighlight icon="💾" title="Database & Backend" description="Powerful, scalable backends for rapid development. Explore options like **Supabase**, **Firebase**, and **PostgreSQL**." />
            </div>

            {/* Display a link to tools if already signed in */}
            {isAuthenticated && (
                <p className="mt-8 text-lg">
                    You're logged in! Go to the <Link to="/tools" className="text-indigo-500 hover:underline font-bold">Tools Dashboard</Link>.
                </p>
            )}
        </div>

        {/* --- Right Column: Sign-In Form --- */}
        <div className="sticky top-20"> 
            {!isAuthenticated ? (
                <SignInForm onSuccessfulSignIn={handleSuccessfulSignIn} /> 
            ) : (
                <div className="p-6 bg-green-50 dark:bg-green-900 rounded-lg text-center">
                    <p className="text-xl font-semibold text-green-800 dark:text-green-300">
                        Welcome Back! Click Tools above to continue!
                    </p>
                </div>
            )}
        </div>
      </div>
      
    </div>
  );
};

// New Helper Component for Cleaner JSX
const CategoryHighlight = ({ icon, title, description }) => (
    <div className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
        <span className="text-2xl pt-1 flex-shrink-0">{icon}</span>
        <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
    </div>
);

export default LandingPage;