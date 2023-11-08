import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  ScrollView,
} from 'react-native';
import EventDesc from './EventDesc';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { Auth } from 'aws-amplify';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
const windowWidth = Dimensions.get('window').width;

const RegisteredEvents = () => {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');

useEffect(() => {
  const fetchEvents = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const currentUserId = user.attributes.sub;
      console.log('User ID:', currentUserId);

      const response = await fetch(
        `https://hk1630uulc.execute-api.us-east-1.amazonaws.com/Dev/fetch-registered-events?userId=${currentUserId}`
      );

      const data = await response.json();
      console.log('Fetched events:', data);

      setEvents(data.data.combinedDetails.filter(frontUserId) || []);
      setUserId(currentUserId);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  const frontUserId = (item) => item?.user?.userId === userId;

  fetchEvents();
}, [userId]);


const renderEvents = () => {
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (events.length === 0) {
    return <Text>No registered events</Text>;
  }

  console.log('User ID:', userId);
  console.log('All events:', events);

  const userEvents = events.filter((item) => item.user.userId === userId);

  console.log('User-specific events:', userEvents);
  if (userEvents.length === 0) {
    return <Text>No registered events for the current user</Text>;
  }

  return userEvents.map((item) => {
    const eventId = item?.event?.id;
    const eventPoster = item?.event?.eventPoster;
    const eventName = item?.event?.eventName;
    const eventDescription = item?.event?.eventDescription;
    const popularity = item?.event?.popularity;
    const eventDate = item?.event?.eventDate;
    const eventType = item?.event?.__typename;

    if (
      !eventId ||
      !eventPoster ||
      !eventName ||
      !eventDescription ||
      !popularity ||
      !eventDate ||
      !eventType
    ) {
      // Handle the case where some properties are undefined
      return null;
    }

    return (
      <View key={eventId} style={styles.outerContainer}>
        <View style={styles.grayContainer}>
          <Image source={{ uri: eventPoster || '' }} style={styles.image} />
        </View>
        <View>
          <Pressable onPress={() => navigation.navigate('EventDesc', { events: item })}>
            <Text style={styles.eventName}>{eventName}</Text>
          </Pressable>
          <Text style={styles.eventDesc}>{eventDescription}</Text>
        </View>
        <View style={styles.row}>
          {/* Adjust the button styling based on your requirements */}
          <Pressable style={styles.button1}>
            <Text style={styles.buttonText1}>{popularity} registrations</Text>
          </Pressable>
          <Pressable style={styles.button2}>
            <Text style={styles.buttonText1}>{eventDate}</Text>
          </Pressable>
          <Pressable style={styles.button2}>
            <Text style={styles.buttonText1}>Free</Text>
          </Pressable>
          <Pressable style={styles.button2}>
            <Text style={styles.buttonText1}>{eventType}</Text>
          </Pressable>
          <Pressable style={styles.button2}>
            <Text style={styles.buttonText1}>90 km</Text>
          </Pressable>
          {/* Add more buttons as needed for other attributes */}
        </View>
      </View>
    );
  });
};

  return (
    <ImageBackground
      source={require('../../assets/images/registeredbg.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.navigate('Home')}>
            <View style={styles.back}>
              <Image
                source={require('../../assets/images/arrow_left.png')}
                style={styles.arrowImage}
              />
            </View>
          </Pressable>
          <Text style={styles.text}>Registered Events</Text>
          <View style={styles.notif}>
            <Image source={require('../../assets/images/bell.png')} style={styles.arrowImage} />
          </View>
        </View>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.contentContainer}>{renderEvents()}</View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 10,
    marginBottom: 15,
    alignContent: 'space-around',
  },
  button1: {
    backgroundColor: '#FFF1F8',
    paddingHorizontal: 4,
    paddingVertical: 5,
    borderRadius: 3,
    marginLeft: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  button2: {
    backgroundColor: '#FFF1F8',
    paddingHorizontal: 4,
    paddingVertical: 5,
    borderRadius: 3,
    marginLeft: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  buttonText1: {
    color: '#000000',
    fontSize: 8,
    fontWeight: '400',
    fontFamily: 'Poppins',
  },
  backgroundImage: {
    flex: 1, // Cover the entire screen
    resizeMode: 'cover', // Cover the screen with the image
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    padding: 10,
    color: '#333333',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
  },
  back: {
    padding: 10,
  },
  arrowImage: {
    width: 20,
    height: 20,
  },
  notif: {
    paddingLeft: 100,
  },
  eventName: {
    paddingLeft: 18,
    paddingTop: 8,
    color: '#000000',
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDesc: {
    paddingLeft: 15,
    paddingTop: 8,
    color: '#000000',
    fontFamily: 'Poppins',
    fontSize: 10,
    fontWeight: '400',
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    marginTop: 40,
  },
  outerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginTop: 20,
    marginLeft: 5,
    width: windowWidth * 0.88,
    height: 'auto',
    flexDirection: 'column',
    alignItems: 'flex-start',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  grayContainer: {
    backgroundColor: '#D9D9D9',
    marginLeft: 12,
    marginTop: 15,
    height: 150,
    width: windowWidth * 0.82,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%', // Adjust the width as needed
    height: '100%', // Adjust the height as needed
    resizeMode: 'cover', // You can adjust the resizeMode property as needed
  },
  button: {
    backgroundColor: '#06191E',
    marginTop: 10,
    marginLeft: 15,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisteredEvents;
