import {CommonActions} from '@react-navigation/native';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Checkbox} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {
  Button,
  FloatingTitleTextInputField,
  LogoDesign,
  PhoneInput,
} from '../../components';
import {EMAIL_REGEX} from '../../constants';
import {dataServer} from '../../services/axiosConfig';
import {COLORS, FONTS} from '../../themes';
import {AuthStackNavigationProp} from '../../types';
import {heightInDp, widthInDp} from '../../utils';

type TRegisterForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNo: string;
  termsAccepted: boolean;
};

const SignUpScreen = ({navigation}: AuthStackNavigationProp<'SignUp'>) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<TRegisterForm>();

  const [isLoading, setLoading] = useState(false);

  async function handleSignUp(data: TRegisterForm) {
    try {
      setLoading(true);
      const signUpApi = await dataServer.post('auth/register', data);
      if (signUpApi.status === 200) {
        Toast.show({type: 'success', text2: signUpApi.data.message});
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
            : error.response?.data || 'failed to register user',
      });
    }
  }
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LogoDesign />
        <Text style={styles.title}>Register</Text>
        <Text style={styles.noAccountStyle}>
          Already have an Account ?{' '}
          <Text
            onPress={() => navigation.navigate('SignIn')}
            style={styles.register}>
            Log in
          </Text>
        </Text>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{
              required: 'Full name is required',
            }}
            render={({field: {onChange, value}}) => (
              <FloatingTitleTextInputField
                title="Full Name"
                value={value}
                keyboardType={'default'}
                onChange={onChange}
                errorMsg={errors?.name?.message}
              />
            )}
            name={'name'}
          />
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
                errorMsg={errors?.email?.message}
              />
            )}
            name={'email'}
          />
          <Controller
            control={control}
            rules={{
              required: 'phone number is required',
            }}
            render={({field: {onChange, value}}) => (
              <PhoneInput
                title=""
                onChange={onChange}
                value={value}
                errormsg={errors.phoneNo && errors.phoneNo.message}
              />
            )}
            name={'phoneNo'}
          />
          <Controller
            control={control}
            rules={{
              required: 'password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            }}
            render={({field: {onChange, value}}) => (
              <FloatingTitleTextInputField
                title="Password"
                value={value}
                keyboardType={'default'}
                isPassword={true}
                onChange={onChange}
                errorMsg={errors?.password?.message}
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
            }}
            render={({field: {onChange, value}}) => (
              <FloatingTitleTextInputField
                title="Confirm Password"
                value={value}
                keyboardType={'default'}
                onChange={onChange}
                isPassword={true}
                errorMsg={errors?.confirmPassword?.message}
              />
            )}
            name={'confirmPassword'}
          />
          <Controller
            control={control}
            rules={{
              required: 'required',
            }}
            render={({field: {onChange, value}}) => (
              <View style={styles.checkBoxView}>
                <Checkbox
                  status={value ? 'checked' : 'unchecked'}
                  onPress={() => onChange(!value)}
                  color={COLORS.primary}
                  uncheckedColor={COLORS.darkGray}
                />
                <Text style={styles.termsAccept}>
                  I accept the terms and conditions
                </Text>
              </View>
            )}
            name={'termsAccepted'}
          />
        </View>

        <Button
          title="Sign Up"
          handlePress={handleSubmit(handleSignUp)}
          background={false}
          loading={isLoading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignUpScreen;
const styles = StyleSheet.create({
  title: {fontSize: heightInDp(5), fontFamily: FONTS.InterSemiBold},
  noAccountStyle: {color: COLORS.darkGray, fontFamily: FONTS.InterRegular},
  register: {color: COLORS.primary},
  checkBoxView: {flexDirection: 'row'},
  mainContainer: {
    paddingHorizontal: widthInDp(5),
    backgroundColor: COLORS.white,
  },
  inputContainer: {
    width: '100%',
    alignSelf: 'center',
    marginTop: heightInDp(2.5),
    marginBottom: heightInDp(1.5),
    rowGap: heightInDp(1.5),
  },
  termsAccept: {
    textAlignVertical: 'center',
    fontFamily: FONTS.InterRegular,
  },
});
