import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import BodyText from './DefaultText';

import useTheme from '../../constants/themeHooks';


const DefaultButton = (props) => {
  const { style,
    children,
    onPress,
    color,
    disabled,
  } = props;

  // Color theme
  const themeStore = useSelector((state) => state.theme);
  const { colors } = useTheme(themeStore.theme);

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View style={!disabled
        ? { backgroundColor: color || colors.buttonBackground, ...styles.button, ...style }
        : { backgroundColor: color || colors.buttonBackground, ...styles.disabledButton, ...style }}
      >
        <BodyText style={{ ...styles.buttonText, color: colors.buttonTextPrimary }}>{children}</BodyText>
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
    opacity: 0,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'open-sans-bold',
  },
});

export default DefaultButton;
