import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  ImageBackground,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserDetail = () => {
  const navigation = useNavigation();
  const [profilePicture, setProfilePicture] = useState(null);
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const actionSheetRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const bounceValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const currentUserId = user.attributes.sub;

        const response = await fetch(
          `https://hk1630uulc.execute-api.us-east-1.amazonaws.com/Dev/profile?userId=${currentUserId}`
        );

        const data = await response.json();

        // Filtering events based on the current user ID
        setRecommendedEvents(data.data.users.filter((item) => item.userId === currentUserId));

        setLoading(false);

        // Trigger fade-in, scale, and bounce animations
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 4,
            useNativeDriver: true,
          }),
          Animated.timing(bounceValue, {
            toValue: 1,
            duration: 500,
            easing: Easing.bounce,
            useNativeDriver: true,
          }),
        ]).start();
      } catch (error) {
        console.error('Details not fetched:', error);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [fadeAnim, scaleAnim, bounceValue]);

  useEffect(() => {
    // Retrieve profile picture from local storage on component mount
    const getProfilePicture = async () => {
      const savedProfilePicture = await AsyncStorage.getItem(`profilePicture_${userId}`);
      if (savedProfilePicture) {
        setProfilePicture(savedProfilePicture);
      }
    };

    getProfilePicture();
  }, [userId]);

  const saveImageToLocal = async (userId, imagePath) => {
    try {
      await AsyncStorage.setItem(`profilePicture_${userId}`, imagePath);
      console.log('Image saved successfully');
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

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
        saveImageToLocal(userId, image.path);
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
        saveImageToLocal(userId, image.path);
      })
      .catch((error) => {
        console.log('ImagePicker error:', error);
      });
  };

  const removePhoto = () => {
    // Animate the removal of the photo
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setProfilePicture(null);
      // Reset fade animation for future appearances
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 0, // No duration for instant reset
        useNativeDriver: true,
      }).start();
    });

    // Remove the photo from local storage
    AsyncStorage.removeItem(`profilePicture_${userId}`);
  };

  // Render a single recommended event item
  const renderRecommendedEventItem = ({ item }) => (
    <Animated.View
      style={[
        styles.card,
        { opacity: fadeAnim, transform: [{ scale: scaleAnim }, { translateY: bounceValue }] },
      ]}
    >
      <Text style={styles.detailLabel}>Name:</Text>
      <Text style={styles.detailText}>{item.name}</Text>

      <Text style={styles.detailLabel}>College:</Text>
      <Text style={styles.detailText}>{item.collegeName}</Text>

      <Text style={styles.detailLabel}>Passing Year:</Text>
      <Text style={styles.detailText}>{item.passingYear}</Text>

      <Text style={styles.detailLabel}>Roll Number:</Text>
      <Text style={styles.detailText}>{item.collegeRollNo}</Text>

      <Text style={styles.detailLabel}>Age:</Text>
      <Text style={styles.detailText}>{item.age}</Text>

      <Text style={styles.detailLabel}>Gender:</Text>
      <Text style={styles.detailText}>{item.gender}</Text>

      <Text style={styles.detailLabel}>Phone:</Text>
      <Text style={styles.detailText}>{item.phone}</Text>
    </Animated.View>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/Profilebg.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.navigate('Home')}>
            <Image source={require('../../assets/images/arrow_left.png')} style={styles.arrowImage} />
          </Pressable>
          <Text style={styles.headerText}>User Details</Text>
        </View>

        <TouchableOpacity
          style={styles.profileContainer}
          onPress={profilePicture ? handleImagePicker : null}
        >
          {profilePicture ? (
            <>
              <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
              <TouchableOpacity style={styles.removePhotoButton} onPress={removePhoto}>
                <Text style={styles.removePhotoText}>Remove Photo</Text>
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

        {/* Recommended Events */}
        <FlatList
          data={recommendedEvents}
          renderItem={renderRecommendedEventItem}
          keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    padding: 10,
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '500',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  arrowImage: {
    width: 20,
    height: 20,
  },
  profileContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4E76E3',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 20,
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  removePhotoButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 5,
    borderRadius: 5,
  },
  removePhotoText: {
    color: '#333333',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 20,
    marginBottom: 10,
    elevation: 3,
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  detailText: {
    color: '#555555',
    marginBottom: 10,
  },
  separator: {
    height: 10,
  },
});

export default UserDetail;

