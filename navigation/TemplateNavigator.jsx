import { createAppContainer } from 'react-navigation';
import React from 'react';
import { Platform, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Colors from '../constants/colors';

import StackAFirstScreen from '../screens/StackAFirstScreen';
import StackASecondScreen from '../screens/StackASecondScreen';
import StackAThirdScreen from '../screens/StackAThirdScreen';

import StackBFirstScreen from '../screens/StackBFirstScreen';

import StackCFirstScreen from '../screens/StackCFirstScreen';

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

const StackNavigatorA = createStackNavigator(
  {
    FirstScreen: {
      screen: StackAFirstScreen,
    },
    SecondScreen: {
      screen: StackASecondScreen,
    },
    ThirdScreen: StackAThirdScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  },
);
const StackNavigatorB = createStackNavigator(
  {
    // From one navigator we navigate to whatever screen, even another navigator;
    StackBFirstScreen: {
      screen: StackBFirstScreen,
    },
    StackBSecondScreen: {
      screen: StackASecondScreen,
    },
    StackBThirdScreen: StackAThirdScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  },
);

const tabScreenConfig = {
  StackA: {
    screen: StackNavigatorA,
    navigationOptions: {
      tabBarIcon: (tabInfo) => (
        <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
      ),
      tabBarColor: Colors.darkestOrange,
      tabBarLabel: Platform.OS === 'android'
        ? <Text style={{ fontFamily: 'open-sans' }}> Main window! </Text> : 'Main window!',
    },
  },
  StackB: {
    screen: StackNavigatorB,
    navigationOptions: {
      tabBarIcon: (tabInfo) => (
        <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
      ),
      tabBarColor: Colors.darkOrange,
      tabBarLabel: Platform.OS === 'android'
        ? <Text style={{ fontFamily: 'open-sans' }}> Favorites! </Text> : 'Favorites!',
    },
  },
};

const MainTabNavigator = Platform.OS === 'android'
  ? createMaterialBottomTabNavigator(tabScreenConfig, {
    activeColor: 'yellow',
    shifting: true,
  })
  : createBottomTabNavigator(tabScreenConfig, {
    labelStyle: {
      fontFamily: 'open-sans-bold',
    },
    tabBarOptions: {
      activeTintColor: Colors.primary,
    },
  });


const StackNavigatorC = createStackNavigator({
  Filters: StackCFirstScreen,
}, {
  navigationOptions: {
    drawerLabel: 'Stack C',
  },
  defaultNavigationOptions: defaultStackNavOptions,
});

const MainNavigator = createDrawerNavigator({
  ScreenA: {
    screen: MainTabNavigator,
    navigationOptions: {
      drawerLabel: 'Stack A (main)',
    } },
  Filters: StackNavigatorC,
}, {
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
