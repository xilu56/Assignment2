import React, { useContext } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ThemeContext } from '../Context/ThemeContext';
import Item from './Item';

export default function ItemsList({ items }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item item={item} theme={theme} />}
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
