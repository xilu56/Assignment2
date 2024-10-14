import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import Activity from './Screens/activity';
import Diet from './Screens/diet';
import AddAnActivity from './Screens/addanactivity';
import AddADiet from './Screens/addadiet';
import Settings from './Screens/settings';

import { ActivityProvider } from './Context/ActivityContext';
import { DietProvider } from './Context/DietContext';
import ThemeProvider, { ThemeContext } from './Context/ThemeContext'; // Updated the import for ThemeProvider

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function DietStack() {
  const { theme } = useContext(ThemeContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.primary,
        },
        headerTintColor: theme.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="DietScreen" component={Diet} options={{ title: 'Diet' }} />
      <Stack.Screen name="AddADiet" component={AddADiet} options={{ title: 'Add A Diet' }} />
    </Stack.Navigator>
  );
}

function ActivitiesStack() {
  const { theme } = useContext(ThemeContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.primary,
        },
        headerTintColor: theme.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="ActivitiesScreen" component={Activity} options={{ title: 'Activities' }} />
      <Stack.Screen name="AddActivity" component={AddAnActivity} options={{ title: 'Add An Activity' }} />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  const { theme } = useContext(ThemeContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.primary,
        },
        headerTintColor: theme.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="SettingsScreen" component={Settings} options={{ title: 'Settings' }} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  const { theme } = useContext(ThemeContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'DietTab') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'ActivitiesTab') {
            iconName = focused ? 'walk' : 'walk-outline';
          } else if (route.name === 'SettingsTab') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.gray,
        tabBarStyle: {
          backgroundColor: theme.primary,
        },
      })}
    >
      <Tab.Screen name="ActivitiesTab" component={ActivitiesStack} options={{ title: 'Activities' }} />
      <Tab.Screen name="DietTab" component={DietStack} options={{ title: 'Diet' }} />
      <Tab.Screen name="SettingsTab" component={SettingsStack} options={{ title: 'Settings' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ActivityProvider>
        <DietProvider>
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </DietProvider>
      </ActivityProvider>
    </ThemeProvider>
  );
}
