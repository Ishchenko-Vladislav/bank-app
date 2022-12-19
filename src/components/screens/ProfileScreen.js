import {View, Text} from 'react-native';
import React from 'react';
import {MyButton} from '../ui/MyButton';
import {useAuth} from '../../hooks/useAuth';
import {Field} from '../ui/Field';

import {Loader} from '../ui/Loader';
import {useProfileUpdate} from '../../hooks/useProfileUpdate';
import {HeaderTitle} from '../ui/HeaderTitle';
import {useProfile} from '../../hooks/useProfile';
import {useSupport} from '../../hooks/useSupport';

export const ProfileScreen = () => {
  const {logout} = useAuth();
  const {isLoading, name, setName} = useProfile();
  const {sendMessage} = useSupport();
  const {isLoadingUpdate, updateName, isSuccesfull} = useProfileUpdate();
  const handler = () => {
    updateName(name);
    sendMessage('Your profile was updated', true);
  };
  return (
    <View className="justify-center items-center w-10/12 mx-auto">
      {isSuccesfull && (
        <View className="bg-green-400 w-full absolute top-0 h-6 justify-center items-center">
          <Text>Update profile is succesfull</Text>
        </View>
      )}
      {isLoading || isLoadingUpdate ? (
        <Loader />
      ) : (
        <>
          <HeaderTitle title="Profile" />
          <Field
            placeholder={'Enter Name'}
            onChangeText={setName}
            value={name}
            // onBlur={getName}
          />
          <MyButton onPress={handler} title={'Update'} />
          <MyButton colors="silver" onPress={logout} title={'logout'} />
        </>
      )}
    </View>
  );
};
