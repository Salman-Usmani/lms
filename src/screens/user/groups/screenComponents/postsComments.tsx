import moment from 'moment';
import React, {useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {COLORS, ICONS} from '../../../../themes';
import {heightInDp, widthInDp} from '../../../../utils';
import {CommentDeletePrompt} from './deleteComment';
import {ImageWithFallbabck} from '../../../../components';
import {IComments} from './interface';

export const PostsComments = ({
  postsComments,
  userId,
  onDeleteComment,
}: {
  postsComments: IComments[] | [];
  userId: string;
  onDeleteComment: (commentId: string) => void;
}) => {
  const [isDeleteModal, setDeleteModal] = useState('');
  const renderItem = ({item}: {item: IComments}) => {
    return (
      <Item
        item={item}
        userId={userId}
        onPressDelete={() => setDeleteModal(item._id)}
      />
    );
  };
  return (
    <>
      <FlatList
        scrollEnabled={false}
        data={postsComments}
        renderItem={renderItem}
        keyExtractor={Item => Item._id}
        ListHeaderComponent={() => (
          <Text style={styles.headerText}>Replies</Text>
        )}
        style={styles.listStyle}
        ItemSeparatorComponent={Separator}
      />
      <CommentDeletePrompt
        showModal={!!isDeleteModal}
        setShowModal={() => {
          setDeleteModal('');
        }}
        handleDeleteComment={() => {
          onDeleteComment(isDeleteModal);
          setDeleteModal('');
        }}
      />
    </>
  );
};

const Item = ({
  item,
  userId,
  onPressDelete,
}: {
  item: IComments;
  userId: string;
  onPressDelete: () => void;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileView}>
        <ImageWithFallbabck
          source={item?.user?.avatar}
          name={item.user?.name || ''}
          diameter={widthInDp(8)}
        />

        <View style={styles.userDetailView}>
          <Text style={styles.userName}>{item.user?.name}</Text>
          <Text style={styles.userCreatedAt}>
            <Text style={styles.userMail}>{item.user?.email}</Text>,{' '}
            {moment(item.createdAt).fromNow()}
          </Text>
        </View>
      </View>

      <View style={styles.commentView}>
        <Text style={styles.comment}>{item.content}</Text>
        {userId === item.user?._id && (
          <ICONS.Ionicons
            onPress={onPressDelete}
            name="trash"
            color={COLORS.error}
            size={widthInDp(5)}
            style={styles.trashIconStyle}
          />
        )}
      </View>
    </View>
  );
};
const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  headerText: {
    color: COLORS.textPrimary,
    fontWeight: '700',
    fontSize: widthInDp(3),
    paddingHorizontal: widthInDp(3),
  },
  listStyle: {gap: widthInDp(5), marginVertical: heightInDp(2)},
  container: {
    flex: 1,
    // borderWidth: widthInDp(0.3),
    borderColor: COLORS.lightBlue,
    borderRadius: widthInDp(3),
    gap: widthInDp(3),
    paddingHorizontal: widthInDp(3),
    backgroundColor: COLORS.white,
  },
  separator: {height: heightInDp(1)},
  trashIconStyle: {alignSelf: 'flex-end'},
  profileView: {flex: 1, flexDirection: 'row'},
  avatar: {
    height: widthInDp(8),
    width: widthInDp(8),
    borderRadius: widthInDp(100),
  },
  noAvatarView: {
    backgroundColor: COLORS.lightGray,
    borderRadius: widthInDp(100),
    width: widthInDp(8),
    height: widthInDp(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDetailView: {
    flex: 1,
    marginLeft: widthInDp(3),
    justifyContent: 'space-around',
  },
  userName: {
    color: COLORS.textPrimary,
    fontWeight: '500',
    fontSize: widthInDp(3),
  },
  userCreatedAt: {
    color: COLORS.textSecondary,
    fontWeight: '500',
    fontSize: widthInDp(3),
  },
  userMail: {color: COLORS.textHighlight, fontWeight: '600'},
  commentView: {
    flex: 1,
  },
  comment: {
    color: COLORS.textSecondary,
    fontSize: widthInDp(4),
    marginRight: widthInDp(5),
  },
});
