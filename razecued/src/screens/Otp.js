import React, { useState, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Auth } from 'aws-amplify';

const OTPVerification = ({ navigation, route }) => {
  const { email } = route.params;
  const [otp, setOTP] = useState('');
  const [error, setError] = useState('');

  const handleVerifyOTP = async () => {
    try {
      await Auth.confirmSignUp(email, otp);
      // OTP verification successful, navigate to the next screen (e.g., BasicDetail)
      navigation.navigate('BasicDetail');
    } catch (error) {
      console.error('Error:', error);
      setError('Invalid OTP. Please try again.'); // Set an error message for invalid OTP
    }
  };

  return (
    <View>
      <Text>Enter the OTP sent to your email:</Text>
      <TextInput
        placeholder="OTP"
        value={otp}
        onChangeText={setOTP}
      />
      <Button title="Verify OTP" onPress={handleVerifyOTP} />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null} {/* Display error message */}
    </View>
  );
};


  return (
    <View>
      <Text>Enter the OTP sent to your email:</Text>
      <TextInput
        placeholder="OTP"
        value={otp}
        onChangeText={setOTP}
      />
      <Button title="Verify OTP" onPress={handleVerifyOTP} />
    </View>
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

export default OTPVerification;
