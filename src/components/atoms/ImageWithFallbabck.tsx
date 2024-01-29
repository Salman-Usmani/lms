import {Image, ImageStyle, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, ICONS} from '../../themes';

const CircleWithAtSign = ({
  name,
  diameter,
}: {
  name: string;
  diameter: number;
}) => (
  <View style={styles(diameter).noAvatarView}>
    <Text style={{...styles().textStyle, fontSize: diameter / 2}}>
      {name[0]}
    </Text>
  </View>
);

export const ImageWithFallbabck = ({
  source,
  name,
  diameter,
  ImageStyle,
}: {
  source: string | undefined;
  name: string;
  diameter: number;
  ImageStyle?: ImageStyle;
}) => {
  const [error, setError] = useState(false);

  return (
    <View>
      {source ? (
        error ? (
          <CircleWithAtSign name={name} diameter={diameter} />
        ) : (
          <Image
            source={{uri: source}}
            style={styles(diameter).avatarStyle}
            onError={() => setError(true)}
          />
        )
      ) : (
        <View style={styles(diameter).noAvatarView}>
          <ICONS.FontAwesome6
            name="user-large"
            size={diameter / 2}
            color={COLORS.white}
          />
        </View>
      )}
    </View>
  );
};

const styles = (diameter = 0) =>
  StyleSheet.create({
    noAvatarView: {
      backgroundColor: COLORS.roleColor,
      borderRadius: diameter,
      width: diameter,
      height: diameter,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarStyle: {width: diameter, height: diameter, borderRadius: diameter},
    textStyle: {
      fontFamily: FONTS.InterRegular,
      textTransform: 'uppercase',
      color: COLORS.white,
    },
  });
