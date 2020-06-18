import React, { useState } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import { useSelector } from 'react-redux';

import DefaultText from '../wrapper-components/DefaultText';
import Input from '../wrapper-components/Input';

import useTheme from '../../constants/themeHooks';

const TimerInputs = (props) => {
  const {
    navigation,
    onChangeMinutesHandler,
    onChangeSecondsHandler,
    minutesInput,
    secondsInput,
    containerStyle,
    timerInputStyle,
    minutesText = 'Minutes',
    secondsText = 'Seconds',
    showText = true,
  } = props;

  // Color theme
  const themeStore = useSelector((state) => state.theme);
  const { colors } = useTheme(themeStore.theme);

  // Timer inputs things;
  // const [secondsInput, setSecondsInput] = useState('');
  // const [minutesInput, setMinutesInput] = useState('');

  // const onChangeSecondsHandler = (inputText) => {
  //   if (checkForZeroString(inputText)) setSecondsInput('');
  //   else setSecondsInput(inputText.replace(/[^0-9]/g, ''));
  // };
  // const onChangeMinutesHandler = (inputText) => {
  //   if (checkForZeroString(inputText)) setSecondsInput('');
  //   else setMinutesInput(inputText.replace(/[^0-9]/g, ''));
  // };

  const checkForZeroString = (input) => {
    if (input === '0'
    || input === '00'
    || input === '000'
    || input === '0000') return true;
    return false;
  };

  return (
    <View style={styles.inputsContainer}>
      <View style={{ ...styles.inputContainer, ...containerStyle }}>
        <Input
          style={{ ...styles.timerInput,
            color: colors.textPrimary,
            backgroundColor: colors.inputBackground,
            ...timerInputStyle }}
          value={minutesInput}
          onChangeText={(value) => onChangeMinutesHandler(value)}
          keyboardType="numeric"
          blurOnSubmit
          maxLength={4}
        />
        { showText
        && (
        <View style={styles.inputTextContainer}>
          <DefaultText style={styles.inputText}>{minutesText}</DefaultText>
        </View>
        )}
      </View>
      <View style={{ ...styles.inputContainer, ...containerStyle }}>
        <Input
          style={{ ...styles.timerInput,
            color: colors.textPrimary,
            backgroundColor: colors.inputBackground,
            ...timerInputStyle }}
          value={secondsInput}
          onChangeText={(value) => onChangeSecondsHandler(value)}
          keyboardType="numeric"
          blurOnSubmit
          maxLength={4}
        />
        { showText
        && (
        <View style={styles.inputTextContainer}>
          <DefaultText style={styles.inputText}>{secondsText}</DefaultText>
        </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Input styles
  inputsContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  timerInput: {
    borderBottomColor: 'red',
    borderBottomWidth: 0,
    height: 60,
    width: 95,
    fontSize: 25,
    textAlign: 'center',
  },
  inputText: {
    fontSize: 20,
  },
  inputTextContainer: {
    justifyContent: 'flex-end',
  },
});

export default TimerInputs;
