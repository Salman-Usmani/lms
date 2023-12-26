import moment from 'moment';
import React, {useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {COLORS, ICONS} from '../../../../themes';
import {IComments} from '../../../../types';
import {heightInDp, widthInDp} from '../../../../utils';
import {CommentDeletePrompt} from './deleteComment';

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
        showModal={isDeleteModal ? true : false}
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
      <View style={{flex: 1, flexDirection: 'row'}}>
        {item?.user?.avatar ? (
          <Image
            source={{uri: item.user.avatar}}
            style={{
              height: widthInDp(8),
              width: widthInDp(8),
              borderRadius: widthInDp(100),
            }}
          />
        ) : (
          <View
            style={{
              backgroundColor: COLORS.lightGray,
              borderRadius: widthInDp(100),
              width: widthInDp(8),
              height: widthInDp(8),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ICONS.FontAwesome6
              name="user-large"
              size={widthInDp(4)}
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
              fontSize: widthInDp(3),
            }}>
            {item.user?.name}
          </Text>

          <Text
            style={{
              color: COLORS.textSecondary,
              fontWeight: '500',
              fontSize: widthInDp(3),
            }}>
            <Text style={{color: COLORS.textHighlight, fontWeight: '600'}}>
              {item.user?.email}
            </Text>
            , {moment(item.createdAt).fromNow()}
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
        }}>
        <Text
          style={{
            color: COLORS.textSecondary,
            fontSize: widthInDp(4),
            marginRight: widthInDp(5),
          }}>
          {item.content}
        </Text>
        {userId === item.user?._id && (
          <ICONS.Ionicons
            onPress={onPressDelete}
            name="trash"
            color={COLORS.error}
            size={widthInDp(5)}
            style={{alignSelf: 'flex-end'}}
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
  separator: {
    height: heightInDp(1),
  },
});
