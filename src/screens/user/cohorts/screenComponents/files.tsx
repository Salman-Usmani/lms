import React from 'react';

import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {COLORS, ICONS} from '../../../../themes';
import {heightInDp, widthInDp} from '../../../../utils';
import {CohortStackScreensList} from '../../../../types';

interface IFile {
  url: string;
  title: string;
  isDownloadable: boolean;
  _id: string;
}
type FileType = 'pdf' | 'ppt' | 'video';

const Item = ({
  item,
  onPress,
  fileType,
}: {
  item: IFile;
  onPress: () => void;
  fileType: FileType;
}) => {
  return (
    <TouchableOpacity
      key={item._id}
      onPress={onPress}
      style={[styles.fileButtonStyle]}>
      <View style={styles.titleView}>
        {fileType === 'pdf' ? (
          <ICONS.MaterialIcons
            name="picture-as-pdf"
            size={widthInDp(5)}
            color={COLORS.black}
          />
        ) : fileType === 'ppt' ? (
          <ICONS.MaterialCommunityIcons
            name="file"
            size={widthInDp(5)}
            color={COLORS.black}
          />
        ) : (
          <ICONS.FontAwesome6
            name="play"
            size={widthInDp(5)}
            color={COLORS.black}
          />
        )}
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const Files = ({
  files,
  fileType,
}: {
  files: IFile[];
  fileType: FileType;
}) => {
  const navigation =
    useNavigation<StackNavigationProp<CohortStackScreensList>>();

  const renderItem = ({item}: {item: IFile}) => {
    return (
      <Item
        item={item}
        fileType={fileType}
        onPress={() => {
          if (fileType !== 'ppt') {
            navigation.navigate('Media', {fileType, url: item.url});
          }
        }}
      />
    );
  };

  return <FlatList data={files} renderItem={renderItem} nestedScrollEnabled />;
};

const styles = StyleSheet.create({
  fileContainer: {
    rowGap: heightInDp(1),
  },
  fileButtonStyle: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    padding: widthInDp(2),
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderRadius: widthInDp(2),
  },
  titleView: {
    flexDirection: 'row',
    gap: widthInDp(5),
    flex: 1,
  },
  title: {color: COLORS.black, flex: 1},
});
