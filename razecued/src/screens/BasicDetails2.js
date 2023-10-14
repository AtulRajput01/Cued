import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity, Image, StyleSheet, TextInput, Button, Pressable } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import ImagePicker from 'react-native-image-crop-picker';
import { ImageBackground } from 'react-native';


const BasicDetail2 = ({navigation}) => {
  
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');

  const navigateToNextScreen = () => {
   
    if (!age || !gender || !dateOfBirth || !phone || !altPhone) {
      Alert.alert('Incomplete Fields', 'Please complete all the fields.');
    } else {
      // All fields are filled, navigate to the next screen
      navigation.navigate('Login');
    }
    
  };
  
  return (

    <ImageBackground
    source={require('../../assets/images/Landingbg.jpg')} 
      style={styles.backgroundImage}>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('BasicDetail')}>
        <Image source={require('../../assets/images/backarrow.png')} />
        </TouchableOpacity>
        {/* <Pressable onPress={() => navigation.navigate('Discover')}>
          <Text style={styles.skipButton}>Skip</Text>
        </Pressable> */}
      </View>
      <Text style={styles.title}>You are</Text>
      <Text style={styles.title2}>almost there!</Text>
      <Text style={styles.greetings}>Please fill your  details to complete your profile</Text>
      
      
      <TextInput
        style={styles.input}
        placeholder="Age"
        placeholderTextColor="#A9A9A9"
        keyboardType='numeric'
        value={age}
        onChangeText={(text) => setAge(text)}
      />
           

      <TextInput
        style={styles.input}
        placeholder="Gender"
        placeholderTextColor="#A9A9A9"
        value={gender}
        onChangeText={(text) => setGender(text)}
      />

        <TextInput
                style={styles.input}
                placeholder="Date of birth"
                placeholderTextColor="#A9A9A9"
                keyboardType='numeric'
                value={dateOfBirth}
                onChangeText={(text) => setDateOfBirth(text)}
            />

        <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#A9A9A9"
                keyboardType='numeric'
                value={phone}
                onChangeText={(text) => setPhone(text)}
          
            />

        <TextInput
                style={styles.input}
                placeholder="Alternate Phone"
                placeholderTextColor="#A9A9A9"
                keyboardType='numeric'
                value={altPhone}
                onChangeText={(text) => setAltPhone(text)}
            />
      

      
     
      <View style={styles.gap} />
      <TouchableOpacity  style={styles.button} onPress={navigateToNextScreen}>
        <View style={styles.row}>
        <Image source={require('../../assets/images/check.png')}/>
                <Text style={styles.buttonText}>Complete Profile</Text>
                </View>
      </TouchableOpacity>
      
    </View>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({ // Use StyleSheet.create() to create the StyleSheet
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  },
  gap: {
    height: 35,
  },
  uploadButton: {
    backgroundColor: '#B51E71',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
    marginLeft: 8,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  
  button: {
    
    backgroundColor: '#B51E71',
    paddingHorizontal: 100,
    paddingVertical: 8,
    borderRadius: 3,
    marginLeft: 7
    
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    paddingBottom: 6,
    marginLeft:5
  },
  arrowImage: {
    width: 20,
    height: 20,
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
  skipButton: {
    color: '#555555',
    fontSize: 14,
    fontFamily: 'open-sans-regular',
    fontWeight: '400',
  },
  title: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '700',
    fontFamily: 'Poppins',  
    paddingTop: 20,
    alignSelf: 'flex-start'    
  },
  title2: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '700',
    fontFamily: 'Poppins',  
    alignSelf: 'flex-start'    
  },
  alert2: {
    fontSize: 32,
    color: '#555555',
    fontWeight: '700',
    fontFamily: 'Poppins',  
    alignSelf: 'flex-start'
    
  },
  options: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  optionText: {
    color: '#505050',
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '400',
    marginRight: 10,
  },
  separator: {
    width: 1,
    backgroundColor: '#7B6F72',
    marginVertical: 5,
  },
  greetings: {
    color: '#7B6F72',
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '400',
    marginBottom: 30,
    alignSelf: 'flex-start',
    marginTop:8
  },
  welcomeMessage: {
    fontSize: 27,
    marginBottom: 15,
    color: '#555555',
    fontWeight: '700',
    fontFamily: 'Poppins'
  },
  inputContainer: {
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 40,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    paddingLeft: 10,
    color: '#000000'
  },
  createAccount: {
    marginTop: 20,
  },
});

export default BasicDetail2;
