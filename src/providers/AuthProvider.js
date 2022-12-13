import {Alert, View} from 'react-native';
import React, {createContext, useEffect, useMemo, useState} from 'react';
import {login, logout, register} from '../utils/firebase';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {Loader} from '../components/ui/Loader';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userState, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);

  const registerHandler = async (email, password) => {
    setIsLoading(true);
    try {
      const user = await register(email, password);
      firestore().collection('users').doc(user.user.uid).set({
        uid: user.user.uid,
        displayName: 'No Name',
        emailVerified: user.user.emailVerified,
      });
    } catch (error) {
      Alert.alert('Error reg:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loginHandler = async (email, password) => {
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert('Error login:', error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const logoutHandler = async () => {
    setIsLoading(true);
    try {
      await logout();
    } catch (error) {
      Alert.alert('Error logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      isLoading,
      user: userState,
      logout: logoutHandler,
      login: loginHandler,
      register: registerHandler,
    }),
    [userState, isLoading],
  );

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUser(user || null);
      setIsLoadingInitial(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {isLoadingInitial ? (
        <View className="w-full h-full justify-center items-center">
          <Loader />
        </View>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
