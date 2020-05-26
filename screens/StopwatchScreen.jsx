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
import IconTextButton from '../components/wrapper-components/IconTextButton';


const StopwatchScreen = (props) => {
  const { navigation } = props;
  const currentTimer = useSelector((state) => state.stopwatch);

  const dispatch = useDispatch();
  // let eventDate = useSelector((state) => state.stopwatch.eventDate);
  // let isTimerPaused = useSelector((state) => state.stopwatch.isTimerPaused);
  let { eventDate } = currentTimer;
  const { days, hours, mins, secs, isTimerRunning, isTimerPaused } = currentTimer;

  if (eventDate === undefined) {
    eventDate = moment.duration().add({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  }

  const startInterval = () => {
    const interval = setInterval(() => {
      if (!eventDate || eventDate <= 0) {
        clearInterval(interval);
        const newTimer = {
          eventDate: undefined,
          days: 0,
          hours: 0,
          mins: 0,
          secs: 0,
          isTimerRunning: false,
          isTimerPaused: false,
        };
        dispatch(updateTimer(newTimer));
      } else if (!isTimerPaused) {
        const newTimer = {
          eventDate: eventDate.subtract(1, 's'),
          days: eventDate.days(),
          hours: eventDate.hours(),
          mins: eventDate.minutes(),
          secs: eventDate.seconds(),
          isTimerRunning: !!eventDate.seconds(),
          isTimerPaused: false,
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
  }, [eventDate, isTimerPaused, isTimerRunning]);

  const startTimerHandler = useCallback(() => {
    const initialStartedTimer = {
      eventDate: moment.duration().add({ days: 0, hours: 0, minutes: 0, seconds: 12 }),
      days: 0,
      hours: 0,
      mins: 0,
      secs: 12,
      isTimerRunning: true,
      isTimerPaused: false,
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
      isTimerPaused: false,
    };
    dispatch(updateTimer(stoppedTimer));
  }, [dispatch]);

  const pauseTimerHandler = useCallback(() => {
    const pausedTimer = {
      isTimerPaused: true,
    };
    dispatch(pauseTimer(pausedTimer));
  }, [dispatch]);

  const resumeTimerHandler = useCallback(() => {
    const pausedTimer = {
      isTimerPaused: false,
    };
    dispatch(pauseTimer(pausedTimer));
  }, [dispatch]);

  const pauseResumeButton = isTimerPaused
    ? (
      <IconTextButton onPress={resumeTimerHandler} style={styles.button} text="Resume">
        <Ionicons name="md-play" size={24} color="white" />
      </IconTextButton>
    )
    : (
      <IconTextButton onPress={pauseTimerHandler} style={styles.button} text="Pause">
        <Ionicons name="md-pause" size={24} color="white" />
      </IconTextButton>
    );

  return (
    <View style={styles.screen}>
      <Text style={styles.timeStyles}>{`${days} : ${hours} : ${mins} : ${secs}`}</Text>
      <View style={styles.buttonsContainer}>
        <IconTextButton onPress={stopTimerHandler} style={styles.button} text="Stop">
          <Ionicons name="ios-square" size={24} color="white" />
        </IconTextButton>
        <IconTextButton disabled={isTimerRunning} onPress={startTimerHandler} style={styles.button} text="Start">
          <Ionicons name="md-play" size={24} color="white" />
        </IconTextButton>
        {pauseResumeButton}
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
    width: 95,
    justifyContent: 'center',
  },
  timeStyles: {
    fontSize: 45,
  },

});

export default StopwatchScreen;
