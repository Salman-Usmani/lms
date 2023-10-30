import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {SplashScreen} from '../screens';
import {BaseStackScreensList} from '../types';
import {COLORS} from '../themes';
import RootStack from './RootStack';
import AuthStack from './AuthStack';
// import {roboto} from '../../assets/fonts';

const Stack = createStackNavigator<BaseStackScreensList>();

const BaseStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Splash'}
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTitleStyle: {
          //   fontFamily: roboto,
        },
        headerTitleAlign: 'center',
        headerTintColor: COLORS.white,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Auth"
        component={AuthStack}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Root"
        component={RootStack}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};
export default BaseStack;
