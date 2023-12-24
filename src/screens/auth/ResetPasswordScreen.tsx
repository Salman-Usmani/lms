import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {
  Button,
  LogoDesign,
  FloatingTitleTextInputField,
} from '../../components';
import {AuthStackNavigationProp} from '../../types';
import Toast from 'react-native-toast-message';
import {dataServer} from '../../services/axiosConfig';
import {COLORS, FONTS} from '../../themes';
import {heightInDp, widthInDp} from '../../utils';
import {useForm, Controller} from 'react-hook-form';
import {CommonActions} from '@react-navigation/native';

type TRegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

const ResetPasswordScreen = ({
  navigation,
  route,
}: AuthStackNavigationProp<'ResetPassword'>) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: {errors},
  } = useForm<TRegisterForm>();

  const [isLoading, setLoading] = useState(false);

  async function handlePasswordReset(data: TRegisterForm) {
    try {
      setLoading(true);
      const passwordResetApi = await dataServer.post(
        'user/password/reset',
        data,
      );

      if (passwordResetApi.status === 200) {
        Toast.show({type: 'success', text2: passwordResetApi.data.message});
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'SignIn'}],
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
            : error.response?.data || 'failed to reset password',
      });
    }
  }
  useEffect(() => {
    try {
      setValue('email', route.params.email);
    } catch (error) {
      console.log(error);
    }
  }, [route.params]);
  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginBottom: heightInDp(5)}}>
        <LogoDesign />
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Verify OTP Code</Text>
          <Controller
            control={control}
            rules={{
              required: 'password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
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

          <Controller
            control={control}
            rules={{
              required: 'confirm password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
              validate: value =>
                value === watch('password') || 'Passwords do not match',
              // validate:
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <FloatingTitleTextInputField
                title="Confirm Password"
                value={value}
                keyboardType={'default'}
                onChange={onChange}
                isPassword={true}
                errorMsg={
                  errors.confirmPassword && errors.confirmPassword.message
                }
              />
            )}
            name={'confirmPassword'}
          />
        </View>

        <Button
          title="Reset"
          handlePress={handleSubmit(handlePasswordReset)}
          background={false}
          loading={isLoading}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default ResetPasswordScreen;
const styles = StyleSheet.create({
  title: {
    fontSize: heightInDp(5),
    fontFamily: FONTS.Inter,
  },
  noAccountStyle: {
    color: COLORS.darkGray,
  },
  register: {
    color: COLORS.primary,
  },
  forgetPass: {
    color: COLORS.primary,
    fontSize: widthInDp(5),
  },

  mainContainer: {
    flex: 1,
    paddingHorizontal: widthInDp(5),
    backgroundColor: COLORS.white,
  },
  termsContainer: {flexDirection: 'row', paddingHorizontal: widthInDp(2)},
  forgotText: {
    textAlign: 'right',
    paddingHorizontal: widthInDp(5),
    color: COLORS.black,
  },
  registerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: heightInDp(3),
  },
  logoSvg: {
    alignSelf: 'center',
  },
  inputContainer: {
    width: '100%',
    alignSelf: 'center',
    marginVertical: heightInDp(2.5),
    rowGap: heightInDp(2.5),
  },
  linkText: {
    color: COLORS.primary,
    // borderBottomWidth: 1,
    borderBottomColor: 'blue',
  },
  btnText: {
    color: COLORS.primary,
  },
  textLogo: {
    marginBottom: heightInDp(3),
    fontFamily: FONTS.OpenSan,
    fontSize: heightInDp(7),
    textAlign: 'center',
    color: COLORS.primary,
  },
  blackText: {color: COLORS.darkGray},
  btnView: {marginBottom: heightInDp(10)},
  checkBoxView: {flexDirection: 'row'},
});
