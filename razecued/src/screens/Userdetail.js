import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View,FlatList, Animated, Text, StyleSheet, BackHandler, Alert, TouchableOpacity,  Pressable, Dimensions, Image, TextInput,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import { ImageBackground } from 'react-native';

const UserDetail = () => {
  const navigation = useNavigation();
  const [profilePicture, setProfilePicture] = useState(null);
  const [userDetails, setUserDetails] = useState([]);
  const actionSheetRef = useRef(null);
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const currentUserId = user.attributes.sub;
        console.log('User ID:', currentUserId);
  
        const response = await fetch(
          `https://hk1630uulc.execute-api.us-east-1.amazonaws.com/Dev/profile?userId=${currentUserId}`
        );
  
        const data = await response.json();
        console.log('Fetched events:', data);
  
        setRecommendedEvents(data.data.users.filter(frontUserId) || []);
        setUserId(currentUserId);
  
        setLoading(false);
      } catch (error) {
        console.error('details not fetched:', error);
        setLoading(false);
      }
    };
  
    const frontUserId = (item) => item?.user?.userId === userId;
  
    fetchDetails();
  }, [userId]);
  
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

  // Render a single recommended event item
const renderRecommendedEventItem = () => {
  

     
     
     <View style={styles.textContainer}>     
          <View style={styles.button1}>
            <Text style={styles.buttonText1}>{item.name}</Text>
          </View>
          <View style={styles.gap} />
          <View style={styles.button1}>
            <Text style={styles.buttonText1}>{item.collegeName}</Text>
          </View>
          <View style={styles.gap} />
          <View style={styles.button1}>
            <Text style={styles.buttonText1}>{item.passingYear}</Text>
          </View>
          <View style={styles.gap} />
          <View style={styles.button1}>
            <Text style={styles.buttonText1}>{item.collegeRollNo}</Text>
          </View>
          <View style={styles.gap} />
          <View style={styles.button1}>
            <Text style={styles.buttonText1}>{item.age}</Text>
          </View>
          <View style={styles.gap} />
          <View style={styles.button1}>
            <Text style={styles.buttonText1}>{item.gender}</Text>
          </View>
          <View style={styles.gap} />
          <View style={styles.button1}>
            <Text style={styles.buttonText1}>{item.phone}</Text>
          </View>
         
      </View>
    
  
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
<View style={styles.gap} />
        {/* Recommended Events */}
        
          <FlatList
            data={recommendedEvents}
            renderItem={renderRecommendedEventItem}
            keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
            ItemSeparatorComponent={() => <View style={styles.gap1} />} // Replace 'id' with the actual unique identifier for your events
          />

    

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
  buttonText1: {
    color: 'red',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Poppins',
  },
  button1: {
    backgroundColor: '#FFF1F8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 2,
    marginLeft: 4,
  },
  textContainer: {
    marginLeft: 10,
    marginTop: 15
  
  },
  
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  },
  gap: {
    height: 15,
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