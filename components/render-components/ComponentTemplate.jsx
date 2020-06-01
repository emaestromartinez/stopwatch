import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../wrapper-components/HeaderButton';


const ComponentTemplate = (props) => {
  const { navigation } = props;
  return (
    <View>
      <Text />
    </View>
  );
};

ComponentTemplate.navigationOptions = (navData) => {
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

export default ComponentTemplate;
