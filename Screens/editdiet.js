import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Alert, TouchableWithoutFeedback, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ThemeContext } from '../Context/ThemeContext';
import { updateDB, deleteFromDB } from '../Helper/firestoreHelper';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles } from '../Helper/styles';

export default function EditDiet({ route, navigation }) {
  // Retrieve diet entry data from route params
  const { id, description, calories, date, special } = route.params.dietEntry;
  const { theme } = useContext(ThemeContext);

  const [dietDescription, setDietDescription] = useState(description);
  const [dietCalories, setDietCalories] = useState(calories.replace(' kcal', ''));
  const [dietDate, setDietDate] = useState(new Date(date));
  const [isSpecial, setIsSpecial] = useState(special);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Set up header options with delete icon
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={handleDelete}>
          <Ionicons name="trash" size={24} color={theme.white} style={{ marginRight: 15 }} />
        </Pressable>
      ),
    });
  }, [navigation]);

  const handleSave = async () => {
    // Input validation
    if (!dietDescription.trim()) {
      Alert.alert('Error', 'Please provide a description.');
      return;
    }

    const calorieValue = parseFloat(dietCalories);
    if (!dietCalories || isNaN(calorieValue) || calorieValue <= 0) {
      Alert.alert('Error', 'Please enter a valid calorie amount greater than 0.');
      return;
    }

    if (!dietDate) {
      Alert.alert('Error', 'Please select a date.');
      return;
    }

    const updatedData = {
      description: dietDescription.trim(),
      calories: `${calorieValue} kcal`,
      date: dietDate.toDateString(),
      special: isSpecial,
    };

    try {
      await updateDB(id, updatedData, 'diet');
      Alert.alert('Success', 'Diet entry updated successfully.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Could not update diet entry. Please try again.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteFromDB(id, 'diet');
      Alert.alert('Deleted', 'Diet entry has been deleted.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Could not delete diet entry.');
    }
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDietDate(selectedDate);
    }
  };

  const toggleDatePicker = () => setShowDatePicker(prev => !prev);

  return (
    <View style={[commonStyles.container, { backgroundColor: theme.background }]}>
      <Text style={[commonStyles.label, { color: theme.text }]}>Description *</Text>
      <TextInput
        style={[commonStyles.largeInput, { borderColor: theme.primary, backgroundColor: theme.gray }]}
        value={dietDescription}
        onChangeText={setDietDescription}
        placeholder="Enter diet description"
      />

      <Text style={[commonStyles.label, { color: theme.text }]}>Calories (kcal) *</Text>
      <TextInput
        style={[commonStyles.input, { borderColor: theme.primary, backgroundColor: theme.gray }]}
        keyboardType="numeric"
        value={dietCalories}
        onChangeText={setDietCalories}
        placeholder="Enter calories"
      />

      <Text style={[commonStyles.label, { color: theme.text }]}>Date *</Text>
      <TouchableWithoutFeedback onPress={toggleDatePicker}>
        <View>
          <TextInput
            style={[commonStyles.input, { borderColor: theme.primary, backgroundColor: theme.gray }]}
            value={dietDate ? dietDate.toDateString() : ''}
            editable={false}
            pointerEvents="none"
            placeholder="Select a date"
          />
        </View>
      </TouchableWithoutFeedback>

      {showDatePicker && (
        <DateTimePicker
          value={dietDate || new Date()}
          mode="date"
          display="inline"
          onChange={onChangeDate}
          style={commonStyles.datePicker}
        />
      )}

      <View style={commonStyles.checkboxContainer}>
        <Text style={[commonStyles.label, { color: theme.text }]}>Mark as Special</Text>
        <Pressable onPress={() => setIsSpecial(!isSpecial)}>
          <Ionicons name={isSpecial ? "checkbox" : "square-outline"} size={24} color={theme.primary} />
        </Pressable>
      </View>

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
