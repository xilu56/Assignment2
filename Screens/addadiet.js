import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableWithoutFeedback, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DietContext } from '../Context/DietContext';
import { ThemeContext } from '../Context/ThemeContext';

export default function AddADiet({ navigation }) {
  const { addDietEntry } = useContext(DietContext); // Use context to add new diet entry
  const { theme } = useContext(ThemeContext); // Assuming there's a theme context for styling
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
      id: Math.random().toString(), // Unique identifier
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
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.label, { color: theme.text }]}>Description *</Text>
      <TextInput
        style={[styles.input, { borderColor: theme.primary, backgroundColor: theme.gray }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter diet description"
      />

      <Text style={[styles.label, { color: theme.text }]}>Calories (kcal) *</Text>
      <TextInput
        style={[styles.input, { borderColor: theme.primary, backgroundColor: theme.gray }]}
        keyboardType="numeric"
        value={calories}
        onChangeText={setCalories}
        placeholder="Enter calories"
      />

      <Text style={[styles.label, { color: theme.text }]}>Date *</Text>
      <TouchableWithoutFeedback onPress={toggleDatePicker}>
        <View>
          <TextInput
            style={[styles.input, { borderColor: theme.primary, backgroundColor: theme.gray }]}
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
          style={styles.datePicker}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={() => navigation.goBack()} color={theme.Button} />
        <Button title="Save" onPress={handleSave} color={theme.Button} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  datePicker: {
    width: '100%',
    transform: [{ scale: 0.7 }],
  },
});