import React, { useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';

import { Ionicons } from '@expo/vector-icons';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/wrapper-components/HeaderButton';
import DefaultButton from '../components/wrapper-components/DefaultButton';


const StopwatchScreen = (props) => {
  const { navigation } = props;

  return (
    <View style={styles.screen}>
      <Text> Stiop watch</Text>
      <View style={styles.buttonsContainer}>
        <DefaultButton style={styles.button}>
          <Ionicons name="ios-square" size={24} color="white" />
          <Text> Stop </Text>
        </DefaultButton>
        <DefaultButton style={styles.button}>
          <Ionicons name="md-play" size={24} color="white" />
          <Text> Start </Text>
        </DefaultButton>
        <DefaultButton style={styles.button}>
          <Ionicons name="md-pause" size={24} color="white" />
          <Text> Pause </Text>
        </DefaultButton>
      </View>
    </View>
  );
};
StopwatchScreen.navigationOptions = (navData) => ({
  headerTitle: 'Stop watch',
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Menu"
        iconName="ios-menu"
        onPress={() => {
          navData.navigation.openDrawer();
        }}
      />
    </HeaderButtons>
  ) });

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    width: '75%',
    justifyContent: 'space-evenly',
  },
  button: {
    height: 60,
    width: 80,
    justifyContent: 'center',
  },

});

export default StopwatchScreen;
