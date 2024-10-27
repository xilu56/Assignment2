import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableWithoutFeedback, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { ThemeContext } from '../Context/ThemeContext';
import { writeToDB } from '../Helper/firestoreHelper';
import { commonStyles } from '../Helper/styles';
import Button from '../Components/Button';

export default function AddAnActivity({ navigation }) {
  const { theme } = useContext(ThemeContext);
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

  const handleSave = async () => {
    if (!activityType) {
      Alert.alert('Error', 'Please select an activity.');
      return;
    }

    if (duration === '' || isNaN(duration) || parseFloat(duration) <= 0) {
      Alert.alert('Error', 'Please enter a valid numeric duration greater than 0.');
      return;
    }

    if (!date) {
      Alert.alert('Error', 'Please select a date.');
      return;
    }

    const isSpecial = (activityType === 'Running' || activityType === 'Weights') && parseFloat(duration) > 60;

    // Save the activity to Firestore
    try {
      await writeToDB(
        {
          name: activityType,
          date: date.toDateString(),
          value: `${duration} min`,
          special: isSpecial,
        },
        'activities'
      );
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Could not save activity. Please try again.');
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
          { borderColor: theme.primary, backgroundColor: open ? theme.white : theme.gray }
        ]}
        dropDownContainerStyle={{ borderColor: theme.primary, maxHeight: 300 }}
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
      <Button title="Cancel" onPress={() => navigation.goBack()} themeType={theme} />
      <Button title="Save" onPress={handleSave} themeType={theme} />
    </View>
    </View>
  );
}
