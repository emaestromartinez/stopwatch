import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DefaultText from '../wrapper-components/DefaultText';

const DayHourMinSec = (props) => {
  const { style, days, hours, mins, secs, hidden, finished } = props;

  const minSecLayout = (
    <DefaultText style={{ ...styles.timeStylesBig, ...style }}>
      {`${mins === 0 || mins < 10 ? `0${mins}` : mins}m : ${
        secs === 0 || secs < 10 ? `0${secs}` : secs}s`}
    </DefaultText>
  );
  const hourMinSecLayout = (
    <DefaultText style={{ ...styles.timeStylesSmall, ...style }}>
      {`${hours}h : ${
        mins === 0 || mins < 10 ? `0${mins}` : mins
      }m : ${secs === 0 || secs < 10 ? `0${secs}` : secs}s`}
    </DefaultText>
  );
  const dayHourMinSecLayout = (
    <DefaultText style={{ ...styles.timeStylesSmall, ...style }}>
      {`${days}d : ${hours}h : ${
        mins === 0 || mins < 10 ? `0${mins}` : mins
      }m : ${secs === 0 || secs < 10 ? `0${secs}` : secs}s`}
    </DefaultText>
  );


  let displayedLayout;
  if (finished) {
    if (hidden) {
      displayedLayout = (
        <DefaultText style={{ ...styles.timeStylesText, ...style }}>
          You did it!
        </DefaultText>
      );
    } else {
      displayedLayout = minSecLayout;
    }
  } else if (hidden) {
    DefaultText = (
      <DefaultText style={{ ...styles.timeStylesText, ...style }}>
        Keep going!
      </DefaultText>
    );
  } else if (days) {
    displayedLayout = dayHourMinSecLayout;
  } else if (hours) {
    displayedLayout = hourMinSecLayout;
  } else {
    displayedLayout = minSecLayout;
  }

  return (
    <View style={styles.container}>
      { displayedLayout }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '120%',
    height: 65,
    justifyContent: 'center',
    // backgroundColor: 'orange',
  },
  timeStylesBig: {
    fontSize: 45,
    fontFamily: 'open-sans-bold',
  },
  timeStylesMedium: {
    fontSize: 40,
    fontFamily: 'open-sans-bold',
  },
  timeStylesSmall: {
    fontSize: 38,
    fontFamily: 'open-sans-bold',
  },
  timeStylesText: {
    fontSize: 38,
    fontFamily: 'open-sans-bold',
    textDecorationLine: 'underline',
  },
});

export default DayHourMinSec;
