import moment from 'moment';
import React, {LegacyRef, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import {COLORS, FONTS, ICONS} from '../../../../themes';
import {
  GroupStackNavigagtionProps,
  GroupStackScreensList,
  IComments,
  IGroupPost,
} from '../../../../types';
import {heightInDp, widthInDp} from '../../../../utils';
import {PostsComments} from './postsComments';
import {dataServer} from '../../../../services/axiosConfig';
import Toast from 'react-native-toast-message';
import {useUserContext} from '../../../../context/UserContext';
import {StackNavigationProp} from '@react-navigation/stack';

export const GroupPosts = ({
  groupPosts,
  navigation,
}: {
  groupPosts: IGroupPost[] | [];
  navigation: StackNavigationProp<
    GroupStackScreensList,
    'GroupDetailsScreen',
    undefined
  >;
}) => {
  const [isLoading, setLoading] = useState(false);
  const {user} = useUserContext();
  const inputRef = useRef<TextInput>(null);

  async function onPostComment(item: {postId: string; content: string}) {
    try {
      setLoading(true);
      const postCommentApi = await dataServer.post('/user/post/comment', item);
      if (postCommentApi.status === 200) {
        let tempIndex = groupPosts.findIndex(
          value => value._id === postCommentApi.data.data.comment.post,
        );
        if (tempIndex !== -1) {
          inputRef.current?.clear();
          let newcomment = {
            content: postCommentApi.data.data.comment.content,
            post: postCommentApi.data.data.comment.post,
            user: user,
            _id: postCommentApi.data.data.comment._id,
            createdAt: postCommentApi.data.data.comment.createdAt,
            updatedAt: postCommentApi.data.data.comment.updatedAt,
          };
          groupPosts[tempIndex].comments.unshift(newcomment);
        }
        setLoading(false);
        Toast.show({
          type: 'success',
          text1: postCommentApi.data.message,
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
  async function onLikePost(item: {postId: string}) {
    let tempIndex = groupPosts.findIndex(value => value._id === item.postId);
    // if (groupPosts[tempIndex].likes.some(value => value._id === user?._id)) {
    //  let newLikes =  groupPosts[tempIndex].likes.filter(gpl => gpl._id !== user?._id);
    //  console.log(

    //  )
    //  groupPosts[tempIndex].likes = newLikes || []
    //   return;
    // }

    try {
      setLoading(true);
      const likePostApi = await dataServer.post('user/post/like', item);
      if (likePostApi.status === 200) {
        let tempIndex = groupPosts.findIndex(
          value => value._id === likePostApi.data.data.post._id,
        );
        if (tempIndex !== -1 && user) {
          let newLike = {
            _id: user?._id || '',
            name: user?.name || '',
            email: user?.email || '',
            phoneNo: user?.phoneNo || '',
            role: user?.role || '',
            country: user?.country || '',
            state: user?.state || '',
            avatar: user?.avatar || '',
          };
          groupPosts[tempIndex].likes.unshift(newLike);
        }
        setLoading(false);
        Toast.show({
          type: 'success',
          text1: likePostApi.data.message,
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

  const renderItem = ({item}: {item: IGroupPost}) => {
    // const postCreator = groupMembers.find(
    //   gm => gm.member._id === item.postCreator._id,
    // );
    return (
      <Item
        item={item}
        inputRef={inputRef}
        isLoading={isLoading}
        videoPlayer={() => {
          {
            item.media?.s3PublicUrl &&
              navigation.navigate('Media', {
                fileType: 'video',
                url: item.media?.s3PublicUrl,
              });
          }
        }}
        onPress={text =>
          onPostComment({
            postId: item._id,
            content: text,
          })
        }
        onPressThumbsUp={() => {
          onLikePost({
            postId: item._id,
          });
        }}
      />
    );
  };
  return (
    <FlatList
      scrollEnabled={false}
      data={groupPosts}
      initialNumToRender={50}
      renderItem={renderItem}
      keyExtractor={Item => Item._id}
      style={{gap: widthInDp(5)}}
      ItemSeparatorComponent={Separator}
    />
  );
};

const Item = ({
  item,
  onPress,
  inputRef,
  isLoading,
  videoPlayer,
  onPressThumbsUp,
}: {
  item: IGroupPost;
  onPress: (text: string) => void;
  inputRef: LegacyRef<TextInput>;
  isLoading: boolean;
  videoPlayer: () => void;
  onPressThumbsUp: () => void;
  // selectedItem: string;
}) => {
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [comment, setComment] = useState('');
  return (
    <>
      <View style={styles.container}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          {item.postCreator.avatar ? (
            <Image
              source={{uri: item.postCreator.avatar}}
              style={{
                height: widthInDp(10),
                width: widthInDp(10),
                borderRadius: widthInDp(10),
              }}
            />
          ) : (
            <View
              style={{
                backgroundColor: COLORS.lightGray,
                borderRadius: widthInDp(100),
                width: widthInDp(10),
                height: widthInDp(10),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ICONS.FontAwesome6
                name="user-large"
                size={widthInDp(6)}
                color={COLORS.white}
              />
            </View>
          )}

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
              {item.title}
            </Text>

            <Text
              style={{
                color: COLORS.textSecondary,
                fontWeight: '500',
                fontSize: widthInDp(4),
              }}>
              <Text style={{color: COLORS.textHighlight, fontWeight: '600'}}>
                {item.postCreator.name}
              </Text>
              , {moment(item.createdAt).fromNow()}
            </Text>
          </View>
          <ICONS.FontAwesome6
            name="ellipsis"
            size={widthInDp(5)}
            color={COLORS.iconColor}
          />
        </View>
        <Text>{item.content}</Text>
        {item.media?.mimetype.includes('image') ? (
          <Image
            source={{uri: item?.media.s3PublicUrl}}
            height={heightInDp(20)}
            style={{width: 'auto', borderRadius: widthInDp(2)}}
            defaultSource={require('../../../../assets/images/images.jpeg')}
            onError={() => {
              return {
                uri: 'https://www.pakainfo.com/wp-content/uploads/2021/09/image-url-for-testing.jpg',
              };
            }}
          />
        ) : item.media?.mimetype.includes('application') ? (
          <View style={{flexDirection: 'row', gap: widthInDp(2)}}>
            <ICONS.MaterialCommunityIcons name="download" size={widthInDp(5)} />
            <Text>{item.media.originalName}</Text>
          </View>
        ) : (
          item.media?.mimetype.includes('video') && (
            // <TouchableOpacity
            //   onPress={videoPlayer}
            //   style={{flexDirection: 'row', gap: widthInDp(2)}}>
            //   <ICONS.FontAwesome6
            //     name="play"
            //     size={widthInDp(5)}
            //     color={COLORS.black}
            //   />
            //   <Text>{item.media.originalName}</Text>
            // </TouchableOpacity>
            <View
              style={{
                height: heightInDp(30),
                width: 'auto',
                borderRadius: widthInDp(3),
              }}>
              <VideoPlayer
                tapAnywhereToPause
                disableBack
                source={{
                  uri: item.media.s3PublicUrl,
                }}
                // navigator={navigation}
                toggleResizeModeOnFullscreen={true}
              />
            </View>
          )
        )}

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', gap: widthInDp(1)}}>
            <TouchableOpacity onPress={onPressThumbsUp}>
              <ICONS.MaterialIcons
                name="thumb-up-alt"
                size={widthInDp(7)}
                color={COLORS.textSecondary}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: COLORS.textSecondary,
                fontSize: widthInDp(5),
                marginRight: widthInDp(5),
              }}>
              {item.likes.length}
            </Text>

            <ICONS.MaterialCommunityIcons
              name="comment-text"
              size={widthInDp(7)}
              color={COLORS.textSecondary}
            />
            <Text style={{color: COLORS.textSecondary, fontSize: widthInDp(5)}}>
              {item.comments.length}
            </Text>
          </View>
          <View style={{flexDirection: 'row', gap: widthInDp(1)}}>
            {item?.comments.length > 0 && (
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => setCommentsVisible(!commentsVisible)}>
                {commentsVisible ? (
                  <>
                    <Text style={{color: COLORS.textSecondary}}>
                      hide Replies
                    </Text>
                    <ICONS.MaterialIcons
                      name="keyboard-arrow-down"
                      color={COLORS.textSecondary}
                      size={widthInDp(5)}
                    />
                  </>
                ) : (
                  <>
                    <Text style={{color: COLORS.textSecondary}}>
                      View Replies
                    </Text>

                    <ICONS.MaterialIcons
                      name="keyboard-arrow-up"
                      color={COLORS.textSecondary}
                      size={widthInDp(5)}
                    />
                  </>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          height: heightInDp(15),
          borderWidth: 0.5,
          borderColor: COLORS.darkGray,
          borderRadius: widthInDp(1),
          // gap: widthInDp(3),
          paddingHorizontal: widthInDp(1),
          paddingVertical: heightInDp(1),
          marginVertical: heightInDp(2),
          rowGap: heightInDp(1),
          shadowColor: COLORS.black,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
          backgroundColor: COLORS.white,
          // flexDirection: 'row',
        }}>
        <TextInput
          ref={inputRef}
          placeholder="Write a comment here..."
          onChangeText={text => setComment(text)}
          multiline
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            padding: 0,
            paddingHorizontal: widthInDp(1),
            textAlignVertical: 'top',
          }}
        />
        <TouchableOpacity
          onPress={() => {
            onPress(comment);
          }}
          style={{alignSelf: 'flex-end'}}>
          {isLoading ? (
            <ActivityIndicator size={'small'} color={COLORS.numColor} />
          ) : (
            <ICONS.Ionicons
              name="send"
              size={widthInDp(5)}
              color={COLORS.numColor}
            />
          )}
        </TouchableOpacity>
      </View>
      {commentsVisible && <PostsComments postsComments={item.comments} />}
    </>
  );
};
const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  indicatorStyle: {flex: 1, backgroundColor: COLORS.white},
  mainContainer: {
    // flex: 1,
    paddingHorizontal: widthInDp(3),
    // backgroundColor: COLORS.white,/
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
  backgroundVideo: {
    flex: 1,
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
  },
});
