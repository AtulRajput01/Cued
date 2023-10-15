import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React, {useEffect,useState} from "react";
import { View,Alert, Text,ActivityIndicator, Animated, TouchableOpacity, Image, StyleSheet, Pressable, TextInput, Easing, Keyboard } from 'react-native';

import Splash from "./Splash";
import BasicDetail from "./BasicDetail";
import Discover from "./Discover";
import RegisteredEvents from "./RegisteredEvents";
import Login from "./Login";
import Signup from "./Signup";
import EventDesc from "./EventDesc";
import Token from "./Token";
import BasicDetails2 from "./BasicDetails2";
import Otp from "./Otp";
import DisplayEventDesc from "./DisplayEventDesc";
import Register from "./Register";
import Layout from "./layout";
import { Auth,Hub } from "aws-amplify";

const Stack = createStackNavigator();

export default function App() {
  const [users, setUsers] = useState([]);
  const { signOut } = useAuthenticator();

  useEffect(() => {
    DataStore.query(users).then(setUsers);
  }, []);
  // const [user, setUser] = useState(undefined);
  // const [loading, setLoading] = useState(true);
  // const checkUser = async () =>{
  //   try{
  //     const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
  //     setUser(authUser);
  //   }catch (e) {
  //     setUser(null);
  //   }finally {
  //     setLoading(false);
  //   }
   
  // };

  // useEffect (() => {
  //   checkUser();
  // }, []);

  // useEffect(() => {
  //   const listener = data => {
  //    if (data.payload.event == 'signIn'|| data.payload.event === 'signOut') {
  //     checkUser();
  //    }
  //   };

  //   Hub.listen('auth' , listener);

  //   return () => {
  //     Hub.remove('auth', listener); // Remove the listener when the component unmounts
  //   };
  // }, []);

  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator />
  //     </View>
  //   );
  // }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" >
        
          <Stack.Screen name="Discover" component={Discover} options={{ headerShown: false }} />
        
         
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="Otp" component={Otp} options={{ headerShown: false }}/>
          
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="BasicDetail" component={BasicDetail} options={{ headerShown: false }} />
        
        <Stack.Screen name="RegisteredEvents" component={RegisteredEvents} options={{ headerShown: false }} />
        
        <Stack.Screen name="EventDesc" component={EventDesc} options={{ headerShown: false }} />
        <Stack.Screen name="Token" component={Token} options={{ headerShown: false }} />
        <Stack.Screen name="BasicDetails2" component={BasicDetails2} options={{ headerShown: false }} />
       
        <Stack.Screen name="DisplayEventDesc" component={DisplayEventDesc} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
