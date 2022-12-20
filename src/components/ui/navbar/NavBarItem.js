import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export const NavBarItem = ({title, imageName, navigate, currentRoute}) => {
  return (
    <Pressable
      onPress={() => navigate(title)}
      className="items-center h-full w-[25%] justify-center">
      <FontAwesomeIcon
        secondaryColor="red"
        // color="blue"
        // style="--fa-animation-duration: 0.5s;"
        mask="circle-3"
        // transform="shrink-6 left-4"
        color={currentRoute == title ? 'blue' : 'black'}
        size={20}
        icon={imageName}
      />
    </Pressable>
  );
};
