import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {HeaderBack} from '../ui/HeaderBack';
import {BankCard} from '../ui/BankCard';
import {MyButton} from '../ui/MyButton';
export const DetailsCardScreen = ({route, navigation}) => {
  const {item, cardId, deleteCard} = route.params;

  const handler = async () => {
    await deleteCard(cardId).then(() => {
      navigation.goBack();
    });
  };
  return (
    <View>
      <HeaderBack navigation={navigation} />
      <View className="items-center justify-center">
        <BankCard item={item} />
      </View>
      <View className="px-12 mt-10">
        <MyButton
          onPress={handler}
          title={'Delete this card'}
          colors="rgba(230,30,30, 0.9)"
        />
      </View>
    </View>
  );
};
