import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import DefaultText from './DefaultText';

import useTheme from '../../constants/themeHooks';

const { colors } = useTheme();

const IconTextButton = (props) => {
  const { style,
    children,
    onPress,
    disabled,
    text,
  } = props;
  let { color } = props;

  if (!color) color = colors.buttonBGPrimary;
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View style={!disabled
        ? { ...styles.button, backgroundColor: color, ...style }
        : { ...styles.disabledButton, backgroundColor: color, ...style }}
      >
        {children}
        <DefaultText style={styles.buttonText}>{text}</DefaultText>
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
    backgroundColor: colors.buttonBGPrimary,
  },
  disabledButton: {
    flexDirection: 'column',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignItems: 'center',
    opacity: 0.7,
    backgroundColor: colors.buttonBGPrimary,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'open-sans-bold',
    color: colors.buttonTextPrimary,
  },
});

export default IconTextButton;
