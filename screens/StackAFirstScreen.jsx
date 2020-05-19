import React, { useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/wrapper-components/HeaderButton';


const StackAFirstScreen = (props) => {
  const { navigation } = props;

  return (
    <View style={styles.screen}>
      <Text> Stack A First Screen</Text>
    </View>
  );
};
StackAFirstScreen.navigationOptions = (navData) => ({
  headerTitle: 'StackAFirstScreenHeaderTitle',
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Menu"
        iconName="ios-menu"
        onPress={() => {
          navData.navigation.openDrawer();
        }}
      />
    </HeaderButtons>
  ) });

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default StackAFirstScreen;
