import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const useDeleteCard = () => {
  const deleteCard = id => {
    try {
      firestore().collection('accounts').doc(id).delete();
    } catch (error) {
      Alert.alert('Error delete:', error.message);
    }
  };
  return {deleteCard};
};
