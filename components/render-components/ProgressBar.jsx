import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import * as Progress from 'react-native-progress';

import HeaderButton from '../wrapper-components/HeaderButton';

import useTheme from '../../constants/themeHooks';

const { colors } = useTheme();

const ProgressBar = (props) => {
  const { navigation, timerProgress } = props;
  return (
    <Progress.Bar
      progress={timerProgress}
      width={200}
      color={colors.progressBarColor}
    />
  );
};

ProgressBar.navigationOptions = (navData) => {
  const navParam = navData.navigation.getParam('navParam');
  const navFunctionAsParam = navData.navigation.getParam('navFunctionAsParam');

  return {
    headerTitle: navParam,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="favorite"
          iconName="ios-star"
          onPress={navFunctionAsParam}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default ProgressBar;
