import {ControllerProps, FieldPath, FieldValues} from 'react-hook-form';
import {ViewStyle} from 'react-native';

export interface IButton {
  title: string;
  background: boolean;
  handlePress: () => void;
  loading?: boolean;
  svg?: string;
  containerStyle?: ViewStyle;
}
export interface ITextInput {
  title?: string;
  onChangeValue: (text: string) => void;
  onBlur?: () => void;
  value?: string;
  onIconPress?: Function;
  errormsg?: string;
  isPassword: boolean;
  icon?: string;
  placeholder?: string;
  name: string;
  Controller: <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  >(
    props: ControllerProps<TFieldValues, TName>,
  ) => import('react').ReactElement<
    any,
    string | import('react').JSXElementConstructor<any>
  >;
}

export interface ICountryCode {
  name: string;
  dial_code: string;
  code: string;
  flag?: string;
}

export interface ICountrySelect {
  showModal: boolean;
  setShowModal: Function;
  setSelectedCountry: Function;
}

export interface UserData {
  _id: string;
  avatar: string;
  canDownloadGlobal: boolean;
  canDownloadPdfs: boolean;
  canDownloadPpts: boolean;
  canDownloadVimeosVideos: boolean;
  country: string;
  email: string;
  isAdminApproved: boolean;
  name: string;
  phoneNo: string;
  role: string;
  state: string;
}
