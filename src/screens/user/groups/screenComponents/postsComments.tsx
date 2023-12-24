import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {IComments} from '../../../../types';
import {heightInDp, widthInDp} from '../../../../utils';
import {COLORS, FONTS, ICONS} from '../../../../themes';
import moment from 'moment';

export const PostsComments = ({
  postsComments,
}: {
  postsComments: IComments[] | [];
}) => {
  const renderItem = ({item}: {item: IComments}) => {
    return (
      <Item
        item={item} // onPress={() => onPress(item)}
      />
    );
  };
  return (
    <FlatList
      scrollEnabled={false}
      data={postsComments}
      renderItem={renderItem}
      keyExtractor={Item => Item._id}
      ListHeaderComponent={() => <Text style={styles.headerText}>Replies</Text>}
      style={styles.listStyle}
      ItemSeparatorComponent={Separator}
    />
  );
};

const Item = ({
  item, // onPress,
}: {
  item: IComments;
  // onPress: () => void;
}) => {
  const [commentsVisible, setCommentsVisible] = useState(false);

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
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: COLORS.textSecondary,
            fontSize: widthInDp(4),
            marginRight: widthInDp(5),
          }}>
          {item.content}
        </Text>
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
