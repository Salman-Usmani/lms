import {View, Text, StyleSheet} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {COLORS, FONTS} from '../themes';
import {heightInDp, widthInDp} from '../utils';
import {SvgXml} from 'react-native-svg';
import {logo} from '../assets';
import {AuthStackNavigationProp} from '../types';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUserContext} from '../context/UserContext';

const SplashScreen = ({navigation}: AuthStackNavigationProp<'Splash'>) => {
  const {setUser, setToken} = useUserContext(); // Access the user data

  const handleUserState = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = await AsyncStorage.getItem('accessToken');
    if (userData && token) {
      const parseUser = JSON.parse(userData);
      const accessToken = JSON.parse(token);
      setUser(parseUser);
      setToken(accessToken);
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'Root'}],
        }),
      );
    } else {
      setTimeout(async () => {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'SignIn'}],
          }),
        );
      }, 1500);
    }
  };

  useEffect(() => {
    handleUserState();
  }, [navigation]);
  return (
    <View style={styles.sectionContainer}>
      <SvgXml
        xml={logo}
        width={widthInDp(90)}
        height={heightInDp(30)}
        style={styles.logoStyle}
      />
      <Text style={styles.textLogo}>A Psychology Corporation</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoStyle: {
    alignSelf: 'center',
  },
  textLogo: {
    marginTop: heightInDp(3),
    fontSize: widthInDp(5),
    textAlign: 'center',
    color: COLORS.primary,
    fontFamily: FONTS.InterRegular,
  },
});
