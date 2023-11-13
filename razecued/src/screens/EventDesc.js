import React, { useEffect,useState } from 'react';
import { View, Text, Alert, StyleSheet, BackHandler, Dimensions, TouchableOpacity, Linking, Image, Pressable, ImageBackground, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import { PermissionsAndroid, Platform } from 'react-native';
import { Auth } from 'aws-amplify'; // Import the Auth module from Amplify
import EnlargedEventPoster from './EnlargedEventPoster';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const EventDesc = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { events } = route.params;
  const [userId, setUserId] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState('Register');
  const [enlargedImageVisible, setEnlargedImageVisible] = useState(false);
  const [showCustomAlert, setShowCustomAlert] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const openCustomAlert = () => {
    setShowCustomAlert(true);
  };

  const closeCustomAlert = () => {
    setShowCustomAlert(false);
  };

  const handleNo = () => {
    // Handle 'Yes' button click
    navigation.navigate('Discover');// Close the custom alert or navigate, etc.
  };

  const handleYes = () => {
    // Handle 'No' button click
    closeCustomAlert(); // Close the custom alert or navigate, etc.
  };

  const openEnlargedPoster = () => {
    setEnlargedImageVisible(true);
  };

  const closeEnlargedPoster = () => {
    setEnlargedImageVisible(false);
  };

  const openVideoUrl = (video_url) => {
    Linking.openURL(video_url).catch((error) => {
      console.error('Error opening video URL:', error);
    });
  };

  const requestWriteExternalStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'This app needs access to your device storage to download PDFs.',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true; // Permission granted
        } else {
          return false; // Permission denied
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      // For iOS, permission is not required
      return true;
    }
  };

const handleRegister = async () => {
  try {
    // Assuming you have an API endpoint for event registration
    const user = await Auth.currentAuthenticatedUser();
    const userId = user.attributes.sub; // Use the Cognito ID as the unique identifier

    const response = await fetch('https://hk1630uulc.execute-api.us-east-1.amazonaws.com/Dev/event-registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId, // Include the Cognito ID in the request body
        id: events.id, // Assuming 'id' is the event ID field in the event table
      }),
    });

    if (response.ok) {
      // Registration successful, show Lottie animation
      setRegistrationStatus('Wohoo!,Registered');
      console.log('User registered successfully for the event');
      setShowSuccessAnimation(true);

      // You can reset the animation after a certain duration
      setTimeout(() => {
        setShowSuccessAnimation(false);
      }, 3000); // Adjust the duration as needed
    } else {
      // Registration failed, handle the error
      console.error('Error registering for event:', response.status);
    }
  } catch (error) {
    console.error('Error registering for event:', error);
    // Handle the error
  }
};

useEffect(() => {
  const backAction = () => {
    openCustomAlert(); // Show the custom alert when the back button is pressed
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction
  );

  return () => backHandler.remove();
}, []);

  return (
    <ImageBackground
      source={require('../../assets/images/Eventsdetailbg.jpg')}
      style={styles.backgroundImage}
    >
      <Modal
      isVisible={showCustomAlert}
      onBackdropPress={closeCustomAlert}
      backdropColor="#000000"
      backdropOpacity={0.7}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={300}
      animationOutTiming={300}
      useNativeDriver={true}
      style={styles.customAlertContainer}
    >
      <View style={styles.customAlertContent}>
        <LottieView
          source={require('../../assets/lottie/sadEmoji.json')} // Replace with your Lottie animation source
          autoPlay
          loop
          style={styles.sadEmojiAnimation}
        />
        <Text style={styles.customAlertText}>Registered here?{'\n'} Reallywanna go back!!</Text>
        <View style={styles.customAlertButtons}>
          <TouchableOpacity style={styles.customAlertButton} onPress={handleYes}>
            <Text style={styles.customAlertButtonText}>Yet to register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.customAlertButton} onPress={handleNo}>
            <Text style={styles.customAlertButtonText}>Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    

      <View style={styles.container}>
      
        <TouchableOpacity onPress={openEnlargedPoster}>
        <ImageBackground
          source={{ uri: events.eventPoster }}  // Replace with your PNG image
          style={styles.greyBox}
          resizeMode="cover"
        >
          <View style={styles.textContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <View style={styles.topLeftText}>
                <Icon name="arrow-left" size={20} />
              </View>
            </TouchableOpacity>
            <View style={styles.topRightText}>
              <Icon name="share" size={20} />
            </View>
          </View>
        </ImageBackground>
        </TouchableOpacity>
        <EnlargedEventPoster
        visible={enlargedImageVisible}
        imageUri={events.eventPoster}
        onClose={closeEnlargedPoster}
      />
        <ScrollView>
          <View style={styles.whiteContainer}>
            <Text style={[styles.eventName, styles.firstText]}>
              {events.eventName}
            </Text>
            <View style={styles.row}>
              <Text style={styles.eventDetail}>
                Organised by {events.eventOrganizer}
              </Text>
              <Text style={styles.eventDetail}>I</Text>
              <Text style={styles.eventDetail}>{events.eventDate}</Text>
              <Text style={styles.eventDetail}>I</Text>
            </View>
            <Text style={styles.eventDetail}>
              Location: {events.eventLocation}
            </Text>
            <Text style={styles.attendee}>{events.popularity} attending</Text>
            <Text style={styles.eventDesc}>{events.eventDescription}</Text>

            <View style={styles.row1}>
              <Pressable
                style={styles.button1}
                onPress={async () => {
                  const hasPermission = await requestWriteExternalStoragePermission();
                  if (hasPermission) {
                    // Define the PDF URL for the event (you'll need to add PDF URLs to your JSON data)
                    const pdfUrl = events.pdf_url; // Replace with the actual field from your JSON data

                    // Define the destination path where the PDF will be saved
                    const destinationDirectory =
                      RNFS.ExternalStorageDirectoryPath;
                    if (!(await RNFS.exists(destinationDirectory))) {
                      console.error(
                        'Destination directory does not exist:',
                        destinationDirectory
                      );
                      return;
                    }

                    // Define the destination path where the PDF will be saved
                    const destinationPath = `${destinationDirectory}/${events.name}.pdf`;

                    try {
                      const result = await RNFS.downloadFile({
                        fromUrl: pdfUrl,
                        toFile: destinationPath,
                      });

                      if (result.statusCode === 200) {
                        console.log(
                          'PDF downloaded successfully:',
                          destinationPath
                        );
                      } else {
                        console.error('Failed to download PDF');
                      }
                    } catch (error) {
                      console.error('Error downloading PDF:', error);
                    }
                  } else {
                    // Handle permission denied
                    console.error(
                      'Permission to write to external storage denied.'
                    );
                  }
                }}
              >
                <Text style={styles.buttonText1}>Download Itenary</Text>
                <Image
                  source={require('../../assets/images/download.png')}
                  style={styles.downloadIcon}
                />
              </Pressable>
            </View>
            <Text style={styles.eventName2}>After Movie 2022</Text>
            <View style={styles.tileContainer}>
              <Image
                source={{ uri: events.eventPoster }} 
                style={styles.tileImage}
              />

              <View style={styles.tileTextContainer}>
                <Text style={styles.tileText}>{events.video_title}</Text>
                <Text style={styles.shortText}>
                  Short video of {events.eventName}
                </Text>
                <Pressable onPress={() => openVideoUrl(events.video_url)}>
                  <Image source={require('../../assets/images/utube.png')} />
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.gap} />
        {showSuccessAnimation && (
          <LottieView
            source={require('../../assets/lottie/success.json')} // Replace with your Lottie animation source
            autoPlay
            loop={false}
            onAnimationFinish={() => setShowSuccessAnimation(false)}
          />
        )}
        <Pressable
          style={styles.button}
          onPress={handleRegister} 
        >
          <Text style={styles.buttonText}>{registrationStatus}</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 150,

    backgroundColor: '#FFFFFF',
    borderRadius: 7,
    alignSelf: 'center',
  },
  eventPoster: {
    width: 200, // Adjust this to your preferred size
    height: 200, // Adjust this to your preferred size
    resizeMode: 'cover',
  },
  tileImage: {
    width: 120,
    height: '60%',
    resizeMode: 'cover',
  },
  tileText: {
    color: '#000000',
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 13,
  },
  tileTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  shortText: {
    color: '#838383',
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 10,
    marginBottom: 30,
  },
  button1: {
    backgroundColor: '#FFF1F8',
    paddingVertical: 8,
    flexDirection: 'row',
    borderRadius: 3,
    width: '50%',
    marginBottom: 10,
    alignSelf: 'center',
  },
  downloadIcon: {
    marginLeft: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignContent: 'center',
    alignSelf: 'center',
  },

  buttonText1: {
    color: '#000000',
    fontSize: 8,
    fontWeight: '400',
    fontFamily: 'Poppins',
    paddingLeft: 40,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  gap: {
    height: 15,
  },
  greyBox: {
    width: windowWidth,
    height: windowHeight * 0.4,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topLeftText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    paddingLeft: 10,
    paddingTop: 30,
  },
  topRightText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    paddingRight: 10,
    paddingTop: 30,
  },
  whiteContainer: {
    width: '93%',
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    justifyContent: 'center',
    borderColor: 'lightgray',
    paddingLeft: 10,
    paddingBottom: 30,
    paddingTop: 20,
    marginTop: 40,
    borderRadius: 7,
    alignSelf: 'center',
  },
  eventName: {
    color: '#000000',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 18,
  },
  eventName2: {
    color: '#000000',
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 10,
    marginBottom: 5,
    marginTop: 20,
  },
  eventDetail: {
    color: '#000000',
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 11,
    paddingTop: 3,
    marginLeft: 3,
    alignSelf: 'flex-start',
  },
  separator: {
    width: 1,
    backgroundColor: '#7B6F72',
    marginVertical: 5,
  },
  attendee: {
    color: 'grey',
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 9,
    paddingTop: 3,
    marginLeft: 3,
    alignSelf: 'flex-start',
  },
  eventDesc: {
    color: '#000000',
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 12,
    paddingTop: 28,
    marginBottom: 20,
  },
  firstText: {
    paddingTop: 0,
  },
  button: {
    backgroundColor: '#B51E71' ,
    alignItems: 'center',
    paddingVertical: 6,
    width: '80%',
    borderRadius: 3,
    marginBottom: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  customAlertContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  customAlertContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  sadEmojiAnimation: {
    width: 100,
    height: 100,
  },
  customAlertText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000000',
  },
  customAlertButtons: {
    flexDirection: 'row',
  },
  customAlertButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#B51E71',
    alignItems: 'center',
  },
  customAlertButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EventDesc;