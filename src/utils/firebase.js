import auth from '@react-native-firebase/auth';
export const register = (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password);
};
export const login = (email, password) => {
  auth().signInWithEmailAndPassword(email, password);
};
export const logout = () => {
  auth().signOut();
};
