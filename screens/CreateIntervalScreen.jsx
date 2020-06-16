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
import DefaultText from '../components/wrapper-components/DefaultText';
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
      mins: '0',
      secs: '0',
    },
    {
      id: '1',
      mins: '1',
      secs: '24',
    },
    {
      id: '2',
      mins: '1',
      secs: '24',
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
  // const onChangeSecondsHandler = (inputText) => {
  //   if (checkForZeroString(inputText)) setSecondsInput('');
  //   else {
  //     console.log(inputText);

  //     setSecondsInput(inputText.replace(/[^0-9]/g, ''));
  //   }
  // };
  // const onChangeMinutesHandler = (inputText) => {
  //   if (checkForZeroString(inputText)) setSecondsInput('');
  //   else setMinutesInput(inputText.replace(/[^0-9]/g, ''));
  // };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={{ ...styles.screen, backgroundColor: colors.screenBackground }}>
        <View style={styles.listContainer}>
          <FlatList
            data={intervalList}
            // renderItem={({ item }) => <Item title={item.minutes} />}
            renderItem={({ item, index }) => (

              <View style={styles.listItem}>
                <DefaultText
                  style={{ ...styles.listItemText, ...styles.listItemFrontText }}
                  numberOfLines={1}
                >
                  Interval
                  {index}
                  :
                  {' '}
                </DefaultText>
                <DefaultText style={{ ...styles.listItemText, ...styles.listItemTimer }}>
                  {`${item.mins === 0 || item.mins < 10 ? `0${item.mins}` : item.mins}m : ${
                    item.secs === 0 || item.secs < 10 ? `0${item.secs}` : item.secs}s`}
                </DefaultText>
              </View>

            )}
            keyExtractor={(item) => item.id}
          />
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
    padding: 35,
  },
  listContainer: {
    width: '100%',
    height: '60%',
    backgroundColor: 'red',
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
    width: '60%',
  },
  listItemTimer: {
    backgroundColor: 'green',
    width: '40%',
  },
  listItemFrontText: {
  },

});

export default CreateIntervalScreen;
