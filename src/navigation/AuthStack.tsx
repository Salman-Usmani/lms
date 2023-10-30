import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  ForgotPasswordScreen,
  SignInScreen,
  SignUpScreen,
  VerifyOtpScreen,
  ResetPasswordScreen,
  SplashScreen,
} from '../screens';
import {AuthStackScreensList} from '../types';
import {COLORS} from '../themes';
import RootStack from './RootStack';
// import {roboto} from '../../assets/fonts';

const Stack = createStackNavigator<AuthStackScreensList>();

const AuthStack = () => {
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
        name="SignIn"
        component={SignInScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: true, headerLeft: () => null}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="VerifyOtp"
        component={VerifyOtpScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{headerShown: true, headerLeft: () => null}}
      />
      <Stack.Screen
        name="Root"
        component={RootStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default AuthStack;
