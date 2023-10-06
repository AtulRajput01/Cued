import React, { useState } from 'react';
import { View,Alert, Text,StyleSheet,ImageBackground,Pressable, TextInput, Button } from 'react-native';
import { Auth } from 'aws-amplify';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

const Otp = () => {

  const {control, handleSubmit,watch} = useForm();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const navigation = useNavigation();
  const route = useRoute();
  const email = watch('email');
    

  const handleVerifyOTP = async data => {
    try{
     await Auth.confirmSignUp(data.email,data.code);
     navigation.navigate('Login')

    } catch (e) {
      Alert.alert("Oops" , e.message);
    }
  };

  const resendPress = async () => {
    try{
     await Auth.resendSignUp(email);
     Alert.alert('Success', 'code has been resend on your mail');

    } catch (e) {
      Alert.alert("Oops" , e.message);
    }
  };

  return (
    <ImageBackground
    source={require('../../assets/images/Loginbg.jpg')} 
      style={styles.backgroundImage}>
    <View style={styles.container}>

      <View style={styles.header1}>
        <Text style={styles.Account}>Account</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.verify}>Verification.</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.alert}>For your security, we want to make sure it is really you.</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>Enter code</Text>
        <Text style={styles.resend} onPress={handleSubmit(resendPress)}>Resend code</Text>
      </View>
      <View style={styles.otpContainer}>
        <TextInput
        style={styles.input}
        value='code'
        placeholder='Enter the confirmation code'
        keyboardType='nueric'/>
        
      </View>
      <View style={styles.header}>
        <Text style={styles.confirm}>We have sent the OPT to your registered number, Please do not share the OTP with anyone</Text>
      </View>
      <Pressable style={styles.button} onPress={handleSubmit(handleVerifyOTP)}>
                <Text style={styles.buttonText}>Next</Text>
              </Pressable>
    </View>
    </ImageBackground>
  );
};



const styles = StyleSheet.create({
  container: {
    paddingTop: 150,
    
  },
  button: {
    
    backgroundColor: '#B51E71',
    
    borderRadius: 3,
    alignItems: 'center',
    marginLeft: 16,
    marginRight:16,
    paddingVertical:4,
    marginTop: 30
   
    
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    paddingBottom: 6
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  header1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    
  },
  Account: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    color: '#000000',
    paddingLeft: 16,
    fontFamily: 'Poppins',
    fontSize: 32,
    fontWeight: 'bold',
   
  },
  verify: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    color: '#000000',
    paddingLeft: 16,
    fontFamily: 'Poppins',
    fontSize: 32,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 14,
    color: '#B51E71',
    paddingLeft: 16,
    
  },
  alert: {
    fontSize: 18,
    color: '#7B6F72',
    paddingLeft: 16,
    fontFamily: 'Poppins',
    paddingRight: 16,
  },
  confirm: {
    fontSize: 14,
    color: '#7B6F72',
    paddingLeft: 16,
    fontFamily: 'Poppins',
    paddingTop: 30
  },
  resend: {
    fontSize: 14,
    color: 'blue', 
    paddingRight: 16// You can change the color to suit your design
  },
  otpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 5,
    color: '#000000',
  },
});

export default Otp;
