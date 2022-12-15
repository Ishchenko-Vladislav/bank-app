import {View, Text} from 'react-native';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
// import {firebase} from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {useAuth} from './useAuth';

export const useSupport = () => {
  const {user} = useAuth();
  const [message, setMessage] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [isLoading2, setIsLoading2] = useState([]);

  const sendMessage = (text, bool) => {
    if (text.length < 1) return;
    setIsLoading2(true);
    firestore()
      .collection('support')
      .add({
        uid: user.uid,
        text: text,
        createdAt: firestore.Timestamp.now().seconds,
        support: bool,
      })
      .finally(() => setIsLoading2(false));
  };
  //   console.log(auth.user.uid, 'uidssssssssssss');
  const getMessage = () => {
    setIsLoading(true);
    firestore()
      .collection('support')
      .where('uid', '==', user.uid)

      .get()
      .then(arr => {
        const arr2 = [];
        arr.docs.map(item => {
          arr2.push(item.data());
        });
        const arr3 = arr2.sort((a, b) => a.createdAt - b.createdAt);
        setMessage(arr3);
      })
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    getMessage();
  }, [isLoading2]);

  return {sendMessage, message, isLoading, getMessage};
};
