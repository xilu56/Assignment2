import React, { useContext } from 'react';
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
import { ThemeProvider, ThemeContext } from './Context/ThemeContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DietStack = () => {
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
      <Stack.Screen name="AddDietEntry" component={AddDietEntry} options={{ title: 'Add Diet Entry' }} />
    </Stack.Navigator>
  );
};

const ActivitiesStack = () => {
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
};

const SettingsStack = () => {
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
};

const TabNavigator = () => {
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
};

const App = () => {
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
};

export default App;