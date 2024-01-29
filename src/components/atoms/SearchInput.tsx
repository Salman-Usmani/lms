import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {COLORS, FONTS, ICONS} from '../../themes';
import {widthInDp} from '../../utils';

export interface ITextInput {
  onChange: (text: string) => void;
  value: string;
}

export const SearchInput = (props: ITextInput) => {
  const {onChange, value} = props;

  return (
    <View style={styles.bodyContainer}>
      <View style={styles.iconStyle}>
        <ICONS.Feather
          name="search"
          size={widthInDp(7)}
          color={COLORS.iconColor}
        />
      </View>
      <TextInput
        placeholder={'Search'}
        placeholderTextColor={COLORS.iconColor}
        value={value}
        onChangeText={onChange}
        style={styles.inputField}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    flexDirection: 'row',
    borderRadius: widthInDp(2),
    backgroundColor: COLORS.disable,
  },

  inputField: {
    flex: 1,
    color: COLORS.black,
    fontFamily: FONTS.InterRegular,
  },

  iconStyle: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
