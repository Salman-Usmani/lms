import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {UserProvider} from './src/context/UserContext';
import {AuthStack} from './src/navigation';
import {navigationRef} from './src/services/axiosConfig';
import {toastConfig} from './src/utils';

const App: React.FC = () => {
  return (
    <UserProvider>
      <NavigationContainer ref={navigationRef}>
        {/* <StatusBar hidden /> */}
        <AuthStack />
        <Toast position="bottom" bottomOffset={20} config={toastConfig} />
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
