import React from 'react';
import {Control, Controller} from 'react-hook-form';
import {KeyboardType, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {EMAIL_REGEX} from '../../constants';
import {COLORS, FONTS, THEME_COLORS} from '../../themes';
import {widthInDp} from '../../utils';

interface IfloatInput {
  title: string;
  keyboardType?: KeyboardType;
  errorMsg?: string;
  isPassword?: boolean;
  otp?: boolean;
  control: Control<any>;
  name: string;
  disabled?: boolean;
  matchPassword?: string;
}

export const FloatingTitleTextInputField = ({
  title,
  keyboardType,
  errorMsg,
  isPassword,
  otp,
  control,
  name,
  disabled,
  matchPassword,
}: IfloatInput) => {
  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: `${title} is required`,
          pattern: {
            value: name === 'email' ? EMAIL_REGEX : /.*/,
            message: `${title} is not valid`,
          },
          minLength: {
            value: name === 'password' ? 6 : 0,
            message: `${title} must be at least 6 characters`,
          },
          validate: value => {
            if (matchPassword && value !== matchPassword) {
              return 'Passwords do not match';
            } else return true;
          },
        }}
        render={({field: {onChange, value}}) => (
          <TextInput
            label={title}
            value={value}
            dense
            onChangeText={onChange}
            underlineStyle={Styles.underlineStyle}
            secureTextEntry={isPassword}
            keyboardType={keyboardType}
            maxLength={otp ? 4 : undefined}
            error={errorMsg ? true : false}
            disabled={disabled}
            theme={THEME_COLORS}
            activeOutlineColor={COLORS.primary}
            style={{
              ...Styles.textInput,
              borderColor: errorMsg ? COLORS.error : undefined,
            }}
          />
        )}
        name={name}
      />
      {errorMsg && <Text style={Styles.errorText}>{errorMsg}</Text>}
    </View>
  );
};

const Styles = StyleSheet.create({
  textInput: {
    backgroundColor: COLORS.white,
    borderWidth: 0.5,
    fontFamily: FONTS.InterRegular,
    borderRadius: widthInDp(2),
    borderTopLeftRadius: widthInDp(2),
    borderTopRightRadius: widthInDp(2),
  },
  errorText: {
    color: COLORS.error,
    marginHorizontal: widthInDp(3),
    fontFamily: FONTS.InterRegular,
  },
  underlineStyle: {height: 0},
});
