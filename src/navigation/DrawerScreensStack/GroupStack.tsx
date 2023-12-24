import {createStackNavigator} from '@react-navigation/stack';
import {COLORS} from '../../themes';
import {GroupDetailsScreen, GroupScreen, MediaScreen} from '../../screens';
import {GroupStackScreensList} from '../../types';

export const GroupStack = () => {
  const Stack = createStackNavigator<GroupStackScreensList>();

  return (
    <Stack.Navigator
      initialRouteName={'GroupScreen'}
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
        name="GroupScreen"
        component={GroupScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="GroupDetailsScreen"
        component={GroupDetailsScreen}
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
