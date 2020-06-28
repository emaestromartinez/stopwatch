import React, { useEffect, useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Button,
  Alert,
} from 'react-native';
import moment from 'moment';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import { Ionicons } from '@expo/vector-icons';

import IconTextButton from '../components/wrapper-components/IconTextButton';
import TimerInputs from '../components/render-components/TimerInputs';
import IntervalList from '../components/render-components/IntervalList';
import HeaderButton from '../components/wrapper-components/HeaderButton';

import useTheme from '../constants/themeHooks';
import { updateTimer } from '../store/actions/timerAction';

const TimerType = {
  input: 1,
  timePicker: 2,
};

const CreateIntervalScreen = (props) => {
  // const TimerScreen = (props) => {
  const { navigation } = props;

  const dispatch = useDispatch();

  const [secondsInput, setSecondsInput] = useState('');
  const [minutesInput, setMinutesInput] = useState('');
  const [intervalList, setIntervalList] = useState([
    // {
    //   id: '0',
    //   hours: '2',
    //   mins: '3',
    //   secs: '4',
    // },
  ]);

  // Color theme
  const themeStore = useSelector((state) => state.theme);
  const { colors } = useTheme(themeStore.theme);
  const iconColor = colors.buttonTextPrimary;

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  }, []);

  const keyboardDidShow = () => {

  };

  const keyboardDidHide = () => {

  };

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
    if (checkForZeroString(inputText)) setMinutesInput('');
    else setMinutesInput(inputText.replace(/[^0-9]/g, ''));
  };

  const addNewInterval = () => {
    if (!minutesInput && !secondsInput) {
      // Assert that proper values are inserted;
      Alert.alert('Correct your times!', 'Introduce seconds or minutes in order to add a new timer to the interval.', [
        { text: 'Sorry Mr. Sexyman, won\'t happen again!', style: 'cancel' },
      ]);
      return;
    }
    if (parseInt(secondsInput, 10) >= 60 && minutesInput) {
      // Assert that proper values are inserted;
      Alert.alert('Correct your times!', 'If seconds are higher than 60, the minute field must be empty.', [
        { text: 'Sorry Mr. Sexyman, won\'t happen again!', style: 'cancel' },
      ]);
      return;
    }
    const newTimer = moment.duration().add(
      { days: 0, hours: 0, minutes: parseInt(minutesInput, 10), seconds: parseInt(secondsInput, 10) },
    );
    setIntervalList((currentList) => [...currentList,
      { id: String(currentList.length + 1), hours: newTimer.hours(), mins: newTimer.minutes() || 0, secs: newTimer.seconds() || 0 },
    ]);
  };

  const saveInterval = useCallback(() => {
    // Convert the interval to an easier convertableback type;

    // intervalList needs to be converted;
    const eventTimersList = [];
    console.log(intervalList);

    intervalList.forEach((interval) => {
      eventTimersList.push(moment.duration().add(
        { days: 0, hours: parseInt(interval.hours, 10), minutes: parseInt(interval.mins, 10), seconds: parseInt(interval.secs, 10) },
      ));
    });
    console.log(eventTimersList);
    dispatch(updateTimer(eventTimersList));
  }, [dispatch, intervalList]);

  // const saveInterval = () => {
  //   // Convert the interval to an easier convertableback type;

  //   // intervalList needs to be converted;
  //   const eventTimersList = [];

  //   intervalList.forEach((interval) => {
  //     eventTimersList.push(moment.duration().add(
  //       { days: 0, hours: parseInt(interval.hours, 10), minutes: parseInt(interval.mins, 10), seconds: parseInt(interval.secs, 10) },
  //     ));
  //   });
  //   console.log(eventTimersList);
  //   dispatch(updateTimer(eventTimersList));
  // };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={{ ...styles.screen, backgroundColor: colors.screenBackground }}>

        <View style={{ ...styles.listContainer }}>
          <IntervalList
            intervalList={intervalList}
          />
        </View>

        <View style={{ ...styles.longButtonContainer }}>
          <IconTextButton
            // disabled={isTimerRunning || (!secondsInput && !minutesInput)}
            onPress={() => addNewInterval()}
            style={styles.longButton}
            text="Add new timer"
            textStyle={styles.longButtonTextStyle}
          >
            <Ionicons name="md-add" size={28} color={iconColor} />
          </IconTextButton>
        </View>

        <View style={{ ...styles.inputsContainer }}>
          <TimerInputs
            onChangeMinutesHandler={onChangeMinutesHandler}
            onChangeSecondsHandler={onChangeSecondsHandler}
            minutesInput={minutesInput}
            secondsInput={secondsInput}
            // showText={showInputsText}
            containerStyle={{ flexDirection: 'row' }}
            // timerInputStyle={{ height: 40 }}
            minutesText="min"
            secondsText="sec"
          />
        </View>

        <View style={{ ...styles.longButtonContainer }}>
          <IconTextButton
            // disabled={isTimerRunning || (!secondsInput && !minutesInput)}
            onPress={() => saveInterval()}
            style={styles.longButton}
            text="Use this interval!"
            textStyle={styles.longButtonTextStyle}
          >
            <Ionicons name="md-save" size={28} color={iconColor} />
          </IconTextButton>
        </View>
        <View style={{ ...styles.longButtonContainer }}>
          <IconTextButton
            // disabled={isTimerRunning || (!secondsInput && !minutesInput)}
            onPress={() => saveInterval()}
            style={styles.longButton}
            text="Start this interval"
            textStyle={styles.longButtonTextStyle}
          >
            <Ionicons name="md-save" size={28} color={iconColor} />
          </IconTextButton>
        </View>

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
            navData.navigation.ºopenDrawer();
          }}
        />
      </HeaderButtons>
    ) });

// 50 40 10 shows properly on my screen;
const listContainerHeight = '70%';
const inputsContainerHeight = '20%';
const longButtonContainerHeight = '10%';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 35,
    paddingTop: 45,
  },
  // List styles;
  listContainer: {
    width: '100%',
    height: listContainerHeight,
    // height: '75%',
  },
  listItem: {
    flexDirection: 'row',
    width: '100%',
    height: 42,
    backgroundColor: 'orange',
    alignItems: 'center',
  },
  listItemText: {
    backgroundColor: 'blue',
    fontSize: 28,
    width: '45%',
  },
  listItemTimer: {
    backgroundColor: 'green',
    width: '60%',
  },
  listItemFrontText: {
  },

  // Input styles;
  inputsContainer: {
    width: '100%',
    height: inputsContainerHeight,
    // marginTop: 20,
    // paddingBottom: 30,
    justifyContent: 'center',
  },

  // Button styles;
  longButtonContainer: {
    height: longButtonContainerHeight,
    width: '100%',
    alignItems: 'center',
    // height: '10%',
    justifyContent: 'center',
  },
  longButton: {
    width: 250,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  longButtonTextStyle: {
    paddingLeft: 15,
    fontSize: 22,
  },

});

export default CreateIntervalScreen;
