import React, {useState} from 'react';

import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {COLORS, FONTS, ICONS} from '../../../../themes';
import {heightInDp, widthInDp} from '../../../../utils';
import {CohortStackScreensList} from '../../../../types';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Toast from 'react-native-toast-message';
import RNFS from 'react-native-fs';

interface IFile {
  url?: string;
  viewUrl?: string;
  downloadUrl?: string;
  title: string;
  isDownloadable: boolean;
  _id: string;
}
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
  const [isLoading, setLoading] = useState(true);
  const navigation =
    useNavigation<StackNavigationProp<CohortStackScreensList>>();
  function getExtensionFromUrl(url: string) {
    // Split the URL by dot (.) and get the last part as the extension
    const parts = url.split('.');
    if (parts.length > 1) {
      return parts[parts.length - 1];
    } else {
      return ''; // No extension found
    }
  }

  async function downloadFileWithRetry(fileUrl = '', title: string) {
    if (!fileUrl) {
      return;
    }
    try {
      setLoading(true);

      const extension = getExtensionFromUrl(fileUrl);
      const fileName = fileUrl.split('/').pop();

      const localFile = `${RNFS.DownloadDirectoryPath}/${fileName}`;
      // ReactNativeBlobUtil.fs.dirs.DownloadDir + '/' + fileName;

      const exists = await ReactNativeBlobUtil.fs.exists(localFile);
      if (exists) {
        Toast.show({
          type: 'info',
          text1: 'file already exists',
        });
        return;
      }

      await ReactNativeBlobUtil.config({
        fileCache: false,
        appendExt: extension,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: title,
          path: localFile,
        },
        // path: localFile,
      })
        .fetch('GET', fileUrl)
        .progress((received, total) => {
          Toast.show({
            type: 'info',
            text1: `${((Number(received) / Number(total)) * 100).toFixed(
              2,
            )}% downloaded`,
          });
        })
        .then(res => {
          console.log('path', res.path());
        });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'info',
        text1: String(error),
      });
    }
  }

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
          downloadFileWithRetry(item.downloadUrl || item.url, item.title);
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
