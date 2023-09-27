import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Animated, TouchableOpacity, Image, StyleSheet, Pressable, TextInput, Easing, Keyboard } from 'react-native';
import { ImageBackground } from 'react-native';
import CheckBox from 'react-native-check-box';
import  {Auth}  from 'aws-amplify';
import {Amplify} from 'aws-amplify';
import config from '../aws-export'; // Import Amplify config
Amplify.configure(config); // Configure Amplify


const RegisterAndSignup = ({ navigation }) => {
  const transY = useRef(new Animated.Value(0));
  const transYN = useRef(new Animated.Value(0));
  const transYE = useRef(new Animated.Value(0));
  const transYP = useRef(new Animated.Value(0));
  const transYC = useRef(new Animated.Value(0));

  const handleFocus = (animatedValue) => {
    Animated.timing(animatedValue, {
      toValue: -35,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  };

  const handleBlur = (animatedValue, text) => {
    if (!text) {
      Animated.timing(animatedValue, {
        toValue: 0,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start();
    }
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [registrationResponse, setRegistrationResponse] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const passwordInputType = isPasswordVisible ? 'text' : 'password';

  const transX = transY.current.interpolate({
    inputRange: [-35, 0],
    outputRange: [-20, 0],
    extrapolate: 'clamp',
  });

  const transXN = transYN.current.interpolate({
    inputRange: [-35, 0],
    outputRange: [-20, 0],
    extrapolate: 'clamp',
  });

  const transXE = transYE.current.interpolate({
    inputRange: [-35, 0],
    outputRange: [-20, 0],
    extrapolate: 'clamp',
  });

  const transXP = transYP.current.interpolate({
    inputRange: [-35, 0],
    outputRange: [-20, 0],
    extrapolate: 'clamp',
  });

  const transXC = transYC.current.interpolate({
    inputRange: [-35, 0],
    outputRange: [-20, 0],
    extrapolate: 'clamp',
  });

  const handleRegister = async () => {
    setIsLoading(true);
    setError('');
    setConfirmationSent(false);

    try {
      // Check for password complexity (e.g., at least 8 characters, 1 uppercase, 1 digit)
      if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
        throw new Error('Password must be at least 8 characters long and include at least one uppercase letter and one digit.');
      }
      const signUpResponse = await Auth.signUp({
        username: email,
        password,
        attributes: {
          name,
        },
      });

      if (signUpResponse.userConfirmed === false) {
        // Handle the case where email confirmation is required
        setRegistrationResponse(
          'A confirmation code has been sent to your email. Please check your inbox.'
        );
      } else {
        // Handle successful registration
        console.log('Registration successful', signUpResponse);
        navigation.navigate('BasicDetail');
      }
    } catch (error) {
      console.error('Error:', error);
      setRegistrationResponse('An error occurred during registration');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/Landingbg.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => console.log('')}></TouchableOpacity>
          <Pressable onPress={() => navigation.navigate('BasicDetail')}>
            <Text style={styles.backButton}>skip</Text>
          </Pressable>
        </View>
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
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.optionText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity onPress={() => console.log(' ')}>
            <Text style={styles.optionText2}>Signup</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.welcomeText}>Hey there,</Text>
        <Text style={styles.welcomeText2}>Register Yourself!</Text>

        {/* Name */}
        <View style={styles.container2}>
          <Animated.View
            style={[styles.label, { transform: [{ translateY: transYN.current }, { translateX: transXN }] }]}>
            <Text style={styles.holder}>Name</Text>
          </Animated.View>
          <TextInput
            style={styles.input}
            onFocus={() => handleFocus(transYN.current)}
            onBlur={() => handleBlur(transYN.current, name)}
            placeholderTextColor="#000000"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>

        {/* Email */}
        <View style={styles.container3}>
          <Animated.View
            style={[styles.label, { transform: [{ translateY: transYE.current }, { translateX: transXE }] }]}>
            <Text style={styles.holder}>Email</Text>
          </Animated.View>
          <TextInput
            style={styles.input}
            onFocus={() => handleFocus(transYE.current)}
            onBlur={() => handleBlur(transYE.current, email)}
            placeholderTextColor="#000000"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        {/* Password */}
        <View style={styles.container3}>
          <Animated.View
            style={[styles.label, { transform: [{ translateY: transYP.current }, { translateX: transXP }] }]}>
            <Text style={styles.holder}>Password</Text>
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

        {/* Confirm Password */}
        <View style={styles.container3}>
          <Animated.View
            style={[styles.label, { transform: [{ translateY: transYC.current }, { translateX: transXC }] }]}>
            <Text style={styles.holder}>Confirm Password</Text>
          </Animated.View>
          <TextInput
            style={styles.input}
            onFocus={() => handleFocus(transYC.current)}
            onBlur={() => handleBlur(transYC.current, confirmPassword)}
            placeholderTextColor="#000000"
            value={confirmPassword}
            secureTextEntry={passwordInputType === 'password'}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
          <View style={styles.row}>
            <Image source={require('../../assets/images/next.png')} />
            <Text style={styles.loginButtonText}>Signup</Text>
          </View>
        </TouchableOpacity>

        {registrationResponse && (
          <Text style={styles.registrationResponse}>{registrationResponse}</Text>
        )}

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.createAccount}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container2: {
    borderRadius: 10,
    width: '100%',
  },
  container3: {
    borderRadius: 10,
    width: '100%',
    marginTop: 8,
  },
  label: {
    position: 'absolute',
    padding: 10,
  },
  holder: {
    color: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  backButton: {
    color: '#555555',
    fontSize: 14,
    fontFamily: 'open-sans-regular',
    fontWeight: '400',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
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
    marginLeft: 58,
  },
  optionText2: {
    color: '#B51E71',
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '400',
    marginRight: 60,
    marginLeft: 58,
  },
  separator: {
    width: 1,
    backgroundColor: '#7B6F72',
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
    marginLeft: 3,
  },
  welcomeText: {
    fontSize: 18,
    color: '#7B6F72',
    fontWeight: '400',
    fontFamily: 'Poppins',
  },
  welcomeText2: {
    fontSize: 26,
    color: '#000000',
    paddingBottom: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 18,
    color: '#000000',
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
    marginTop: 15,
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
    marginLeft: 10,
  },
  registrationResponse: {
    marginTop: 10,
    color: 'green',
  },
  createAccount: {
    color: 'blue',
  },
});

export default RegisterAndSignup;
