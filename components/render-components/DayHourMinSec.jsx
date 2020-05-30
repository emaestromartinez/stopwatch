import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const DayHourMinSec = (props) => {
  const { style, days, hours, mins, secs, hidden } = props;

  let displayedLayout;
  if (hidden) {
    displayedLayout = null;
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
  } else {
    displayedLayout = (
      <Text style={{ ...styles.timeStylesBig, ...style }}>
        {`${mins === 0 || mins < 10 ? `0${mins}` : mins}m : ${
          secs === 0 || secs < 10 ? `0${secs}` : secs}s`}
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
});

export default DayHourMinSec;
