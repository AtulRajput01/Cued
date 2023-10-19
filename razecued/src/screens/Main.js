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
import Register from './Register';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator  >
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/>
      <Stack.Screen name="BasicDetail" component={BasicDetail} options={{ headerShown: false }} />
      <Stack.Screen name="Discover" component={Discover} options={{ headerShown: false }}/>
      <Stack.Screen name="RegisteredEvents" component={RegisteredEvents} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}/>
      <Stack.Screen name="EventDesc" component={EventDesc} options={{ headerShown: false }} />
      <Stack.Screen name="Token" component={Token} options={{ headerShown: false }} />
      <Stack.Screen name="BasicDetails2" component={BasicDetails2} options={{ headerShown: false }} />
      <Stack.Screen name="Otp" component={Otp} options={{ headerShown: false }}/>
      <Stack.Screen name="DisplayEventDesc" component={DisplayEventDesc} options={{ headerShown: false }}/>
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
        <Stack.Screen name="MainNavigator" component={MainNavigator} options={{ headerShown: false }}/>
        <Stack.Screen name="SignupStack" component={SignupStack} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;