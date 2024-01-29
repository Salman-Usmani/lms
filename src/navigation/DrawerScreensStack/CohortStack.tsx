import {createStackNavigator} from '@react-navigation/stack';
import {CohortStackScreensList} from '../../types';
import {COLORS} from '../../themes';
import {CohortScreen, MediaScreen} from '../../screens';

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
