import React from 'react';
<<<<<<< HEAD
import { View, Text, StyleSheet, Pressable } from 'react-native';

const CustomButton = ({ onPress, text, type = 'PRIMARY', bgColor, fgColor }) => {
  // Define the default background color for the PRIMARY type button
  const defaultBgColor = type === 'PRIMARY' ? '#3B71F3' : 'pink';

=======
import {View, Text, StyleSheet, Pressable} from 'react-native';

const CustomButton = ({onPress, text, type = 'PRIMARY', bgColor, fgColor}) => {
>>>>>>> main
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
<<<<<<< HEAD
        { backgroundColor: bgColor || defaultBgColor }, // Use the passed bgColor or defaultBgColor
=======
        bgColor ? {backgroundColor: bgColor} : {},
>>>>>>> main
      ]}>
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
<<<<<<< HEAD
          fgColor ? { color: fgColor } : {},
=======
          fgColor ? {color: fgColor} : {},
>>>>>>> main
        ]}>
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
<<<<<<< HEAD
    padding: 15,
    marginVertical: 5,
=======

    padding: 15,
    marginVertical: 5,

>>>>>>> main
    alignItems: 'center',
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: '#3B71F3',
  },

  container_SECONDARY: {
    borderColor: '#3B71F3',
    borderWidth: 2,
  },

  container_TERTIARY: {},

  text: {
    fontWeight: 'bold',
    color: 'white',
<<<<<<< HEAD
    fontSize: 16
=======
>>>>>>> main
  },

  text_SECONDARY: {
    color: '#3B71F3',
  },

  text_TERTIARY: {
    color: 'gray',
  },
});

export default CustomButton;
