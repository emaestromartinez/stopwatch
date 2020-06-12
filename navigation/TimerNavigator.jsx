import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';


import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import useTheme from '../constants/themeHooks';

import TimerScreen, { screenOptions } from '../screens/TimerScreen';

// const { colors } = useTheme('default');


const TimerStackNavigator = createStackNavigator();
const MainDrawerNavigator = createDrawerNavigator();

export const TimerNavigator = () => {
  // Color theme
  const themeStore = useSelector((state) => state.theme);
  const { colors } = useTheme(themeStore.theme);

  const defaultStackNavOptions = {
    headerStyle: {
      backgroundColor: colors.headerBGPrimary,
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
    headerTintColor: colors.headerTextPrimary,
  };

  return (
    <TimerStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <TimerStackNavigator.Screen
        name="Timer"
        component={TimerScreen}
        options={screenOptions}
        initialParams={{
          colors: { colors },
        }}
      />
    </TimerStackNavigator.Navigator>
  );
};

export const MainNavigator = () => (

  <MainDrawerNavigator.Navigator
    drawerContent={(props) => (
      <View style={{ flex: 1, paddingTop: 20, backgroundColor: 'lightgreen' }}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }} />
      </View>
    )}
    drawerContentOptions={{
      // activeTintColor: 'red',
      // labelStyle: {
      //   fontWeight: 'normal',
      //   fontFamily: 'open-sans',
      //   fontSize: 24,
      // },
    }}
    // drawerPosition="right"
    initialRouteName="Timer"
  >
    <MainDrawerNavigator.Screen
      name="Timer"
      component={TimerNavigator}
    />
  </MainDrawerNavigator.Navigator>
);


export default 3;
