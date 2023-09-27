import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Animated, TouchableOpacity, Image, StyleSheet, Pressable, TextInput, Button, Easing, Keyboard } from 'react-native';
import { ImageBackground } from 'react-native';
import CheckBox from 'react-native-check-box'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Auth } from 'aws-amplify';
import config from '../aws-exports'; // Import Amplify config
import {Amplify} from 'aws-amplify';
Amplify.configure(config); // Configure Amplify

const Login = ({ navigation }) => {
  const transY = useRef(new Animated.Value(0));
  const transYP = useRef(new Animated.Value(0));

  const handleFocus = (animatedValue) => {
    Animated.timing(animatedValue, {
      toValue: -35,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.ease
    }).start();
  }

  const handleBlur = (animatedValue, text) => {
    if (!text) {
      Animated.timing(animatedValue, {
        toValue: 0,
        useNativeDriver: true,
        easing: Easing.ease
      }).start();
    }
  }

  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginResponse, setLoginResponse] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Add state for password visibility
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const passwordInputType = isPasswordVisible ? 'text' : 'password';

  const transX = transY.current.interpolate({
    inputRange: [-35, 0],
    outputRange: [-20, 0],
    extrapolate: 'clamp'
  });

  const transXP = transYP.current.interpolate({
    inputRange: [-35, 0],
    outputRange: [-20, 0],
    extrapolate: 'clamp'
  });

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Input validation
      if (!email || !password) {
        throw new Error('Email and password are required.');
      }

      // Sign in using AWS Amplify Auth
      await Auth.signIn(email, password);
      // Handle successful login (e.g., navigate to the next screen)
      navigation.navigate('BasicDetail');
    } catch (error) {
      // Handle specific error types
      if (error.code === 'UserNotConfirmedException') {
        setError('Account not confirmed. Please check your email for a confirmation link.');
      } else if (error.code === 'NotAuthorizedException') {
        setError('Invalid email or password. Please try again.');
      } else {
        setError('An error occurred during login.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/Landingbg.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Image
            source={require('../../assets/images/C.png')}
            style={styles.logo}
          />
          <Image
            source={require('../../assets/images/ued.png')}
            style={styles.logo2}
          />
        </View>
        <View style={styles.options}>
          <TouchableOpacity onPress={() => console.log(' ')}>
            <Text style={styles.optionText2}>Login</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity onPress={() => navigation.navigate('RegisterAndSignup')}>
            <Text style={styles.optionText}>Signup</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.welcomeText}>Hey there, </Text>
        <Text style={styles.welcomeText2}>Welcome Back!</Text>

        {/* Email */}
        <View style={styles.container2}>
          <Animated.View
            style={[styles.label, { transform: [{ translateY: transY.current }, { translateX: transX }] }]}>
            <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
              <Text style={styles.holder}>Email</Text>
            </TouchableWithoutFeedback>
          </Animated.View>
          <TextInput
            style={styles.input}
            onFocus={() => handleFocus(transY.current)}
            onBlur={() => handleBlur(transY.current, email)}
            placeholderTextColor="#000000"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        {/* Password */}
        <View style={styles.containerP}>
          <Animated.View
            style={[styles.label, { transform: [{ translateY: transYP.current }, { translateX: transXP }] }]}>
            <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
              <Text style={styles.holder}>Password</Text>
            </TouchableWithoutFeedback>
          </Animated.View>
          <TextInput
            style={styles.input}
            onFocus={() => handleFocus(transYP.current)}
            onBlur={() => handleBlur(transYP.current, password)}
            placeholderTextColor="#000000"
            value={password}
            secureTextEntry={passwordInputType === 'password'}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox />
          <Text style={styles.remember}>Remember me</Text>
          <TouchableOpacity onPress={() => console.log('Forgot password pressed')}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <View style={styles.row}>
            <Image source={require('../../assets/images/next.png')} />
            <Text style={styles.loginButtonText}>Login</Text>
          </View>
        </TouchableOpacity>
        {/* Display login response */}
        {error && <Text style={styles.loginResponse}>{error}</Text>}
        <TouchableOpacity onPress={() => navigation.navigate('RegisterAndSignup')}>
          <Text style={styles.createAccount}>Don't have an account? Create one</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    position: 'absolute',
    padding: 10,
  },
  holder: {
    color: '#000000'
  },
  container2: {
    borderRadius: 10,
    width: '100%'
  },
  containerP: {
    borderRadius: 10,
    width: '100%',
    marginTop: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  remember: {
    color: '#000000',
    paddingRight: 80
  },
  options: {
    flexDirection: 'row',
    marginVertical: 50,
  },
  optionText: {
    color: '#505050',
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '400',
    marginRight: 60,
    marginLeft: 58
  },
  optionText2: {
    color: '#B51E71',
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '400',
    marginRight: 60,
    marginLeft: 58
  },
  separator: {
    width: 1,
    backgroundColor: '#7B672',
    marginVertical: 5,
  },
  skipButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  logo: {
    width: 60,
    height: 80,
    resizeMode: 'contain',
  },
  logo2: {
    marginLeft: 3
  },
  welcomeText: {
    fontSize: 18,
    color: '#7B6F72',
    fontWeight: '400',
    fontFamily: 'Poppins'
  },
  welcomeText2: {
    fontSize: 26,
    color: '#000000',
    paddingBottom: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins'
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    color: '#000000'
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  forgotPassword: {
    color: 'blue',
  },
  loginButton: {
    backgroundColor: '#B51E71',
    padding: 10,
    marginTop: 70,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    fontSize: 16,
    marginLeft: 10
  },
  loginResponse: {
    marginTop: 10,
    color: 'red',
  },
  createAccount: {
    color: 'blue',
    marginTop: 20,
  },
});

export default Login;
