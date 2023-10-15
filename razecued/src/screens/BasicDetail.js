import React, { useState,useEffect } from 'react';
import { View, Text, Alert, TouchableOpacity, BackHandler, Image, StyleSheet, TextInput, Button, Pressable } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import ImagePicker from 'react-native-image-crop-picker';
import { ImageBackground } from 'react-native';
import CustomButton from './../components/CustomButton';


const BasicDetail = ({navigation}) => {
  const [collegeRollNo, setCollegeRollNo] = useState(''); 
  const [collegeName, setCollegeName] = useState('');
  const [passingYear, setPassingYear] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [basicDetailResponse, setBasicDetailResponse] = useState(null);

 
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Confirm Exit',
        'Do you really want to Exit',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'OK', onPress: () =>  navigation.navigate('Discover')},
        ],
        { cancelable: false }
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  

  // const handleFilePicker = (type) => {
  //   ImagePicker.openPicker({
  //     mediaType: 'photo',
  //     cropping: true,
  //     cropperCircleOverlay: type === 'collegeId', // Set to true to crop as a circle
  //     includeBase64: true,
  //   })
  //     .then((image) => {
  //       const fileName = image.path.split('/').pop() || 'sample_file.jpg';
  //       const base64Data = image.data;
  //       if (type === 'collegeId') {
  //         setCollegeIdFile({ fileName, base64Data });
  //       } else if (type === 'aadharCard') {
  //         setAadharCardFile({ fileName, base64Data });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('ImagePicker Error: ', error);
  //     });
  // };

// const navigateToNextScreen = async () => {
//   if (!collegeName || !passingYear || !collegeRollNo) {
//     Alert.alert('Incomplete Fields', 'Please complete all the fields.');
//   } else {
//     try {
//       // Make an API call to submit the data
//       const response = await fetch('https://hk1630uulc.execute-api.us-east-1.amazonaws.com/Dev/basic-details1', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           collegeName,
//           passingYear,
//           collegeRollNo,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('API Response:', data);

//         // If the API call is successful, navigate to the next screen
//         navigation.navigate('BasicDetails2');
//       } else {
//         console.error('API Error:', response.statusText);
//         Alert.alert('API Error', 'There was an error while submitting your data. Please try again.');
//       }
//     } catch (error) {
//       console.error('API Error:', error);
//       Alert.alert('API Error', 'There was an error while submitting your data. Please try again.');
//     }
//   }
// };
  
  
  
  return (

    <ImageBackground
    source={require('../../assets/images/Landingbg.jpg')} 
      style={styles.backgroundImage}>
    <View style={styles.container}>
      
      <Text style={styles.alert}>Complete Profile!</Text>
      
      
      <Text style={styles.greetings}>Hey there, Please complete your profile, these data will be used and check during your entry.</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#A9A9A9"
        value={name}
        onChangeText={(text) => setName(text)}
      />
    <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#A9A9A9"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
    
      
      <TextInput
        style={styles.input}
        placeholder="College Name"
        placeholderTextColor="#A9A9A9"
        value={collegeName}
        onChangeText={(text) => setCollegeName(text)}
      />
    
      <TextInput
        style={styles.input}
        placeholder="Passing Year"
        placeholderTextColor="#A9A9A9"
        keyboardType='numeric'
        value={passingYear}
        onChangeText={(text) => setPassingYear(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="College Roll no"
        placeholderTextColor="#A9A9A9"
        value={collegeRollNo}
        onChangeText={(text) => setCollegeRollNo(text)}
      />
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
      
      
     
      <View style={styles.gap2} />
      <CustomButton text="Complete Registration" bgColor="#B51E71" />
      
    </View>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({ // Use StyleSheet.create() to create the StyleSheet
  container: {
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
    paddingHorizontal: 145,
    paddingVertical: 5,
    borderRadius: 3,
    marginLeft: 8
    
  },
  gap2: {
     height: 8
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    paddingBottom: 6,
    marginLeft:10
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
  alert: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '700',
    fontFamily: 'Poppins',  
    paddingTop: 40,
    paddingRight: 190
    
  },
  alert2: {
    fontSize: 32,
    color: '#555555',
    fontWeight: '700',
    fontFamily: 'Poppins',  
    paddingRight: 230
    
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
    marginBottom: 10,
    paddingRight: 55,
   
  },
  inputContainer2: {
    paddingBottom:20
  },
  welcomeMessage: {
    fontSize: 27,
    marginBottom: 15,
    color: '#555555',
    fontWeight: '700',
    fontFamily: 'Poppins'
  },
  inputContainer: {
    marginBottom: 10,
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

export default BasicDetail;
