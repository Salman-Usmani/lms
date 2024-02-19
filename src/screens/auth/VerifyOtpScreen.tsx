import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
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
import {dataServer} from '../../services/axiosConfig';
import {COLORS, FONTS} from '../../themes';
import {AuthStackNavigationProp} from '../../types';
import {heightInDp, widthInDp} from '../../utils';

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
    formState: {errors},
  } = useForm<TforgotPasswordForm>({
    defaultValues: {
      email: route.params.email,
    },
  });
  const [isLoading, setLoading] = useState(false);

  async function handleOtpVerification(data: TforgotPasswordForm) {
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

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <LogoDesign />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Verify OTP Code</Text>
        <View style={styles.inputContainer}>
          <FloatingTitleTextInputField
            title="Enter OTP Code"
            keyboardType={'numeric'}
            errorMsg={errors?.otp?.message}
            otp={true}
            control={control}
            name={'otp'}
          />
        </View>
        <Button
          title={'Continue'}
          handlePress={handleSubmit(handleOtpVerification)}
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
