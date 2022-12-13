import {Alert} from 'react-native';

// export const AsyncAlert = newP ({title, msg, buttons}) => {
//   Alert.alert(
//     title,
//     msg,
//     [
//       {
//         text: buttons.text,
//         onPress: () => {
//           return new Promise(buttons.resolveValue);
//         },
//       },
//       {
//         text: buttons.secondText,
//         onPress: () => new Response(buttons.resolveSecondValue),
//       },
//     ],
//     {
//       cancelable: false,
//     },
//   );
// };

export const AsyncAlert = ({title, msg, buttons}) =>
  new Promise((resolve, reject) => {
    Alert.alert(title, msg, [
      {
        text: buttons.text,
        onPress: () => resolve(buttons.resolveValue),
      },
      {
        text: buttons.secondText,
        onPress: () => resolve(buttons.resolveSecondValue),
      },
    ]);
  });
