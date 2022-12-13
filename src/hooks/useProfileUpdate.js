import {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useAuth} from './useAuth';

export const useProfileUpdate = () => {
  const {user} = useAuth();
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isSuccesfull, setIsSuccesfull] = useState(false);

  const updateName = async name => {
    setIsLoadingUpdate(true);
    firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        displayName: name,
      })
      .then(() => {
        setIsSuccesfull(true);
        setTimeout(() => setIsSuccesfull(false), 2000);
      })
      .catch(err => err.message)
      .finally(() => setIsLoadingUpdate(false));
  };

  return {isLoadingUpdate, updateName, isSuccesfull};
};
