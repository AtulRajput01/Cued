import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View,Alert, Text, Animated, TouchableOpacity, Image, StyleSheet, Pressable, TextInput, Easing, Keyboard } from 'react-native';
import { ImageBackground } from 'react-native';
import CheckBox from 'react-native-check-box';
import {Amplify} from 'aws-amplify';
import  {Auth}  from 'aws-amplify';
import {useForm, Controller} from 'react-hook-form';

const Login = ({ navigation }) => {

  const{
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

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
  
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const handleRegister = async data => {

    if (isLoading){
      return;
    }

    setIsLoading(true);

    try{
      const response = await Auth.signIn(data.email,data.password);
      navigation.navigate('Discover');
    } catch(e){
      Alert.alert('Oops' , e.message)
    }
    setIsLoading(false);
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
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.optionText2}>Signup</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.welcomeText}>Hey there,</Text>
        <Text style={styles.welcomeText2}>welcome Back</Text>

       

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
            keyboardType='email-address'
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
        <View style={styles.checkboxContainer}>
        <CheckBox />
        <Text style={styles.remember}>Remember me</Text>
        <TouchableOpacity onPress={() => console.log('Forgot password pressed')}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
        

        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit(handleRegister)}>
          <View style={styles.row}>
            <Image source={require('../../assets/images/next.png')} />
            <Text style={styles.loginButtonText}>Login</Text>
          </View>
        </TouchableOpacity>

        {registrationResponse && (
          <Text style={styles.registrationResponse}>{registrationResponse}</Text>
        )}

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.createAccount}>Don't have an account? Create one</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 90,
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
  remember: {
    color: '#000000',
    paddingRight: 80
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'left',
  },
  rememberText: {
    marginLeft: 10,
    color: '#000000',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  optionText: {
   
    color: '#B51E71',
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '400',
    marginRight: 60,
    marginLeft: 58,
  },
  optionText2: {
    color: '#505050',
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

export default Login;
