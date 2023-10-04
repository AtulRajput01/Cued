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
import DisplayEventDesc from './DisplayEventDesc';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="BasicDetail" component={BasicDetail} />
      <Stack.Screen name="Discover" component={Discover} />
      <Stack.Screen name="RegisteredEvents" component={RegisteredEvents} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="EventDesc" component={EventDesc} />
      <Stack.Screen name="Token" component={Token} />
      <Stack.Screen name="BasicDetails2" component={BasicDetails2} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="DisplayEventDesc" component={DisplayEventDesc} />
    </Stack.Navigator>
  );
};

const SignupStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Otp" component={Otp} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="MainNavigator" component={MainNavigator} />
        <Stack.Screen name="SignupStack" component={SignupStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default createAppContainer(AppNavigator);
