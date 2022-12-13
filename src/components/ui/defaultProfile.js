import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Avatar} from './Avatar';

export const DefaultProfile = ({item, getCard, currentId, setCurrentId}) => {
  const handler = () => {
    // getCard(item.uid);
    setCurrentId(item.uid);
  };
  return (
    <TouchableOpacity
      //   style={{borderBottomWidth: 1, borderBottomColor: 'silver'}}
      onPress={handler}
      className="mx-2">
      <View className="items-center justify-center">
        <Avatar name={item.displayName} />
        <Text
          className={`font-normal text-xs ${
            currentId == item.uid ? 'text-red-500' : 'text-black'
          }`}>
          {item.displayName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
