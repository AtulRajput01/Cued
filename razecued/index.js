/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Main from './src/screens/Main';
import {name as appName} from './app.json';
import { LogBox } from 'react-native';
import {Amplify} from 'aws-amplify';
import config from './aws-export.js';
import {withAutheticator} from 'aws-amplify-react-native';

LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
Amplify.configure(config);
AppRegistry.registerComponent(appName, () => Main);


