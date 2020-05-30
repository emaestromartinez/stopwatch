import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const DayHourMinSec = (props) => {
  const { style, days, hours, mins, secs, hidden, finished } = props;

  let displayedLayout;
  if (finished || (!days && !hours)) {
    displayedLayout = (
      <Text style={{ ...styles.timeStylesBig, ...style }}>
        {`${mins === 0 || mins < 10 ? `0${mins}` : mins}m : ${
          secs === 0 || secs < 10 ? `0${secs}` : secs}s`}
      </Text>
    );
  } else if (hidden) {
    displayedLayout = (
      <Text style={{ ...styles.timeStylesText, ...style }}>
        Keep going!
      </Text>
    );
  } else if (days) {
    displayedLayout = (
      <Text style={{ ...styles.timeStylesSmall, ...style }}>
        {`${days}d : ${hours}h : ${
          mins === 0 || mins < 10 ? `0${mins}` : mins
        }m : ${secs === 0 || secs < 10 ? `0${secs}` : secs}s`}
      </Text>
    );
  } else if (hours) {
    displayedLayout = (
      <Text style={{ ...styles.timeStylesMedium, ...style }}>
        {`${hours}h : ${
          mins === 0 || mins < 10 ? `0${mins}` : mins
        }m : ${secs === 0 || secs < 10 ? `0${secs}` : secs}s`}
      </Text>
    );
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
