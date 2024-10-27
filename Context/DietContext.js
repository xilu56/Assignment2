import React, { createContext } from 'react';

export const DietContext = createContext();

export const DietProvider = ({ children }) => {
  return (
    <DietContext.Provider value={{}}>
      {children}
    </DietContext.Provider>
  );
};
