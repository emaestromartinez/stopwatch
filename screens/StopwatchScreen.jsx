import React, { useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import moment from 'moment';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';

import { Ionicons } from '@expo/vector-icons';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import { startTimer } from '../store/actions/stopwatchAction';
import HeaderButton from '../components/wrapper-components/HeaderButton';
import DefaultButton from '../components/wrapper-components/DefaultButton';


const updateTimer = () => {
  const x = setInterval(() => {
    let { eventDate } = this.state;

    if (eventDate <= 0) {
      clearInterval(x);
    } else {
      eventDate = eventDate.subtract(1, 's');
      const days = eventDate.days();
      const hours = eventDate.hours();
      const mins = eventDate.minutes();
      const secs = eventDate.seconds();

      this.setState({
        days,
        hours,
        mins,
        secs,
        eventDate,
      });
    }
  }, 1000);
};

const StopwatchScreen = (props) => {
  const { navigation } = props;
  const currentTimer = useSelector((state) => state.stopwatch);

  const dispatch = useDispatch();

  const startTimerHandler = useCallback(() => {
    const initialStartedTimer = {
      eventDate: moment.duration().add({ days: 9, hours: 3, minutes: 40, seconds: 50 }), // add 9 full days, 3 hours, 40 minutes and 50 seconds
      days: 0,
      hours: 0,
      mins: 0,
      secs: 0,
    };
    dispatch(startTimer(initialStartedTimer));
  }, [dispatch]);

  const pauseTimerHandler = useCallback(() => {
    console.log(currentTimer);
  }, [dispatch, currentTimer]);


  // const updateTimerHandler = useCallback(() => {
  //   dispatch(toggleFavorite(mealId));
  // }, [dispatch, mealId]);

  const { days, hours, mins, secs } = currentTimer;

  return (
    <View style={styles.screen}>
      <Text>{`${days} : ${hours} : ${mins} : ${secs}`}</Text>
      <View style={styles.buttonsContainer}>
        <DefaultButton style={styles.button}>
          <Ionicons name="ios-square" size={24} color="white" />
          <Text> Stop </Text>
        </DefaultButton>
        <DefaultButton onPress={startTimerHandler} style={styles.button}>
          <Ionicons name="md-play" size={24} color="white" />
          <Text> Start </Text>
        </DefaultButton>
        <DefaultButton onPress={pauseTimerHandler} style={styles.button}>
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
