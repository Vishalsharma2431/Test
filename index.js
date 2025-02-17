/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const APP = () => {
  return (
    <GestureHandlerRootView>
      <App />
    </GestureHandlerRootView>
  );
};

AppRegistry.registerComponent(appName, () => APP);
