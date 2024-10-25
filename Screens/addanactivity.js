import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { ActivityContext } from '../Context/ActivityContext';
import { ThemeContext } from '../Context/ThemeContext';
import { commonStyles } from '../Helper/styles';

export default function AddAnActivity({ navigation }) {
  const { addActivity } = useContext(ActivityContext); // Use context to add new activity
  const { theme } = useContext(ThemeContext); // Assume there's a theme context for styling
  const [activityType, setActivityType] = useState(null);
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Walking', value: 'Walking' },
    { label: 'Running', value: 'Running' },
    { label: 'Swimming', value: 'Swimming' },
    { label: 'Weights', value: 'Weights' },
    { label: 'Yoga', value: 'Yoga' },
    { label: 'Cycling', value: 'Cycling' },
    { label: 'Hiking', value: 'Hiking' },
  ]);

  // Validate and save the new entry
  const handleSave = () => {
    // Check if activity type is selected
    if (!activityType) {
      Alert.alert('Error', 'Please select an activity.');
      return;
    }

    // Check if duration is valid: should be a positive number and not empty
    if (duration === '' || isNaN(duration) || parseFloat(duration) <= 0) {
      Alert.alert('Error', 'Please enter a valid numeric duration greater than 0.');
      return;
    }

    // Check if date is selected
    if (!date) {
      Alert.alert('Error', 'Please select a date.');
      return;
    }

    // If all validation passes, proceed to add the activity
    const isSpecial = (activityType === 'Running' || activityType === 'Weights') && parseFloat(duration) > 60;

    // Add the new activity entry using the context
    addActivity({
      id: Math.random().toString(), // unique identifier
      name: activityType, // activity type
      date: date.toDateString(), // formatted date
      value: `${duration} min`, // duration in minutes
      special: isSpecial, // marks activity as special if conditions met
    });

    // After saving, go back to the previous screen (specific tab)
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
      <Text style={[commonStyles.label, { color: theme.text }]}>Activity *</Text>
      <DropDownPicker
        open={open}
        value={activityType}
        items={items}
        setOpen={setOpen}
        setValue={setActivityType}
        setItems={setItems}
        placeholder="Select An Activity"
        style={[
            commonStyles.dropdown, 
          { 
            borderColor: theme.primary, 
            backgroundColor: open ? theme.white : theme.gray 
          }
        ]}
        dropDownContainerStyle={{
          borderColor: theme.primary,
        }}
      />

      <Text style={[commonStyles.label, { color: theme.text }]}>Duration (min) *</Text>
      <TextInput
        style={[commonStyles.input, { borderColor: theme.primary, backgroundColor: theme.gray }]}
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
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
        <Button title="Cancel" onPress={() => navigation.goBack()} color={theme.Button} />
        <Button title="Save" onPress={handleSave} color={theme.Button} />
      </View>
    </View>
  );
}
