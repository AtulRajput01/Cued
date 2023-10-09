import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import { Controller } from 'react-hook-form'; // Import Controller from react-hook-form

const CustomInput = ({control, name, rules, placeholder, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
          
            placeholder={placeholder}
            placeholderTextColor="#000000" 
            style={styles.input}
            secureTextEntry={secureTextEntry}
            onBlur={onBlur}
            onChangeText={(text) => onChange(text)}
            value={value}
            {...(name && control && rules ? { name, control, rules } : {})}
          />
        )}
        name={name}
        rules={rules}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
<<<<<<< HEAD
    
    width: '100%',

    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 8,
    marginVertical: 5,
  },
  input: {
    fontSize: 15,
=======
    backgroundColor: 'white',
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    fontSize: 16,
>>>>>>> main
    color: '#000000', 
  },
});

export default CustomInput;
