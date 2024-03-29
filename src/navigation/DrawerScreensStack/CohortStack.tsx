import {createStackNavigator} from '@react-navigation/stack';
import {CohortScreen, MediaScreen} from '../../screens';
import {CohortStackScreensList} from '../../types';

export const CohortStack = () => {
  const Stack = createStackNavigator<CohortStackScreensList>();

  return (
    <Stack.Navigator
      initialRouteName={'Cohort'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Cohort" component={CohortScreen} />
      <Stack.Screen name="Media" component={MediaScreen} />
    </Stack.Navigator>
  );
};
