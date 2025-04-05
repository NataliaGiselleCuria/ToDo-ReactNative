import 'react-native-gesture-handler';
import React from 'react';
import { enableScreens } from 'react-native-screens';
import AppNavigator from './navigation/AppNavigator';

enableScreens();

const App = () => {
  return <AppNavigator/>;
};

export default App;