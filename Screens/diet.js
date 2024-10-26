import React, { useContext, useLayoutEffect } from 'react';
import { View, Text, Pressable, StyleSheet} from 'react-native';
import ItemsList from '../Components/ItemsList';
import { DietContext } from '../Context/DietContext';
import { ThemeContext } from '../Context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function Diet({ navigation }) {
  const { dietEntries } = useContext(DietContext);
  const { theme } = useContext(ThemeContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginRight: 15 }}>
          <Pressable 
            onPress={() => navigation.navigate('AddADiet')}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
          >
            <Ionicons name="add" size={24} color={theme.white} style={{ marginRight: 5 }} />
          </Pressable>
            <Ionicons name="pizza" size={24} color={theme.white} />
        </View>
      ),
      headerStyle: {
        backgroundColor: theme.primary,
      },
      headerTintColor: theme.white,
    });
  }, [navigation, theme]);

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
        <ItemsList items={dietEntries} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
});