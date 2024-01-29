import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Divider, Menu, PaperProvider} from 'react-native-paper';
import {COLORS, FONTS, ICONS} from '../../themes';
import {heightInDp, widthInDp} from '../../utils';
import {ImageWithFallbabck} from '../atoms/ImageWithFallbabck';

export const MenuContainer = ({
  uri,
  name,
  handleSignOut,
}: {
  uri: string;
  name: string;
  handleSignOut: () => void;
}) => {
  const [visible, setVisible] = useState(true);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <PaperProvider>
      <Menu
        visible={visible}
        contentStyle={styles.contentStyle}
        onDismiss={closeMenu}
        theme={{
          colors: {
            primary: COLORS.primary,
            text: COLORS.black,
            secondary: COLORS.secondary,
          },
        }}
        style={styles.menuStyle}
        anchor={
          <TouchableOpacity onPress={openMenu} style={styles.icon}>
            <ImageWithFallbabck
              source={uri}
              name={name}
              diameter={widthInDp(10)}
            />
          </TouchableOpacity>
        }>
        <Menu.Item
          title="Account"
          titleStyle={{...styles.textStyle, fontFamily: FONTS.InterSemiBold}}
          style={styles.itemStyle}
        />
        <Menu.Item
          title={name}
          titleStyle={styles.textStyle}
          style={styles.itemStyle}
        />
        <Divider />
        <Menu.Item
          onPress={handleSignOut}
          title="Sign Out"
          titleStyle={styles.textStyle}
        />
      </Menu>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  contentStyle: {backgroundColor: COLORS.white, padding: 0, margin: 0},
  menuStyle: {width: widthInDp(40), left: -widthInDp(30), top: heightInDp(5)},
  icon: {
    backgroundColor: COLORS.primary,
    borderRadius: widthInDp(10),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: widthInDp(10),
    height: widthInDp(10),
  },
  itemStyle: {height: heightInDp(4)},
  textStyle: {color: COLORS.black, fontFamily: FONTS.InterRegular},
});
