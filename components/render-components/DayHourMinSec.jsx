import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const DayHourMinSec = (props) => {
  const { style, days, hours, mins, secs, hidden, finished } = props;

  const minSecLayout = (
    <Text style={{ ...styles.timeStylesBig, ...style }}>
      {`${mins === 0 || mins < 10 ? `0${mins}` : mins}m : ${
        secs === 0 || secs < 10 ? `0${secs}` : secs}s`}
    </Text>
  );
  const hourMinSecLayout = (
    <Text style={{ ...styles.timeStylesSmall, ...style }}>
      {`${hours}h : ${
        mins === 0 || mins < 10 ? `0${mins}` : mins
      }m : ${secs === 0 || secs < 10 ? `0${secs}` : secs}s`}
    </Text>
  );
  const dayHourMinSecLayout = (
    <Text style={{ ...styles.timeStylesSmall, ...style }}>
      {`${days}d : ${hours}h : ${
        mins === 0 || mins < 10 ? `0${mins}` : mins
      }m : ${secs === 0 || secs < 10 ? `0${secs}` : secs}s`}
    </Text>
  );


  let displayedLayout;
  if (finished) {
    if (hidden) {
      displayedLayout = (
        <Text style={{ ...styles.timeStylesText, ...style }}>
          You did it!
        </Text>
      );
    } else {
      displayedLayout = minSecLayout;
    }
  } else if (hidden) {
    displayedLayout = (
      <Text style={{ ...styles.timeStylesText, ...style }}>
        Keep going!
      </Text>
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
