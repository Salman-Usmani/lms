import React from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {SvgXml} from 'react-native-svg';
import {IButton} from '../../types';
import {COLORS, FONTS} from '../../themes';
import {heightInDp, widthInDp} from '../../utils';

export const Button = (props: IButton) => {
  const {title, background, handlePress, loading, svg, containerStyle} = props;

  return (
    <TouchableOpacity onPress={handlePress} disabled={loading}>
      <View
        style={[
          {
            ...styles.btnInnerView,
            backgroundColor: background ? COLORS.primary : COLORS.disable,
          },
          containerStyle,
        ]}>
        {svg ? (
          <SvgXml
            xml={svg}
            width={widthInDp(7)}
            height={widthInDp(7)}
            style={styles.svgStyle}
          />
        ) : null}

        {loading ? (
          <ActivityIndicator
            size={'small'}
            color={background ? COLORS.white : COLORS.darkGray}
          />
        ) : (
          <Text
            style={[
              styles.btnText,
              {color: background ? COLORS.white : COLORS.primary},
            ]}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnInnerView: {
    borderRadius: widthInDp(10),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: heightInDp(1),
    marginVertical: heightInDp(1),
  },
  btnText: {
    fontSize: widthInDp(6),
    fontFamily: FONTS.Inter,
    // color: colors.darkBlue,
  },
  svgStyle: {marginRight: widthInDp(5)},
});
