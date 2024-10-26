import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import getColors from '../Helper/colors';

const colors = getColors();

export default function Button({ title, onPress, themeType, style }) {
  const theme = colors[themeType] || colors.lightTheme;
  const backgroundColor = title === 'Cancel' ? theme.cancel : theme.Button;

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: theme.accent }}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? theme.primary : backgroundColor },
        style,
      ]}
    >
      <Text style={[styles.text, { color: theme.buttonText }]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
