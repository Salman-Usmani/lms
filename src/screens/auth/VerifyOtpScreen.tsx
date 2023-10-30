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
import {COLORS} from '../../themes';
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
    console.log(data);
    try {
      setLoading(true);
      const verifyOtpApi = await dataServer.post('user/verify-otp', data);

      if (verifyOtpApi.status === 200) {
        Toast.show({
          type: 'success',
          text1: verifyOtpApi.data.message,
        });
        navigation.navigate('ResetPassword', {email: data.email});
        // navigation.dispatch(
        //   CommonActions.reset({
        //     index: 1,
        //     routes: [{name: 'SignIn'}],
        //   }),
        // );
      }
    } catch (error: any) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.errors[0] || 'Login Failed',
      });
      console.log('error on signin', error);
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
      <View style={{flex: 1, justifyContent: 'center'}}>
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
                errorMsg={errors.otp && errors.otp.message}
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
  logoStyle: {
    alignSelf: 'center',
    marginVertical: heightInDp(2.5),
  },
  title: {
    fontSize: heightInDp(5),
  },
  noAccountStyle: {
    color: COLORS.darkGray,
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
  },
});
