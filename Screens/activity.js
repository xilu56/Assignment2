import React, { useContext, useLayoutEffect } from 'react';
import { View, Text, Pressable, StyleSheet} from 'react-native';
import ItemsList from '../Components/ItemsList';
import { ActivityContext } from '../Context/ActivityContext';
import { ThemeContext } from '../Context/ThemeContext';

export default function Activity({ navigation }) {
  const { activities } = useContext(ActivityContext);
  const { theme } = useContext(ThemeContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable 
          onPress={() => navigation.navigate('AddActivity')}
          style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]} // Change opacity when pressed
        >
          <Text style={{ color: theme.Button, fontSize: 16, marginRight: 15 }}>Add</Text>
        </Pressable>
      ),
      headerStyle: {
        backgroundColor: theme.primary,
      },
      headerTintColor: theme.white,
    });
  }, [navigation, theme]);

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
        <ItemsList items={activities} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
});
