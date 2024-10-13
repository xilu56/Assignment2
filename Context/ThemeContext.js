import React, { createContext, useState, useMemo } from 'react';
import getColors from '../Helper/colors';

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const colors = getColors();
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
