import {View, Text, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import React, {useState} from 'react';

export const usePayments = () => {
  const [isLoading, setIsLoading] = useState(false);
  const transferFrom = async (number, amount) => {
    try {
      const postReference = await firestore()
        .collection('accounts')
        .where('cardNumber', '==', number)
        .get()
        .then(querySnapshot => {
          return querySnapshot.docs;
        });
      const bal = await postReference[0].data().balance;
      if (bal < amount) return;
      postReference[0].ref.update({balance: bal - amount});
      //   console.log(postReference[0].ref.update({balance: bal + 1}));
    } catch (error) {
      return error;
    }
  };

  const transferTo = async (number, amount) => {
    const postReference = await firestore()
      .collection('accounts')
      .where('cardNumber', '==', number)
      .get()
      .then(querySnapshot => {
        return querySnapshot.docs;
      });
    const bal = await postReference[0].data().balance;
    console.log(postReference[0].ref.update({balance: +bal + +amount}));
  };
  const transferMoney = async (from, to, amountFrom, amountTo) => {
    setIsLoading(true);
    try {
      await transferFrom(from, amountFrom);
      await transferTo(to, amountTo);
    } catch (error) {
      Alert.alert('Error for transfer', error);
    } finally {
      setIsLoading(false);
    }
  };
  return {transferMoney, isLoading};
};
