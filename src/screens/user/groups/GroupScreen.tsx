import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text} from 'react-native';
import Toast from 'react-native-toast-message';
import {useUserContext} from '../../../context/UserContext';
import {dataServer} from '../../../services/axiosConfig';
import {COLORS, FONTS} from '../../../themes';
import {widthInDp} from '../../../utils';
import {Groups} from './screenComponents/groups';
import {GroupStackNavigagtionProps, IGroups} from '../../../types';

// interface IGroups {
//   _id: string;
//   name: string;
//   avatar: string;
//   description: string;
//   groupMembers: [
//     {
//       member: {
//         _id: string;
//         name: string;
//         email: string;
//         phoneNo: string;
//         role: string;
//         avatar: string;
//         country: string;
//         state: string;
//       };
//       canPost: boolean;
//       canComment: boolean;
//       _id: string;
//     },
//   ];
// }

const GroupScreen = ({
  navigation,
}: GroupStackNavigagtionProps<'GroupScreen'>) => {
  const {user} = useUserContext();
  const [isLoading, setLoading] = useState(true);
  const [groups, setGroups] = useState<IGroups[]>([]);

  async function fetchUserGroup() {
    try {
      setLoading(true);
      const fetchUserGroupsApi = await dataServer.get('user/groups');
      if (fetchUserGroupsApi.status === 200) {
        setGroups(fetchUserGroupsApi.data.data.groups);
        setLoading(false);
        Toast.show({
          type: 'success',
          text1: fetchUserGroupsApi.data.message,
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
            : error.response?.data || 'failed to get groups',
      });
    }
  }
  useEffect(() => {
    fetchUserGroup();
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
  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <Text
        style={{
          fontFamily: FONTS.InterRegular,
          fontSize: widthInDp(5),
          color: COLORS.primary,
          fontWeight: '700',
        }}>
        Welcome back, {user?.name}!
      </Text>
      <Text
        style={{
          fontFamily: FONTS.InterRegular,
          fontSize: widthInDp(3),
          color: COLORS.primary,
        }}>
        Group
      </Text>
      <Groups
        groups={groups || []}
        onPress={(item: IGroups) =>
          navigation.navigate('GroupDetailsScreen', item)
        }
      />
    </ScrollView>
  );
};

export default GroupScreen;

const styles = StyleSheet.create({
  indicatorStyle: {flex: 1, backgroundColor: COLORS.white},
  mainContainer: {
    // flex: 1,
    paddingHorizontal: widthInDp(3),
    backgroundColor: COLORS.white,
    gap: widthInDp(2),
  },
  container: {
    flex: 1,
    borderWidth: widthInDp(0.5),
    borderColor: COLORS.lightBlue,
    borderRadius: widthInDp(5),
    gap: widthInDp(5),
    padding: widthInDp(3),
  },
});
