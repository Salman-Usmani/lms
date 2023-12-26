import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import React, {useEffect, useState} from 'react';
import {
  Button,
  LogoDesign,
  FloatingTitleTextInputField,
} from '../../components';
import {heightInDp, widthInDp} from '../../utils';
import {COLORS, FONTS, ICONS} from '../../themes';
import {AuthStackNavigationProp} from '../../types';
import {dataServer} from '../../services/axiosConfig';
import {CommonActions} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {EMAIL_REGEX} from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUserContext} from '../../context/UserContext';

type TLoginForm = {
  email: string;
  password: string;
};

const SignInScreen = ({navigation}: AuthStackNavigationProp<'SignIn'>) => {
  const {setUser} = useUserContext();
  const [isLoading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<TLoginForm>();

  // useEffect(() => {
  //   setValue('email', 'iamosmanraza@gmail.com');
  //   setValue('password', 'Usman@12345');
  // }, []);
  async function handleSignIn(data: TLoginForm) {
    try {
      setLoading(true);
      const loginApi = await dataServer.post('auth/login', data);
      setLoading(false);
      if (loginApi.status === 200) {
        await AsyncStorage.setItem(
          'accessToken',
          JSON.stringify(loginApi.data.data.accessToken),
        );
        await AsyncStorage.setItem(
          'userData',
          JSON.stringify(loginApi.data.data.user),
        );
        setUser(loginApi.data.data.user);
        Toast.show({
          type: 'success',
          text1: loginApi.data.message,
        });
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'Root'}],
          }),
        );
      }
    } catch (error: any) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: Array.isArray(error?.response?.data?.errors)
          ? error?.response?.data?.errors[0]
          : error?.response?.data.message
            ? error?.response?.data.message
            : error.response?.data || 'failed to login user',
      });
    }
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.mainContainer}>
      <LogoDesign />
      <Text style={styles.title}>Login</Text>
      <Text style={styles.noAccountStyle}>
        Don't have an account ?{' '}
        <Text
          onPress={() => navigation.navigate('SignUp')}
          style={styles.register}>
          Register
        </Text>
      </Text>

      <View style={styles.inputContainer}>
        <Controller
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {value: EMAIL_REGEX, message: 'Email is not valid'},
          }}
          render={({field: {onChange, value}}) => (
            <FloatingTitleTextInputField
              title="Email"
              value={value}
              keyboardType={'email-address'}
              onChange={onChange}
              errorMsg={errors.email && errors.email.message}
            />
          )}
          name={'email'}
        />

        <Controller
          control={control}
          rules={{
            required: 'password is required',
          }}
          render={({field: {onChange, value}}) => (
            <FloatingTitleTextInputField
              title="Password"
              value={value}
              keyboardType={'default'}
              isPassword={true}
              onChange={onChange}
              errorMsg={errors.password && errors.password.message}
            />
          )}
          name={'password'}
        />
      </View>

      <TouchableOpacity
        style={styles.forgetPassView}
        onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgetPass}>
          <ICONS.Feather name="info" size={widthInDp(5)} /> Forgot Password
        </Text>
      </TouchableOpacity>
      <Button
        title={'Continue'}
        handlePress={handleSubmit(handleSignIn)}
        background={true}
        loading={isLoading}
      />
    </ScrollView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    paddingHorizontal: widthInDp(5),
    backgroundColor: COLORS.white,
  },
  logoStyle: {
    alignSelf: 'center',
    marginVertical: heightInDp(2.5),
  },
  title: {
    fontSize: heightInDp(5),
    fontFamily: FONTS.InterRegular,
  },
  noAccountStyle: {
    color: COLORS.darkGray,
    fontFamily: FONTS.InterRegular,
  },
  register: {
    color: COLORS.primary,
  },
  inputContainer: {
    width: '100%',
    alignSelf: 'center',
    marginVertical: heightInDp(2.5),
    rowGap: heightInDp(2.5),
  },
  forgetPassView: {marginVertical: heightInDp(2.5)},
  forgetPass: {
    color: COLORS.primary,
    fontSize: widthInDp(5),
    fontFamily: FONTS.InterRegular,
  },
});
