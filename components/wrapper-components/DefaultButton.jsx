import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import BodyText from './DefaultText';
import Colors from '../../constants/colors';

const DefaultButton = (props) => {
  const { style,
    children,
    onPress,
    color,
    disabled,
  } = props;
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View style={!disabled
        ? { backgroundColor: color, ...styles.button, ...style }
        : { backgroundColor: color, ...styles.disabledButton, ...style }}
      >
        <BodyText style={styles.buttonText}>{children}</BodyText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignItems: 'center',
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'open-sans-bold',
    color: 'white',
  },
});

export default DefaultButton;
