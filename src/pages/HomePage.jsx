import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStack }  from '../hooks/useStack.jsx';


const HomePage = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToStack, isInStack } = useStack();

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch('/data/tools.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setTools(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTools();
  }, []);

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(tools.map(tool => tool.category))];
    return cats;
  }, [tools]);

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [tools, searchTerm, selectedCategory]);

  if (loading) return <div className="text-center py-10 text-gray-500 dark:text-gray-400">Loading tools...</div>;
  if (error) return <div className="text-center py-10 text-red-600">Error: {error}</div>;

  return (
    <>
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search for a tool..."
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full sm:w-1/4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <Link to={`/tool/${tool.id}`} key={tool.id} className="block">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
              <div className="flex items-center mb-4">
                {/* Assuming tool.logo is defined in your JSON data */}
                <img src={tool.logo} alt={`${tool.name} logo`} className="h-10 w-10 mr-3 rounded" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{tool.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{tool.category}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{tool.tagline}</p> {/* Assuming you use a 'tagline' property */}
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{tool.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded">{tool.pricing}</span> {/* Assuming you use a 'pricing' property */}
                <div className="space-x-2">
                  <button
                    onClick={(e) => { 
                      e.preventDefault(); 
                      e.stopPropagation(); // 👈 Stops the click from triggering the parent Link
                      addToStack(tool); 
                    }}
                    disabled={isInStack(tool.id)}
                    className={`text-sm font-medium px-3 py-1 rounded ${
                      isInStack(tool.id)
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {isInStack(tool.id) ? 'In Stack' : 'Add to Stack'}
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default HomePage;