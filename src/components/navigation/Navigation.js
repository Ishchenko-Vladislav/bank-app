import React, {useEffect, useState} from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screens/HomeScreen';
import {AuthScreen} from '../screens/AuthScreen';
import {useAuth} from '../../hooks/useAuth';
import {NavBar} from '../ui/navbar/NavBar';

import {PaymentsScreen} from '../screens/PaymentsScreen';
import {SupportScreen} from '../screens/SupportScreen';
import {ProfileScreen} from '../screens/ProfileScreen';
import {DetailsCardScreen} from '../screens/DetailsCardScreen';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  const {user} = useAuth();
  const ref = useNavigationContainerRef();

  const [name, setName] = useState(null);
  useEffect(() => {
    const timeout = setTimeout(() => setName(ref.getCurrentRoute().name), 100);
    return () => clearTimeout(timeout);
  }, []);
  useEffect(() => {
    const listener = ref.addListener('state', () =>
      setName(ref.getCurrentRoute().name),
    );
    return () => ref.removeListener('state', listener);
  }, []);

  return (
    <>
      <NavigationContainer ref={ref}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {user ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen
                options={{headerShown: false, headerTitle: 'Back'}}
                name="Details"
                component={DetailsCardScreen}
              />

              <Stack.Screen name="Support" component={SupportScreen} />
              <Stack.Screen name="Payments" component={PaymentsScreen} />

              <Stack.Screen name="Profile" component={ProfileScreen} />
            </>
          ) : (
            <Stack.Screen name="Auth" component={AuthScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
      {user && name && <NavBar navigate={ref.navigate} currentRoute={name} />}
    </>
  );
};
