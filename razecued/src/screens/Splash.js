import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { ImageBackground } from 'react-native';
import { Auth } from 'aws-amplify'; // Assuming you are using AWS Amplify for authentication

export default class Splash extends Component {
  componentDidMount() {
    this.checkUserAuthentication();
  }

  checkUserAuthentication = async () => {
    try {
      // Check if the user is already authenticated
      const user = await Auth.currentAuthenticatedUser();

      // If the user is authenticated, navigate to the desired screen (e.g., Discover)
      this.props.navigation.replace('Home');
    } catch (error) {
      // If there's an error or the user is not authenticated, navigate to the Login screen
      this.props.navigation.replace('Login');
    }
  };

  render() {
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
  }
}

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
})