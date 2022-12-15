import {
  View,
  Text,
  Alert,
  Button,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Field} from './../ui/Field';
import {MyButton} from '../ui/MyButton';
import {useAuth} from '../../hooks/useAuth';
// import {addDoc, collection, doc, setDoc, getDoc} from 'firebase/firestore';
// import {db, setDocumentNow} from '../../utils/firebase';
import auth from '@react-native-firebase/auth';
import {MessageSupport} from '../ui/MessageSupport';
import {useSupport} from '../../hooks/useSupport';
import {Loader} from '../ui/Loader';

export const SupportScreen = () => {
  const [text, setText] = useState('');
  // const [message, setMessage] = useState([]);
  const {sendMessage, message, isLoading, getMessage} = useSupport();
  const textHandler = () => {
    console.log(text);
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
      <ScrollView
        className="h=[90%] px-5 pt-3"
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getMessage} />
        }>
        {isLoading ? (
          <Loader />
        ) : message.length >= 1 ? (
          message.map(item => <MessageSupport item={item} />)
        ) : (
          <Text>have not a message</Text>
        )}
      </ScrollView>
      <View className="absolute bottom-4 w-[90%] h-14 px-6 flex-row items-center ">
        <Field
          onChangeText={setText}
          value={text}
          placeholder={'Enter you message'}
        />
        <Button onPress={textHandler} title="Send" />
      </View>
    </View>
  );
};
