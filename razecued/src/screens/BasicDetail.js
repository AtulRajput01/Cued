import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Button, Pressable } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import ImagePicker from 'react-native-image-crop-picker';
import { ImageBackground } from 'react-native';


const BasicDetail = ({navigation}) => {
  const [collegeIdFile, setCollegeIdFile] = useState(null);
  const [aadharCardFile, setAadharCardFile] = useState(null);
  const [basicDetailResponse, setBasicDetailResponse] = useState(null);

  const handleSaveBasicDetails = async () => {
    try {
      // Provide the file path to the JSON file
      const filePath = 'https://hk1630uulc.execute-api.us-east-1.amazonaws.com/Dev/submit-basic-details'; // Replace with your actual file path

      // Fetch the JSON data using the provided file path
      const response = await fetch(filePath);
      const data = await response.json();

      // Handle the response as needed
      if (data.success) {
        setBasicDetailResponse(data.message);
        // You can also navigate to the next screen upon successful data save
         navigation.navigate('BasicDetails2');
      } else {
        const errorData = await response.json();
        setBasicDetailResponse(`Data not saved: ${errorData.message}`);
        return;
      }
    } catch (error) {
      console.error('Error:', error);
      setBasicDetailResponse('An error occurred while saving basic details');
    }
  };

  const handleFilePicker = (type) => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      cropping: true,
      cropperCircleOverlay: type === 'collegeId', // Set to true to crop as a circle
      includeBase64: true,
    })
      .then((image) => {
        const fileName = image.path.split('/').pop() || 'sample_file.jpg';
        const base64Data = image.data;
        if (type === 'collegeId') {
          setCollegeIdFile({ fileName, base64Data });
        } else if (type === 'aadharCard') {
          setAadharCardFile({ fileName, base64Data });
        }
      })
      .catch((error) => {
        console.log('ImagePicker Error: ', error);
      });
  };

  
  
  return (

    <ImageBackground
    source={require('../../assets/images/Landingbg.jpg')} 
      style={styles.backgroundImage}>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Back button pressed')}>
        <Image source={require('../../assets/images/backarrow.png')} />
        </TouchableOpacity>
        <Pressable onPress={() => navigation.navigate('Discover')}>
          <Text style={styles.skipButton}>Skip</Text>
        </Pressable>
      </View>
      <Text style={styles.alert}>Complete Profile!</Text>
      
      
      <Text style={styles.greetings}>Hey there, Please complete your profile for a better experience</Text>
      
      
      <TextInput
        style={styles.input}
        placeholder="College Name"
        placeholderTextColor="#A9A9A9"
      />
      
          

      <TextInput
        style={styles.input}
        placeholder="Passing Year"
        placeholderTextColor="#A9A9A9"
        keyboardType='numeric'
      />
      <TextInput
        style={styles.input}
        placeholder="College Id"
        placeholderTextColor="#A9A9A9"
      />
      <TouchableOpacity style={styles.uploadButton} onPress={() => handleFilePicker('college id')}>
        <Text style={styles.uploadButtonText}>
          {aadharCardFile ? 'Uploaded' : 'Upload file'}
        </Text>
      </TouchableOpacity>

      
     
      <View style={styles.gap} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BasicDetails2')}>
        <View style={styles.row}>
        <Image source={require('../../assets/images/arrow.png')}/>
                <Text style={styles.buttonText}>Next</Text>
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
    marginTop: 30,
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
    marginBottom: 30,
    paddingRight: 55,
    paddingTop: 18
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
  },
  createAccount: {
    marginTop: 20,
  },
});

export default BasicDetail;
