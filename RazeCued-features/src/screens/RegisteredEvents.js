import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Pressable,Dimensions, ScrollView } from 'react-native';
import EventDesc from './EventDesc';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ImageBackground } from 'react-native';


const windowWidth = Dimensions.get('window').width;



//Code
const RegisteredEvents = () => {

  const navigation = useNavigation();

  return (

    <ImageBackground
    source={require('../../assets/images/registeredbg.jpg')} 
      style={styles.backgroundImage}>
    <View style={styles.container}>
      <View style={styles.header}>
      <Pressable onPress={() => navigation.navigate('Home')}>
      <View style={styles.back}>
      <Image source={require('../../assets/images/arrow_left.png')} style={styles.arrowImage}  />
        </View>
        </Pressable>
        <Text style={styles.text}>Registered Events</Text>
        <View style={styles.notif}>
        <Image source={require('../../assets/images/bell.png')} style={styles.arrowImage}  />
        </View>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.outerContainer}>
            <View style={styles.grayContainer}>
            <Image source={require('../../assets/images/poster.png')} style={styles.image} />
            </View>
            <View>
            <Pressable onPress={() => navigation.navigate('EventDesc')}>
          <Text style={styles.eventName}>Event Name</Text>
        </Pressable>
              <Text style={styles.eventDesc}>Lorem ipsum dolor sit amet consectetur. Et ut aliquam pellentesque auctor ut commodo praesent.</Text>
            </View>
            <View style={styles.row}>
              <Pressable style={styles.button1}>
                <Text style={styles.buttonText1}>200 registrations</Text>
              </Pressable>
              <Pressable style={styles.button2}>
                <Text style={styles.buttonText1}>20th-25thdec</Text>
              </Pressable>
              <Pressable style={styles.button2}>
                <Text style={styles.buttonText1}>Rs.500/person</Text>
              </Pressable>
              <Pressable style={styles.button2}>
                <Text style={styles.buttonText1}>club event</Text>
              </Pressable>
              <Pressable style={styles.button2}>
                <Text style={styles.buttonText1}>90km</Text>
              </Pressable>
          </View>
          </View>

          {/* Second Container */}
          <View style={styles.outerContainer}>
            <View style={styles.grayContainer}>
            <Image source={require('../../assets/images/poster.png')} style={styles.image} />
            </View>
            <View>
            <Pressable onPress={() => navigation.navigate('EventDesc')}>
          <Text style={styles.eventName}>Event Name</Text>
        </Pressable>
              <Text style={styles.eventDesc}>Lorem ipsum dolor sit amet consectetur. Et ut aliquam pellentesque auctor ut commodo praesent.</Text>
            </View>
            <View style={styles.row}>
              <Pressable style={styles.button1}>
                <Text style={styles.buttonText1}>200 registrations</Text>
              </Pressable>
              <Pressable style={styles.button2}>
                <Text style={styles.buttonText1}>20th-25thdec</Text>
              </Pressable>
              <Pressable style={styles.button2}>
                <Text style={styles.buttonText1}>Rs.500/person</Text>
              </Pressable>
              <Pressable style={styles.button2}>
                <Text style={styles.buttonText1}>club event</Text>
              </Pressable>
              <Pressable style={styles.button2}>
                <Text style={styles.buttonText1}>90km</Text>
              </Pressable>
          </View>
          </View>

          <View style={styles.outerContainer}>
            <View style={styles.grayContainer}>
            <Image source={require('../../assets/images/poster.png')} style={styles.image} />
            </View>
            <View>
            <Pressable onPress={() => navigation.navigate('EventDesc')}>
          <Text style={styles.eventName}>Event Name</Text>
        </Pressable>
              <Text style={styles.eventDesc}>Lorem ipsum dolor sit amet consectetur. Et ut aliquam pellentesque auctor ut commodo praesent.</Text>
            </View>
            <View style={styles.row}>
              <Pressable style={styles.button1}>
                <Text style={styles.buttonText1}>200 registrations</Text>
              </Pressable>
              <Pressable style={styles.button2}>
                <Text style={styles.buttonText1}>20th-25thdec</Text>
              </Pressable>
              <Pressable style={styles.button2}>
                <Text style={styles.buttonText1}>Rs.500/person</Text>
              </Pressable>
              <Pressable style={styles.button2}>
                <Text style={styles.buttonText1}>club event</Text>
              </Pressable>
              <Pressable style={styles.button2}>
                <Text style={styles.buttonText1}>90km</Text>
              </Pressable>
          </View>
          </View>

          <View style={styles.outerContainer}>
            <View style={styles.grayContainer}>
            <Image source={require('../../assets/images/poster.png')} style={styles.image} />
            </View>
            <View>
            <Pressable onPress={() => navigation.navigate('EventDesc')}>
          <Text style={styles.eventName}>Event Name</Text>
        </Pressable>
              <Text style={styles.eventDesc}>Lorem ipsum dolor sit amet consectetur. Et ut aliquam pellentesque auctor ut commodo praesent.</Text>
            </View>
            <View style={styles.row}>
              <Pressable style={styles.button1}>
                <Text style={styles.buttonText1}>200 registrations</Text>
              </Pressable>
              <Pressable style={styles.button2}>
                <Text style={styles.buttonText1}>20th-25thdec</Text>
              </Pressable>
              <Pressable style={styles.button2}>
                <Text style={styles.buttonText1}>Rs.500/person</Text>
              </Pressable>
              <Pressable style={styles.button2}>
                <Text style={styles.buttonText1}>club event</Text>
              </Pressable>
              <Pressable style={styles.button2}>
                <Text style={styles.buttonText1}>90km</Text>
              </Pressable>
          </View>
          </View>

          
        </View>
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
    paddingTop: 10
  },
  button1: {
    backgroundColor: '#FFF1F8',
    paddingHorizontal: 4,
    paddingVertical: 5,
    borderRadius: 3,
    marginLeft: 14

  },
  button2: {
    backgroundColor: '#FFF1F8',
    paddingHorizontal: 4,
    paddingVertical: 5,
    borderRadius: 3,
    marginLeft: 4

  },
  button3: {
    backgroundColor: '#FFF1F8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 3,
    marginLeft: 4

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
    marginBottom: 20,
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
    height: 300,
    flexDirection: 'column',
    alignItems: 'flex-start',

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
    borderRadius: 5

  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisteredEvents;
