import {
  ActivityIndicator,
  Alert,
  BackHandler,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {COLORS} from '../../../themes';
import {CommonActions, useFocusEffect} from '@react-navigation/native';
import {CohortStackNavigagtionProps} from '../../../types';
import {dataServer} from '../../../services/axiosConfig';
import Toast from 'react-native-toast-message';
import {Cohorts} from './screenComponents/cohort';

interface ICohorts {
  _id: string;
  name: string;
  year: string;
  session: {name: string};
  modules: [
    {
      _id: string;
      name: string;
      days: [
        {
          _id: string;
          title: string;
          videos: [
            {url: string; title: string; isDownloadable: boolean; _id: string},
          ];
          pdfs: [
            {url: string; title: string; isDownloadable: boolean; _id: string},
          ];
          docs: [
            {url: string; title: string; isDownloadable: boolean; _id: string},
          ];
          ppts: [
            {url: string; title: string; isDownloadable: boolean; _id: string},
          ];
        },
      ];
    },
  ];
}

const CohortScreen = ({navigation}: CohortStackNavigagtionProps<'Cohort'>) => {
  const [isLoading, setLoading] = useState(true);
  const [cohorts, setCohorts] = useState<ICohorts[]>([]);

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

  async function fetchUserContent() {
    try {
      setLoading(true);
      const fetchUserContentApi = await dataServer.get('user/content');
      if (fetchUserContentApi.status === 200) {
        setCohorts(fetchUserContentApi.data.data.cohorts);
        setLoading(false);
        Toast.show({
          type: 'success',
          text1: fetchUserContentApi.data.message,
        });
      }
    } catch (error: any) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: Array.isArray(error?.response?.data?.errors)
          ? error?.response?.data?.errors[0]
          : error?.response?.data.message
            ? error?.response?.data.message
            : error.response?.data || 'failed to get cohorts',
      });
    }
  }
  useEffect(() => {
    fetchUserContent();
  }, []);

  if (isLoading) {
    return (
      <ActivityIndicator
        size={'large'}
        color={COLORS.primary}
        style={styles.indicatorStyle}
      />
    );
  }

  return <Cohorts cohorts={cohorts || []} />;
};

export default CohortScreen;

const styles = StyleSheet.create({
  indicatorStyle: {flex: 1, backgroundColor: COLORS.white},
});
