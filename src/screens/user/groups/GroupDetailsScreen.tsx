import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {useUserContext} from '../../../context/UserContext';
import {dataServer} from '../../../services/axiosConfig';
import {COLORS, FONTS, ICONS} from '../../../themes';
import {GroupStackNavigagtionProps, IGroupPost} from '../../../types';
import {heightInDp, widthInDp} from '../../../utils';
import {GroupPosts} from './screenComponents/groupPosts';
import {CreatePostModal} from './screenComponents/createPostModal';

const GroupDetailsScreen = ({
  route,
  navigation,
}: GroupStackNavigagtionProps<'GroupDetailsScreen'>) => {
  const {_id, name, avatar, groupOwners, createdAt, description, groupMembers} =
    route.params;

  const {user} = useUserContext();
  const [isLoading, setLoading] = useState(false);
  const [isModal, setShowModal] = useState(false);
  const [groupPosts, setGroupPosts] = useState<IGroupPost[]>([]);

  async function fetchUserGroup() {
    try {
      setLoading(true);
      const fetchGroupPostsApi = await dataServer.get(
        `/user/post?group=${_id}`,
      );
      if (fetchGroupPostsApi.status === 200) {
        const posts = fetchGroupPostsApi.data.data.posts;
        // Reverse the posts array
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
      <Text style={styles.title}>Welcome back, {user?.name}!</Text>
      <Text style={styles.subTitle}>
        Group {'>'} {name}
      </Text>
      <Image source={{uri: avatar}} style={styles.groupImage} />
      <View style={styles.container}>
        <Text style={styles.heading}>Group Created by</Text>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{uri: groupOwners.avatar}}
            style={{
              height: widthInDp(15),
              width: widthInDp(15),
              borderRadius: widthInDp(15),
            }}
          />
          <View
            style={{
              flex: 1,
              marginLeft: widthInDp(3),
              justifyContent: 'space-around',
            }}>
            <Text
              style={{
                color: COLORS.textPrimary,
                fontWeight: '500',
                fontSize: widthInDp(4),
              }}>
              {groupOwners.name}
            </Text>

            <Text
              style={{
                color: COLORS.textSecondary,
                fontWeight: '500',
                fontSize: widthInDp(4),
              }}>
              <Text style={{color: COLORS.textHighlight, fontWeight: '600'}}>
                {groupOwners.email}
              </Text>
              ,{' '}
              {new Date(createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: widthInDp(5),
            // fontFamily: FONTS.Inter,
            fontWeight: '600',
          }}>
          About Group
        </Text>
        <Text
          style={{
            fontSize: widthInDp(5),
            color: COLORS.textSubHeading,
            // fontFamily: FONTS.Inter,
            fontWeight: '600',
          }}>
          {name}
        </Text>
        <Text
          style={{
            fontSize: widthInDp(4),
            color: COLORS.textSubHeading,
            // fontFamily: FONTS.Inter,
            fontWeight: '400',
          }}>
          {description}
        </Text>
      </View>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: widthInDp(5),
              // fontFamily: FONTS.Inter,
              fontWeight: '600',
            }}>
            Members{' '}
            <Text style={{color: COLORS.numColor}}>{groupMembers.length}</Text>
          </Text>
          <Text
            style={{
              fontSize: widthInDp(5),
              color: COLORS.numColor,
              // fontFamily: FONTS.Inter,
              fontWeight: '600',
            }}>
            See All
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: widthInDp(2),
          }}>
          {groupMembers.map(member => (
            <View
              key={member._id}
              style={{
                borderRadius: widthInDp(100),
                backgroundColor: COLORS.imageBorder,
                padding: widthInDp(1),
                borderColor: COLORS.white,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {member?.member?.avatar ? (
                <Image
                  source={{uri: member.member.avatar}}
                  height={widthInDp(10)}
                  width={widthInDp(10)}
                  resizeMode="contain"
                  // onError={() => <Text style={{color: COLORS.black}}>A</Text>}
                  style={{
                    borderRadius: widthInDp(100),
                    borderWidth: 1,
                    backgroundColor: COLORS.white,
                  }}
                />
              ) : (
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    borderRadius: widthInDp(100),
                    width: widthInDp(10),
                    height: widthInDp(10),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ICONS.FontAwesome6
                    name="user-large"
                    size={widthInDp(6)}
                    color={COLORS.darkGray}
                  />
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: widthInDp(5),
              // fontFamily: FONTS.Inter,
              fontWeight: '600',
            }}>
            Recent Post
          </Text>
          <ICONS.FontAwesome6
            name="ellipsis-vertical"
            size={widthInDp(5)}
            color={COLORS.iconColor}
          />
        </View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Image
          source={{uri: user?.avatar}}
          style={{
            height: widthInDp(15),
            width: widthInDp(15),
            borderRadius: widthInDp(15),
            marginRight: widthInDp(2),
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setShowModal(true);
          }}
          style={[
            styles.container,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          ]}>
          <Text>Add new post here</Text>
          <View style={{flexDirection: 'row', gap: widthInDp(2)}}>
            <ICONS.FontAwesome5
              name="images"
              size={widthInDp(5)}
              color={COLORS.primary}
            />
            <ICONS.SimpleLineIcons
              name="paper-clip"
              size={widthInDp(5)}
              color={COLORS.primary}
            />
          </View>
        </TouchableOpacity>
      </View>

      <GroupPosts groupPosts={groupPosts || []} navigation={navigation} />
      <CreatePostModal
        visible={isModal}
        onRequestClose={() => {
          setShowModal(false);
        }}
        avatar={user?.avatar}
        name={user?.name}
        groupId={_id}
      />
    </ScrollView>
  );
};

export default GroupDetailsScreen;

const styles = StyleSheet.create({
  indicatorStyle: {flex: 1, backgroundColor: COLORS.white},
  mainContainer: {
    // flex: 1,
    paddingHorizontal: widthInDp(3),
    backgroundColor: COLORS.white,
    // gap: widthInDp(3),
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
    fontFamily: FONTS.Inter,
    fontSize: widthInDp(3),
    color: COLORS.primary,
  },
  heading: {
    fontSize: widthInDp(5),
    fontWeight: '600',
  },
  groupImage: {
    height: heightInDp(25),
    width: 'auto',
    borderRadius: widthInDp(1.5),
  },
  title: {
    fontFamily: FONTS.Inter,
    fontSize: widthInDp(5),
    color: COLORS.primary,
    fontWeight: '700',
  },

  separator: {
    height: heightInDp(1), // Adjust the height of the separator as needed
    // backgroundColor: COLORS.lightGray, // Separator color
    // marginHorizontal: widthInDp(3),
  },
});
