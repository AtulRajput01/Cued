import React, { useState, useCallback, useRef } from 'react';
import { View, Text, StyleSheet,Image, Pressable, TouchableOpacity,  TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import { ImageBackground } from 'react-native';

const UserDetail = () => {
  const navigation = useNavigation();
  const [profilePicture, setProfilePicture] = useState(null);
  const actionSheetRef = useRef(null);

  
  const handleImagePicker = useCallback(() => {
    actionSheetRef.current.show();
  }, []);

  const handleCameraPicker = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      mediaType: 'photo',
    }).then(image => {
      setProfilePicture(image.path);
    }).catch(error => {
      console.log('CameraPicker error:', error);
    });
  };

  const handleImageFromDevice = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      mediaType: 'photo',
    }).then(image => {
      setProfilePicture(image.path);
    }).catch(error => {
      console.log('ImagePicker error:', error);
    });
  };

  const removePhoto = () => {
    setProfilePicture(null);
  };

  return (

    <ImageBackground
    source={require('../../assets/images/Profilebg.jpg')} 
      style={styles.backgroundImage}>
    <View style={styles.container}>
      <View style={styles.row}>
        <Pressable onPress={() => navigation.navigate('Home')}>
          <View style={styles.text}>
          <Image source={require('../../assets/images/arrow_left.png')} style={styles.arrowImage}  />
          </View>
        </Pressable>
        <Text style={styles.text1}>User Details</Text>
      </View>
      <TouchableOpacity style={styles.circleContainer} onPress={profilePicture ? handleImagePicker : null}>
        {profilePicture ? (
          <>
            <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
            <TouchableOpacity style={styles.removePhotoButton} onPress={removePhoto}>
              {/* Remove Photo Button */}
            </TouchableOpacity>
          </>
        ) : (
          <Icon name="camera" size={30} onPress={handleImagePicker} />
        )}
      </TouchableOpacity>
      <ActionSheet
        ref={actionSheetRef}
        options={profilePicture ? ['Remove Photo', 'Cancel'] : ['Camera', 'From Device', 'Cancel']}
        cancelButtonIndex={profilePicture ? 1 : 2}
        onPress={(index) => {
          if (index === 0 && profilePicture) {
            removePhoto();
          } else if (index === 0) {
            handleCameraPicker();
          } else if (index === 1) {
            handleImageFromDevice();
          }
        }}
      />

      <TextInput
        style={styles.input1}
        placeholder="Name"
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        style={styles.input}
        placeholder="DOB (Date of Birth)"
        keyboardType="numeric"
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        keyboardType="numeric"
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        style={styles.input}
        placeholder="Alternate Number"
        keyboardType="numeric"
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        style={styles.input}
        placeholder="College Name"
        keyboardType="numeric"
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        style={styles.input}
        placeholder="Passing year"
        keyboardType="numeric"
        placeholderTextColor="#A9A9A9"
      />
     

<View style={styles.gap} />
      <TouchableOpacity style={styles.button}>
        <View style={styles.row}>
                <Image source={require('../../assets/images/check.png')}/>
                <Text style={styles.buttonText}>Save changes</Text>
        </View>
              </TouchableOpacity>
    </View>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  },
  gap: {
    height: 20,
  },
  arrowImage: {
    width: 20,
    height: 20,
  },
  button: {
    
    backgroundColor: '#B51E71',
    paddingVertical: 8,
    borderRadius: 3,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    marginLeft:10
   
  },
  removePhotoButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 5,
  },
  removePhotoText: {
    color: 'white',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text1: {
    padding: 10,
    color: '#333333',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
  },
  text: {
    padding: 10,
  },
  secondText: {
    paddingLeft: 20,
    fontSize: 18,
  },
  circleContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'gray',
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  input1: {
    width: '100%',
    height: 40,
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    paddingLeft: 10,
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
});

export default UserDetail;
