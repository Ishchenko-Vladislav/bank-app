export const getRandomCardNumber = () => {
  let cardNumber = '';
  for (let i = 0; i < 4; i++) {
    const number = Math.floor(1000 + Math.random() * 9000);
    if (i !== 0) cardNumber += ' ';
    cardNumber += number;
  }

  return cardNumber;
};
