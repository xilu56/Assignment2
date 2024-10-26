import React, { createContext } from 'react';

export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  return (
    <ActivityContext.Provider value={{}}>
      {children}
    </ActivityContext.Provider>
  );
};
