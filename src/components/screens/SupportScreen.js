import {View, Text, Button, ScrollView, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Field} from './../ui/Field';
import {MessageSupport} from '../ui/MessageSupport';
import {useSupport} from '../../hooks/useSupport';
import {Loader} from '../ui/Loader';
import {MyButton} from '../ui/MyButton';

export const SupportScreen = () => {
  const [text, setText] = useState('');

  const {sendMessage, message, isLoading, getMessage} = useSupport();
  const textHandler = () => {
    sendMessage(text, false);
    setText('');
  };
  useEffect(() => {
    getMessage();
  }, []);
  return (
    <View className=" w-full h-full">
      <View
        style={{borderBottomWidth: 0.3}}
        className="w-full h-14 justify-center px-4">
        <Text>Support 24/7</Text>
      </View>

      {isLoading ? (
        <Loader />
      ) : message.length >= 1 ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={getMessage} />
          }
          className="h=[90%] px-5 pt-3">
          {message.map(item => (
            <MessageSupport key={item.cardNumber} item={item} />
          ))}
        </ScrollView>
      ) : (
        <Text>have not a message</Text>
      )}
      <View className="absolute bottom-4 w-[86%] px-6 flex-row items-center">
        <Field
          onChangeText={setText}
          value={text}
          placeholder={'Enter you message'}
        />
        {/* <View className="w-[50px] h-full">
          <MyButton onPress={textHandler} title="Send" />
        </View> */}
        <View className="mt-[11px] py-4 px-3 mx-1 justify-center items-center bg-teal-700 rounded-lg">
          <Text className="text-white">Send</Text>
        </View>
      </View>
    </View>
  );
};
