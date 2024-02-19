import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ImageWithFallbabck} from '../../../../components';
import {widthInDp} from '../../../../utils';
import {COLORS, FONTS, ICONS} from '../../../../themes';
import {CreatePostModal} from './createPostModal';
import React, {useState} from 'react';
import {IGroupPost} from './interface';
import {UserData} from '../../../../types';

export const CreatePost = ({
  groupPosts,
  user,
  _id,
}: {
  groupPosts: IGroupPost[];
  user: UserData | null;
  _id: string;
}) => {
  const [isModal, setShowModal] = useState(false);

  return (
    <View style={styles.addPowtView}>
      <ImageWithFallbabck
        source={user?.avatar}
        name={user?.name || ''}
        diameter={widthInDp(13)}
      />

      <TouchableOpacity
        onPress={() => {
          setShowModal(true);
        }}
        style={[styles.container, styles.rowContainer]}>
        <Text style={styles.addPostText}>Add new post here</Text>
        <View style={styles.iconView}>
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
      <CreatePostModal
        visible={isModal}
        onRequestClose={() => {
          setShowModal(false);
        }}
        setGroupPosts={item => groupPosts.unshift(item)}
        avatar={user?.avatar}
        name={user?.name}
        groupId={_id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  addPowtView: {flex: 1, flexDirection: 'row', columnGap: widthInDp(2)},
  container: {
    flex: 1,
    borderWidth: widthInDp(0.3),
    borderColor: COLORS.lightBlue,
    borderRadius: widthInDp(3),
    gap: widthInDp(3),
    padding: widthInDp(3),
    backgroundColor: COLORS.white,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addPostText: {fontFamily: FONTS.InterRegular},
  iconView: {flexDirection: 'row', gap: widthInDp(2)},
});
