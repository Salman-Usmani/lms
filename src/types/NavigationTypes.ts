import {StackScreenProps} from '@react-navigation/stack';
import {IGroups} from './Interface';
// import {NavigatorScreenParams} from '@react-navigation/native';

export type AuthStackScreensList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  VerifyOtp: {email: string};
  ResetPassword: {email: string};
  Root: undefined;
};
export type AuthStackNavigationProp<T extends keyof AuthStackScreensList> =
  StackScreenProps<AuthStackScreensList, T>;

export type RootStackScreensList = {
  Dashboard: undefined;
  Account: undefined;
  Group: undefined;
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

export type GroupStackScreensList = {
  GroupScreen: undefined;
  GroupDetailsScreen: IGroups;
  Media: {
    fileType: 'pdf' | 'ppt' | 'video';
    url: string;
  };
};
export type GroupStackNavigagtionProps<T extends keyof GroupStackScreensList> =
  StackScreenProps<GroupStackScreensList, T>;
