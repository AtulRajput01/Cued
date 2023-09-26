import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, Pressable,Dimensions, ScrollView } from 'react-native';
import EventDesc from './EventDesc';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;



//Code
const Token = () => {

  const navigation = useNavigation();

  return (
    
    <ImageBackground
    source={require('../../assets/images/BasicDetailsbg.jpg')} 
    style={styles.backgroundImage}>
   <View style={styles.container}>
      <View style={styles.header}>
      <Pressable onPress={() => navigation.navigate('Home')}>
      <View style={styles.text1}>
          <Image source={require('../../assets/images/arrow_left.png')} style={styles.arrowImage}  />
          </View>
        </Pressable>
        <Text style={styles.text}>Use your tokens</Text>
        <View style={styles.notif}>
        <Image source={require('../../assets/images/bell.png')} style={styles.arrowImage}  />
        </View>
      </View>
      <View style={styles.row}>
      <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Total tokens:00</Text>
              </TouchableOpacity>
        </View>
        <ScrollView>
        <View style={styles.gap} />
        
        <ImageBackground
          source={require('../../assets/images/tokenbg.png')}
          style={styles.bottomContainer}
          resizeMode="cover"
        >
          <View style={styles.bottomContentContainer}>
          <ImageBackground
              source={require('../../assets/images/token.png')}
              style={styles.greyBox}
              resizeMode="cover"
            />
            <View style={styles.textContainer}>
              <Text style={styles.bottomText1}>Use your TOKEN AND GET</Text>
              <Text style={styles.bottomText2}>Upto 40% off</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Redeem now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.gap} />
        <ImageBackground
          source={require('../../assets/images/tokenbg.png')}
          style={styles.bottomContainer}
          resizeMode="cover"
        >
          <View style={styles.bottomContentContainer}>
          <ImageBackground
              source={require('../../assets/images/token.png')}
              style={styles.greyBox}
              resizeMode="cover"
            />
            <View style={styles.textContainer}>
              <Text style={styles.bottomText1}>Use your TOKEN AND GET</Text>
              <Text style={styles.bottomText2}>Upto 40% off</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Redeem now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.gap} />
        <ImageBackground
          source={require('../../assets/images/tokenbg.png')}
          style={styles.bottomContainer}
          resizeMode="cover"
        >
          <View style={styles.bottomContentContainer}>
          <ImageBackground
              source={require('../../assets/images/token.png')}
              style={styles.greyBox}
              resizeMode="cover"
            />
            <View style={styles.textContainer}>
              <Text style={styles.bottomText1}>Use your TOKEN AND GET</Text>
              <Text style={styles.bottomText2}>Upto 40% off</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Redeem now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.gap} />
        <ImageBackground
          source={require('../../assets/images/tokenbg.png')}
          style={styles.bottomContainer}
          resizeMode="cover"
        >
          <View style={styles.bottomContentContainer}>
          <ImageBackground
              source={require('../../assets/images/token.png')}
              style={styles.greyBox}
              resizeMode="cover"
            />
            <View style={styles.textContainer}>
              <Text style={styles.bottomText1}>Use your TOKEN AND GET</Text>
              <Text style={styles.bottomText2}>Upto 40% off</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Redeem now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.gap} />
        <ImageBackground
          source={require('../../assets/images/tokenbg.png')}
          style={styles.bottomContainer}
          resizeMode="cover"
        >
          <View style={styles.bottomContentContainer}>
          <ImageBackground
              source={require('../../assets/images/token.png')}
              style={styles.greyBox}
              resizeMode="cover"
            />
            <View style={styles.textContainer}>
              <Text style={styles.bottomText1}>Use your TOKEN AND GET</Text>
              <Text style={styles.bottomText2}>Upto 40% off</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Redeem now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground> 
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
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover'
    },
    arrowImage: {
      width: 20,
      height: 20,
    },
    text1:{
      padding: 10
    },
    bottomContainer: {
        width: windowWidth * 0.9,
        height: 250,
        borderWidth: 1,
        borderColor: 'lightgray',
        marginBottom: 10,
        overflow: 'hidden', // To clip the child content inside
      },
      
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    text: {
      padding: 10,
      color: '#107854',
      fontFamily: 'Roboto',
      fontSize: 16,
      fontWeight: '500',
    },
    back: {
      padding: 10,
      color: '#107854',
      fontFamily: 'Roboto',
      fontSize: 16,
      fontWeight: '500',
    },
    notif: {
      paddingLeft: 140,
      color: '#107854',
      fontFamily: 'Roboto',
      fontSize: 16,
      fontWeight: '500',
  
    },
    text2: {
        color: '#000000',
        fontSize: 12,
        fontFamily: 'Poppins',
        fontWeight: '500',
      },
      
      
      row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
      },
      
      scrollViewContainer: {
        marginTop: 20,
        width: '100%',
        height: 150,
      },
      
      
      
      gap: {
        height: 15,
      },
      bottomContainer: {
        width: windowWidth * 0.9,
        height: 130,
        
      },
      bottomContentContainer: {
        flexDirection: 'row', // Updated to 'row'
        width: '100%',
        height: '100%',
        alignItems: 'center', 
        marginLeft: 20// Align the image and texts vertically
      },
      greyBox: {
        width: 80, // Adjust the width of the image
        height: 80, // Adjust the height of the image
        marginLeft: 20,
        marginRight: 10, 
       // Add some gap between image and texts
      },
      textContainer: {
        paddingLeft: 15,
       
      },
      topText1: {
        fontSize: 16,
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        marginBottom: 2,
        color: '#000000',
        marginLeft: 30,
      },
      bottomText1: {
        fontSize: 10,
        fontFamily: 'Roboto',
        fontWeight: '400',
        color: '#000000',
      },
      bottomText2: {
        fontSize: 24,
        fontFamily: 'Poppins',
        color: '#000000',
        fontWeight: 'bold',
        
      },
    
      bottomText3: {
        fontSize: 10,
        fontFamily: 'Poppins',
        marginBottom: 5,
        color: '#000000',
        fontWeight: '400',
      },
      button: {
        width: 80, // Set the desired width for the button
        backgroundColor: '#B51E71',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 3,
        alignItems: 'center',
        marginTop: 3
      },
     
      buttonText: {
        color: '#FFFFFF',
        fontSize: 8,
        fontWeight: '400',
        fontFamily: 'Poppins',
      },
     
    
 
  });

export default Token;