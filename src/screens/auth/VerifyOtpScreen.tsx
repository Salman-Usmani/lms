import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {heightInDp, widthInDp} from '../../utils';
import {AuthStackNavigationProp} from '../../types';
import {Controller, useForm} from 'react-hook-form';
import {COLORS, FONTS} from '../../themes';
import {dataServer} from '../../services/axiosConfig';
import Toast from 'react-native-toast-message';
import {
  Button,
  LogoDesign,
  FloatingTitleTextInputField,
} from '../../components';

type TforgotPasswordForm = {
  email: string;
  otp: string;
};

const VerifyOtpScreen = ({
  navigation,
  route,
}: AuthStackNavigationProp<'VerifyOtp'>) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<TforgotPasswordForm>();
  const [isLoading, setLoading] = useState(false);

  async function handleForgotPassword(data: TforgotPasswordForm) {
    try {
      setLoading(true);
      const verifyOtpApi = await dataServer.post('user/verify-otp', data);

      if (verifyOtpApi.status === 200) {
        Toast.show({
          type: 'success',
          text1: verifyOtpApi.data.message,
        });
        navigation.navigate('ResetPassword', {email: data.email});
      }
    } catch (error: any) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: Array.isArray(error?.response?.data?.errors)
          ? error?.response?.data?.errors[0]
          : error?.response?.data.message
            ? error?.response?.data.message
            : error.response?.data || 'failed to verify otp',
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
      <LogoDesign />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Verify OTP Code</Text>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{
              required: 'OTP is required',
            }}
            render={({field: {onChange, value}}) => (
              <FloatingTitleTextInputField
                title="Enter OTP Code"
                value={value}
                keyboardType={'numeric'}
                onChange={onChange}
                errorMsg={errors?.otp?.message}
                otp={true}
              />
            )}
            name={'otp'}
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

export default VerifyOtpScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: widthInDp(5),
    backgroundColor: COLORS.white,
  },
  innerContainer: {flex: 1, justifyContent: 'center'},

  title: {
    fontSize: heightInDp(5),
    fontFamily: FONTS.InterSemiBold,
  },

  inputContainer: {
    width: '100%',
    alignSelf: 'center',
    marginVertical: heightInDp(2.5),
    rowGap: heightInDp(2.5),
  },
});
