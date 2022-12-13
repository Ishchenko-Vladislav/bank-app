import {View, Text, Alert} from 'react-native';
import React from 'react';
import {MyButton} from '../ui/MyButton';
import {useAuth} from '../../hooks/useAuth';
import {Field} from '../ui/Field';

import {Loader} from '../ui/Loader';
import {useProfileUpdate} from '../../hooks/useProfileUpdate';
import {HeaderTitle} from '../ui/HeaderTitle';
import {useProfile} from '../../hooks/useProfile';

export const ProfileScreen = () => {
  const {user} = useAuth();

  const {logout} = useAuth();
  const {isLoading, name, setName} = useProfile();
  const {isLoadingUpdate, updateName, isSuccesfull} = useProfileUpdate();

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
          <MyButton onPress={() => updateName(name)} title={'Update'} />
          <MyButton colors="silver" onPress={logout} title={'logout'} />
        </>
      )}
    </View>
  );
};
