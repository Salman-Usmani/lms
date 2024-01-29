import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTS} from '../../../../themes';
import {IGroups} from '../../../../types';
import {heightInDp, widthInDp} from '../../../../utils';
import {ImageWithFallbabck} from '../../../../components';

const Item = ({item, onPress}: {item: IGroups; onPress: () => void}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
      <Image source={{uri: item.avatar}} style={styles.groupAvatar} />
      <View style={styles.flex}>
        <Text numberOfLines={1} style={styles.groupName}>
          {item.name}
        </Text>
        <Text numberOfLines={2} style={styles.groupDescription}>
          {item.description}
        </Text>

        <View style={styles.groupMembersView}>
          {item.groupMembers.slice(0, 3).map(
            (member, index) =>
              member.member?.avatar && (
                <View
                  key={member._id}
                  style={{
                    ...styles.memberImgView,
                    right: index * widthInDp(2),
                  }}>
                  <ImageWithFallbabck
                    source={member.member.avatar}
                    name={member.member.name}
                    diameter={widthInDp(5)}
                  />
                </View>
              ),
          )}
          <View style={styles.memberCountView}>
            <Text style={styles.memberCount}>+{item.groupMembers.length}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const Separator = () => <View style={styles.separator} />;
const ListEmptyComponent = () => (
  <View style={styles.flex}>
    <Text>No group found</Text>
  </View>
);
export const Groups = ({
  groups,
  onPress,
}: {
  groups: IGroups[] | [];
  onPress: (item: IGroups) => void;
}) => {
  const renderItem = ({item}: {item: IGroups}) => {
    return <Item item={item} onPress={() => onPress(item)} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Groups</Text>
      <FlatList
        scrollEnabled={false}
        data={groups}
        renderItem={renderItem}
        keyExtractor={Item => Item._id}
        style={styles.listStyle}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    borderWidth: widthInDp(0.5),
    borderColor: COLORS.lightBlue,
    borderRadius: widthInDp(5),
    gap: widthInDp(5),
    padding: widthInDp(3),
  },
  heading: {
    fontFamily: FONTS.InterRegular,
    fontSize: widthInDp(5),
    color: COLORS.primary,
    fontWeight: '700',
  },
  listStyle: {gap: widthInDp(5)},
  separator: {
    height: heightInDp(1),
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: widthInDp(0.3),
    borderColor: COLORS.lightBlue,
    borderRadius: widthInDp(3),
    gap: widthInDp(3),
    padding: widthInDp(3),
  },
  groupAvatar: {
    borderRadius: widthInDp(3),
    borderWidth: 1,
    height: widthInDp(23),
    width: widthInDp(25),
  },
  groupName: {
    fontFamily: FONTS.InterRegular,
    fontSize: widthInDp(4),
    color: COLORS.black,
    fontWeight: '700',
  },
  groupDescription: {
    fontFamily: FONTS.InterRegular,
    fontSize: widthInDp(4),
    color: COLORS.black,
  },
  groupMembersView: {flexDirection: 'row'},
  memberImgView: {
    borderRadius: widthInDp(5),
    borderColor: COLORS.white,
    borderWidth: widthInDp(1),
    width: widthInDp(7),
    height: widthInDp(7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberImg: {borderRadius: widthInDp(5), borderWidth: 1},
  memberCountView: {
    borderRadius: widthInDp(5),
    borderWidth: widthInDp(0.3),
    borderColor: COLORS.lightBlue,
    borderStyle: 'dashed',
    width: widthInDp(7),
    height: widthInDp(7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberCount: {fontSize: widthInDp(3)},
});
