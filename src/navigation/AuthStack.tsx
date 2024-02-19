import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  ForgotPasswordScreen,
  ResetPasswordScreen,
  SignInScreen,
  SignUpScreen,
  SplashScreen,
  VerifyOtpScreen,
} from '../screens';
import {AuthStackScreensList} from '../types';
import RootStack from './RootStack';
// import {roboto} from '../../assets/fonts';

const Stack = createStackNavigator<AuthStackScreensList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Splash'}
      screenOptions={{
        headerShown: false,
        // headerStyle: {
        //   backgroundColor: COLORS.primary,
        // },
        // headerTitleStyle: {
        //   //   fontFamily: roboto,
        // },
        // headerTitleAlign: 'center',
        // headerTintColor: COLORS.white,
        // headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="Root" component={RootStack} />
    </Stack.Navigator>
  );
};
export default AuthStack;
