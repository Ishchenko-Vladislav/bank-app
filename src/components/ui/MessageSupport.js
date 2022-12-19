import {View, Text} from 'react-native';
import React from 'react';

export const MessageSupport = ({item}) => {
  const time = new Date(item.createdAt * 1000).toLocaleString(undefined, {
    timeZone: 'UTC',
  });
  console.log(item.createdAt);
  return (
    <View className={`${item.support ? 'items-start' : 'items-end'}`}>
      <View
        className={`${
          item.support ? 'bg-zinc-600' : 'bg-sky-700'
        } py-1 px-2 rounded-lg w-[80%] mb-1 pb-4`}>
        <Text className="text-white">{item.text}</Text>
        <Text className="absolute bottom-0 right-2 text-white">{time}</Text>
      </View>
    </View>
  );
};
