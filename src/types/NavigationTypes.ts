import {StackScreenProps} from '@react-navigation/stack';
// import {NavigatorScreenParams} from '@react-navigation/native';

export type AuthStackScreensList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  VerifyOtp: {email: string};
  ResetPassword: {email: string};
  Root: undefined;

  // Base: NavigatorScreenParams<BaseStackScreensList>;
};
export type AuthStackNavigationProp<T extends keyof AuthStackScreensList> =
  StackScreenProps<AuthStackScreensList, T>;

export type RootStackScreensList = {
  Dashboard: undefined;
  Account: undefined;
};
export type RootStackNavigationProp<T extends keyof RootStackScreensList> =
  StackScreenProps<RootStackScreensList, T>;

export type CohortStackScreensList = {
  Cohort: undefined;
  Media: {
    fileType: 'pdf' | 'ppt' | 'video';
    url: string;
  };
};
export type CohortStackNavigagtionProps<
  T extends keyof CohortStackScreensList,
> = StackScreenProps<CohortStackScreensList, T>;

export type BaseStackScreensList = {
  Splash: undefined;
  Auth: undefined;
  Root: undefined;
};
export type BaseStackNavigationProp<T extends keyof BaseStackScreensList> =
  StackScreenProps<BaseStackScreensList, T>;
