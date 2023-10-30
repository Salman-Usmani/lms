import React, {useState} from 'react';
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
  PhoneInput,
  FloatingTitleTextInputField,
} from '../../components';
import {AuthStackNavigationProp} from '../../types';
import Toast from 'react-native-toast-message';
import {dataServer} from '../../services/axiosConfig';
import {COLORS, FONTS} from '../../themes';
import {heightInDp, widthInDp} from '../../utils';
import {useForm, Controller, Resolver} from 'react-hook-form';
import CheckBox from '@react-native-community/checkbox';
import {CommonActions} from '@react-navigation/native';
import {EMAIL_REGEX} from '../../constants';

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
        text1: error?.response?.data?.errors[0] || 'Registration Failed',
      });
    }
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.mainContainer}>
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
          render={({field: {onChange, onBlur, value}}) => (
            <FloatingTitleTextInputField
              title="Full Name"
              value={value}
              keyboardType={'default'}
              onChange={onChange}
              errorMsg={errors.name && errors.name.message}
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
        <Controller
          control={control}
          rules={{
            required: 'phone number is required',
          }}
          render={({field: {onChange, onBlur, value}}) => (
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
        <Controller
          control={control}
          rules={{
            required: 'required',
            // validate:
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <View style={styles.checkBoxView}>
              <CheckBox
                value={value}
                hideBox={true}
                onChange={() => onChange(!value)}
                tintColor={COLORS.black}
                onCheckColor={COLORS.black}
                onFillColor={COLORS.primary}
                onTintColor={COLORS.black}
              />
              <Text style={{textAlignVertical: 'center'}}>
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
  );
};
export default SignUpScreen;
const styles = StyleSheet.create({
  title: {
    fontSize: heightInDp(5),
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
    // flex: 1,
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
