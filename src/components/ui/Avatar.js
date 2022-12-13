import {View, Text} from 'react-native';
import React from 'react';

export const Avatar = ({name}) => {
  return (
    <View className="w-10 h-10 bg-neutral-500 rounded-full justify-center items-center">
      <Text className="font-bold text-xl text-white">{name?.slice(0, 1)}</Text>
    </View>
  );
};
