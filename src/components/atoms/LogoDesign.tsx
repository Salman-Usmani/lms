import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {COLORS, FONTS} from '../../themes';
import {heightInDp, widthInDp} from '../../utils';
import {logo} from '../../assets';

export const LogoDesign = () => {
  return (
    <View style={styles.logoContainer}>
      <SvgXml xml={logo} height={heightInDp(15)} style={styles.logoStyle} />
      <Text style={styles.labelStyle}>A Psychology Corporation</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    marginVertical: heightInDp(2.5),
  },
  logoStyle: {alignSelf: 'center', marginVertical: heightInDp(2.5)},
  labelStyle: {
    textAlign: 'center',
    color: COLORS.primary,
    fontFamily: FONTS.InterRegular,
  },
});
