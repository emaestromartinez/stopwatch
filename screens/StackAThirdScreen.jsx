import React, { useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,

  Text,
} from 'react-native';


const StackAThirdScreen = (props) => {
  const { navigation } = props;

  return (
    <View style={styles.screen}>
      <Text> Stack A Third Screen</Text>
    </View>
  );
};

StackAThirdScreen.navigationOptions = (navData) => {
  const headerTitle = navData.navigation.getParam('headerTitle');

  return {
    headerTitle,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default StackAThirdScreen;
