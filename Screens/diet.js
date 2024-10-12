import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import ItemsList from '../Components/ItemsList';
import { DietContext } from '../Context/DietContext';

export default function Diet({ navigation }) {
  const { dietEntries } = useContext(DietContext);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Diet</Text>
      <ItemsList items={dietEntries} type="diet" />
      <Button title="Add Diet Entry" onPress={() => navigation.navigate('AddADiet')} />
    </View>
  );
}
