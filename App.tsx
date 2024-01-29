import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {UserProvider} from './src/context/UserContext';
import {AuthStack} from './src/navigation';
import {navigationRef} from './src/services/axiosConfig';
import {COLORS} from './src/themes';
import {toastConfig} from './src/utils';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <UserProvider>
        <NavigationContainer ref={navigationRef}>
          {/* <StatusBar hidden /> */}
          <AuthStack />
          <Toast position="bottom" bottomOffset={20} config={toastConfig} />
        </NavigationContainer>
      </UserProvider>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
