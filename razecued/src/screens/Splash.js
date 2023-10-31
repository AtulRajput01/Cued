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
        const user = await Auth.currentAuthenticatedUser();

        if (user) {
          navigation.replace('Discover');
        } else {
          navigation.replace('Login');
        }
      } catch (error) {
        console.error('Session Check Error:', error);

        navigation.replace('Login');
      }
    };

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
            source={require('../../assets/images/C.png')} 
            style={styles.image}
          />
          <Image
            source={require('../../assets/images/ued.png')} 
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
