import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {COLORS} from '../../themes';
import {heightInDp, widthInDp} from '../../utils';
import {logo} from '../../assets';

export const LogoDesign = () => {
  return (
    <View
      style={{
        // justifyContent: 'center',
        marginVertical: heightInDp(2.5),
      }}>
      <SvgXml xml={logo} height={heightInDp(15)} style={styles.logoStyle} />
      <Text style={styles.labelStyle}>A Psychology Corporation</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoStyle: {alignSelf: 'center', marginVertical: heightInDp(2.5)},
  labelStyle: {textAlign: 'center', color: COLORS.primary},
});
