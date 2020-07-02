import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import moment from 'moment';

import HeaderButton from '../wrapper-components/HeaderButton';
import DayHourMinSec from './DayHourMinSec';
import TimerInputs from './TimerInputs';
import StopStartPauseButtons from './StopStartPauseButtons';
import ProgressBar from './ProgressBar';
import DefaultText from '../wrapper-components/DefaultText';

const IntervalList = (props) => {
  const { navigation, intervalList } = props;

  return (
    <FlatList
      data={intervalList}
      renderItem={({ item }) => (

        <View style={styles.listItem}>
          <DefaultText
            style={{ ...styles.listItemText, ...styles.listItemFrontText }}
            numberOfLines={1}
          >
            Interval
            {' '}
            {item.id}
            :
          </DefaultText>
          { item.hours !== 0
        && (

        <DefaultText style={{ ...styles.listItemText, ...styles.listItemTimer }}>
          {`${item.hours}h : ${
            item.mins === 0 || item.mins < 10 ? `0${item.mins}` : item.mins
          }m : ${item.secs === 0 || item.secs < 10 ? `0${item.secs}` : item.secs}s`}
        </DefaultText>
        )}
          { !item.hours
        && (
          <DefaultText style={{ ...styles.listItemText, ...styles.listItemTimer }}>
            {`${item.mins === 0 || item.mins < 10 ? `0${item.mins}` : item.mins}m : ${
              item.secs === 0 || item.secs < 10 ? `0${item.secs}` : item.secs}s`}
          </DefaultText>
        )}
        </View>

      )}
      keyExtractor={(item) => item.id}
    />
  );
};

// 50 40 10 shows properly on my screen;
const listContainerHeight = '70%';

const styles = StyleSheet.create({
  // List styles;
  listContainer: {
    width: '100%',
    // height: listContainerHeight,
    // height: '75%',
  },
  listItem: {
    flexDirection: 'row',
    width: '100%',
    // height: 42,
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
});

export default IntervalList;
