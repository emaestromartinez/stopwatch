import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import DefaultText from './DefaultText';

import useTheme from '../../constants/themeHooks';

const IconTextButton = (props) => {
  const { style,
    children,
    onPress,
    color,
    disabled,
    text,
  } = props;
  const { colors } = useTheme();

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View style={!disabled
        ? { backgroundColor: color || colors.buttonBGPrimary, ...styles.button, ...style }
        : { backgroundColor: color || colors.buttonBGPrimary, ...styles.disabledButton, ...style }}
      >
        {children}
        <DefaultText style={{ color: colors.buttonTextPrimary, ...styles.buttonText }}>{text}</DefaultText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'column',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  disabledButton: {
    flexDirection: 'column',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignItems: 'center',
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'open-sans-bold',
  },
});

export default IconTextButton;
