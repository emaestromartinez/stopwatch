import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import IconTextButton from '../wrapper-components/IconTextButton';

import useTheme from '../../constants/themeHooks';

const StopStartPauseButtons = (props) => {
  const {
    navigation,
    isTimerRunning,
    isTimerPaused,
    isTimerHidden,
    minutesInput,
    secondsInput,
    stopTimerHandler,
    startTimerHandler,
    resumeTimerHandler,
    pauseTimerHandler,
  } = props;

  const { colors } = useTheme();
  const iconColor = colors.buttonTextPrimary;

  const startResumeButton = isTimerPaused ? (
    <IconTextButton onPress={resumeTimerHandler} style={styles.button} text="Resume">
      <Ionicons name="md-play" size={24} color={iconColor} />
    </IconTextButton>
  ) : (
    <IconTextButton
      disabled={isTimerRunning || (!secondsInput && !minutesInput)}
      onPress={startTimerHandler}
      style={styles.button}
      text="Start"
    >
      <Ionicons name="md-play" size={24} color={iconColor} />
    </IconTextButton>
  );

  return (
    <View style={styles.buttonsContainer}>
      <IconTextButton
        disabled={!isTimerRunning}
        onPress={stopTimerHandler}
        style={styles.button}
        text="Stop"
      >
        <Ionicons name="ios-square" size={24} color={iconColor} />
      </IconTextButton>
      {startResumeButton}
      <IconTextButton
        disabled={isTimerPaused || !isTimerRunning}
        onPress={pauseTimerHandler}
        style={styles.button}
        text="Pause"
      >
        <Ionicons name="md-pause" size={24} color={iconColor} />
      </IconTextButton>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default StopStartPauseButtons;
