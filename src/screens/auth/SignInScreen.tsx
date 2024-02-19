import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {
  Button,
  FloatingTitleTextInputField,
  LogoDesign,
} from '../../components';
import {useUserContext} from '../../context/UserContext';
import {dataServer} from '../../services/axiosConfig';
import {COLORS, FONTS, ICONS} from '../../themes';
import {AuthStackNavigationProp} from '../../types';
import {heightInDp, widthInDp} from '../../utils';

type TLoginForm = {
  email: string;
  password: string;
};

const SignInScreen = ({navigation}: AuthStackNavigationProp<'SignIn'>) => {
  const {setUser, setToken} = useUserContext();
  const [isLoading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<TLoginForm>({
    defaultValues: {
      // email: __DEV__ ? 'info.user.users@gmail.com' : '',
      email: __DEV__ ? 'iamosmanraza@gmail.com' : '',
      password: __DEV__ ? 'Usman@12345' : '',
    },
  });

  async function handleSignIn(data: TLoginForm) {
    try {
      setLoading(true);
      const loginApi = await dataServer.post('auth/login', data);
      if (loginApi.status === 200) {
        await AsyncStorage.setItem(
          'accessToken',
          JSON.stringify(loginApi.data.data.accessToken),
        );
        await AsyncStorage.setItem(
          'userData',
          JSON.stringify(loginApi.data.data.user),
        );
        console.log(loginApi.data.data.user);
        setUser(loginApi.data.data.user);
        setToken(loginApi.data.data.accessToken);
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
      setLoading(false);
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
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
          <FloatingTitleTextInputField
            title="Email"
            keyboardType={'email-address'}
            errorMsg={errors?.email?.message}
            name={'email'}
            control={control}
          />

          <FloatingTitleTextInputField
            title="Password"
            control={control}
            keyboardType={'default'}
            isPassword={true}
            errorMsg={errors?.password?.message}
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
          title={'Login'}
          handlePress={handleSubmit(handleSignIn)}
          background={true}
          loading={isLoading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: widthInDp(5),
    backgroundColor: COLORS.white,
  },
  register: {color: COLORS.primary},
  forgetPassView: {marginBottom: heightInDp(1.5)},
  title: {fontSize: heightInDp(5), fontFamily: FONTS.InterSemiBold},
  noAccountStyle: {color: COLORS.darkGray, fontFamily: FONTS.InterRegular},
  inputContainer: {
    width: '100%',
    alignSelf: 'center',
    marginVertical: heightInDp(2.5),
    rowGap: heightInDp(1.5),
  },
  forgetPass: {
    color: COLORS.primary,
    fontSize: widthInDp(4.5),
    fontFamily: FONTS.InterRegular,
  },
});
