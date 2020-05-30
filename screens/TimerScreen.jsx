import React, { useEffect, useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Switch,
} from 'react-native';
import moment from 'moment';


import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import { startTimer, pauseTimer, stopTimer, updateTimer } from '../store/actions/timerAction';


import Input from '../components/wrapper-components/Input';
import HeaderButton from '../components/wrapper-components/HeaderButton';
import DayHourMinSec from '../components/render-components/DayHourMinSec';
import StopStartPauseButtons from '../components/render-components/StopStartPauseButtons';


const TimerScreen = (props) => {
  const { navigation } = props;

  // Timer inputs things;
  const [secondsInput, setSecondsInput] = useState('');
  const [minutesInput, setMinutesInput] = useState('');
  const [isTimerHidden, setIsTimerHidden] = useState(false);


  const checkForZeroString = (input) => {
    if (input === '0'
    || input === '00'
    || input === '000'
    || input === '0000') return true;
    return false;
  };
  const onChangeSecondsHandler = (inputText) => {
    if (checkForZeroString(inputText)) setSecondsInput('');
    else setSecondsInput(inputText.replace(/[^0-9]/g, ''));
  };
  const onChangeMinutesHandler = (inputText) => {
    if (checkForZeroString(inputText)) setSecondsInput('');
    else setMinutesInput(inputText.replace(/[^0-9]/g, ''));
  };
  const hiddenTimerSwitchHandler = () => {

  };


  // Timer interval things;
  const currentTimer = useSelector((state) => state.timer);

  const dispatch = useDispatch();

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


  // TIMER LAYOUT;


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

        <View style={styles.hideTimerContainer}>
          <Text style={styles.hideTimerText}>
            Quepasooo
          </Text>
        </View>

        <View style={styles.timerContainer}>
          <DayHourMinSec
            style={styles.timeStyles}
            days={days}
            hours={hours}
            mins={mins}
            secs={secs}
            hidden={isTimerHidden}
          />
          <StopStartPauseButtons
            isTimerRunning={isTimerRunning}
            isTimerPaused={isTimerPaused}
            secondsInput={secondsInput}
            minutesInput={minutesInput}
            stopTimerHandler={stopTimerHandler}
            startTimerHandler={startTimerHandler}
            resumeTimerHandler={resumeTimerHandler}
            pauseTimerHandler={pauseTimerHandler}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
};
TimerScreen.navigationOptions = (navData) => ({
  headerTitle: 'Stop watch',
  headerRight: () => (
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
  // Input styles
  inputsContainer: {
    flexDirection: 'row',
    width: '65%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 45,
  },
  inputText: {
    fontSize: 20,
  },

  // Hide timer styles
  hideTimerContainer: {
    width: '40%',
    marginVertical: 15,
    borderWidth: 4,
    borderColor: 'black',
    borderRadius: 10,
  },
  hideTimerText: {
    fontSize: 35,
  },

  // Input styles
  inputContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
  },
  timerInput: {
    height: 60,
    width: 95,
    // backgroundColor: 'lightgreen',
    fontSize: 25,
    textAlign: 'center',
  },
  // Timer styles
  timerContainer: {
    height: '60%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default TimerScreen;
