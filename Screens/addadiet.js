import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Alert, TouchableWithoutFeedback, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DietContext } from '../Context/DietContext';
import { ThemeContext } from '../Context/ThemeContext';
import { commonStyles } from '../Helper/styles';

export default function AddADiet({ navigation }) {
  const { addDietEntry } = useContext(DietContext);
  const { theme } = useContext(ThemeContext);
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    if (!description) {
      Alert.alert('Error', 'Please provide a description.');
      return;
    }

    if (calories === '' || isNaN(calories) || parseFloat(calories) <= 0) {
      Alert.alert('Error', 'Please enter a valid numeric calorie value greater than 0.');
      return;
    }

    if (!date) {
      Alert.alert('Error', 'Please select a date.');
      return;
    }

    const isSpecial = parseFloat(calories) > 800;
    addDietEntry({
      id: Math.random().toString(),
      description,
      calories: `${calories} kcal`,
      date: date.toDateString(),
      special: isSpecial,
    });
    navigation.goBack();
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(prevState => !prevState);
  };

  return (
    <View style={[commonStyles.container, { backgroundColor: theme.background }]}>
      <Text style={[commonStyles.label, { color: theme.text }]}>Description *</Text>
      <TextInput
        style={[commonStyles.largeInput, { borderColor: theme.primary, backgroundColor: theme.gray }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter diet description"
      />

      <Text style={[commonStyles.label, { color: theme.text }]}>Calories (kcal) *</Text>
      <TextInput
        style={[commonStyles.input, { borderColor: theme.primary, backgroundColor: theme.gray }]}
        keyboardType="numeric"
        value={calories}
        onChangeText={setCalories}
        placeholder="Enter calories"
      />

      <Text style={[commonStyles.label, { color: theme.text }]}>Date *</Text>
      <TouchableWithoutFeedback onPress={toggleDatePicker}>
        <View>
          <TextInput
            style={[commonStyles.input, { borderColor: theme.primary, backgroundColor: theme.gray }]}
            value={date ? date.toDateString() : ''}
            editable={false}
            pointerEvents="none"
            placeholder="Select a date"
          />
        </View>
      </TouchableWithoutFeedback>

      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="inline"
          onChange={onChangeDate}
          style={commonStyles.datePicker}
        />
      )}

      <View style={commonStyles.buttonContainer}>
        <Pressable onPress={() => navigation.goBack()} style={({ pressed }) => [
          { backgroundColor: pressed ? theme.primary : theme.buttonBackground },
          commonStyles.button
        ]}>
          <Text style={{ color: theme.buttonText }}>Cancel</Text>
        </Pressable>

        <Pressable onPress={handleSave} style={({ pressed }) => [
          { backgroundColor: pressed ? theme.primary : theme.buttonBackground },
          commonStyles.button
        ]}>
          <Text style={{ color: theme.buttonText }}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
}
