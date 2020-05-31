import { createAppContainer } from 'react-navigation';
// import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createDrawerNavigator } from 'react-navigation-drawer';
// import { Ionicons } from '@expo/vector-icons';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { createDrawerNavigator } from 'react-navigation-drawer';


import useTheme from '../constants/themeHooks';

import TimerScreen from '../screens/TimerScreen';

const { Colors } = useTheme();

const defaultStackNavOptions = {
  headerStyle: {
    // backgroundColor: Colors.headerBGPrimary,
    backgroundColor: 'orange',
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
  headerTintColor: 'white',
  // headerTintColor: Colors.headerTextPrimary,
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
    activeTintColor: 'red',
    labelStyle: {
      fontWeight: 'normal',
      fontFamily: 'open-sans',
      fontSize: 24,
    },
  },
});


export default createAppContainer(MainNavigator);
