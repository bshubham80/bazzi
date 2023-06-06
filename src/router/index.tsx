import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Home} from '@screens/Home';
import {Assignment1} from '@screens/Assignment1';
import {Assignment2} from '@screens/Assignment2';

import {MainStackParamList} from '@typings/router';

const Stack = createStackNavigator<MainStackParamList>();

export const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="TabView" component={Assignment1} />
      <Stack.Screen name="SwipeModal" component={Assignment2} />
    </Stack.Navigator>
  );
};
