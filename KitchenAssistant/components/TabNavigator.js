import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

import HomeScreen from './Screens/HomeScreen';
import TimerScreen from './Screens/TimerScreen';
import GroceryScreen from './Screens/GroceryScreen';
import MeasurementScreen from './Screens/MeasurementScreen';
import SubstitutionScreen from './Screens/SubstitutionScreen';
import ValueProvider from './ValueContext';

const Tab = createBottomTabNavigator();

export default function App() {
  const data = {username: ''};

  return (
    <ValueProvider value={data}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Timers') {
                iconName = focused ? 'timer' : 'timer-outline';
              } else if (route.name === 'Groceries') {
                iconName = focused ? 'cart' : 'cart-outline';
              } else if (route.name === 'Measurements') {
                iconName = focused ? 'scale' : 'scale-outline';
              } else if (route.name === 'Substitutions') {
                iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'lightgreen',
            tabBarInactiveTintColor: 'white',
            tabBarStyle: {backgroundColor: 'darkgreen', justifyContent: 'space-around'},
            tabBarItemStyle: {flex: 1},
            headerStyle: {backgroundColor: 'darkgreen'},
            headerTintColor: 'white',
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Timers" component={TimerScreen} />
          <Tab.Screen name="Groceries" component={GroceryScreen} />
          <Tab.Screen name="Measurements" component={MeasurementScreen} />
          <Tab.Screen name="Substitutions" component={SubstitutionScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ValueProvider>
  );
}
