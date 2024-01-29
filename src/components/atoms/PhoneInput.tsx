import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

import {CountrySelect} from '../index';
import {widthInDp} from '../../utils';
import {ICountryCode} from '../../types';
import {COLORS, FONTS, ICONS} from '../../themes';

export interface ITextInput {
  title?: string;
  onChange: (text: string) => void;
  errormsg?: string;
  placeholder?: string;
  value: string;
}

export const PhoneInput = (props: ITextInput) => {
  const {title, onChange, errormsg, placeholder} = props;
  const [isModal, setIsModal] = useState(false);
  const [num, setNum] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<ICountryCode>(
    __DEV__
      ? {name: 'Pakistan', dial_code: '+92', code: 'PK', flag: '🇵🇰'}
      : {name: 'United States', dial_code: '+1', code: 'US', flag: '🇺🇸'},
  );
  function handleTextChange(code: string, phone: string) {
    onChange(code + phone);
  }

  return (
    <View>
      {title && <Text style={styles.heading}>{title}</Text>}
      <View style={styles.bodyContainer}>
        <TouchableOpacity
          onPress={() => setIsModal(true)}
          style={styles.leftIconButton}>
          <Text style={styles.leftIcon}>
            {selectedCountry.flag} {selectedCountry.dial_code}{' '}
          </Text>
          <ICONS.AntDesign name="caretdown" size={widthInDp(2)} />
        </TouchableOpacity>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={COLORS.darkGray}
          maxLength={11}
          keyboardType="numeric"
          onChangeText={text => {
            setNum(text);
            handleTextChange(selectedCountry.dial_code, text);
          }}
          style={styles.inputField}
        />

        <CountrySelect
          showModal={isModal}
          setShowModal={() => setIsModal(false)}
          setSelectedCountry={(data: ICountryCode) => {
            setSelectedCountry(data);
            handleTextChange(data.dial_code, num);
          }}
        />
      </View>
      {errormsg && <Text style={styles.errorText}>{errormsg}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {fontFamily: FONTS.InterRegular},
  bodyContainer: {
    borderWidth: 0.5,
    flexDirection: 'row',
    borderRadius: widthInDp(2),
  },
  leftIconButton: {
    borderRightWidth: 0.5,
    borderTopLeftRadius: widthInDp(2),
    borderBottomLeftRadius: widthInDp(2),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: widthInDp(1.5),
    backgroundColor: COLORS.lightGray,
  },
  leftIcon: {fontFamily: FONTS.InterRegular},
  inputField: {
    flex: 1,
    color: COLORS.black,
    fontFamily: FONTS.InterRegular,
  },
  errorText: {
    color: COLORS.error,
    marginHorizontal: widthInDp(3),
    fontFamily: FONTS.InterRegular,
  },
});
