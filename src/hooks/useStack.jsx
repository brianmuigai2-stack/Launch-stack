import { useState, useEffect, createContext, useContext } from 'react';

const STORAGE_KEY = 'launchstack_my_stack';

// 1. Create the Context
const StackContext = createContext();

// 2. The custom hook now just consumes the Context
export const useStack = () => {
  return useContext(StackContext);
};

// 3. Create the Provider component to manage the state and share it
export const StackProvider = ({ children }) => {
  const [stack, setStack] = useState([]);

  // Initialization: Load from localStorage only on mount
  useEffect(() => {
    try {
      const savedStack = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      setStack(savedStack);
    } catch (error) {
      console.error("Failed to load stack from localStorage:", error);
    }
  }, []);

  // Persistence: Save to localStorage whenever stack changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stack));
    } catch (error) {
       console.error("Failed to save stack to localStorage:", error);
    }
  }, [stack]);

  // Public methods (same as before)
  const addToStack = (tool) => {
    if (!stack.some(item => item.id === tool.id)) {
      setStack(prevStack => [...prevStack, tool]); // Use functional update for safety
    }
  };

  const removeFromStack = (toolId) => {
    setStack(prevStack => prevStack.filter(tool => tool.id !== toolId)); // Use functional update for safety
  };

  const isInStack = (toolId) => {
    return stack.some(tool => tool.id === toolId);
  };

  const contextValue = { 
    stack, 
    addToStack, 
    removeFromStack, 
    isInStack 
  };

  return (
    <StackContext.Provider value={contextValue}>
      {children}
    </StackContext.Provider>
  );
};