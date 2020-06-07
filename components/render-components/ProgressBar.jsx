import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import * as Progress from 'react-native-progress';


import { useSelector } from 'react-redux';
import useTheme from '../../constants/themeHooks';
import DefaultText from '../wrapper-components/DefaultText';


const ProgressBar = (props) => {
  const { navigation, timerProgress } = props;

  // Color theme
  const themeStore = useSelector((state) => state.theme);
  const { colors } = useTheme(themeStore.theme);

  const percentage = Math.round((timerProgress + 0.00001) * 100) / 100;
  return (
    <View style={styles.container}>

      <View>
        <Progress.Bar
          progress={percentage}
          width={200}
          color={colors.progressBarColor}
        />
      </View>
      <View>
        <DefaultText style={{ ...styles.progressPercentage, color: colors.progressBarColor }}>
          {Math.round(percentage * 100)}
          %
        </DefaultText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 50,
  },
  progressPercentage: {
    paddingHorizontal: 10,
    fontSize: 20,
  },
});

export default ProgressBar;
