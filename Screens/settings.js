import React, { useContext } from 'react';
import { View, Text, Pressable } from 'react-native';
import { ThemeContext } from '../Context/ThemeContext';

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
      <Pressable 
        onPress={toggleTheme}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? theme.primary : theme.Button,
            padding: 10,
            borderRadius: 5,
          }
        ]}
      >
        <Text style={{ color: theme.buttonText, fontSize: 16 }}>Toggle Theme</Text>
      </Pressable>
    </View>
  );
}
