import {View, Text} from 'react-native';
import React from 'react';

export const HeaderTitle = ({title, isCenter}) => {
  return (
    <Text
      className={`text-2xl font-semibold text-black mt-6 ${
        isCenter ? 'text-center' : 'text-left'
      }`}>
      {title}
    </Text>
  );
};
