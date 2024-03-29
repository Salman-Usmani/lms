import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {ImageWithFallbabck} from '../../../components';
import {useUserContext} from '../../../context/UserContext';
import {dataServer} from '../../../services/axiosConfig';
import {COLORS, FONTS, ICONS} from '../../../themes';
import {GroupStackNavigagtionProps} from '../../../types';
import {heightInDp, widthInDp} from '../../../utils';
import {CreatePost} from './screenComponents/createPost';
import {GroupPosts} from './screenComponents/groupPosts';
import {IGroupPost} from './screenComponents/interface';

const GroupDetailsScreen = ({
  route,
}: GroupStackNavigagtionProps<'GroupDetailsScreen'>) => {
  const {_id, name, avatar, groupOwners, createdAt, description, groupMembers} =
    route.params;
  const {user} = useUserContext();
  const [isLoading, setLoading] = useState(false);
  const [groupPosts, setGroupPosts] = useState<IGroupPost[]>([]);

  async function fetchGroupPosts() {
    try {
      setLoading(true);
      const fetchGroupPostsApi = await dataServer.get(
        `/user/post?group=${_id}`,
      );
      if (fetchGroupPostsApi.status === 200) {
        const posts = fetchGroupPostsApi.data.data.posts;
        const reversedPosts = posts.slice().reverse();
        setGroupPosts(reversedPosts);
        setLoading(false);
        Toast.show({
          type: 'success',
          text1: fetchGroupPostsApi.data.message,
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
            : error.response?.data || 'failed to get posts',
      });
    }
  }
  useEffect(() => {
    fetchGroupPosts();
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
      <Text style={styles.title}>Welcome back, {user?.name}!</Text>
      <Text style={styles.subTitle}>
        Group {'>'} {name}
      </Text>
      <Image
        source={{uri: avatar}}
        resizeMode="contain"
        style={styles.groupImage}
      />

      <View style={styles.container}>
        <Text style={styles.heading}>Group Created by</Text>
        <View style={styles.ownerInfoView}>
          <ImageWithFallbabck
            source={groupOwners.avatar}
            name={groupOwners.name}
            diameter={widthInDp(13)}
          />
          <View style={styles.ownerProfile}>
            <Text style={styles.ownerName}>{groupOwners.name}</Text>

            <Text style={styles.ownerCreatedAt}>
              <Text style={styles.ownerMail}>{groupOwners.email}</Text>,{' '}
              {moment(createdAt).format('ll')}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.heading}>About Group</Text>
        <Text style={styles.groupName}>{name}</Text>
        <Text style={styles.groupDesc}>{description}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.heading}>
          Members <Text style={styles.memberCount}>{groupMembers.length}</Text>
        </Text>
        <View style={styles.membersView}>
          {groupMembers.map(member => (
            <View key={member._id} style={styles.memberImgView}>
              <ImageWithFallbabck
                source={member.member.avatar}
                name={member.member.name}
                diameter={widthInDp(10)}
              />
            </View>
          ))}
        </View>
      </View>
      <View style={[styles.container, styles.rowContainer]}>
        <Text style={styles.heading}>Recent Post</Text>
        <ICONS.FontAwesome6
          name="ellipsis-vertical"
          size={widthInDp(5)}
          color={COLORS.iconColor}
        />
      </View>
      <CreatePost groupPosts={groupPosts} user={user} _id={_id} />

      <GroupPosts groupPosts={groupPosts || []} setGroupPosts={setGroupPosts} />
    </ScrollView>
  );
};

export default GroupDetailsScreen;

const styles = StyleSheet.create({
  indicatorStyle: {flex: 1, backgroundColor: COLORS.white},
  mainContainer: {
    paddingHorizontal: widthInDp(3),
    backgroundColor: COLORS.white,
    rowGap: heightInDp(2),
  },
  container: {
    flex: 1,
    borderWidth: widthInDp(0.3),
    borderColor: COLORS.lightBlue,
    borderRadius: widthInDp(3),
    gap: widthInDp(3),
    padding: widthInDp(3),
    backgroundColor: COLORS.white,
  },
  subTitle: {
    fontFamily: FONTS.InterRegular,
    fontSize: widthInDp(3),
    color: COLORS.primary,
  },
  heading: {fontSize: widthInDp(4), fontFamily: FONTS.InterSemiBold},
  memberCount: {color: COLORS.numColor, fontFamily: FONTS.InterRegular},
  groupImage: {
    height: heightInDp(25),
    width: 'auto',
    borderRadius: widthInDp(1.5),
  },
  title: {
    fontFamily: FONTS.InterSemiBold,
    fontSize: widthInDp(5),
    color: COLORS.primary,
  },
  ownerInfoView: {flexDirection: 'row'},

  ownerProfile: {
    flex: 1,
    marginLeft: widthInDp(3),
    justifyContent: 'space-around',
  },
  ownerName: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.InterSemiBold,
    fontSize: widthInDp(4),
  },
  ownerCreatedAt: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.InterSemiBold,
    fontSize: widthInDp(4),
  },
  ownerMail: {color: COLORS.textHighlight},
  groupName: {
    fontSize: widthInDp(5),
    color: COLORS.textSubHeading,
    fontFamily: FONTS.InterSemiBold,
  },
  groupDesc: {
    fontSize: widthInDp(4),
    color: COLORS.textSubHeading,
    fontFamily: FONTS.InterRegular,
  },
  membersView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: widthInDp(2),
  },
  memberImgView: {
    borderRadius: widthInDp(100),
    backgroundColor: COLORS.imageBorder,
    padding: widthInDp(1),
    borderColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
