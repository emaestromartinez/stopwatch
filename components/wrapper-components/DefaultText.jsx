import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import useTheme from '../../constants/themeHooks';


const DefaultText = (props) => {
  const { style, children, numberOfLines } = props;

  // Color theme
  const themeStore = useSelector((state) => state.theme);
  const { colors } = useTheme(themeStore.theme);

  return (
    <Text numberOfLines={numberOfLines} style={{ ...styles.body, color: colors.textPrimary, ...style }}>
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
