import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export const HeaderBack = ({navigation}) => {
  return (
    <View
      style={{
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'silver',
      }}>
      <Pressable
        onPress={() => navigation.goBack()}
        className="flex-row items-center">
        <FontAwesomeIcon icon={'fa-solid fa-arrow-left'} />
        <Text className="ml-3 text-xl font-medium text-black">Back</Text>
      </Pressable>
    </View>
  );
};
