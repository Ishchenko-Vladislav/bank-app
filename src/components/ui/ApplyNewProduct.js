import {View, Text, Alert} from 'react-native';
import React from 'react';
import {MyButton} from './MyButton';
import {AsyncAlert, AsyncAlert2} from '../../utils/AsyncAlert';
import firestore from '@react-native-firebase/firestore';

export const ApplyNewProduct = ({addNewCard}) => {
  const applyHandler = async () => {
    try {
      const currency = await AsyncAlert({
        title: 'Currency',
        msg: 'select your currency',
        buttons: {
          text: 'UAN',
          resolveValue: 'hryvnia',
          secondText: 'USD',
          resolveSecondValue: 'dollar',
        },
      });
      const type = await AsyncAlert({
        title: 'Type',
        msg: 'select your type card',
        buttons: {
          text: 'black',
          resolveValue: 'black',
          secondText: 'gold',
          resolveSecondValue: 'gold',
        },
      });
      await addNewCard(type, currency);
    } catch (error) {
      Alert.alert('Error apply card:', error.message);
    }
  };
  return (
    <View className="px-5 mt-4 w-full absolute bottom-0">
      <MyButton
        onPress={() => applyHandler()}
        colors="orange"
        title={'Apply for a new product'}
      />
    </View>
  );
};
