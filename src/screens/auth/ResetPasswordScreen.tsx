import {CommonActions} from '@react-navigation/native';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
    formState: {errors},
  } = useForm<TRegisterForm>({
    defaultValues: {
      email: route.params.email,
    },
  });

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

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <LogoDesign />
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Verify OTP Code</Text>

          <FloatingTitleTextInputField
            title="Password"
            keyboardType={'default'}
            isPassword={true}
            errorMsg={errors?.password?.message}
            name={'password'}
            control={control}
          />

          <FloatingTitleTextInputField
            title="Confirm Password"
            keyboardType={'default'}
            isPassword={true}
            errorMsg={errors?.confirmPassword?.message}
            matchPassword={watch('password')}
            name={'confirmPassword'}
            control={control}
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
  contentContainerStyle: {marginBottom: heightInDp(5)},

  title: {
    fontSize: heightInDp(5),
    fontFamily: FONTS.InterSemiBold,
  },

  mainContainer: {
    flex: 1,
    paddingHorizontal: widthInDp(5),
    backgroundColor: COLORS.white,
  },

  inputContainer: {
    width: '100%',
    alignSelf: 'center',
    marginVertical: heightInDp(2.5),
    rowGap: heightInDp(2.5),
  },
});
