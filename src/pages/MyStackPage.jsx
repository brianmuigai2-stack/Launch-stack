import { useStack }  from '../hooks/useStack.jsx';
import { Link } from 'react-router-dom';

const MyStackPage = () => {
  const { stack, removeFromStack } = useStack();

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">My Stack</h2>
      {stack.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">You haven't added any tools to your stack yet. Go find some!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stack.map((tool) => (
            <div key={tool.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <Link to={`/tool/${tool.id}`} className="block mb-4">
                <div className="flex items-center">
                  <img src={tool.logo} alt={`${tool.name} logo`} className="h-10 w-10 mr-3 rounded" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{tool.name}</h3>
                </div>
              </Link>
              <button
                onClick={() => removeFromStack(tool.id)}
                className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Remove from Stack
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyStackPage;