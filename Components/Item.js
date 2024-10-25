import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ItemDetails from './ItemDetails';

export default function Item({ item, theme }) {
  return (
    <View style={[styles.itemContainer, { backgroundColor: theme.primary }]}>
      <Text style={[styles.itemName, { color: theme.white }]}>
        {item.name || item.description}
      </Text>
      <ItemDetails item={item} theme={theme} />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  itemName: {
    fontSize: 12,
    fontWeight: 'bold',
    flex: 1,
  },
});
