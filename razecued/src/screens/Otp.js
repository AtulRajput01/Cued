import React, { useState } from 'react';
import { View, Text, TextInput,TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const Otp = () => {
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleChangeText = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
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
        <Text style={styles.resend}>Resend code</Text>
      </View>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            onChangeText={(text) => handleChangeText(text, index)}
            value={digit}
            keyboardType="numeric"
            maxLength={1}
          />
        ))}
      </View>
      <View style={styles.header}>
        <Text style={styles.confirm}>We have sent the OPT to your registered number, Please do not share the OTP with anyone</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BasicDetails2')}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
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
