/**
 * @format
 */

import { AppRegistry } from 'react-native';
import Main from './src/screens/Main';

import { name as appName } from './app.json';
import { LogBox } from 'react-native';
import { Amplify } from 'aws-amplify';
import config from './aws-export.js';
import * as Sentry from '@sentry/react-native';

// Configure Sentry with your DSN
Sentry.init({
  dsn: 'https://56fe118d1622e6fe53d2fe9887ed165e@o4506151938490368.ingest.sentry.io/4506151956316160',
});

LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

Amplify.configure(config);
AppRegistry.registerComponent(appName, () => Main);

