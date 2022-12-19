import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

export const MyButton = ({onPress, title, colors = '#01D971'}) => {
  return (
    <TouchableOpacity
      className={'w-full my-3 rounded-xl '}
      style={{
        backgroundColor: colors,
      }}
      onPress={onPress}>
      <Text className="my-4 font-semibold tracking-widest text-gray-800 w-full rounded-xl text-center">
        {title}
      </Text>
    </TouchableOpacity>
  );
};
