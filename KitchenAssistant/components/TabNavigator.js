import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Grocery List" component={GroceryScreen} />
          <Tab.Screen name="Timers" component={TimerScreen} />
          <Tab.Screen name="Measurement Converter" component={MeasurementScreen} />
          <Tab.Screen name="Substitutions" component={SubstitutionScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ValueProvider>
  );
}