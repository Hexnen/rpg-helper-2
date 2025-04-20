'use client';

import React, { createContext, useContext, ReactNode } from 'react';

// Type for the TabContext value
interface TabContextValue {
  value: string;
}

// Create context with a default value
const TabContext = createContext<TabContextValue | undefined>(undefined);

// Custom hook to use the TabContext
export function useTabContext() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabContext must be used within a TabContextProvider');
  }
  return context;
}

export interface TabContextProviderProps {
  /**
   * The value to pass to the TabContext
   */
  value: string;
  
  /**
   * The children that will use the TabContext
   */
  children: ReactNode;
}

/**
 * Custom TabContext provider component to replace @mui/lab's TabContext
 * Wraps children with a TabContext that provides the active tab value
 */
export default function TabContextProvider({ value, children }: TabContextProviderProps) {
  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = React.useMemo(() => ({ value }), [value]);
  
  return (
    <TabContext.Provider value={contextValue}>
      {children}
    </TabContext.Provider>
  );
} 