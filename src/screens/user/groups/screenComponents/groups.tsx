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

const Item = ({item, onPress}: {item: IGroups; onPress: () => void}) => {
  const itemsWithImages = item.groupMembers.filter(image =>
    image.member.hasOwnProperty('avatar'),
  );
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        flexDirection: 'row',
        borderWidth: widthInDp(0.3),
        borderColor: COLORS.lightBlue,
        borderRadius: widthInDp(3),
        gap: widthInDp(3),
        padding: widthInDp(3),
        // backgroundColor: COLORS.white,
      }}>
      <Image
        source={{uri: item.avatar}}
        // height={widthInDp(23)}
        // width={widthInDp(25)}
        style={{
          borderRadius: widthInDp(3),
          borderWidth: 1,
          height: widthInDp(23),
          width: widthInDp(25),
        }}
      />
      <View style={{flex: 1}}>
        <Text
          numberOfLines={1}
          style={{
            fontFamily: FONTS.InterRegular,
            fontSize: widthInDp(4),
            color: COLORS.black,
            fontWeight: '700',
          }}>
          {item.name}
        </Text>
        <Text
          numberOfLines={2}
          style={{
            fontFamily: FONTS.InterRegular,
            fontSize: widthInDp(4),
            color: COLORS.black,
          }}>
          {item.description}
        </Text>

        <View style={{flexDirection: 'row'}}>
          {itemsWithImages.slice(0, 3).map(
            (member, index) =>
              member.member?.avatar && (
                <View
                  key={member._id}
                  style={{
                    borderRadius: widthInDp(5),
                    right: index * widthInDp(2),
                    padding: index === 0 ? undefined : widthInDp(1),
                    borderColor: COLORS.white,
                    borderWidth: widthInDp(2),
                    width: widthInDp(7),
                    height: widthInDp(7),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{uri: member.member.avatar}}
                    height={widthInDp(5)}
                    width={widthInDp(5)}
                    resizeMode="contain"
                    style={{borderRadius: widthInDp(5), borderWidth: 1}}
                  />
                </View>
              ),
          )}
          <View
            style={{
              borderRadius: widthInDp(5),
              borderWidth: widthInDp(0.3),
              borderColor: COLORS.lightBlue,
              borderStyle: 'dashed',
              width: widthInDp(7),
              height: widthInDp(7),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: widthInDp(3)}}>
              +{item.groupMembers.length}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const Separator = () => <View style={styles.separator} />;
const ListEmptyComponent = () => (
  <View style={styles.mainContainer}>
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
      <Text
        style={{
          fontFamily: FONTS.InterRegular,
          fontSize: widthInDp(5),
          color: COLORS.primary,
          fontWeight: '700',
        }}>
        Groups
      </Text>
      <FlatList
        scrollEnabled={false}
        data={groups}
        renderItem={renderItem}
        keyExtractor={Item => Item._id}
        style={{gap: widthInDp(5)}}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
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
  separator: {
    height: heightInDp(1), // Adjust the height of the separator as needed
    // backgroundColor: COLORS.lightGray, // Separator color
    // marginHorizontal: widthInDp(3),
  },
});
