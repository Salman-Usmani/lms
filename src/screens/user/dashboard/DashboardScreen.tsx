import React, {useCallback} from 'react';
import {
  Alert,
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {dashboard} from '../../../assets';
import {Button} from '../../../components';
import {COLORS, FONTS} from '../../../themes';
import {RootStackNavigationProp} from '../../../types';
import {heightInDp, widthInDp} from '../../../utils';
import {CommonActions, useFocusEffect} from '@react-navigation/native';

const DashboardScreen = ({
  navigation,
}: RootStackNavigationProp<'Dashboard'>) => {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Hold on!', 'Are you sure you want to Logout?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'YES',
            onPress: () =>
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{name: 'SignIn'}],
                }),
              ),
          },
        ]);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
  const List: {
    title: string;
    heading: string;
    description: string;
    color: string;
    screen: 'Library' | 'Community' | 'Chat';
  }[] = [
    {
      title: 'Course Material Library',
      heading: 'Education & Training',
      description:
        'Access to the training library of slides, video recordings, clinical forms, materials, etc.',
      color: COLORS.secondary,
      screen: 'Library',
    },
    {
      title: 'Community',
      heading: 'Networking',
      description:
        'Engage group discussions, posts, make referrals and receive updates and notices.',
      color: COLORS.pptBackground,
      screen: 'Community',
    },
    {
      title: 'Chat',
      heading: 'Communication',
      description:
        'Network, chat, and communicate easily with other professionals.',
      color: COLORS.green,
      screen: 'Chat',
    },
  ];
  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <SvgXml xml={dashboard} width={widthInDp(90)} />
      {List.map(item => (
        <View
          key={item.title}
          style={{...styles.container, borderColor: item.color}}>
          <View
            style={{
              ...styles.headingBackground,
              backgroundColor: item.color,
            }}>
            <Text style={styles.heading}>{item.heading}</Text>
          </View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Button
            title={'Explore'}
            background={false}
            handlePress={() => {
              navigation.navigate(item.screen);
            }}
            containerStyle={styles.btn}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: widthInDp(5),
  },
  container: {
    flex: 1,
    borderWidth: widthInDp(0.3),
    borderRadius: widthInDp(5),
    gap: widthInDp(5),
    padding: widthInDp(5),
    paddingHorizontal: widthInDp(5),
    marginVertical: heightInDp(1),
    alignItems: 'flex-start',
  },
  headingBackground: {
    paddingHorizontal: widthInDp(3),
    paddingVertical: widthInDp(0.5),
    borderRadius: widthInDp(2),
  },
  heading: {
    textAlignVertical: 'center',
    color: COLORS.primary,
    fontFamily: FONTS.InterRegular,
  },
  title: {
    textAlignVertical: 'center',
    color: COLORS.primary,
    fontSize: widthInDp(7),
    fontFamily: FONTS.IvyPrestoHeadline,
  },
  description: {
    textAlignVertical: 'center',
    fontFamily: FONTS.InterRegular,
  },
  btn: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: widthInDp(7),
  },
});
