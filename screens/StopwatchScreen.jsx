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

import { startTimer, pauseTimer, stopTimer, updateTimer } from '../store/actions/stopwatchAction';


import HeaderButton from '../components/wrapper-components/HeaderButton';
import DefaultButton from '../components/wrapper-components/DefaultButton';


const StopwatchScreen = (props) => {
  const { navigation } = props;
  const currentTimer = useSelector((state) => state.stopwatch);

  const dispatch = useDispatch();
  let eventDate = useSelector((state) => state.stopwatch.eventDate);
  if (eventDate === undefined) {
    eventDate = moment.duration().add({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  }

  const startInterval = () => {
    const interval = setInterval(() => {
      if (eventDate <= 0) {
        clearInterval(interval);
        const newTimer = {
          eventDate: undefined,
          days: 0,
          hours: 0,
          mins: 0,
          secs: 0,
        };
        dispatch(updateTimer(newTimer));
      } else {
        const newTimer = {
          eventDate: eventDate.subtract(1, 's'),
          days: eventDate.days(),
          hours: eventDate.hours(),
          mins: eventDate.minutes(),
          secs: eventDate.seconds(),
        };
        dispatch(updateTimer(newTimer));
      }
    }, 1000);
    return interval;
  };
  useEffect(() => {
    console.log('howmanytimesamIrunningstartintervalioo');
    const interval = startInterval();
    return () => {
      clearInterval(interval);
    };
  }, [eventDate]);

  const startTimerHandler = useCallback(() => {
    const initialStartedTimer = {
      eventDate: moment.duration().add({ days: 0, hours: 0, minutes: 0, seconds: 12 }),
      days: 0,
      hours: 0,
      mins: 0,
      secs: 0,
      isTimerRunning: true,
    };
    dispatch(updateTimer(initialStartedTimer));
  }, [dispatch]);

  const stopTimerHandler = useCallback(() => {
    const stoppedTimer = {
      eventDate: moment.duration().add({ days: 0, hours: 0, minutes: 0, seconds: 0 }),
      days: 0,
      hours: 0,
      mins: 0,
      secs: 0,
      isTimerRunning: false,
    };
    dispatch(updateTimer(stoppedTimer));
  }, [dispatch]);

  const pauseTimerHandler = useCallback(() => {
    console.log(currentTimer);
  }, [dispatch]);

  const { days, hours, mins, secs, isTimerRunning } = currentTimer;

  return (
    <View style={styles.screen}>
      <Text style={styles.timeStyles}>{`${days} : ${hours} : ${mins} : ${secs}`}</Text>
      <View style={styles.buttonsContainer}>
        <DefaultButton onPress={stopTimerHandler} style={styles.button}>
          <Ionicons name="ios-square" size={24} color="white" />
          <Text> Stop </Text>
        </DefaultButton>
        <DefaultButton disabled={isTimerRunning} onPress={startTimerHandler} style={styles.button}>
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
  timeStyles: {
    fontSize: 45,
  },

});

export default StopwatchScreen;
