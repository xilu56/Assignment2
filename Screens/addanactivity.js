import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { ActivityContext } from '../Context/ActivityContext';

export default function AddAnActivity({ navigation }) {
  const { addActivity } = useContext(ActivityContext);
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Walking', value: 'Walking' },
    { label: 'Running', value: 'Running' },
    { label: 'Swimming', value: 'Swimming' },
    { label: 'Weights', value: 'Weights' },
    { label: 'Yoga', value: 'Yoga' },
  ]);

  const handleSave = () => {
    if (!activity || !duration || duration <= 0) {
      Alert.alert('Invalid input');
    } else {
      addActivity({ id: Date.now(), name: activity, duration, date });
      navigation.goBack();
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Activity</Text>
      <DropDownPicker
        open={open}
        value={activity}
        items={items}
        setOpen={setOpen}
        setValue={setActivity}
        setItems={setItems}
      />
      <Text>Duration (min)</Text>
      <TextInput keyboardType="numeric" value={duration} onChangeText={setDuration} />
      <DateTimePicker value={date} mode="date" display="inline" onChange={(event, selectedDate) => setDate(selectedDate)} />
      <Button title="Save" onPress={handleSave} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
}
