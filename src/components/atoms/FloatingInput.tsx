import React from 'react';
import {KeyboardType, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {COLORS, FONTS} from '../../themes';
import {widthInDp} from '../../utils';

interface IfloatInput {
  title: string;
  value?: string;
  keyboardType?: KeyboardType;
  onChange?: (text: string) => void;
  errorMsg?: string;
  isPassword?: boolean;
  otp?: boolean;
}

export const FloatingTitleTextInputField = ({
  title,
  value,
  keyboardType,
  onChange,
  errorMsg,
  isPassword,
  otp,
}: IfloatInput) => {
  return (
    <View>
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
        disabled={!onChange && true}
        theme={{
          colors: {
            primary: COLORS.primary,
            error: COLORS.error,
            secondary: COLORS.secondary,
          },
        }}
        activeOutlineColor={COLORS.primary}
        style={{
          ...Styles.textInput,
          borderColor: errorMsg ? COLORS.error : undefined,
        }}
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
