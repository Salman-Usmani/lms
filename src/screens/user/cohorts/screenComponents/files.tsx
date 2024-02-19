import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, ICONS} from '../../../../themes';
import {CohortStackScreensList} from '../../../../types';
import {
  fileDownloader,
  getExtensionFromUrl,
  widthInDp,
} from '../../../../utils';
import {IFile} from './interface';

type FileType = 'pdf' | 'ppt' | 'video';

const Item = ({
  item,
  onPress,
  fileType,
  onPressDownload,
}: {
  item: IFile;
  onPress: () => void;
  onPressDownload: () => void;
  fileType: FileType;
}) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={onPress} style={styles.fileButtonStyle}>
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
      {item.isDownloadable && (
        <TouchableOpacity onPress={onPressDownload}>
          <ICONS.MaterialIcons
            name="download"
            size={widthInDp(5)}
            color={COLORS.black}
            style={styles.downloadIcon}
          />
        </TouchableOpacity>
      )}
    </View>
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
          const extension = getExtensionFromUrl(item.url || item.viewUrl || '');
          if (extension === 'pdf' || fileType !== 'ppt') {
            navigation.navigate('Media', {
              fileType: extension === 'pdf' ? 'pdf' : fileType,
              url: item.url || item.viewUrl || '',
            });
          }
        }}
        onPressDownload={() => {
          fileDownloader({
            fileUrl: item.downloadUrl || '',
            title: item.title,
          });
        }}
      />
    );
  };

  return (
    <FlatList
      data={files}
      renderItem={renderItem}
      keyExtractor={Item => Item._id}
    />
  );
};

const styles = StyleSheet.create({
  fileButtonStyle: {
    flexDirection: 'row',
    padding: widthInDp(2),
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  titleView: {
    flexDirection: 'row',
    gap: widthInDp(5),
    flex: 1,
  },
  title: {color: COLORS.black, flex: 1, fontFamily: FONTS.InterRegular},
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    flex: 1,
    alignItems: 'center',
  },
  downloadIcon: {margin: widthInDp(2)},
});
