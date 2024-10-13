import React, { createContext, useState } from 'react';

export const DietContext = createContext();

export const DietProvider = ({ children }) => {
  const [dietEntries, setDietEntries] = useState([]);

  const addDietEntry = (newDietEntry) => {
    setDietEntries((prevDietEntries) => [...prevDietEntries, newDietEntry]);
  };

  return (
    <DietContext.Provider value={{ dietEntries, addDietEntry }}>
      {children}
    </DietContext.Provider>
  );
};