import {View, Text, ScrollView, FlatList, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAccounts} from '../../hooks/useAccounts';
import {Avatar} from '../ui/Avatar';
import {DefaultProfile} from '../ui/defaultProfile';
import {Loader} from '../ui/Loader';
import firestore from '@react-native-firebase/firestore';
import {CardListPayments} from '../ui/CardListPayments';
import {useApplyCard} from '../../hooks/useApplyCard';
import {useAuth} from '../../hooks/useAuth';
import {CardListPaymentsFrom} from '../ui/CardListPaymentsFrom';
import {usePayments} from '../../hooks/usePayments';
import {PaymentsModal} from '../ui/PaymentsModal';

export const PaymentsScreen = () => {
  const [accs, setAccs] = useState([]);
  const {transferMoney, isLoading: loading} = usePayments();
  const [isActiveModal, setIsActiveModal] = useState(false);
  const {cardList, isLoading: load, getCard: falseLoadCard} = useApplyCard();
  const [currentCardFrom, setCurrentCardFrom] = useState(null);
  const [currentCardTo, setCurrentCardTo] = useState({});
  const [currentId, setCurrentId] = useState([]);
  const {accounts, isLoading} = useAccounts();
  const getCard = async () => {
    const acc = await firestore()
      .collection('accounts')
      .where('id', '==', currentId)
      .get()
      .then(querySnapshot => {
        setAccs(querySnapshot.docs);
      });
  };
  const selectCurrentCard = id => {
    setCurrentCardFrom(id);
  };
  useEffect(() => {
    getCard();
    falseLoadCard();
  }, [currentId, loading]);

  return (
    <>
      {isActiveModal ? (
        <PaymentsModal
          transferMoney={transferMoney}
          currentCardFrom={currentCardFrom}
          currentCardTo={currentCardTo}
          setCurrentCardFrom={setCurrentCardFrom}
          setIsActiveModal={setIsActiveModal}
        />
      ) : (
        ''
      )}
      <View>
        <View
          style={{borderBottomWidth: 1, borderBottomColor: 'silver'}}
          className="p-4">
          <Text className="text-black font-medium text-xl">Payments</Text>
        </View>
        <View>
          <View className="px-5">
            <Text className="text-lg">transfer from card</Text>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            snapToAlignment="center"
            sna>
            {cardList.map(item => (
              <Pressable className="w-[360]">
                <CardListPaymentsFrom
                  currentCardFrom={currentCardFrom}
                  setCurrentCardFrom={setCurrentCardFrom}
                  item={item.data()}
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View className="px-5">
          <Text className="text-lg">transfer to card</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal
          className="flex-row mt-3">
          {isLoading ? (
            <Loader />
          ) : (
            accounts?.map(item => (
              <DefaultProfile
                currentId={currentId}
                setCurrentId={setCurrentId}
                getCard={getCard}
                key={item.data().uid}
                item={item.data()}
              />
            ))
          )}
        </ScrollView>

        <View className="mt-2">
          {loading ? (
            <Loader />
          ) : accs.length >= 1 ? (
            <FlatList
              data={accs}
              renderItem={({item}) => (
                <CardListPayments
                  currentCardTo={currentCardTo}
                  setCurrentCardTo={setCurrentCardTo}
                  setIsActiveModal={setIsActiveModal}
                  item={item.data()}
                />
              )}
            />
          ) : (
            <Text className="text-center font-bold mt-2">
              He(she) don't have a card
            </Text>
          )}
        </View>
      </View>
    </>
  );
};
