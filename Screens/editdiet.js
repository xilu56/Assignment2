import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Alert, TouchableWithoutFeedback, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ThemeContext } from '../Context/ThemeContext';
import { updateDB, deleteFromDB } from '../Helper/firestoreHelper';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles } from '../Helper/styles';
import Button from '../Components/Button';

export default function EditDiet({ route, navigation }) {
  const { id, description, calories, date, special } = route.params.dietEntry;
  const { theme } = useContext(ThemeContext);
  const item = route.params?.item;

  const [dietDescription, setDietDescription] = useState(description);
  const [dietCalories, setDietCalories] = useState(calories.replace(' kcal', ''));
  const [dietDate, setDietDate] = useState(new Date(date));
  const [isSpecial, setIsSpecial] = useState(item?.special || false);
  const [isChecked, setIsChecked] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const initialDiet = {
    dietDescription: description,
    dietCalories: calories.replace(' kcal', ''),
    dietDate: new Date(date),
    isSpecial: special,
  };

  const hasChanges = () => {
    return (
      dietDescription !== initialDiet.dietDescription ||
      dietCalories !== initialDiet.dietCalories ||
      dietDate.toDateString() !== initialDiet.dietDate.toDateString() ||
      isSpecial !== initialDiet.isSpecial
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

  const handleDescriptionChange = (text) => {
    setDietDescription(text);
  }

  const handleCaloriesChange = (text) => {
    setDietCalories(text);
    const calorieCount = parseFloat(text);
    if (calorieCount > 800) {
      setIsSpecial(true);
    } else if (!isChecked) {
      setIsSpecial(false);
    }

  };

  useEffect(() => {
    const calories = parseFloat(dietCalories);
    if (calories > 800) {
      setIsSpecial(true);
    } else {
      setIsSpecial(false);
    }
  }, [dietCalories]);

  const handleSave = () => {
    if (!dietDescription.trim()) {
      Alert.alert('Error', 'Please provide a description.');
      return;
    }

    if (dietCalories === '' || isNaN(dietCalories) || parseFloat(dietCalories) <= 0) {
      Alert.alert('Error', 'Please enter a valid numeric calorie value greater than 0.');
      return;
    }

    if (!dietDate) {
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
              description: dietDescription,
              date: dietDate.toDateString(),
              calories: `${dietCalories} kcal`,
              special: isChecked ? false : isSpecial, // Use updated special status
            };

            try {
              await updateDB(id, updatedData, 'diet');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Could not update diet. Please try again.');
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
              await deleteFromDB(id, 'diet');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Could not delete diet.');
            }
          },
        },
      ]
    );
  };

  const onChangeDate = (event, selectedDate) => {
    if (selectedDate) {
      setDietDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const toggleDatePicker = () => setShowDatePicker((prev) => !prev);

  return (
    <View style={[commonStyles.container, { backgroundColor: theme.background }]}>
      <Text style={[commonStyles.label, { color: theme.text }]}>Description *</Text>
      <TextInput
        style={[commonStyles.largeInput, { borderColor: theme.primary, backgroundColor: theme.gray }]}
        value={dietDescription}
        onChangeText={handleDescriptionChange}
        placeholder="Enter diet description"
      />

      <Text style={[commonStyles.label, { color: theme.text }]}>Calories (kcal) *</Text>
      <TextInput
        style={[commonStyles.input, { borderColor: theme.primary, backgroundColor: theme.gray }]}
        keyboardType="numeric"
        value={dietCalories}
        onChangeText={handleCaloriesChange}
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

{special && (
        <View style={commonStyles.checkboxContainer}>
          <Text style={[commonStyles.label, { color: theme.text }]}>
            This item is marked as special. Select the checkbox if you would like to approve it.
          </Text>
          <Pressable onPress={() => {
            setIsChecked((prevChecked) => {
              const newChecked = !prevChecked;
              setIsSpecial(!newChecked);
              return newChecked;
            }
          )
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
