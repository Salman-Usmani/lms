import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
import {AccountScreen, CohortScreen, MediaScreen} from '../screens';
import {CohortStackScreensList, RootStackScreensList} from '../types';
import {COLORS, ICONS} from '../themes';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawer';
import {widthInDp} from '../utils';
import {SvgXml} from 'react-native-svg';
import {signal, userIcon} from '../assets';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {useUserContext} from '../context/UserContext';
import {MenuContainer} from '../components';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator<CohortStackScreensList>();
const Drawer = createDrawerNavigator<RootStackScreensList>();

const RootStack = () => {
  const {user} = useUserContext();
  const [visible, setVisible] = useState(false);

  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={({navigation}) => ({
        // Add a placeholder button without the `onPress` to avoid flicker
        swipeEnabled: false,
        drawerActiveBackgroundColor: COLORS.secondary,
        drawerActiveTintColor: COLORS.primary,
        drawerInactiveTintColor: COLORS.primary,
        drawerItemStyle: {width: '80%'},
        headerTitle: () => null,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={[styles.icon, {marginHorizontal: widthInDp(5)}]}>
            <ICONS.Ionicons
              name={'menu'}
              size={widthInDp(6)}
              color={COLORS.white}
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <View style={styles.rightHeader}>
            <View style={styles.icon}>
              <ICONS.FontAwesome6
                name="user-group"
                size={widthInDp(4)}
                color={COLORS.white}
                // onPress={() => navigation.navigate('Account')}
              />
            </View>
            <View style={styles.icon}>
              <ICONS.Octicons
                name="bell"
                size={widthInDp(5)}
                color={COLORS.white}
              />
            </View>
            {/* <TouchableOpacity onPress={()=> {}} style={styles.icon}>
              {user?.avatar ? (
                <Image
                  source={{uri: user.avatar}}
                  resizeMode="contain"
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
            </TouchableOpacity> */}
            <View>
              <MenuContainer
                uri={user?.avatar || ''}
                name={user?.name || ''}
                handleSignOut={() => {
                  AsyncStorage.clear();
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [{name: 'SignIn'}],
                    }),
                  );
                }}
              />
            </View>
          </View>
        ),
      })}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Dashboard"
        component={CohortStack}
        options={{
          // headerShown: false,
          drawerLabel: 'Dashboard',
          drawerIcon: () => <SvgXml xml={signal} />,
        }}
      />
      <Drawer.Screen
        name="Account"
        component={AccountScreen}
        options={{
          drawerLabel: 'Account',
          drawerIcon: () => <SvgXml xml={userIcon} />,
        }}
      />
    </Drawer.Navigator>
  );
};
export default RootStack;

const CohortStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Cohort'}
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTitleStyle: {
          //   fontFamily: roboto,
        },
        headerTitleAlign: 'center',
        headerTintColor: COLORS.white,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="Cohort"
        component={CohortScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Media"
        component={MediaScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    backgroundColor: COLORS.primary,
    borderRadius: widthInDp(10),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: widthInDp(10),
    height: widthInDp(10),
  },
  rightHeader: {
    flexDirection: 'row',
    columnGap: widthInDp(3),
    marginHorizontal: widthInDp(5),
  },
  image: {flex: 1, borderRadius: widthInDp(10)},
});
