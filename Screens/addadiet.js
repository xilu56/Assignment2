import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DietContext } from '../Context/DietContext';

export default function AddADiet({ navigation }) {
  const { addDietEntry } = useContext(DietContext);
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(new Date());

  const handleSave = () => {
    if (!description || !calories || calories <= 0) {
      Alert.alert('Invalid input');
    } else {
      addDietEntry({ id: Date.now(), description, calories, date });
      navigation.goBack();
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Description</Text>
      <TextInput value={description} onChangeText={setDescription} />
      <Text>Calories</Text>
      <TextInput keyboardType="numeric" value={calories} onChangeText={setCalories} />
      <DateTimePicker value={date} mode="date" display="inline" onChange={(event, selectedDate) => setDate(selectedDate)} />
      <Button title="Save" onPress={handleSave} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
}
