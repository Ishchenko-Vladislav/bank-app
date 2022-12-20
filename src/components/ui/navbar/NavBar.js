import {View, Text} from 'react-native';
import React from 'react';
import {NavBarItem} from './NavBarItem';
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

export const NavBar = ({navigate, currentRoute}) => {
  const menuItems = [
    {title: 'Home', imageName: 'fa-regular fa-address-card'},
    {title: 'Payments', imageName: 'fa-regular fa-credit-card'},
    {title: 'Support', imageName: 'fa-regular fa-message'},
    {title: 'Profile', imageName: 'fa-regular fa-user'},
  ];
  return (
    <View
      // style={{borderTopWidth: 1, borderTopColor: 'silver'}}
      className="flex-row h-[70]  items-center">
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
