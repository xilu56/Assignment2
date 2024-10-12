import React from 'react';
import { View, Text, FlatList } from 'react-native';

const ItemsList = ({ items, type }) => {
  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, marginVertical: 5, backgroundColor: '#eee' }}>
            <Text>{item.name}</Text>
            {/* Assuming item.date is a Date object. Convert it to a readable string */}
            <Text>{item.date instanceof Date ? item.date.toLocaleDateString() : item.date}</Text>
            <Text>
              {type === 'exercise' 
                ? `${item.duration} min` 
                : `${item.calories} kcal`}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default ItemsList;
