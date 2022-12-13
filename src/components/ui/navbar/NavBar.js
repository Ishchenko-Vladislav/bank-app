import {View, Text} from 'react-native';
import React from 'react';
import {NavBarItem} from './NavBarItem';

export const NavBar = ({navigate, currentRoute}) => {
  const menuItems = [
    {title: 'Home', imageName: 'fa-solid fa-house'},
    {title: 'Payments', imageName: 'fa-solid fa-credit-card'},
    {title: 'Services', imageName: 'fa-solid fa-bars'},
    {title: 'Support', imageName: 'fa-solid fa-message'},
    {title: 'Profile', imageName: 'fa-solid fa-user'},
  ];
  return (
    <View
      style={{borderTopWidth: 1, borderTopColor: 'silver'}}
      className="flex-row h-[70] justify-around items-center">
      {menuItems.map(item => (
        <NavBarItem
          currentRoute={currentRoute}
          key={item.title}
          title={item.title}
          imageName={item.imageName}
          navigate={navigate}
        />
      ))}
    </View>
  );
};
