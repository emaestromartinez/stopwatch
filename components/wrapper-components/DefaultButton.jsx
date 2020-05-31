import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import BodyText from './DefaultText';

import useTheme from '../../constants/themeHooks';

const { colors } = useTheme();

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
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: colors.buttonBGPrimary,
  },
  disabledButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignItems: 'center',
    opacity: 0.5,
    backgroundColor: colors.buttonBGPrimary,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'open-sans-bold',
    color: colors.buttonTextPrimary,
  },
});

export default DefaultButton;
