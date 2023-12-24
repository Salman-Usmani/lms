import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Divider, Menu, PaperProvider} from 'react-native-paper';
import {COLORS, ICONS} from '../../themes';
import {heightInDp, widthInDp} from '../../utils';

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
        contentStyle={{backgroundColor: COLORS.white, padding: 0, margin: 0}}
        onDismiss={closeMenu}
        theme={{colors: {primary: 'green', secondary: 'red', text: 'black'}}}
        style={{
          width: widthInDp(40),
          left: -widthInDp(30),
          top: heightInDp(5),
        }}
        anchor={
          <TouchableOpacity onPress={openMenu} style={styles.icon}>
            {uri ? (
              <Image
                source={{uri}}
                height={widthInDp(10)}
                width={widthInDp(10)}
                style={styles.image}
              />
            ) : (
              <ICONS.FontAwesome6
                name="circle-user"
                size={widthInDp(5)}
                color={COLORS.white}
              />
            )}
          </TouchableOpacity>
        }>
        <Menu.Item
          title="Account"
          titleStyle={{color: COLORS.black}}
          style={{height: heightInDp(4)}}
        />
        <Menu.Item
          title={name}
          titleStyle={{color: COLORS.black, textAlignVertical: 'center'}}
          style={{height: heightInDp(5)}}
        />
        <Divider />
        <Menu.Item
          onPress={handleSignOut}
          title="Sign Out"
          titleStyle={{color: COLORS.black}}
        />
      </Menu>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  icon: {
    backgroundColor: COLORS.primary,
    borderRadius: widthInDp(10),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  image: {flex: 1, borderRadius: widthInDp(10)},
});
