import {
  Image,
  StyleSheet,
  Text,
  //   TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Modal} from 'react-native';
import {heightInDp, pickImage, toastConfig, widthInDp} from '../../../../utils';
import {COLORS, FONTS, ICONS} from '../../../../themes';
import {Button, FloatingTitleTextInputField} from '../../../../components';
import {TextInput} from 'react-native-paper';
import {SvgXml} from 'react-native-svg';
import {videoUploadIcon} from '../../../../assets';
import DocumentPicker from 'react-native-document-picker';
import {dataServer} from '../../../../services/axiosConfig';
import Toast from 'react-native-toast-message';
import {Controller, useForm} from 'react-hook-form';
import {IGroupPost} from '../../../../types';
import VideoPlayer from 'react-native-video-controls';

type TgroupPost = {
  content?: string;
  groupId: string;
  mediaId?: string;
  title: string;
};

export const CreatePostModal = ({
  visible,
  onRequestClose,
  avatar,
  name,
  groupId,
  setGroupPosts,
}: {
  visible: boolean;
  onRequestClose: () => void;
  setGroupPosts: (item: IGroupPost) => void;
  avatar?: string;
  name?: string;
  groupId: string;
}) => {
  const [postMedia, setPostMedia] = useState<
    | {
        uri: string | undefined | null;
        type: string | undefined | null;
        name: string | undefined | null;
      }
    | null
    | undefined
  >(null);
  const [isLoading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors},
  } = useForm<TgroupPost>();
  useEffect(() => {
    setValue('groupId', groupId);
  }, []);

  async function onCreatePost(data: TgroupPost) {
    try {
      setLoading(true);

      const uploadMediaApi = await dataServer.post('user/post', data);
      if (uploadMediaApi.status === 200) {
        console.log('skdnflalsa', uploadMediaApi.data.data);
        setGroupPosts(uploadMediaApi.data.data.post);
        setLoading(false);
        onRequestClose();
        Toast.show({
          type: 'success',
          text1: uploadMediaApi.data.message,
        });
      }
    } catch (error: any) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: Array.isArray(error?.response?.data?.errors)
          ? error?.response?.data?.errors[0]
          : error?.response?.data.message
            ? error?.response?.data.message
            : error.response?.data || 'failed to get groups',
      });
    }
  }
  async function onMediaDelete() {
    try {
      setLoading(true);

      const deleteMediaApi = await dataServer.delete('s3/upload', {
        data: {fileId: getValues('mediaId')},
      });
      if (deleteMediaApi.status === 200) {
        setValue('mediaId', '');
        setPostMedia(null);
        setLoading(false);
        Toast.show({
          type: 'success',
          text1: deleteMediaApi.data.message,
        });
      }
    } catch (error: any) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: Array.isArray(error?.response?.data?.errors)
          ? error?.response?.data?.errors[0]
          : error?.response?.data.message
            ? error?.response?.data.message
            : error.response?.data || 'failed to get groups',
      });
    }
  }
  async function onMediaSelect(
    data:
      | {
          uri: string | undefined | null;
          type: string | undefined | null;
          name: string | undefined | null;
        }
      | null
      | undefined,
  ) {
    try {
      setLoading(true);
      let imageData = new FormData();
      imageData.append('file', data);
      imageData.append('fileType', 'post');

      const uploadMediaApi = await dataServer.post('s3/upload', imageData);
      if (uploadMediaApi.status === 200) {
        setValue('mediaId', uploadMediaApi.data.data.file._id);
        setLoading(false);
        Toast.show({
          type: 'success',
          text1: uploadMediaApi.data.message,
        });
        setPostMedia(data);
      }
    } catch (error: any) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: Array.isArray(error?.response?.data?.errors)
          ? error?.response?.data?.errors[0].message
          : error?.response?.data.message
            ? error?.response?.data.message
            : error.response?.data || 'failed to get groups',
      });
    }
  }

  return (
    <Modal visible={visible} transparent={true} onRequestClose={onRequestClose}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.heading}>Create Post</Text>
            <TouchableOpacity
              onPress={onRequestClose}
              style={styles.closeBtnStyle}>
              <ICONS.AntDesign
                name="closecircle"
                size={widthInDp(7)}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.userView}>
            <Image source={{uri: avatar}} style={styles.avatar} />
            <Text style={styles.userName}>{name}</Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: widthInDp(5),
                fontWeight: '500',
                color: COLORS.black,
                marginBottom: heightInDp(1),
              }}>
              Add post title <Text style={{color: COLORS.error}}>*</Text>
            </Text>

            <Controller
              control={control}
              rules={{
                required: 'Title is required',
              }}
              render={({field: {onChange, value}}) => (
                <FloatingTitleTextInputField
                  title="Text"
                  value={value}
                  keyboardType={'default'}
                  onChange={onChange}
                  errorMsg={errors.title && errors.title.message}
                />
              )}
              name={'title'}
            />
            {/* <FloatingTitleTextInputField
              title="Text"
              value={postTitle}
              keyboardType={'default'}
              onChange={text => {
                setPostTitle(text);
              }}
              errorMsg={''}
            /> */}

            <Controller
              control={control}
              rules={{
                required:
                  getValues('content') || getValues('mediaId')
                    ? false
                    : 'Description is required',
              }}
              render={({field: {onChange, value}}) => (
                <>
                  <View
                    style={{
                      // flex: 1,
                      height: heightInDp(15),
                      borderWidth: 0.5,
                      borderColor: errors.content?.message
                        ? COLORS.error
                        : COLORS.darkGray,
                      borderRadius: widthInDp(2),
                      marginTop: heightInDp(2),
                      rowGap: heightInDp(1),
                    }}>
                    <TextInput
                      multiline
                      label={'Post Description'}
                      value={value}
                      onChangeText={onChange}
                      underlineStyle={{height: 0}}
                      contentStyle={{padding: 0, textAlignVertical: 'top'}}
                      error={errors.content?.message ? true : false}
                      theme={{
                        colors: {
                          primary: COLORS.primary,
                          error: COLORS.error,
                          secondary: COLORS.secondary,
                        },
                      }}
                      style={{
                        flex: 1,
                        textAlignVertical: 'top',
                        backgroundColor: COLORS.white,
                        padding: 0,
                        //   borderWidth: 0.5,
                        fontFamily: FONTS.InterRegular,
                        borderColor: errors.content?.message
                          ? COLORS.error
                          : undefined,
                        borderRadius: widthInDp(2),
                        borderTopLeftRadius: widthInDp(2),
                        borderTopRightRadius: widthInDp(2),
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'flex-end',
                        position: 'absolute',
                        columnGap: widthInDp(3),
                        bottom: heightInDp(1),
                        right: widthInDp(1),
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          pickImage('GALLERY').then(data => {
                            onMediaSelect(data);
                          });
                        }}
                        style={{}}>
                        <ICONS.FontAwesome5
                          name="images"
                          size={widthInDp(5)}
                          color={COLORS.primary}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          pickImage('VIDEO').then(data => {
                            // console.log('adjlkasdjlakdjfkld', data);
                            onMediaSelect(data);
                          });
                        }}
                        style={{}}>
                        <SvgXml
                          xml={videoUploadIcon}
                          height={widthInDp(5)}
                          width={widthInDp(5)}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          DocumentPicker.pick({
                            // type: types.pdf,
                          })
                            .then(result => {
                              onMediaSelect({
                                uri: result[0].uri,
                                type: result[0].type,
                                name: result[0].name,
                              });
                              // setPostMedia({
                              //   uri: result[0].uri,
                              //   type: result[0].type,
                              //   name: result[0].name,
                              // });
                            })
                            .catch(error => {
                              console.log('sknfa;sfa;k', error);
                            });
                        }}
                        style={{}}>
                        <ICONS.SimpleLineIcons
                          name="paper-clip"
                          size={widthInDp(5)}
                          color={COLORS.numColor}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <ICONS.FontAwesome5
                          name="smile"
                          size={widthInDp(5)}
                          color={COLORS.numColor}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {errors.content?.message && (
                    <Text
                      style={{
                        color: COLORS.error,
                        marginHorizontal: widthInDp(3),
                        fontFamily: FONTS.InterRegular,
                      }}>
                      {errors.content?.message}
                    </Text>
                  )}
                </>
              )}
              name={'content'}
            />

            {postMedia?.type?.includes('image') && postMedia.uri ? (
              <View style={{marginTop: heightInDp(2)}}>
                <TouchableOpacity
                  onPress={onMediaDelete}
                  style={{
                    position: 'absolute',
                    alignSelf: 'flex-end',
                    padding: widthInDp(2),
                    // right: 0,
                    zIndex: 999,
                  }}>
                  <ICONS.AntDesign
                    name="closecircle"
                    size={widthInDp(5)}
                    color={COLORS.white}
                  />
                </TouchableOpacity>
                <Image
                  source={{uri: postMedia.uri}}
                  style={{
                    height: heightInDp(20),
                    width: 'auto',
                    borderRadius: widthInDp(2),
                  }}
                />
              </View>
            ) : postMedia?.type?.includes('application') ? (
              <View
                style={{
                  flexDirection: 'row',
                  gap: widthInDp(3),
                  marginTop: heightInDp(2),
                }}>
                <ICONS.SimpleLineIcons
                  name="paper-clip"
                  size={widthInDp(5)}
                  color={COLORS.numColor}
                />
                <Text style={{color: COLORS.linkColor}}>{postMedia.name}</Text>
              </View>
            ) : (
              postMedia?.type?.includes('video') &&
              postMedia.uri && (
                <View
                  style={{
                    height: heightInDp(30),
                    marginTop: heightInDp(2),
                    width: 'auto',
                    borderRadius: widthInDp(3),
                  }}>
                  <VideoPlayer
                    tapAnywhereToPause
                    disableBack
                    source={{
                      uri: postMedia?.uri,
                    }}
                    // navigator={navigation}
                    toggleResizeModeOnFullscreen={true}
                  />
                </View>
              )
            )}
          </View>
          <Button
            title={'Post'}
            background={true}
            loading={isLoading}
            handlePress={handleSubmit(onCreatePost)}
            containerStyle={{
              borderRadius: widthInDp(2),
              marginTop: heightInDp(2),
            }}
          />
        </View>
      </View>
      <Toast position="bottom" bottomOffset={20} config={toastConfig} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    alignSelf: 'center',
    width: widthInDp(90),
    // height: heightInDp(70),
    backgroundColor: COLORS.white,
    borderRadius: widthInDp(2),
    padding: widthInDp(5),
    // position: 'absolute',
    // top: heightInDp(15),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.4,
    borderBottomColor: COLORS.lightGray,
  },
  heading: {
    flex: 1,
    paddingBottom: widthInDp(3),
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: widthInDp(5),
    fontWeight: '500',
    color: COLORS.primary,
  },
  closeBtnStyle: {
    overflow: 'hidden',
    position: 'absolute',
    alignSelf: 'center',
    right: 0,
    bottom: widthInDp(3),
  },
  userView: {
    flexDirection: 'row',
    marginVertical: widthInDp(3),
    alignItems: 'center',
  },
  avatar: {
    height: widthInDp(15),
    width: widthInDp(15),
    borderRadius: widthInDp(15),
  },
  userName: {
    color: COLORS.textHighlight,
    fontWeight: '600',
    fontSize: widthInDp(4),
    marginLeft: widthInDp(3),
  },
});
