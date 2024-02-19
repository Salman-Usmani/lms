import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import VideoPlayer from 'react-native-video-controls';
import {dataServer} from '../../../../services/axiosConfig';
import {COLORS, ICONS} from '../../../../themes';
import {heightInDp, widthInDp} from '../../../../utils';
import {IMedia} from '../../../../types';

export const PostMedia = ({
  mediaId,
  postMedia,
  onMediaDelete,
}: {
  mediaId: string;
  onMediaDelete: () => void;
  postMedia: IMedia;
}) => {
  const [isLoading, setLoading] = useState(false);

  async function handleMediaDelete() {
    try {
      setLoading(true);

      const deleteMediaApi = await dataServer.delete('s3/upload', {
        data: {fileId: mediaId},
      });
      if (deleteMediaApi.status === 200) {
        setLoading(false);
        Toast.show({
          type: 'success',
          text1: deleteMediaApi.data.message,
        });
        onMediaDelete();
      }
    } catch (error: any) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: Array.isArray(error?.response?.data?.errors)
          ? error?.response?.data?.errors[0]
          : error?.response?.data.message
            ? error?.response?.data.message
            : error.response?.data || 'failed to remove image',
      });
    }
  }
  if (isLoading) {
    return (
      <ActivityIndicator
        size={'large'}
        color={COLORS.primary}
        style={styles.flex}
      />
    );
  }

  return postMedia?.type?.includes('application') ? (
    <View style={styles.postTypeDoc}>
      <ICONS.SimpleLineIcons
        name="paper-clip"
        size={widthInDp(5)}
        color={COLORS.numColor}
      />
      <Text style={styles.postDoc}>{postMedia.name}</Text>
    </View>
  ) : (
    postMedia?.uri && (
      <View style={styles.postTypeVideo}>
        <TouchableOpacity onPress={handleMediaDelete} style={styles.ImgDelBtn}>
          <ICONS.AntDesign
            name="closecircle"
            size={widthInDp(5)}
            color={COLORS.white}
          />
        </TouchableOpacity>

        {postMedia?.type?.includes('image') ? (
          <Image source={{uri: postMedia.uri}} style={styles.postImage} />
        ) : (
          postMedia?.type?.includes('video') && (
            <VideoPlayer
              tapAnywhereToPause
              disableBack
              source={{
                uri: postMedia.uri,
              }}
              toggleResizeModeOnFullscreen={true}
            />
          )
        )}
      </View>
    )
  );
};

const styles = StyleSheet.create({
  flex: {
    marginVertical: heightInDp(2),
  },
  postTypeDoc: {
    flexDirection: 'row',
    gap: widthInDp(2),
    marginTop: heightInDp(2),
  },
  postTypeVideo: {
    height: heightInDp(25),
    marginTop: heightInDp(2),
    width: 'auto',
    borderRadius: widthInDp(3),
  },
  ImgDelBtn: {
    position: 'absolute',
    alignSelf: 'flex-end',
    padding: widthInDp(2),
    zIndex: 999,
  },
  postImage: {
    height: heightInDp(25),
    width: 'auto',
    borderRadius: widthInDp(2),
  },
  postDoc: {color: COLORS.linkColor, flex: 1},
});
