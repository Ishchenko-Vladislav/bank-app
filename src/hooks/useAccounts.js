import {Alert} from 'react-native';
import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useAuth} from './useAuth';

export const useAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const {user} = useAuth();

  useEffect(() => {
    setIsLoading(true);
    try {
      firestore()
        .collection('users')
        .where('uid', '!=', user.uid)
        .get()
        .then(doc => setAccounts(doc.docs));
    } catch (error) {
      Alert.alert('Error get accounts:', error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return {accounts, isLoading};
};
