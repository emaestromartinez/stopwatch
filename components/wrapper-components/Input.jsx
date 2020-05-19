import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const Input = (props) => {
  const { style } = props;
  return (
    <TextInput {...props} style={{ ...styles.input, ...style }} />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    width: '100%',

    marginTop: 4,
    marginBottom: 8,

    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
});

export default Input;
