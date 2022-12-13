import {View, Text, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MyButton} from '../ui/MyButton';
import {useAuth} from '../../hooks/useAuth';
// import {addDoc, collection, doc, setDoc, getDoc} from 'firebase/firestore';
// import {db, setDocumentNow} from '../../utils/firebase';
import auth from '@react-native-firebase/auth';

export const SupportScreen = () => {
  return (
    <View className="justify-center items-center w-full">
      <Text>SupportScreen</Text>
    </View>
  );
};
