import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';
import {dataServer} from '../../../services/axiosConfig';
import {COLORS} from '../../../themes';
import {Cohorts} from './screenComponents/cohort';
import {ICohorts, ICohortsByLevel, ILevel} from './screenComponents/interface';

const CohortScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [cohortByLevels, setCohortByLevels] = useState<ICohortsByLevel[]>([]);

  async function fetchUserContent() {
    try {
      setLoading(true);
      const fetchUserContentApi = await dataServer.get('user/content');
      if (fetchUserContentApi.status === 200) {
        const moduleByLevel = fetchUserContentApi.data.data.cohorts.map(
          (cohort: ICohorts) => {
            const levels: ILevel[] = [];
            const {modules, ...cohortData} = cohort;
            modules
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .forEach(module => {
                const level = getModuleLevel(module.displayOrder);
                const existingLevel = levels.find(l => l.level === level);
                if (existingLevel) {
                  existingLevel.modules.push(module);
                } else
                  levels.push({
                    level,
                    modules: [module],
                  });
              });
            return {
              ...cohortData,
              levels,
            };
          },
        );
        setCohortByLevels([...moduleByLevel]);

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
  const getModuleLevel = (moduleOrder: number) => {
    if (moduleOrder >= 1 && moduleOrder < 5) {
      return 'Level 1';
    } else if (moduleOrder >= 5 && moduleOrder < 9) {
      return 'Level 2';
    } else if (moduleOrder >= 9 && moduleOrder < 13) {
      return 'Level 3';
    } else if (moduleOrder >= 13 && moduleOrder < 21) {
      return 'Level 4';
    } else {
      return 'Additional Resource';
    }
  };

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

  return <Cohorts cohorts={cohortByLevels || []} />;
};

export default CohortScreen;

const styles = StyleSheet.create({
  indicatorStyle: {flex: 1, backgroundColor: COLORS.white},
});
