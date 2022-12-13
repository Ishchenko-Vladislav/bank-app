import {
  View,
  Text,
  Pressable,
  TouchableHighlight,
  TouchableHighlightBase,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export const CardList = ({item, navigation, cardId, deleteCard}) => {
  const currency = item.currency == 'dollar' ? 'USD' : 'UAH';
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', {item, cardId, deleteCard})}
      style={{borderBottomWidth: 1, borderBottomColor: 'silver'}}
      className="flex-row items-center mt-4 w-full justify-between py-2">
      <View className="flex-row items-center">
        <View className="w-10 h-10 rounded-full bg-slate-400 justify-center items-center">
          <FontAwesomeIcon
            size={20}
            icon={`fa-solid fa-${item.currency}-sign`}
          />
        </View>
        <View>
          <Text className="ml-2 font-bold text-sm text-black">{item.type}</Text>
          <Text className="ml-2 font-bold text-xs text-black">
            {`${currency}  `}
            {Intl.NumberFormat(undefined, {
              currency,
              // style: 'currency',
              compactDisplay: 'short',
              notation: 'compact',
            }).format(item.balance)}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center">
        <Text className="mr-4 text-xl">...{item.cardNumber.slice(-4)}</Text>
        <FontAwesomeIcon
          size={20}
          color={item.type}
          icon="fa-solid fa-credit-card"
        />
      </View>
    </TouchableOpacity>
  );
};
