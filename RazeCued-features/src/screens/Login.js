import React, {useState}from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image, StyleSheet, Pressable, TextInput, Button } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { ImageBackground } from 'react-native';
import CheckBox from 'react-native-check-box'

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginResponse, setLoginResponse] = useState(null);

  const handleLogin = async () => {
    try {
      // Provide the file path to the JSON file
      const filePath = '../API/Login.json'; // Replace with your actual file path

      // Fetch the JSON data using the provided file path
      const response = await fetch(filePath);
      const data = await response.json();

      // Handle the response as needed
      if (data.success) {
        setLoginResponse(data.message);
        // You can also navigate to the next screen upon successful login
         navigation.navigate('BasicDetail');
      } else {
        setLoginResponse(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setLoginResponse('An error occurred during login');
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
        style={styles.logo}/>
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
<TouchableOpacity onPress={() => navigation.navigate('Signup')}>
<Text style={styles.optionText}>Signup</Text>
</TouchableOpacity>
</View>
      <Text style={styles.welcomeText}>Hey there, </Text>
      <Text style={styles.welcomeText2}>Welcome Back!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#000000"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#000000"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.checkboxContainer}>
        <CheckBox />
        <Text style={styles.remember}>Remember me</Text>
        <TouchableOpacity onPress={() => console.log('Forgot password pressed')}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <View style={styles.row}>
        <Image source={require('../../assets/images/next.png')}/>
        <Text style={styles.loginButtonText}>Login</Text>
        </View>
      </TouchableOpacity>
      {/* Display login response */}
      {loginResponse && (
          <Text style={styles.loginResponse}>{loginResponse}</Text>
        )}
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
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
  createAccount: {
    color: 'blue',
  },
});

export default Login;

