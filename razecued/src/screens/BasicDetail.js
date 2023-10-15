import React, { useState, useEffect } from 'react';
import { View, Text, Alert, BackHandler, Image, StyleSheet, TextInput } from 'react-native';
import { ImageBackground } from 'react-native';
import CustomButton from './../components/CustomButton';

const BasicDetail = ({ navigation }) => {
  const [collegeRollNo, setCollegeRollNo] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [passingYear, setPassingYear] = useState('');
  const [age, setAge] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [basicDetailResponse, setBasicDetailResponse] = useState(null);

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Confirm Exit',
        'Do you really want to Exit',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'OK', onPress: () => navigation.navigate('Discover') },
        ],
        { cancelable: false }
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  const saveUserProfile = async () => {
    if (!collegeName || !passingYear || !collegeRollNo || !age || !name || !email || !dateOfBirth ||! phone) {
      Alert.alert('Incomplete Fields', 'Please complete all the fields.');
    } else {
      try {
        const response = await fetch('https://hk1630uulc.execute-api.us-east-1.amazonaws.com/Dev/basic-details1', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            collegeName,
            passingYear,
            collegeRollNo,
            age,
            gender,
            dateOfBirth,
            phone,
            altPhone,
            name,
            email,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('API Response:', data);
          Alert.alert('Success', 'User profile data saved successfully!', [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Home'), // Navigate to the 'Discover' screen
            },
          ]);
        } else {
          console.error('API Error:', response.statusText);
          Alert.alert('API Error', 'There was an error while submitting your data. Please try again.');
        }
      } catch (error) {
        console.error('API Error:', error);
        Alert.alert('API Error', 'There was an error while submitting your data. Please try again.');
      }
    }
  };

  return (
    <ImageBackground source={require('../../assets/images/Landingbg.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Text style={styles.alert}>Complete Profile!</Text>
        <Text style={styles.greetings}>
          Hey there, Please complete your profile, these data will be used and check during your entry.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#A9A9A9"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A9A9A9"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="College Name"
          placeholderTextColor="#A9A9A9"
          value={collegeName}
          onChangeText={(text) => setCollegeName(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Passing Year"
          placeholderTextColor="#A9A9A9"
          keyboardType="numeric"
          value={passingYear}
          onChangeText={(text) => setPassingYear(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="College Roll no"
          placeholderTextColor="#A9A9A9"
          value={collegeRollNo}
          onChangeText={(text) => setCollegeRollNo(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          placeholderTextColor="#A9A9A9"
          keyboardType="numeric"
          value={age}
          onChangeText={(text) => setAge(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Gender"
          placeholderTextColor="#A9A9A9"
          value={gender}
          onChangeText={(text) => setGender(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Date of birth"
          placeholderTextColor="#A9A9A9"
          keyboardType="numeric"
          value={dateOfBirth}
          onChangeText={(text) => setDateOfBirth(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#A9A9A9"
          keyboardType="numeric"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />

        
        <View style={styles.gap2} />
        <CustomButton text="Complete Registration" bgColor="#B51E71" onPress={saveUserProfile} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  gap: {
    height: 35,
  },
  gap2: {
    height: 5,
  },
  input: {
    width: '100%',
    height: 40,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    paddingLeft: 10,
    color: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  alert: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '700',
    fontFamily: 'Poppins',
    paddingTop: 40,
    paddingRight: 190,
  },
  greetings: {
    color: '#7B6F72',
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '400',
    marginBottom: 30,
    paddingRight: 55,
    paddingTop: 18,
  },
});

export default BasicDetail;