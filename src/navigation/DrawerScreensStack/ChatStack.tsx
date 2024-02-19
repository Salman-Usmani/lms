import {createStackNavigator} from '@react-navigation/stack';
import {ChatScreen} from '../../screens';
import {MessageScreen} from '../../screens/user';
import {ChatStackScreensList} from '../../types';

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
