import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TitleText = (props) => {
  const { style, children } = props;
  return (
    <Text style={{ ...styles.body, ...style }}>
      { children }
    </Text>
  );
};

const styles = StyleSheet.create({
  body: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
});

export default TitleText;
