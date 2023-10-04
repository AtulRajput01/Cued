import React, {useState,useRef} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Animated, TouchableOpacity, Image, StyleSheet, Pressable, TextInput, Easing, Button } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { ImageBackground } from 'react-native';
import Amplify from 'aws-amplify';
import { Auth } from 'aws-amplify';
import { createStackNavigator } from '@react-navigation/stack'; // Added import for createStackNavigator
import CheckBox from 'react-native-check-box'


const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationResponse, setRegistrationResponse] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
const onSignupPress = () => {
    navigation.navigate('Otp');
};

const handleSignup = async () => {
  try {
    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setRegistrationResponse('Invalid email address');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setRegistrationResponse('Passwords do not match');
      return;
    }

    // Ensure password meets strength requirements
    if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)) {
      setRegistrationResponse('Password must be at least 8 characters and include at least one letter and one number.');
      return;
    }

    // Register the user using Amplify
    await Auth.signUp({
      username: email,
      password,
    });

    // Make a POST request to the registration endpoint
    const response = await fetch('https://hk1630uulc.execute-api.us-east-1.amazonaws.com/Dev/user-registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (!response.ok) {
      // Handle non-successful responses
      const errorData = await response.json();
      setRegistrationResponse(`Registration failed: ${errorData.message}`);
      return;
    }
    onSignupPress();
    
  } catch (error) {
    console.error('Error:', error);

    // Handle the specific error message for invalid OTP
    if (error.code === 'UsernameExistsException') {
      setRegistrationResponse('User with this email already exists. Please log in.');
    } else {
      setRegistrationResponse('An error occurred during registration');
    }
  }
};

  
  return (
    
    <ImageBackground
    source={require('../../assets/images/Landingbg.jpg')}
    style={styles.backgroundImage}>
    <View style={styles.container}>
    <View style={styles.header}>
<TouchableOpacity onPress={() => console.log('')}>

</TouchableOpacity>
<Pressable onPress={() => navigation.navigate('BasicDetail')}>
<Text style={styles.backButton}>skipy</Text>
</Pressable>
</View>
    <View style={styles.row}>
      <Image
        source={require('../../assets/images/C.png')} // Replace with your logo image
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
     <View style={styles.container3}>
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
      <View style={styles.container4}>
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
      <View style={styles.container4}>
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
     <View style={styles.container4}>
          <Animated.View
            style={[styles.label, { transform: [{ translateY: transYC.current }, { translateX: transXC }] }]}>
            <Text style={styles.holder}>Confrim Password</Text>
          </Animated.View>
          <TextInput
            style={styles.input}
            onFocus={() => handleFocus(transYC.current)}
            onBlur={() => handleBlur(transYC.current, password)}
            placeholderTextColor="#000000"
            value={confirmPassword}
            secureTextEntry={passwordInputType === 'password'}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>
      
      <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
        <View style={styles.row}>
        <Image source={require('../../assets/images/next.png')}/>
        <Text style={styles.loginButtonText}>Signup</Text>
        </View>
      </TouchableOpacity>
       {/* Display registration response */}
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
    paddingTop: 90,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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
  logo2:{
    marginLeft: 3
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
      fontFamily: 'Poppins'
  
    },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    color: '#000000',
  },
  label: {
    position: 'absolute',
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  container3: {
    borderRadius: 10,
    width: '100%',
    marginTop: 8,
  },
  container4: {
    borderRadius: 10,
    width: '100%',
    marginTop: 10,
  },
  forgotPassword: {
    color: 'blue',
  },
  holder: {
    color: '#000000',
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
    marginLeft:10
  },
  createAccount: {
    color: 'blue',
  },
});

export default Register;
