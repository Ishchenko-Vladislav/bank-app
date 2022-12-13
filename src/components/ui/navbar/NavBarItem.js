import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export const NavBarItem = ({title, imageName, navigate, currentRoute}) => {
  return (
    <Pressable onPress={() => navigate(title)} className="items-center">
      <FontAwesomeIcon
        color={currentRoute == title ? 'blue' : 'black'}
        size={20}
        icon={imageName}
      />
      <Text
        className={currentRoute == title ? 'text-blue-500' : 'text-gray-400'}>
        {title}
      </Text>
    </Pressable>
  );
};
