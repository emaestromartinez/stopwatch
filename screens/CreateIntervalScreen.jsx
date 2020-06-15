import React, { useEffect, useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native';
import moment from 'moment';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import Input from '../components/wrapper-components/Input';
import HeaderButton from '../components/wrapper-components/HeaderButton';

import useTheme from '../constants/themeHooks';

const TimerType = {
  input: 1,
  timePicker: 2,
};

const CreateIntervalScreen = (props) => {
  // const TimerScreen = (props) => {
  const { navigation } = props;

  const [secondsInput, setSecondsInput] = useState('');
  const [minutesInput, setMinutesInput] = useState('');
  const [intervalList, setIntervalList] = useState([
    {
      id: '0',
      minutes: '0',
      seconds: '0',
    },
  ]);

  // Color theme
  const themeStore = useSelector((state) => state.theme);
  const { colors } = useTheme(themeStore.theme);

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
      console.log(inputText);

      setSecondsInput(inputText.replace(/[^0-9]/g, ''));
    }
  };
  const onChangeMinutesHandler = (inputText) => {
    if (checkForZeroString(inputText)) setSecondsInput('');
    else setMinutesInput(inputText.replace(/[^0-9]/g, ''));
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={{ ...styles.screen, backgroundColor: colors.screenBackground }}>
        <FlatList
          data={intervalList}
          renderItem={({ item }) => <Item title={item.minutes} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </TouchableWithoutFeedback>
  );
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
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 35,
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
    height: 60,
    width: 95,
    fontSize: 25,
    textAlign: 'center',
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

export default CreateIntervalScreen;
