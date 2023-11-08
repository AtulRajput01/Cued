import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify'; // Import Auth from 'aws-amplify'

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkSession = async () => {
      try {
        // Check if the user is already authenticated
        const user = await Auth.currentAuthenticatedUser();

        if (user) {
          // If authenticated, navigate to 'Discover'
          navigation.replace('Register');
        } else {
          // If not authenticated, navigate to 'Login'
          navigation.replace('Register');
        }
      } catch (error) {
        console.error('Session Check Error:', error);

        // If there's an error, navigate to 'Login'
        navigation.replace('Register');
      }
    };

    // Check session immediately on component mount
    checkSession();
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../../assets/images/BasicDetailsbg.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.row}>
          <Image
            source={require('../../assets/images/C.png')} // Replace with your first PNG image path
            style={styles.image}
          />
          <Image
            source={require('../../assets/images/ued.png')} // Replace with your second PNG image path
            style={styles.image}
          />
        </View>
      </View>
      <Text style={styles.bottomText}>by Razespace</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    margin: 8,
  },
  bottomText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Poppins',
    alignSelf: 'center',
    marginBottom: 40,
  },
});

export default Splash;

