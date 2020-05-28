import React, { useEffect, useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import moment from 'moment';

import { Ionicons } from '@expo/vector-icons';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import { TextInput } from 'react-native-paper';
import { startTimer, pauseTimer, stopTimer, updateTimer } from '../store/actions/timerAction';


import Input from '../components/wrapper-components/Input';
import HeaderButton from '../components/wrapper-components/HeaderButton';
import DefaultButton from '../components/wrapper-components/DefaultButton';
import IconTextButton from '../components/wrapper-components/IconTextButton';
import DayHourMinSec from '../components/render-components/DayHourMinSec';


const TimerScreen = (props) => {
  const { navigation } = props;

  // Timer inputs things;
  const [secondsInput, setSecondsInput] = useState('');
  const [minutesInput, setMinutesInput] = useState('');

  const onChangeSecondsHandler = (inputText) => {
    if (inputText === '0') setSecondsInput('');
    else setSecondsInput(inputText.replace(/[^0-9]/g, ''));
  };
  const onChangeMinutesHandler = (inputText) => {
    if (inputText === '0') setSecondsInput('');
    else setMinutesInput(inputText.replace(/[^0-9]/g, ''));
  };


  // Timer interval things;
  const currentTimer = useSelector((state) => state.timer);

  const dispatch = useDispatch();

  let { eventDate } = currentTimer;
  const { days, hours, mins, secs, isTimerRunning, isTimerPaused } = currentTimer;

  if (eventDate === undefined) {
    eventDate = moment.duration().add({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  }

  const startInterval = (secondsAtA) => {
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
          isTimerRunning: !!eventDate,
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
  }, [isTimerPaused, isTimerRunning]);

  const startTimerHandler = useCallback(() => {
    // Assert that proper values are inserted;

    if (!minutesInput) console.log('minutes are empty');
    if (!secondsInput) console.log('seconds are empty');

    if (secondsInput >= 60 && minutesInput) {
      Alert.alert('Correct your times!', 'If seconds are higher than 60, the minute field must be empty.', [
        { text: 'Sorry Mr. Sexyman, won\'t happen again!', style: 'cancel' },
      ]);
      return;
    }

    const newEventDate = moment
      .duration()
      .add({ days: 0, hours: 0, minutes: minutesInput, seconds: secondsInput });
    if (!newEventDate) {
      return;
    }
    const initialStartedTimer = {
      eventDate: newEventDate,
      days: newEventDate.days(),
      hours: newEventDate.hours(),
      mins: newEventDate.minutes(),
      secs: newEventDate.seconds(),
      isTimerRunning: true,
      isTimerPaused: false,
    };
    dispatch(updateTimer(initialStartedTimer));
  }, [dispatch, secondsInput, minutesInput]);

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


  // Timer layout;
  const pauseResumeButton = isTimerPaused ? (
    <IconTextButton onPress={resumeTimerHandler} style={styles.button} text="Resume">
      <Ionicons name="md-play" size={24} color="white" />
    </IconTextButton>
  ) : (
    <IconTextButton
      disabled={!isTimerRunning}
      onPress={pauseTimerHandler}
      style={styles.button}
      text="Pause"
    >
      <Ionicons name="md-pause" size={24} color="white" />
    </IconTextButton>
  );

  return (
    // <KeyboardAvoidingView behavior="position" keyboardVerticalOffset="30">
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <Input
              style={styles.timerInput}
              value={minutesInput}
              onChangeText={(value) => onChangeMinutesHandler(value)}
              keyboardType="numeric"
              blurOnSubmit
              maxLength={4}
            />
            <Text style={styles.inputText}> Minutes </Text>
          </View>
          <View style={styles.inputContainer}>
            <Input
              style={styles.timerInput}
              value={secondsInput}
              onChangeText={(value) => onChangeSecondsHandler(value)}
              keyboardType="numeric"
              blurOnSubmit
              maxLength={4}
            />
            <Text style={styles.inputText}>Seconds</Text>
          </View>
        </View>

        <View style={styles.timerContainer}>
          <DayHourMinSec style={styles.timeStyles} days={days} hours={hours} mins={mins} secs={secs} />
          <View style={styles.buttonsContainer}>
            <IconTextButton
              onPress={stopTimerHandler}
              style={styles.button}
              text="Stop"
            >
              <Ionicons name="ios-square" size={24} color="white" />
            </IconTextButton>
            <IconTextButton
              disabled={isTimerRunning || (!secondsInput && !minutesInput)}
              onPress={startTimerHandler}
              style={styles.button}
              text="Start"
            >
              <Ionicons name="md-play" size={24} color="white" />
            </IconTextButton>
            {pauseResumeButton}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
};
TimerScreen.navigationOptions = (navData) => ({
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
    marginVertical: 35,
  },
  inputsContainer: {
    flexDirection: 'row',
    width: '65%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 45,
  },
  inputContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 20,
  },
  timerInput: {
    height: 60,
    width: 95,
    backgroundColor: 'lightgreen',
    fontSize: 25,
    textAlign: 'center',
  },
  timerContainer: {
    height: '60%',
    alignItems: 'center',
    justifyContent: 'flex-start',
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


});

export default TimerScreen;
