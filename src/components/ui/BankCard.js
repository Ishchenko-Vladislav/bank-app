import {View, Text} from 'react-native';
import React from 'react';
import Svg, {LinearGradient, Rect, Stop} from 'react-native-svg';

export const BankCard = ({item}) => {
  const FROM_COLOR = item.type == 'gold' ? 'yellow' : 'grey';
  const TO_COLOR = item.type == 'gold' ? 'orange' : 'black';
  const textColor = item.type == 'gold' ? 'text-black' : 'text-white';
  const currency = item.currency == 'dollar' ? 'USD' : 'UAH';
  return (
    <View className="w-10/12 h-[200] mt-4 rounded-2xl overflow-hidden">
      <Svg height="100%" width="100%">
        <LinearGradient
          gradientUnits="objectBoundingBox"
          id="grad"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="20%">
          <Stop offset="0" stopColor={FROM_COLOR} />
          <Stop offset="1" stopColor={TO_COLOR} />
        </LinearGradient>

        <Rect width="100%" height="100%" fill="url(#grad)" />
      </Svg>
      <Text className={`${textColor} absolute bottom-6 left-8 text-xl`}>
        {item.cardNumber}
      </Text>
      <Text className={`absolute mt-2 ml-5 text-xl ${textColor}`}>
        Card {item.type}
      </Text>
      <View className={`absolute left-5 top-12 flex-row items-end`}>
        <Text className={`text-sm ${textColor}`}>
          {Intl.NumberFormat(undefined, {
            currency,
            style: 'currency',
            currencyDisplay: 'code',
          }).format(item.balance)}
        </Text>
        <Text className={`${textColor} ml-2`}></Text>
      </View>
    </View>
  );
};
