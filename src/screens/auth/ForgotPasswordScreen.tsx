import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {
  Button,
  FloatingTitleTextInputField,
  LogoDesign,
} from '../../components';
import {EMAIL_REGEX} from '../../constants';
import {dataServer} from '../../services/axiosConfig';
import {COLORS, FONTS} from '../../themes';
import {AuthStackNavigationProp} from '../../types';
import {heightInDp, widthInDp} from '../../utils';

type TforgotPasswordForm = {
  email: string;
};

const ForgotPasswordScreen = ({
  navigation,
}: AuthStackNavigationProp<'ForgotPassword'>) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<TforgotPasswordForm>();
  const [isLoading, setLoading] = useState(false);

  async function handleForgotPassword(data: TforgotPasswordForm) {
    try {
      setLoading(true);
      const forgotPasswordApi = await dataServer.post('user/password', data);

      if (forgotPasswordApi.status === 200) {
        setLoading(false);
        Toast.show({
          type: 'success',
          text1: forgotPasswordApi.data.message,
        });
        navigation.navigate('VerifyOtp', data);
      }
    } catch (error: any) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: Array.isArray(error?.response?.data?.errors)
          ? error?.response?.data?.errors[0]
          : error?.response?.data.message
            ? error?.response?.data.message
            : error.response?.data || 'failed to verify email',
      });
    }
  }
  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <LogoDesign />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Forgot Password</Text>
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
            render={({field: {onChange, onBlur, value}}) => (
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
        </View>
        <Button
          title={'Continue'}
          handlePress={handleSubmit(handleForgotPassword)}
          background={true}
          loading={isLoading}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: widthInDp(5),
    backgroundColor: COLORS.white,
  },
  innerContainer: {flex: 1, justifyContent: 'center'},

  title: {
    fontSize: heightInDp(5),
    fontFamily: FONTS.Inter,
  },
  noAccountStyle: {
    color: COLORS.darkGray,
    fontFamily: FONTS.Inter,
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
});
