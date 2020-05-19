import React from 'react';
import { Text, StyleSheet } from 'react-native';

const DefaultText = (props) => {
  const { style, children } = props;
  return (
    <Text style={{ ...styles.body, ...style }}>
      { children }
    </Text>
  );
};

const styles = StyleSheet.create({
  body: {
    fontFamily: 'open-sans',
    textAlign: 'center',
  },
});

export default DefaultText;
