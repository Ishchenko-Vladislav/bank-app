import {Alert} from 'react-native';
import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useAuth} from './useAuth';

export const useProfile = () => {
  const {user} = useAuth();
  const [name, setName] = useState('');
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      firestore()
        .collection('users')
        .doc(user.uid)
        .onSnapshot(documentSnapshot => {
          setProfile(documentSnapshot.data());
          setName(documentSnapshot.data().displayName);
        });
    } catch (error) {
      Alert.alert('Error:', error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {name, setName, isLoading};
};
