import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { database } from '../Helper/firebaseSetup';
import ItemsList from '../Components/ItemsList';
import { ThemeContext } from '../Context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function Activity({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, 'activities'), (snapshot) => {
      setActivities(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe; // Cleanup listener on component unmount
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginRight: 15 }}>
          <Pressable onPress={() => navigation.navigate('AddActivity')} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
            <Ionicons name="add" size={24} color={theme.white} style={{ marginRight: 5 }} />
          </Pressable>
          <Ionicons name="walk" size={24} color={theme.white} />
        </View>
      ),
      headerStyle: { backgroundColor: theme.primary },
      headerTintColor: theme.white,
    });
  }, [navigation, theme]);

  const handleItemPress = (activity) => {
    navigation.navigate('EditActivity', { activity });
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <ItemsList items={activities} onItemPress={handleItemPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
});
