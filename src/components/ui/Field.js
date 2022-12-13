import {TextInput} from 'react-native';
import React from 'react';

export const Field = ({onChangeText, secureTextEntry, value, placeholder}) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      defaultValue={value}
      className="bg-gray-200 mt-3 p-3 rounded-xl w-full"
    />
  );
};
