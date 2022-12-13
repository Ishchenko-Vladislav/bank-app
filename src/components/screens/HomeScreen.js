import {View, Text, ScrollView, RefreshControl} from 'react-native';
import React from 'react';

import {useProfile} from '../../hooks/useProfile';
import {Avatar} from '../ui/Avatar';
import {Loader} from '../ui/Loader';

import {useApplyCard} from '../../hooks/useApplyCard';
import {CardList} from '../ui/CardList';

import {ApplyNewProduct} from '../ui/ApplyNewProduct';

export const HomeScreen = ({navigation}) => {
  const {name, isLoading} = useProfile();
  const {
    cardList,
    addNewCard,
    isLoading: isLoadingNewProduct,
    isLoadingInitial,
    getCard,
    deleteCard,
  } = useApplyCard();

  return (
    <View className="w-full  pt-2 flex-1">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <View
            style={{borderBottomWidth: 1, borderBottomColor: 'silver'}}
            className="pb-2">
            <View className="flex-row items-center ml-5">
              <Avatar name={name} />
              <Text className="ml-2 font-semibold text-lg text-black">
                {name}
              </Text>
            </View>
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={getCard} />
            }
            className="mb-16 px-5"
            showsVerticalScrollIndicator={false}>
            {isLoadingNewProduct | isLoadingInitial ? (
              <Loader />
            ) : cardList.length != 0 ? (
              cardList.map(item => (
                <CardList
                  deleteCard={deleteCard}
                  navigation={navigation}
                  key={item.id}
                  cardId={item.id}
                  item={item.data()}
                />
              ))
            ) : (
              <Text className="text-center mt-5">You don`t have a card</Text>
            )}
          </ScrollView>

          <ApplyNewProduct addNewCard={addNewCard} />
        </>
      )}
    </View>
  );
};
