import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStack } from '../hooks/useStack.jsx';

const ToolDetailPage = () => {
  const { id } = useParams();
  const [tool, setTool] = useState(null);
  const [allTools, setAllTools] = useState([]);
  const { addToStack, removeFromStack, isInStack } = useStack();

  useEffect(() => {
    fetch('/data/tools.json')
      .then(res => res.json())
      .then(data => {
        const foundTool = data.find(t => t.id === parseInt(id));
        setTool(foundTool);
        setAllTools(data);
      });
  }, [id]);

  const alternatives = useMemo(() => {
    if (!tool) return [];
    return allTools.filter(t => t.category === tool.category && t.id !== tool.id);
  }, [tool, allTools]);

  if (!tool) {
    return <div className="text-center py-10 text-gray-500 dark:text-gray-400">Loading tool...</div>;
  }

  return (
    <div>
      <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:underline mb-4 inline-block">← Back to Home</Link>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md mt-4">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center">
            <img src={tool.logo} alt={`${tool.name} logo`} className="h-16 w-16 mr-4 rounded" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{tool.name}</h2>
              <p className="text-lg text-gray-500 dark:text-gray-400">{tool.tagline}</p>
            </div>
          </div>
          <span className="text-sm font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300 px-3 py-1 rounded">{tool.pricing}</span>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-6">{tool.description}</p>

        <div className="flex space-x-4 mb-8">
          <a href={tool.affiliateUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700">
            Visit Official Site →
          </a>
          <button
            onClick={() => isInStack(tool.id) ? removeFromStack(tool.id) : addToStack(tool)}
            className={`px-6 py-3 font-bold rounded-md ${
              isInStack(tool.id)
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isInStack(tool.id) ? 'Remove from My Stack' : 'Add to My Stack'}
          </button>
        </div>

        {alternatives.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Alternatives to {tool.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {alternatives.map(alt => (
                <Link key={alt.id} to={`/tool/${alt.id}`} className="flex items-center p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  <img src={alt.logo} alt={`${alt.name} logo`} className="h-10 w-10 mr-3 rounded" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{alt.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{alt.pricing}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolDetailPage;