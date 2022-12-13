import React from 'react';
import {Navigation} from './src/components/navigation/Navigation';
import {AuthProvider} from './src/providers/AuthProvider';

import './fontAwesomeLibrary';
import {LogBox} from 'react-native';

const App = () => {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
};
LogBox.ignoreAllLogs();
export default App;
