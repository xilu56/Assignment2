import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import Activity from './Screens/Activity';
import Diet from './Screens/Diet';
import AddAnActivity from './Screens/AddAnActivity';
import AddADiet from './Screens/AddADiet';
import Settings from './Screens/Settings';

import { ActivityProvider } from './Context/ActivityContext';
import { DietProvider } from './Context/DietContext';
import { ThemeProvider } from './Context/ThemeContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Activities') {
            iconName = 'walk';  // Correct icon name
          } else if (route.name === 'Diet') {
            iconName = 'restaurant';  // Correct icon name
          } else if (route.name === 'Settings') {
            iconName = 'settings';  // Correct icon name
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Activities" component={Activity} />
      <Tab.Screen name="Diet" component={Diet} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ActivityProvider>
      <DietProvider>
        <ThemeProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={BottomTabs} />
              <Stack.Screen name="AddAnActivity" component={AddAnActivity} />
              <Stack.Screen name="AddADiet" component={AddADiet} />
            </Stack.Navigator>
            <StatusBar style="auto" />
          </NavigationContainer>
        </ThemeProvider>
      </DietProvider>
    </ActivityProvider>
  );
}
