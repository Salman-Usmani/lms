import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {widthInDp} from '../../../utils';
import {useUserContext} from '../../../context/UserContext';
import {COLORS, FONTS} from '../../../themes';
import {ImageBox} from './screenComponents/imageBox';
import {DetailsBox} from './screenComponents/detailsBox';

const AccountScreen = () => {
  const {user, setUser} = useUserContext();
  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <Text style={styles.heading}>Account</Text>
      <View style={styles.container}>
        <ImageBox
          name={user?.name}
          avatar={user?.avatar}
          setUpdatedUser={setUser}
        />
      </View>
      <View style={styles.container}>
        <DetailsBox
          name={user?.name || ''}
          email={user?.email || ''}
          phoneNo={user?.phoneNo || ''}
          state={user?.state || ''}
          country={user?.country || ''}
          id={user?._id || ''}
          setUpdatedUser={setUser}
        />
      </View>
    </ScrollView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    paddingHorizontal: widthInDp(5),
    backgroundColor: COLORS.white,
    gap: widthInDp(5),
  },
  heading: {fontSize: widthInDp(7), fontWeight: '500', fontFamily: FONTS.Inter},
  container: {
    flex: 1,
    borderWidth: widthInDp(0.5),
    borderColor: COLORS.lightBlue,
    borderRadius: widthInDp(5),
    // justifyContent: 'center',
    // alignItems: 'center',
    gap: widthInDp(5),
    padding: widthInDp(5),
  },
  imageStyle: {
    width: widthInDp(50),
    height: widthInDp(50),
    borderRadius: widthInDp(100),
    alignSelf: 'center',
  },
  title: {fontSize: widthInDp(5), fontWeight: '500', textAlign: 'center'},
});
