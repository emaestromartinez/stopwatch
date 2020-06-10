import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { MainNavigator } from './TimerNavigator';


const AppNavigator = (props) => (
  <NavigationContainer>
    <MainNavigator />
  </NavigationContainer>
);

export default AppNavigator;
