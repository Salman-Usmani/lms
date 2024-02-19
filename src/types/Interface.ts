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
export interface IGroupMember {
  member: {
    _id: string;
    name: string;
    email: string;
    phoneNo: string;
    role: string;
    country: string;
    state: string;
    avatar: string;
  };
  canPost: boolean;
  canComment: boolean;
  createdAt: string;
  _id: string;
}
export interface IGroups {
  moderatorSettings: {
    moderator: {
      _id: string;
      name: string;
      email: string;
      phoneNo: string;
      role: string;
    };
    canModifyClients: boolean;
    canDeletePost: boolean;
    canCreatePost: boolean;
  };
  _id: string;
  name: string;
  avatar: string;
  description: string;
  isModerated: boolean;
  groupOwners: {
    _id: string;
    name: string;
    email: string;
    phoneNo: string;
    role: string;
    avatar: string;
    country: string;
    state: string;
  };
  groupMembers: [IGroupMember];
  createdAt: Date;
  updatedAt: string;
}
export type IMedia =
  | {
      uri: string | undefined | null;
      type: string | undefined | null;
      name: string | undefined | null;
    }
  | undefined
  | null;
