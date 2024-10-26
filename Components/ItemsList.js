import React, { useContext } from 'react';
import { View, FlatList, StyleSheet, Pressable } from 'react-native';
import { ThemeContext } from '../Context/ThemeContext';
import Item from './Item';

export default function ItemsList({ items, onItemPress }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => onItemPress(item)}>
            <Item item={item} theme={theme} />
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
