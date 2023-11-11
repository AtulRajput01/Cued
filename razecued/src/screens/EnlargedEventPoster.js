import React from 'react';
import { Modal, Image, TouchableOpacity, View, StyleSheet } from 'react-native';
const closeIcon = require('../../assets/images/cross2.png');
const EnlargedEventPoster = ({ visible, imageUri, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
        >
          <Image source={closeIcon} style={styles.closeIcon} />
        </TouchableOpacity>
        <Image
          source={{ uri: imageUri }}
          style={styles.enlargedPoster}
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
    
    backgroundColor: 'grey'
  },
  enlargedPoster: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
  },
});

export default EnlargedEventPoster;
