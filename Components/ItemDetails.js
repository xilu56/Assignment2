import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ItemDetails({ item, theme }) {
  return (
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
  );
}

const styles = StyleSheet.create({
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
