import React, { useContext } from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import ItemsList from '../Components/ItemsList';
import { ActivityContext } from '../Context/ActivityContext';
import { ThemeContext } from '../Context/ThemeContext';

export default function Activity({ navigation }) {
  const { activities } = useContext(ActivityContext);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Activities</Text>
      <ItemsList items={activities} type="exercise" />
      <Button title="Add Activity" onPress={() => navigation.navigate('AddAnActivity')} />
    </View>
  );
}
