import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Linking, Image, Pressable,  ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
const windowHeight = Dimensions.get('window').height;

const DisplayEventDesc = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { event } = route.params;

  const openVideoUrl = (video_url) => {
    Linking.openURL(video_url).catch((error) => {
      console.error('Error opening video URL:', error);
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/images/Eventsdetailbg.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/images/poster.png')} // Replace with your PNG image
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

        <ScrollView>
        <View style={styles.whiteContainer}>
          <Text style={[styles.eventName, styles.firstText]}>{event.eventName}</Text>
          <View style={styles.row}>
          <Text style={styles.eventDetail}>Organised by {event.eventOrganizer}</Text>
          <Text style={styles.eventDetail}>I</Text>
          <Text style={styles.eventDetail}>{event.eventDate}</Text>
          <Text style={styles.eventDetail}>I</Text>
          

          </View>
          <Text style={styles.eventDetail}>Location: {event.eventLocation}</Text>
          <Text style={styles.attendee}>{event.popularity} attending</Text>
          <Text style={styles.eventDesc}>{event.eventDescription}</Text>

          <View style={styles.row1}>
              <Pressable style={styles.button1}>
                <Text style={styles.buttonText1}>Download Itenary</Text>
                <Image source={require('../../assets/images/download.png')} style={styles.downloadIcon} />
              </Pressable>
          </View>
          <Text style={styles.eventName2}>After Movie 2022</Text>
          <View style={styles.tileContainer}>
            <Image source={require('../../assets/images/poster.png')} style={styles.tileImage} />
            
            <View style={styles.tileTextContainer}>
              <Text style={styles.tileText}>{event.video_title}</Text>
              <Text style={styles.shortText}>Short video of {event.eventName}</Text>
              <Pressable onPress={() => openVideoUrl(event.video_url)}>
              <Image source={require('../../assets/images/utube.png')} />
              </Pressable>
            </View>
          </View>
          
          
        </View>
        </ScrollView>
        <View style={styles.gap} />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
       
        
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
      marginBottom: 30
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
      paddingEnd: 5,
      marginRight: 5
  
    },
    row1: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      alignContent: 'center',
      alignSelf: 'center'
  
    },
    
    buttonText1: {
      color: '#000000',
      fontSize: 8,
      fontWeight: '400',
      fontFamily: 'Poppins',
      paddingLeft: 40
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
    },
    gap: {
      height: 15,
    },
    greyBox: {
      width: '100%',
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
      alignSelf: 'center'
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
      marginTop: 20
    },
    eventDetail: {
      color: '#000000',
      fontFamily: 'Poppins',
      fontWeight: '400',
      fontSize: 11,
      paddingTop: 3,
      marginLeft: 3,
      alignSelf: 'flex-start'
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
      alignSelf: 'flex-start'
  
    },
    eventDesc: {
      color: '#000000',
      fontFamily: 'Poppins',
      fontWeight: '400',
      fontSize: 12,
      paddingTop: 28,
      marginBottom: 20
    },
    firstText: {
      paddingTop: 0,
    },
    button: {
      backgroundColor: '#B51E71',
      alignItems: 'center',
      paddingVertical: 6,
      width: '80%',
      borderRadius: 3,
      marginBottom: 8
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'Poppins',
      
    },
  });

export default DisplayEventDesc;