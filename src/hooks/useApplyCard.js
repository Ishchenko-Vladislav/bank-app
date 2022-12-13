import {Alert} from 'react-native';
import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useAuth} from './useAuth';
import {getRandomCardNumber} from '../utils/getRandomCardNumber';

export const useApplyCard = () => {
  const {user} = useAuth();
  const [cardList, setCardList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInitial, setIsLoadingInitial] = useState(false);
  const deleteCard = async id => {
    setIsLoading(true);
    try {
      await firestore().collection('accounts').doc(id).delete();
    } catch (error) {
      Alert.alert('Error delete:', error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const addNewCard = async (typeCard, currency) => {
    setIsLoading(true);
    try {
      firestore().collection('accounts').add({
        id: user.uid,
        cardNumber: getRandomCardNumber(),
        type: typeCard,
        balance: 1000,
        currency: currency,
      });
    } catch (error) {
      Alert.alert('Error:', error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const getCard = () => {
    setIsLoadingInitial(true);
    firestore()
      .collection('accounts')
      .where('id', '==', user.uid)
      .get()
      .then(querySnapshot => {
        setCardList(querySnapshot.docs);
        setIsLoadingInitial(false);
      });
  };
  useEffect(() => {
    getCard();
  }, [isLoading]);

  return {
    cardList,
    addNewCard,
    isLoading,
    deleteCard,
    isLoadingInitial,
    getCard,
  };
};
