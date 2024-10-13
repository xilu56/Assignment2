import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../Context/ThemeContext';

export default function ItemsList({ items, type }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer, { backgroundColor: theme.primary }]}>
            <Text style={[styles.itemName, { color: theme.white }]}>
              {item.name || item.description}
            </Text>
            <View style={styles.itemDetails}>
              {item.special && (
                <Ionicons
                  name="warning"
                  size={20}
                  color="#FFC107"
                  style={styles.warningIcon}
                />
              )}
              <Text style={[styles.itemDate, { backgroundColor: theme.white, color: theme.primary }]}>
                {item.date}
              </Text>
              <Text style={[styles.itemValue, { backgroundColor: theme.white, color: theme.primary }]}>
                {item.value || `${item.calories}`}
              </Text>
            </View>
          </View>
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
  itemDetails: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  itemDate: {
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  itemValue: {
    padding: 5,
    borderRadius: 5,
  },
  warningIcon: {
    marginRight: 10,
  },
});
