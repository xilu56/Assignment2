import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Alert, TouchableWithoutFeedback, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { ThemeContext } from '../Context/ThemeContext';
import { updateDB, deleteFromDB } from '../Helper/firestoreHelper';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles } from '../Helper/styles';

export default function EditActivity({ route, navigation }) {
  const { id, name, date, value, special } = route.params.activity;
  const { theme } = useContext(ThemeContext);
  const [activityType, setActivityType] = useState(name);
  const [duration, setDuration] = useState(value.split(' ')[0]);
  const [activityDate, setActivityDate] = useState(new Date(date));
  const [isSpecial, setIsSpecial] = useState(special);
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

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={handleDelete}>
          <Ionicons name="trash" size={24} color={theme.white} style={{ marginRight: 15 }} />
        </Pressable>
      ),
    });
  }, [navigation]);

  const handleSave = async () => {
    if (!activityType || !duration || isNaN(duration) || parseFloat(duration) <= 0 || !activityDate) {
      Alert.alert('Error', 'Please ensure all fields are valid.');
      return;
    }

    const updatedData = {
      name: activityType,
      date: activityDate.toDateString(),
      value: `${duration} min`,
      special: isSpecial,
    };

    try {
      await updateDB(id, updatedData, 'activities');
      Alert.alert('Success', 'Activity updated successfully.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Could not update activity. Please try again.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteFromDB(id, 'activities');
      Alert.alert('Deleted', 'Activity has been deleted.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Could not delete activity.');
    }
  };

  const onChangeDate = (event, selectedDate) => {
    setActivityDate(selectedDate || activityDate);
    setShowDatePicker(false);
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
      <TouchableWithoutFeedback onPress={() => setShowDatePicker(!showDatePicker)}>
        <View>
          <TextInput
            style={[commonStyles.input, { borderColor: theme.primary, backgroundColor: theme.gray }]}
            value={activityDate ? activityDate.toDateString() : ''}
            editable={false}
            pointerEvents="none"
            placeholder="Select a date"
          />
        </View>
      </TouchableWithoutFeedback>

      {showDatePicker && (
        <DateTimePicker
          value={activityDate || new Date()}
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
