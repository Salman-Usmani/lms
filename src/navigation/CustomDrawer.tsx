import React from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SvgXml} from 'react-native-svg';

import {logo} from '../assets';
import {heightInDp, widthInDp} from '../utils';
import {COLORS, ICONS} from '../themes';
import LinearGradient from 'react-native-linear-gradient';
import {DrawerItemList} from '@react-navigation/drawer';

const CustomDrawerContent = (props: any) => {
  const logout = () => {
    Alert.alert(
      '',
      'Are you sure you want to logout',
      [
        {
          text: 'Yes',
          onPress: () => {},
          style: 'default',
        },
        {text: 'No'},
      ],
      {cancelable: false},
    );
  };

  return (
    <LinearGradient
      colors={['#F7FCFF', '#E6F5FF', '#123472']}
      start={{x: -0.5, y: 0.5}}
      end={{x: 1.0, y: 1.0}}
      locations={[0, 0.6, 1]}
      style={styles.linearGradient}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: widthInDp(5),
        }}>
        <SvgXml
          xml={logo}
          height={heightInDp(15)}
          width={widthInDp(25)}
          style={styles.logoStyle}
        />
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <ICONS.MaterialCommunityIcons
            name="login-variant"
            size={heightInDp(4)}
            color={COLORS.primary}
            style={{transform: [{rotate: '180deg'}]}}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginHorizontal: widthInDp(5),
          borderBottomWidth: 0.3,
          paddingBottom: heightInDp(2.5),
          marginBottom: heightInDp(5),
        }}>
        <View
          style={{
            backgroundColor: COLORS.white,
            alignSelf: 'center',
            columnGap: widthInDp(3),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: widthInDp(4),
            borderRadius: widthInDp(2),
          }}>
          <Text style={{fontSize: widthInDp(5), color: COLORS.primary}}>
            Student Portal{'\n'}
            <Text style={{fontSize: widthInDp(3)}}>
              LMS institute for Sexual Health
            </Text>
          </Text>
          <ICONS.Ionicons name="chevron-expand-outline" size={widthInDp(5)} />
        </View>
      </View>
      <DrawerItemList {...props} />
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          marginBottom: heightInDp(2),
        }}>
        <Text style={{textAlign: 'center', color: COLORS.primary}}>
          &#169; Omar Minwalla, Psy.D. 2023-2024{'\n'}All Rights Reserved.
        </Text>
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    // paddingHorizontal: widthInDp(5),
  },
  logoStyle: {
    alignSelf: 'flex-start',
  },
});

export default CustomDrawerContent;
