/**
 * @format
 */

import { AppRegistry } from 'react-native';
import Main from './src/screens/Main';
import { name as appName } from './app.json';
import { LogBox } from 'react-native';
import { Amplify } from 'aws-amplify';
import config from './aws-export.js';
import 'core-js/full/symbol/async-iterator';
import 'expo-router/entry';
import { withAuthenticator } from 'aws-amplify-react-native';

LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
Amplify.configure(config);

const MainWithAuth = withAuthenticator(Main);

AppRegistry.registerComponent(appName, () => MainWithAuth);

