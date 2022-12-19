import {View, Text, Pressable, Button, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styled, useColorScheme} from 'nativewind';
import {Field} from './Field';
import {Loader} from './Loader';
import {usePayments} from '../../hooks/usePayments';
export const PaymentsModal = ({
  setIsActiveModal,
  currentCardFrom,
  currentCardTo,
  transferMoney,
  setCurrentCardFrom,
}) => {
  const [selectAmount, setSelectAmount] = useState(0);
  const [access, setAccess] = useState(true);
  const [selectAmountTransition, setSelectAmountTransition] = useState(0);
  const {colorScheme, toggleColorScheme} = useColorScheme();
  // const {transferMoney, isLoading} = usePayments();

  const handlerClose = e => {
    // toggleColorScheme();
    e.preventDefault();
  };
  const handleSend = () => {
    transferMoney(
      currentCardFrom.cardNumber,
      currentCardTo.cardNumber,
      selectAmount,
      selectAmountTransition,
    );
    setIsActiveModal(false);
    setCurrentCardFrom(null);
  };
  const currency = currentCardFrom?.currency == 'dollar' ? 'USD' : 'UAH';
  // const access = accessHandler()
  // console.log(currentCardFrom, currentCardTo);
  const accessHandler = () => {
    if (/[0-9\.]/.test(selectAmount)) {
      setAccess(true);
    }
    selectAmount == 0 || selectAmount > currentCardFrom?.balance
      ? setAccess(true)
      : setAccess(false);
  };
  const handler = e => {
    // transition();
    console.log(selectAmountTransition);
  };
  const transition = () => {
    if (currentCardFrom?.currency == currentCardTo?.currency) {
      setSelectAmountTransition(selectAmount);
    }
    if (
      currentCardFrom?.currency == 'hryvnia' &&
      currentCardTo?.currency == 'dollar'
    ) {
      const sum = (selectAmount / 30).toFixed(2);
      setSelectAmountTransition(sum);
    }

    if (
      currentCardFrom?.currency == 'dollar' &&
      currentCardTo?.currency == 'hryvnia'
    ) {
      const sum = (selectAmount * 30).toFixed(2);

      setSelectAmountTransition(sum);
    }
  };

  useEffect(() => {
    transition();
    accessHandler();
  }, [selectAmount]);

  const style = {};
  // if (isLoading) return <Loader />;
  return (
    <Pressable
      style={{backgroundColor: 'rgba(0,0,0,0.7)'}}
      onPress={() => setIsActiveModal(false)}
      className="absolute w-full h-full justify-center items-center z-50">
      <Pressable
        onPress={handlerClose}
        className="w-8/12 h-[300] bg-slate-800 dark:bg-green-600 bg-opacity-100 rounded-md p-4 justify-between">
        <View>
          <Text className="text-white">available amount:</Text>
          <Text className="text-white">
            {currentCardFrom ? (
              Intl.NumberFormat(undefined, {
                currency,
                style: 'currency',
                // compactDisplay: 'short',
                // notation: 'standard',
              }).format(currentCardFrom.balance)
            ) : (
              <Text>you don't select the card</Text>
            )}
          </Text>
        </View>
        <TextInput
          value={selectAmount}
          keyboardType="numeric"
          onChange={handler}
          onChangeText={setSelectAmount}
          className="w-full bg-white rounded-lg"
        />
        {/* <Field value={selectAmount} onChangeText={setSelectAmount} /> */}
        <View>
          <Text className="text-white">will send:{selectAmountTransition}</Text>
        </View>
        <Button disabled={access} onPress={handleSend} title="Send" />
      </Pressable>
    </Pressable>
  );
};
