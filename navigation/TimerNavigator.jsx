import { createAppContainer } from 'react-navigation';
// import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createDrawerNavigator } from 'react-navigation-drawer';
// import { Ionicons } from '@expo/vector-icons';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { createDrawerNavigator } from 'react-navigation-drawer';
import Colors from '../constants/colors';
import TimerScreen from '../screens/TimerScreen';


const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerTitleContainerStyle: {
    width: '60%',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const TimerNavigator = createStackNavigator(
  {
    FirstScreen: {
      screen: TimerScreen,
    },
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  },
);

const MainNavigator = createDrawerNavigator({
  FavMeals: { screen: TimerNavigator,
    navigationOptions: {
      drawerLabel: 'SwissTimer',
    } },
}, {
  drawerPosition: 'right',
  contentOptions: {
    activeTintColor: Colors.accent,
    labelStyle: {
      fontWeight: 'normal',
      fontFamily: 'open-sans',
      fontSize: 24,
    },
  },
});


export default createAppContainer(MainNavigator);
