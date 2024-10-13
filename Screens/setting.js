import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { ThemeContext } from '../Context/ThemeContext';
import colors from '../Helper/colors';

export default function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.background,
      }}
    >
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
}