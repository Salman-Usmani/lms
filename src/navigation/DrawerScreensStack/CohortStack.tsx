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
