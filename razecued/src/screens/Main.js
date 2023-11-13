import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from './Splash';
import BasicDetail from './BasicDetail';
import Discover from './Discover';
import RegisteredEvents from './RegisteredEvents';
import Login from './Login';
import Signup from './Signup';
import EventDesc from './EventDesc';
import Token from './Token';
import BasicDetails2 from './BasicDetails2';
import Otp from './Otp';
import Userdetail from './Userdetail';

import Register from './Register';
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://1667923cd6b54f5ff4f494632cfdec85@o4506172964995072.ingest.sentry.io/4506173604102144",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator  >
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/>
      <Stack.Screen name="BasicDetail" component={BasicDetail} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Discover} options={{ headerShown: false }}/>
      <Stack.Screen name="RegisteredEvents" component={RegisteredEvents} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}/>
      <Stack.Screen name="EventDesc" component={EventDesc} options={{ headerShown: false }} />
      <Stack.Screen name="Token" component={Token} options={{ headerShown: false }} />
      <Stack.Screen name="BasicDetails2" component={BasicDetails2} options={{ headerShown: false }} />
      <Stack.Screen name="Otp" component={Otp} options={{ headerShown: false }}/>
      <Stack.Screen name="Userdetail" component={Userdetail} options={{ headerShown: false }}/>


      <Stack.Screen name = "Register" component={Register} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

const SignupStack = () => {
  return (
    <Stack.Navigator  >
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
      <Stack.Screen name="Otp" component={Otp} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Discover" component={MainNavigator} options={{ headerShown: false }}/>
        <Stack.Screen name="SignupStack" component={SignupStack} options={{ headerShown: false }}/>
      </Stack.Navigator>
      </NavigationContainer>
  );
};

export default Sentry.wrap(AppNavigator);