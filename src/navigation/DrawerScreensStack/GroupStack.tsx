import {createStackNavigator} from '@react-navigation/stack';
import {GroupDetailsScreen, GroupScreen, MediaScreen} from '../../screens';
import {GroupStackScreensList} from '../../types';

export const GroupStack = () => {
  const Stack = createStackNavigator<GroupStackScreensList>();

  return (
    <Stack.Navigator
      initialRouteName={'GroupScreen'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="GroupScreen" component={GroupScreen} />
      <Stack.Screen name="GroupDetailsScreen" component={GroupDetailsScreen} />
      <Stack.Screen name="Media" component={MediaScreen} />
    </Stack.Navigator>
  );
};
