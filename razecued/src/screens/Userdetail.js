import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import { ImageBackground } from 'react-native';
import { Auth } from 'aws-amplify'; // Import the Auth module from Amplify

const UserDetail = () => {
  const navigation = useNavigation();
  const [profilePicture, setProfilePicture] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const actionSheetRef = useRef(null);

  useEffect(() => {
    // Retrieve the current authenticated user's information
    const fetchUserDetails = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const userId = user.attributes.sub; // Use the Cognito ID as the unique identifier
        
        console.log('Cognito ID:', userId);

        // Fetch user details from the API endpoint using the Cognito ID
        const response = await fetch(`https://hk1630uulc.execute-api.us-east-1.amazonaws.com/Dev/profile/${userId}`);
        const data = await response.json();

        console.log('API Response:', data);

        if (data.success && data.data.user) {
          setUserDetails(data.data.user);
          console.log('User Details Set:', data.data.user);
        } else {
          console.error('API Error:', data.error);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleImagePicker = useCallback(() => {
    actionSheetRef.current.show();
  }, []);

  const handleCameraPicker = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      mediaType: 'photo',
    })
      .then((image) => {
        setProfilePicture(image.path);
      })
      .catch((error) => {
        console.log('CameraPicker error:', error);
      });
  };

  const handleImageFromDevice = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      mediaType: 'photo',
    })
      .then((image) => {
        setProfilePicture(image.path);
      })
      .catch((error) => {
        console.log('ImagePicker error:', error);
      });
  };

  const removePhoto = () => {
    setProfilePicture(null);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/Profilebg.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.row}>
          <Pressable onPress={() => navigation.navigate('Home')}>
            <View style={styles.text}>
              <Image source={require('../../assets/images/arrow_left.png')} style={styles.arrowImage} />
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

        {userDetails && (
          <View>
            <View style={styles.textRow}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{userDetails.name}</Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.label}>Age:</Text>
              <Text style={styles.value}>{userDetails.age}</Text>
            </View>
            {/* Add more views for other user details */}
          </View>
        )}
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
  label: {
    color: '#000000',
  },
  value: {
    color: '#000000',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  arrowImage: {
    width: 20,
    height: 20,
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
  removePhotoButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default UserDetail;

