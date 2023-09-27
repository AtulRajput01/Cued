/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Main from './src/screens/Main';
import {name as appName} from './app.json';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
AppRegistry.registerComponent(appName, () => Main);
