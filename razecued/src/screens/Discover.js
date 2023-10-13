import React, { useEffect, useState, useRef } from 'react';
import { View,FlatList, Animated, Text, StyleSheet, BackHandler, Alert, TouchableOpacity,  Pressable, Dimensions, Image, TextInput,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import RegisteredEvents from './RegisteredEvents';
import UserDetail from './Userdetail';
import EventDesc from './EventDesc';
import { createStackNavigator } from '@react-navigation/stack';
import homeIcon from '../../assets/images/home.png';
import eventIcon from '../../assets/images/events.png';
import profileIcon from '../../assets/images/profile.png';
import tokenIcon from '../../assets/images/token.png';
import Token from './Token';
import { ImageBackground } from 'react-native';
import { sortBy } from 'lodash';
import DisplayEventDesc from './DisplayEventDesc';
import Register from './Register';


const windowWidth = Dimensions.get('window').width;
const containerWidth = windowWidth * 0.72; // Width of the container item
const containerSpacing = (windowWidth - containerWidth) / 2; // Spacing between containers

const Discover = () => {
  
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [searchText, setSearchText] = React.useState('');
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Confirm Exit',
        'Do you really want to close the app?',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'OK', onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: false }
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  
  // Simulate fetching data from your Recommended API/Vertical events
  useEffect(() => {
    fetch('https://hk1630uulc.execute-api.us-east-1.amazonaws.com/Dev/fetch-events')
    .then((response) => response.json())
    .then((data) => {
      setRecommendedEvents(data.data.verticalEvents);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching recommended events:', error);
      setLoading(false);
    });

  // Fetch horizontal events
  fetch('https://hk1630uulc.execute-api.us-east-1.amazonaws.com/Dev/fetch-events')
    .then((response) => response.json())
    .then((data) => {
      setDisplayedEvents(data.data.horizontalEvents);
    })
    .catch((error) => {
      console.error('Error fetching displayed events:', error);
    });
  }, []);

  

// Render a single recommended event item
const renderRecommendedEventItem = ({ item }) => (
  <Pressable
    style={styles.bottomContainer}
    onPress={() => navigation.navigate('EventDesc', { events: item })}
  >
    <View style={styles.bottomContentContainer}>
      <View style={styles.greyBox}>
        <Image
          source={require('../../assets/images/poster.png')} // Replace 'image' with the actual image URL key in your API data
          style={{ flex: 1, width: null, height: null }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.bottomText1}>{item.eventName}</Text>
        <Text style={styles.bottomText2}>{item.__typename}</Text>
        <Text style={styles.bottomText3}>5pm</Text>
        <View style={styles.row}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>{item.popularity} registrations</Text>
          </View>
          <View style={styles.button1}>
            <Text style={styles.buttonText}>{item.eventDate}</Text>
          </View>
          <View style={styles.button2}>
            <Text style={styles.buttonText}>Free</Text>
          </View>
        </View>
      </View>
    </View>
  </Pressable>
);
// Render a single display event item
const renderDisplayedEventItem = ({ item , index}) => { 
  const inputRange = [
    (index - 1) * containerWidth,
    index * containerWidth,
    (index + 1) * containerWidth,
  ];
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [10, 0, 10], // Adjust the vertical translation values as needed
    extrapolate: 'clamp',
  });
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.84, 1.0, 0.84], // Adjust the scale values as needed
    extrapolate: 'clamp', // Ensure the values don't go beyond the inputRange
  });
  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.6, 1, 0.6], // Adjust the opacity values as needed
    extrapolate: 'clamp',
  });
  const zIndex = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0], // Adjust the zIndex values as needed
    extrapolate: 'clamp',
  });
  return (
    <Animated.View
      style={[
        styles.containerItem,
        {
          transform: [{ scale }, { translateY }],
          opacity,
          zIndex,
        },
      ]}
    >
          <ImageBackground 
            source={require('../../assets/images/poster.png')}
            style={styles.containerItem}
            resizeMode="cover">
              
                  <View style={styles.innerContainer}>
                    <Text style={styles.topText1}>{item.eventName}</Text>
                    <View style={styles.row1}>
                    <Text style={styles.topText2}>{item.eventOrganizer}</Text>
                    <Text style={styles.divider}>II</Text>
                    <Text style={styles.topText3}>{item.eventDate}</Text>
                    </View>
                    <Pressable onPress={() => navigation.navigate('DisplayEventDesc', { event: item })} style={styles.topbutton}>
                      <Text style={styles.topbuttonText}>Register before {item.eventDate}</Text>
                    </Pressable>
                  </View> 
             
            </ImageBackground>
            </Animated.View>
);
    };

  return (
    
      <ImageBackground
      source={require('../../assets/images/discover.jpg')} 
      style={styles.backgroundImage}
      >
      <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.row}>
          <Image
            source={require('../../assets/images/C.png')} 
            style={styles.smallImage}
          />
          <Image
            source={require('../../assets/images/ued.png')} 
            style={styles.smallImage2}
          />
          </View>
        </View>
      
        <View style={styles.row}>
          <Text style={styles.text}>Discover</Text>
        </View>
        <View style={styles.searchBox}>
        <Image source={require('../../assets/images/search.png')} style={styles.searchIcon} />
        <TextInput
            style={styles.searchText}
            placeholder="Search here.."
            placeholderTextColor="#979797"
            value={searchText}
            onChangeText={setSearchText}
          />
            <Image source={require('../../assets/images/filter.png')} style={styles.filterIcon} />
         </View>
         <View style={styles.gap} />  
         <FlatList
            data={displayedEvents}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalContainer}
            renderItem={renderDisplayedEventItem}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={styles.gap} />} 
            style={styles.horizontalFlatList}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
          />
        <View style={styles.gap} />
        <View style={styles.row}>
          <Text style={styles.text2}>Recommended</Text>
        </View>
        
        <View style={styles.gap} />
        {/* Recommended Events */}
        
          <FlatList
            data={recommendedEvents}
            renderItem={renderRecommendedEventItem}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={styles.gap1} />} // Replace 'id' with the actual unique identifier for your events
          />
           
      </View>
      </ImageBackground>
    
  );
};

const styles = StyleSheet.create({
  text2: {
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  imageContainer: { 
    marginTop: 15, 
  },
  smallImage: {
    width: 40,
    height: 30, 
    resizeMode: 'contain', 
    
  },
  smallImage2: {
    
    height: 30, 
    resizeMode: 'contain', 
    
  },
  imageBackground: {
    flex: 1,
    width: '100%', 
    height: '100%', 
    resizeMode: 'cover',
    opacity: 0.8 
  },
  backgroundImage: {
    flex: 1, 
    resizeMode: 'cover', 
  },
  tabIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain', 
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  profileIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'lightgray', 
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
 
  text: {
    paddingTop: 30,
    color: '#000000',
    fontSize: 27,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },
  searchBox: {
    backgroundColor: '#FFFFFF',
    width: windowWidth * 0.86,
    height: 40,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchText: {
    fontSize: 12,
    fontFamily: 'Poppins',
    color: '#979797',
  },
  filterIcon: {
    marginLeft: 'auto',
  },
  scrollViewContainer: {
    marginTop: 20,
    width: '100%',
    height: 150,
  },
  horizontalContainer: {
    flexDirection: 'row',
    
  },
  containerItem: {
    backgroundColor: 'transparent',
    width: containerWidth,  
    borderRadius: 5,
    height: 300,
    
    alignItems: 'start',
    borderRadius: 5,
    height: 300
  },
  innerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)', 
   
    borderRadius: 5,
    marginLeft: 18,
    marginRight: 18 ,
    marginTop: 22,
    
  },
  containerText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  containerButton: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: 'blue',
  },
  gap: {
    height: 10,
  },
  gap1: {
    height: 20,
  },
  bottomContainer: {
    width: windowWidth * 0.9,
    height: 130,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
     elevation: 5,
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.3,
     shadowRadius: 4,
  },
  bottomContentContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  horizontalFlatList: {
    height: 300,
    marginTop: 10
    
  },
  greyBox: {
    
    width: '26%',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  textContainer: {
    marginLeft: 10,
    marginTop: 15
  
  },
  topText1: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000',
    marginLeft: 30,
    marginTop:12
  },
  bottomText1: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000',
  },
  bottomText2: {
    fontSize: 10,
    fontFamily: 'Poppins',
    color: '#000000',
    fontWeight: '400',
    
  },
  topText2: {
    fontSize: 10,
    fontFamily: 'Poppins',
    color: '#000000',
    fontWeight: '400',
    marginLeft: 30,
  },
  topText3: {
    fontSize: 10,
    fontFamily: 'Poppins',
    color: '#000000',
    fontWeight: '400',
    marginLeft: 5,
  },
 divider: {
    fontSize: 10,
    fontFamily: 'Poppins',
    color: '#000000',
    fontWeight: '400',
    
  },
  bottomText3: {
    fontSize: 10,
    fontFamily: 'Poppins',
    marginBottom: 5,
    color: '#000000',
    fontWeight: '400',
  },
  button: {
    backgroundColor: '#FFF1F8',
    paddingHorizontal: 8,
    paddingVertical: 4,
     elevation: 3,
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.3,
     shadowRadius: 1,

  },
  button1: {
    backgroundColor: '#FFF1F8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 2,
    marginLeft: 4,
     elevation: 3, 
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.3,
     shadowRadius: 1,
    

  },
  button2: {
    backgroundColor: '#FFF1F8',
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 2,
    marginLeft: 4,
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,

  },
  topbutton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 3,
    marginLeft: 30,
    alignContent: 'center',
    marginEnd: 40,
    marginTop: 8,
    marginBottom: 12
    

  },
  buttonText: {
    color: '#000000',
    fontSize: 8,
    fontWeight: '400',
    fontFamily: 'Poppins',
  },
 
  topbuttonText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'Poppins',
  },

 
  
});



// Create a stack navigator for screens outside the tab navigator
const Stack = createStackNavigator();

// AppStackNavigator contains the tab navigator and EventDesc screen
const AppStackNavigator = () => {
  return (
    <Stack.Navigator>
      {/* Home screen is the tab navigator */}
      <Stack.Screen name="Home" component={AppNavigator} options={{ headerShown: false }} />

      {/* EventDesc screen */}
      <Stack.Screen name="EventDesc" component={EventDesc} options={{ headerShown: false }} />
      <Stack.Screen name="DisplayEventDesc" component={DisplayEventDesc} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />

      
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, icon }) => {
  return (
    <Image
      source={icon}
      style={[styles.tabIcon, { tintColor: focused ? 'blue' : 'gray' }]}
    />
  );
};

const AppNavigator = () => {
  return (
   
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconSource;
            switch (route.name) {
              case 'Home':
                iconSource = focused ? homeIcon : homeIcon;
                break;
              case 'Events':
                iconSource = focused ? eventIcon : eventIcon;
                break;
              case 'Profile':
                iconSource = focused ? profileIcon : profileIcon;
                break;
              case 'Token':
                iconSource = focused ? tokenIcon : tokenIcon;
                break;
              default:
                break;
            }
            return <TabBarIcon focused={focused} icon={iconSource} />;
          },
           
        })}
        tabBarOptions={{
          activeTintColor: 'blue', 
          inactiveTintColor: 'gray', 
        }}
      >
        <Tab.Screen name="Home" component={Discover}  options={{ headerShown: false }}  />
        <Tab.Screen name="Events" component={RegisteredEvents}  options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={UserDetail}  options={{ headerShown: false }} />
        <Tab.Screen name="Token" component={Token}  options={{ headerShown: false }}  />
      </Tab.Navigator>
    
  );
};

// Main navigation container using AppStackNavigator
const App = () => {
  return (
    
      <AppStackNavigator />
   
  );
};

export default App; 