import React, { Component } from 'react';
import { View, StyleSheet, Image, Text} from 'react-native';
import { ImageBackground } from 'react-native';
export default class Splash extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Delay navigation to BasicDetail screen by 3 seconds (3000 milliseconds)
    setTimeout(() => {
      this.props.navigation.replace('Register');
    }, 3000);
  }

  render() {
    return (

      <ImageBackground
      source={require('../../assets/images/BasicDetailsbg.jpg')} 
      style={styles.backgroundImage}>
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
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
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
    marginBottom: 40
  },
});
