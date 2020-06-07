import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import DefaultText from './DefaultText';

import useTheme from '../../constants/themeHooks';


const IconTextButton = (props) => {
  const { style,
    children,
    onPress,
    disabled,
    text,
  } = props;
  let { color } = props;

  // Color theme
  const themeStore = useSelector((state) => state.theme);
  const { colors } = useTheme(themeStore.theme);

  if (!color) color = colors.buttonBackground;
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View style={!disabled
        ? { ...styles.button, backgroundColor: color || colors.buttonBackground, ...style }
        : { ...styles.disabledButton, backgroundColor: color || colors.buttonBackground, opacity: colors.buttonDisabledOpacity, ...style }}
      >
        {children}
        <DefaultText style={{ ...styles.buttonText, color: colors.buttonTextPrimary }}>{text}</DefaultText>
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
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'open-sans-bold',
  },
});

export default IconTextButton;
