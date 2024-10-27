import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Alert, TouchableWithoutFeedback, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ThemeContext } from '../Context/ThemeContext';
import { writeToDB } from '../Helper/firestoreHelper';
import { commonStyles } from '../Helper/styles';
import Button from '../Components/Button';

export default function AddADiet({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = async () => {
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

    // Save the diet entry to Firestore
    try {
      await writeToDB(
        {
          description,
          calories: `${calories} kcal`,
          date: date.toDateString(),
          special: isSpecial,
        },
        'diet'
      );
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Could not save diet entry. Please try again.');
      console.error("Firestore error: ", error);
    }
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
      <Button title="Cancel" onPress={() => navigation.goBack()} themeType={theme} />
      <Button title="Save" onPress={handleSave} themeType={theme} />
    </View>
    </View>
  );
}
