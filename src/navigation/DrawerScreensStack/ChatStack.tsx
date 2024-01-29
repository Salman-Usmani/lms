import {createStackNavigator} from '@react-navigation/stack';
import {ChatScreen} from '../../screens';
import {COLORS} from '../../themes';
import {ChatStackScreensList} from '../../types';
import {MessageScreen} from '../../screens/user';

export const ChatStack = () => {
  const Stack = createStackNavigator<ChatStackScreensList>();

  return (
    <Stack.Navigator
      initialRouteName={'ChatScreen'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="MessageScreen" component={MessageScreen} />
    </Stack.Navigator>
  );
};
