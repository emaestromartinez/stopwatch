import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { enableScreens } from 'react-native-screens';

import StopwatchNavigator from './navigation/StopwatchNavigator';
import templateReducer from './store/reducers/templateReducer';

enableScreens();

const rootReducer = combineReducers({
  template: templateReducer,
});

const store = createStore(rootReducer);

const openSansFont = require('./assets/fonts/OpenSans-Regular.ttf');
const openSansBoldFont = require('./assets/fonts/OpenSans-Bold.ttf');


const fetchFonts = () => Font.loadAsync({
  'open-sans': openSansFont,
  'open-sans-bold': openSansBoldFont,
});

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  if (!isFontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setIsFontLoaded(true)}
        onError={(error) => console.log(error)}
      />
    );
  }

  return (
    <Provider store={store}>
      <StopwatchNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
