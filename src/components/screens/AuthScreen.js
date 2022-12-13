import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {useAuth} from '../../hooks/useAuth';
import {Field} from '../ui/Field';
import {MyButton} from '../ui/MyButton';
import {Loader} from '../ui/Loader';

export const AuthScreen = () => {
  const [isReg, setIsReg] = useState(false);
  const [data, setData] = useState({});
  const {isLoading, login, register} = useAuth();
  const authHandler = async () => {
    const {email, password} = data;

    if (isReg) {
      await register(email, password);
    } else {
      await login(email, password);
    }
  };
  return (
    <View className="justify-center items-center w-full h-full flex">
      <View className="w-9/12">
        <Text className="text-center font-bolds text-black text-3xl">
          {isReg ? 'Sign up' : 'Sign in'}
        </Text>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Field
              onChangeText={val => setData({...data, email: val})}
              placeholder="Email"
            />
            <Field
              secureTextEntry={true}
              onChangeText={val => setData({...data, password: val})}
              placeholder="Password"
            />
            <MyButton onPress={authHandler} title="Let`s go" />
            <Pressable onPress={() => setIsReg(!isReg)} className="">
              <Text className="text-right">
                {!isReg ? 'Register' : 'Login'}
              </Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
};
