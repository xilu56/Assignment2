import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Alert, TouchableWithoutFeedback, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { ThemeContext } from '../Context/ThemeContext';
import { updateDB, deleteFromDB } from '../Helper/firestoreHelper';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles } from '../Helper/styles';
import Button from '../Components/Button';

export default function EditActivity({ route, navigation }) {
  const { id, name, date, value, special } = route.params.activity;
  const { theme } = useContext(ThemeContext);
  const item = route.params?.item;

  const [activityType, setActivityType] = useState(name);
  const [duration, setDuration] = useState(value.split(' ')[0]);
  const [activityDate, setActivityDate] = useState(new Date(date));
  const [isSpecial, setIsSpecial] = useState(item?.special || false);
  const [isChecked, setIsChecked] = useState(false);
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

  const initialActivity = {
    activityType: name,
    duration: value.split(' ')[0],
    activityDate: new Date(date),
    isSpecial: special,
  };

  const hasChanges = () => {
    return (
      activityType !== initialActivity.activityType ||
      duration !== initialActivity.duration ||
      activityDate.toDateString() !== initialActivity.activityDate.toDateString() ||
      isSpecial !== initialActivity.isSpecial
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={handleDelete}>
          <Ionicons name="trash" size={24} color={theme.white} style={{ marginRight: 15 }} />
        </Pressable>
      ),
    });
  }, [navigation]);

  const handleSave = () => {
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
    
    if (!hasChanges()) {
      navigation.goBack();
      return;
    }

    Alert.alert(
      "Important",
      "Are you sure you want to save these changes?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            const updatedData = {
              name: activityType,
              date: activityDate.toDateString(),
              value: `${duration} min`,
              special: isChecked ? false : isSpecial,
            };

            try {
              await updateDB(id, updatedData, 'activities');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Could not update activity. Please try again.');
            }
          },
        },
      ]
    );
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete",
      "Are you sure you want to delete this item?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await deleteFromDB(id, 'activities');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Could not delete activity.');
            }
          },
        },
      ]
    );
  };

  const onChangeDate = (event, selectedDate) => {
    if (selectedDate) {
      setActivityDate(selectedDate);
    }
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

      {special && (
        <View style={commonStyles.checkboxContainer}>
          <Text style={[commonStyles.label, { color: theme.text }]}>This item is marked as special. Select the checkbox if you would like to approve it.
          </Text>
          <Pressable onPress={() => {
            setIsChecked(!isChecked);
            if (isChecked) setIsSpecial(false); // Only set to false if checked
          }}>
            <Ionicons name={isChecked ? "checkbox" : "square-outline"} size={24} color={theme.primary} />
          </Pressable>
        </View>
      )}

    <View style={commonStyles.buttonContainer}>
      <Button title="Cancel" onPress={() => navigation.goBack()} themeType={theme} />
      <Button title="Save" onPress={handleSave} themeType={theme} />
    </View>
    </View>
  );
}
