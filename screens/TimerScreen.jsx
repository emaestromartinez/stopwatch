import React, { useEffect, useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Switch,
} from 'react-native';
import moment from 'moment';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import { pauseTimer, updateTimer } from '../store/actions/timerAction';

import HeaderButton from '../components/wrapper-components/HeaderButton';
import DayHourMinSec from '../components/render-components/DayHourMinSec';
import TimerInputs from '../components/render-components/TimerInputs';
import StopStartPauseButtons from '../components/render-components/StopStartPauseButtons';
import IntervalList from '../components/render-components/IntervalList';
import ProgressBar from '../components/render-components/ProgressBar';
import DefaultText from '../components/wrapper-components/DefaultText';

import useTheme from '../constants/themeHooks';

const TimerType = {
  input: 1,
  timePicker: 2,
};

const TimerScreen = () => {
  // const TimerScreen = (props) => {
  // const { navigation } = props;

  // Color theme
  const themeStore = useSelector((state) => state.theme);
  const { colors } = useTheme(themeStore.theme);

  // Normal timer or saved interval;
  const [usingSavedInterval, setUsingSavedInterval] = useState(false);

  // Type of timer;
  const [timerType, setTimerType] = useState(TimerType.input);

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
    else {
      setSecondsInput(inputText.replace(/[^0-9]/g, ''));
    }
  };
  const onChangeMinutesHandler = (inputText) => {
    if (checkForZeroString(inputText)) setSecondsInput('');
    else setMinutesInput(inputText.replace(/[^0-9]/g, ''));
  };
  const hiddenTimerSwitchHandler = () => {
    setIsTimerHidden((value) => !value);
  };
  const useSavedIntervalHandler = () => {
    setUsingSavedInterval((value) => !value);
  };

  // Timer interval things;
  const currentTimer = useSelector((state) => state.timer);

  const dispatch = useDispatch();

  let { eventDate } = currentTimer;
  const {
    finalEventDate, days,
    hours, mins, secs, isTimerRunning,
    isTimerPaused, isTimerStopped,
    lastSavedInterval,
  } = currentTimer;
  const isTimerFinished = (!eventDate || eventDate <= 0);

  // Calculate timer progress second to second;
  let timerProgress = 0;
  if (isTimerStopped) {
    timerProgress = 0;
  } else if (finalEventDate && eventDate) {
    timerProgress = (1 - (eventDate - 0) / (finalEventDate - 0));
  }
  if (eventDate === undefined) {
    eventDate = moment.duration().add({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  }

  // Calculate interval list from saved state;
  const intervalList = lastSavedInterval;
  // console.log(intervalList);

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
          isTimerStopped: false,
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
      isTimerStopped: false,
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
      isTimerStopped: true,
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

  // TIMER LAYOUTS;
  const layoutNotUsingSavedInterval = (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={{ ...styles.screen, backgroundColor: colors.screenBackground }}>
        <View style={styles.switchContainer}>
          <Switch
            value={usingSavedInterval}
            onValueChange={useSavedIntervalHandler}
          />
          <DefaultText> Use saved interval!</DefaultText>
        </View>
        {/* { (usingSavedInterval) && (

        )} */}

        <View style={styles.inputsContainer}>

          <TimerInputs
            onChangeMinutesHandler={onChangeMinutesHandler}
            onChangeSecondsHandler={onChangeSecondsHandler}
            minutesInput={minutesInput}
            secondsInput={secondsInput}
          />
        </View>

        <View style={styles.hideTimerContainer}>
          <TouchableOpacity onPress={hiddenTimerSwitchHandler}>
            <View style={{ ...styles.hideTimerButton, borderColor: colors.buttonBorderPrimary }}>
              <DefaultText
                style={{ ...styles.hideTimerText, color: colors.buttonTextPrimary }}
                numberOfLines={1}
              >
                {hideShowTimerText}
              </DefaultText>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.progressBarContainer}>
          <ProgressBar timerProgress={timerProgress} />
        </View>

        { (timerType === TimerType.input) && (
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
        </View>
        )}

        <View style={styles.buttonsContainer}>
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
  );

  const layoutUsingSavedInterval = (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >

      <View style={{ ...styles.screen, backgroundColor: colors.screenBackground }}>

        {/* { (usingSavedInterval) && (

        )} */}

        <View style={styles.switchContainer}>
          <DefaultText> Use saved interval!</DefaultText>
          <Switch
            value={usingSavedInterval}
            onValueChange={useSavedIntervalHandler}
          />
        </View>

        <View style={styles.content}>
          <View>
            <IntervalList
              intervalList={intervalList}
            />
          </View>
          <View style={styles.buttonsContainer}>
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

      </View>
    </TouchableWithoutFeedback>
  );

  const activeLayout = usingSavedInterval ? layoutUsingSavedInterval : layoutNotUsingSavedInterval;

  return activeLayout;
};
export const screenOptions = (navData) =>
  ({
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
    paddingHorizontal: 10,
  },

  switchContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Input styles
  inputsContainer: {
    width: '65%',
    height: '40%',
    justifyContent: 'center',
  },

  // Time picker container
  timePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    // backgroundColor: 'red',
    paddingVertical: 30,
    height: '10%',
  },

  // Hide timer styles
  hideTimerContainer: {
    width: '40%',
    // backgroundColor: 'red',
    height: 40,
    // height: '10%',
    marginBottom: 8,
  },
  hideTimerButton: {
    borderWidth: 2,
    borderRadius: 150,
  },
  hideTimerText: {
    fontSize: 25,
  },

  // Progress bar
  progressBarContainer: {
    maxHeight: '5%',
    justifyContent: 'center',
    // backgroundColor: 'white',
  },

  // Timer styles
  timerContainer: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonsContainer: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

});

export default TimerScreen;
