import React, { createContext, useState, useMemo } from 'react';
import colors from '../Helper/colors';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(colors.lightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === colors.lightTheme ? colors.darkTheme : colors.lightTheme
    );
  };

  const themeContextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
}