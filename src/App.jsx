import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useTheme } from './contexts/ThemeContext.jsx'; // 👈 Added .jsx
import { StackProvider } from './hooks/useStack.jsx';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx'; // 👈 Added .jsx
import { ProfileProvider, useProfile } from './contexts/ProfileContext.jsx'; // 👈 Added .jsx
import ProtectedRoute from './components/ProtectedRoute.jsx'; // 👈 Added .jsx
import './App.css'; 

// Page Imports (Adding .jsx extension for consistency)
import LandingPage from './pages/LandingPage.jsx'; 
import HomePage from './pages/HomePage.jsx';
import ToolDetailPage from './pages/ToolDetailPage.jsx';
import MyStackPage from './pages/MyStackPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

// Defined Header first
const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated, signOut, signIn } = useAuth();
  const { userProfile } = useProfile(); 

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="block">
          <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">LaunchStack</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">The curated toolkit for indie hackers.</p>
        </Link>
        <nav className="flex space-x-4 items-center">
          <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          
          {isAuthenticated && (
            <>
              <Link to="/tools" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Tools</Link> 
              <Link to="/my-stack" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">My Stack</Link>
              
              {/* NEW: Profile Picture Link */}
              <Link to="/profile" title="View Profile">
                <img 
                  src={userProfile.pictureUrl} 
                  alt={userProfile.name} 
                  className="w-8 h-8 rounded-full border-2 border-indigo-500 object-cover" 
                />
              </Link>
            </>
          )}

          <button 
            onClick={isAuthenticated ? signOut : signIn}
            className="text-white font-bold py-1 px-3 rounded-md transition duration-300"
            style={{ backgroundColor: isAuthenticated ? '#ef4444' : '#4f46e5' }}
          >
            {isAuthenticated ? 'Sign Out' : 'Sign In'}
          </button>

          <button onClick={toggleTheme} className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
            {isDark ? '🌙' : '☀️'}
          </button>
        </nav>
      </div>
    </header>
  );
};

function App() {
  return (
    <AuthProvider> 
      <ProfileProvider> 
        <StackProvider> 
          <Router> 
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
              <Header />
              <main>
                <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
                  <Routes>
                    {/* Public Route */}
                    <Route path="/" element={<LandingPage />} />
                    
                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                      <Route path="/tools" element={<HomePage />} />
                      <Route path="/tool/:id" element={<ToolDetailPage />} /> 
                      <Route path="/my-stack" element={<MyStackPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                    </Route>

                  </Routes>
                </div>
              </main>
            </div>
          </Router>
        </StackProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;