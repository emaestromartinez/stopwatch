import React from 'react';
import { Text, StyleSheet } from 'react-native';
import useTheme from '../../constants/themeHooks';

const { colors } = useTheme();

const DefaultText = (props) => {
  const { style, children, numberOfLines } = props;
  return (
    <Text numberOfLines={numberOfLines} style={{ ...styles.body, ...style }}>
      { children }
    </Text>
  );
};

const styles = StyleSheet.create({
  body: {
    fontFamily: 'open-sans',
    textAlign: 'center',
    color: colors.textPrimary,
  },
});

export default DefaultText;
