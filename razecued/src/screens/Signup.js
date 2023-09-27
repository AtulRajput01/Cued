import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image, StyleSheet, Pressable, TextInput, Button } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { ImageBackground } from 'react-native';
import CheckBox from 'react-native-check-box'
const Signup = ({navigation}) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationResponse, setRegistrationResponse] = useState(null);

  const handleSignup = async () => {
    try {
      // Fetch the JSON data from the local file
      const response = await fetch('../API/Register.json');
      const data = await response.json();

      // Handle the response as needed
      if (data.success) {
        setRegistrationResponse(data.message);
        // You can also navigate to the next screen upon successful registration
        navigation.navigate('BasicDetail');
      } else {
        setRegistrationResponse(data.message);
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
<TouchableOpacity onPress={() => console.log('')}>

</TouchableOpacity>
<Pressable onPress={() => navigation.navigate('BasicDetail')}>
<Text style={styles.backButton}>skip</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#000000"
        value={name}
        onChangeText={(text) => setName(text)}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#000000"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      
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
    paddingTop: 100,
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
    marginLeft:10
  },
  createAccount: {
    color: 'blue',
  },
});

export default Signup;
