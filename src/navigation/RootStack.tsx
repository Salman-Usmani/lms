import AsyncStorage from '@react-native-async-storage/async-storage';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {CommonActions} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {capOverBook} from '../assets';
import {MenuContainer} from '../components';
import {useUserContext} from '../context/UserContext';
import {AccountScreen, DashboardScreen} from '../screens';
import {COLORS, ICONS} from '../themes';
import {RootStackScreensList} from '../types';
import {widthInDp} from '../utils';
import CustomDrawerContent from './CustomDrawer';
import {ChatStack} from './DrawerScreensStack/ChatStack';
import {CohortStack} from './DrawerScreensStack/CohortStack';
import {GroupStack} from './DrawerScreensStack/GroupStack';

const Drawer = createDrawerNavigator<RootStackScreensList>();

const RootStack = () => {
  const {user} = useUserContext();

  return (
    <Drawer.Navigator
      initialRouteName={__DEV__ ? 'Chat' : 'Dashboard'}
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
            {/* <View style={styles.icon}>
              <ICONS.FontAwesome6
                name="user-group"
                size={widthInDp(4)}
                color={COLORS.white}
                // onPress={() => navigation.navigate('Account')}
              />
            </View> */}
            <View style={styles.icon}>
              <ICONS.Octicons
                name="bell"
                size={widthInDp(5)}
                color={COLORS.white}
              />
            </View>

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
        component={DashboardScreen}
        options={{
          drawerLabel: 'Dashboard',
          drawerIcon: () => (
            <ICONS.MaterialCommunityIcons
              name="view-dashboard"
              size={widthInDp(7)}
              color={COLORS.primary}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Library"
        component={CohortStack}
        options={{
          drawerLabel: 'Course Material Library',
          drawerIcon: () => <SvgXml xml={capOverBook} />,
        }}
      />
      <Drawer.Screen
        name="Community"
        component={GroupStack}
        options={{
          drawerLabel: 'Community',
          drawerIcon: () => (
            <ICONS.MaterialIcons
              name="groups"
              size={widthInDp(7)}
              color={COLORS.primary}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Chat"
        component={ChatStack}
        options={{
          drawerLabel: 'Chat',
          drawerIcon: () => (
            <ICONS.Ionicons
              name="chatbox-ellipses"
              size={widthInDp(5)}
              color={COLORS.primary}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Account"
        component={AccountScreen}
        options={{
          drawerLabel: 'Account',
          drawerIcon: () => (
            <ICONS.FontAwesome6
              name="user-large"
              size={widthInDp(5)}
              color={COLORS.primary}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
export default RootStack;

const styles = StyleSheet.create({
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
});
