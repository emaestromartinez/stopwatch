import React, { useEffect, useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import moment from 'moment';


import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import * as Progress from 'react-native-progress';
import { pauseTimer, updateTimer } from '../store/actions/timerAction';

import Input from '../components/wrapper-components/Input';
import HeaderButton from '../components/wrapper-components/HeaderButton';
import DayHourMinSec from '../components/render-components/DayHourMinSec';
import StopStartPauseButtons from '../components/render-components/StopStartPauseButtons';
import DefaultText from '../components/wrapper-components/DefaultText';
import useTheme from '../constants/themeHooks';


const { colors } = useTheme();

const TimerScreen = () => {
  // const TimerScreen = (props) => {
  // const { navigation } = props;

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
    setIsTimerHidden((value) => !value);
  };


  // Timer interval things;
  const currentTimer = useSelector((state) => state.timer);

  const dispatch = useDispatch();

  let { eventDate } = currentTimer;
  const { finalEventDate, days, hours, mins, secs, isTimerRunning, isTimerPaused } = currentTimer;
  const isTimerFinished = (!eventDate || eventDate <= 0);

  let timerProgress = 0;

  if (finalEventDate && eventDate) {
    timerProgress = (1 - (eventDate - 0) / (finalEventDate - 0));
    console.log(`% is ${100 - ((eventDate - 0) / (finalEventDate - 0)) * 100}`);
  }
  console.log('--------------------');


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
    // console.log('howmanytimesamIrunningstartintervalioo');
    const interval = startInterval();
    return () => {
      clearInterval(interval);
    };
  }, [isTimerPaused, isTimerRunning]);

  const startTimerHandler = useCallback(() => {
    if (secondsInput >= 60 && minutesInput) {
    // Assert that proper values are inserted;
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
      finalEventDate: newEventDate.clone(),
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
    setIsTimerHidden(false);
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

  let hideShowTimerText = 'Hide timer!';
  if (isTimerHidden) hideShowTimerText = 'Show timer!';

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
            <DefaultText style={styles.inputText}> Minutes </DefaultText>
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
            <DefaultText style={styles.inputText}>Seconds</DefaultText>
          </View>
        </View>


        <View style={styles.hideTimerContainer}>
          <TouchableOpacity onPress={hiddenTimerSwitchHandler}>
            <View style={styles.hideTimerButton}>
              <DefaultText style={styles.hideTimerText} numberOfLines={1}>
                {hideShowTimerText}
              </DefaultText>
            </View>
          </TouchableOpacity>
        </View>

        <Progress.Bar
          progress={timerProgress}
          width={200}
          color={colors.progressBarColor}
        />

        <View style={styles.timerContainer}>
          <DayHourMinSec
            style={styles.timeStyles}
            days={days}
            hours={hours}
            mins={mins}
            secs={secs}
            hidden={isTimerHidden}
            finished={isTimerFinished}
          />
          <StopStartPauseButtons
            isTimerRunning={isTimerRunning}
            isTimerPaused={isTimerPaused}
            isTimerHidden={isTimerHidden}
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
    paddingVertical: 35,
    backgroundColor: colors.screenBackground,
  },
  // Input styles
  inputsContainer: {
    flexDirection: 'row',
    width: '65%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  inputText: {
    fontSize: 20,
  },
  inputContainer: {
    alignItems: 'center',
  },
  timerInput: {
    borderBottomColor: 'red',
    borderBottomWidth: 0,
    color: colors.textPrimary,
    backgroundColor: colors.inputBackground,
    height: 60,
    width: 95,
    fontSize: 25,
    textAlign: 'center',
  },

  // Hide timer styles
  hideTimerContainer: {
    width: '40%',
    height: '10%',
  },
  hideTimerButton: {
    borderWidth: 2,
    borderColor: colors.buttonBorderPrimary,
    borderRadius: 150,
  },
  hideTimerText: {
    fontSize: 25,
    color: colors.buttonTextPrimary,
  },


  // Timer styles
  timerContainer: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default TimerScreen;
