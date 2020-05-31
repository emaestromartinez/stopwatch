import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import BodyText from './DefaultText';

import useTheme from '../../constants/themeHooks';


const DefaultButton = (props) => {
  const { Colors } = useTheme();

  const { style,
    children,
    onPress,
    color,
    disabled,
  } = props;
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View style={!disabled
        ? { backgroundColor: color || Colors.buttonBGPrimary, ...styles.button, ...style }
        : { backgroundColor: color || Colors.buttonBGPrimary, ...styles.disabledButton, ...style }}
      >
        <BodyText style={{ color: Colors.buttonTextPrimary, ...styles.buttonText }}>{children}</BodyText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  disabledButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignItems: 'center',
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'open-sans-bold',
  },
});

export default DefaultButton;
