import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {TextInput} from 'react-native-paper';
import {SvgXml} from 'react-native-svg';
import Toast from 'react-native-toast-message';
import VideoPlayer from 'react-native-video-controls';
import EmojiPicker, {EmojiType} from 'rn-emoji-keyboard';
import {videoUploadIcon} from '../../../../assets';
import {
  Button,
  FloatingTitleTextInputField,
  ImageWithFallbabck,
} from '../../../../components';
import {dataServer} from '../../../../services/axiosConfig';
import {COLORS, FONTS, ICONS, THEME_COLORS} from '../../../../themes';
import {heightInDp, pickImage, toastConfig, widthInDp} from '../../../../utils';
import {PostMedia} from './postMedia';
import {IPostModal, TgroupPost} from './interface';
import {IMedia} from '../../../../types';

export const CreatePostModal = ({
  visible,
  onRequestClose,
  avatar,
  name,
  groupId,
  setGroupPosts,
}: IPostModal) => {
  const [postMedia, setPostMedia] = useState<IMedia>(null);
  const [isLoading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: {errors},
  } = useForm<TgroupPost>({
    defaultValues: {
      content: '',
      title: '',
      mediaId: '',
      groupId,
    },
  });

  async function onCreatePost(data: TgroupPost) {
    try {
      setLoading(true);

      const createPostApi = await dataServer.post('user/post', data);
      if (createPostApi.status === 200) {
        setGroupPosts(createPostApi.data.data.post);
        setLoading(false);
        onClose();
        Toast.show({
          type: 'success',
          text1: createPostApi.data.message,
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
            : error.response?.data || 'failed to create post',
      });
    }
  }
  async function onMediaSelect(data: IMedia) {
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
            : error.response?.data || 'failed to upload media',
      });
    }
  }
  function onClose() {
    reset({content: '', groupId: '', mediaId: '', title: ''});
    setPostMedia(null);
    onRequestClose();
  }
  function handlePick(emoji: EmojiType): void {
    setValue('content', watch('content') + emoji.emoji);
  }

  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.heading}>Create Post</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtnStyle}>
              <ICONS.AntDesign
                name="closecircle"
                size={widthInDp(7)}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.userView}>
            <ImageWithFallbabck
              source={avatar}
              name={name || ''}
              diameter={widthInDp(13)}
            />
            <Text style={styles.userName}>{name}</Text>
          </View>

          <Text style={styles.addTitle}>
            Add post title <Text style={styles.titleImportance}>*</Text>
          </Text>

          <FloatingTitleTextInputField
            title="Title"
            keyboardType={'default'}
            errorMsg={errors?.title?.message}
            name={'title'}
            control={control}
          />

          <Controller
            control={control}
            rules={{
              required:
                watch('content') || watch('mediaId')
                  ? false
                  : 'Description is required',
            }}
            render={({field: {onChange, value}}) => (
              <>
                <View
                  style={{
                    ...styles.inputContainer,
                    borderColor: errors.content?.message
                      ? COLORS.error
                      : COLORS.darkGray,
                  }}>
                  <TextInput
                    multiline
                    label={'Post Description'}
                    value={value}
                    onChangeText={onChange}
                    underlineStyle={styles.underlineStyle}
                    error={errors.content?.message ? true : false}
                    theme={THEME_COLORS}
                    style={styles.inputStyle}
                  />
                  <View style={styles.iconContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        pickImage('GALLERY').then(data => {
                          onMediaSelect(data);
                        });
                      }}>
                      <ICONS.FontAwesome5
                        name="images"
                        size={widthInDp(5)}
                        color={COLORS.primary}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        pickImage('VIDEO').then(data => {
                          onMediaSelect(data);
                        });
                      }}>
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
                          })
                          .catch(error => {
                            console.log('sknfa;sfa;k', error);
                          });
                      }}>
                      <ICONS.SimpleLineIcons
                        name="paper-clip"
                        size={widthInDp(5)}
                        color={COLORS.numColor}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setIsOpen(true)}>
                      <ICONS.FontAwesome5
                        name="smile"
                        size={widthInDp(5)}
                        color={COLORS.numColor}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {errors.content?.message && (
                  <Text style={styles.errorText}>
                    {errors.content?.message}
                  </Text>
                )}
              </>
            )}
            name={'content'}
          />
          {postMedia && (
            <PostMedia
              mediaId={watch('mediaId') || ''}
              onMediaDelete={() => {
                setValue('mediaId', '');
                setPostMedia(null);
              }}
              postMedia={postMedia}
            />
          )}

          <Button
            title={'Post'}
            background={true}
            loading={isLoading}
            handlePress={handleSubmit(onCreatePost)}
            containerStyle={styles.postBtn}
          />
        </View>
      </View>
      <Toast position="bottom" bottomOffset={20} config={toastConfig} />
      <EmojiPicker
        onEmojiSelected={handlePick}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
  },
  addTitle: {
    fontSize: widthInDp(5),
    fontWeight: '500',
    color: COLORS.black,
    marginBottom: heightInDp(1),
  },
  titleImportance: {color: COLORS.error},
  container: {
    alignSelf: 'center',
    width: widthInDp(90),
    backgroundColor: COLORS.white,
    borderRadius: widthInDp(2),
    padding: widthInDp(5),
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

  userName: {
    color: COLORS.textHighlight,
    fontWeight: '600',
    fontSize: widthInDp(4),
    marginLeft: widthInDp(3),
  },
  inputContainer: {
    height: heightInDp(15),
    backgroundColor: COLORS.disable,
    borderWidth: 0.5,
    borderRadius: widthInDp(2),
    marginTop: heightInDp(2),
    rowGap: heightInDp(1),
  },
  underlineStyle: {height: 0},
  inputStyle: {
    flex: 1,
    textAlignVertical: 'top',
    backgroundColor: 'transparent',
    padding: 0,
    fontFamily: FONTS.InterRegular,
    borderRadius: widthInDp(2),
    borderTopLeftRadius: widthInDp(2),
    borderTopRightRadius: widthInDp(2),
  },
  iconContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    position: 'absolute',
    columnGap: widthInDp(3),
    bottom: heightInDp(1),
    right: widthInDp(1),
  },

  errorText: {
    color: COLORS.error,
    marginHorizontal: widthInDp(3),
    fontFamily: FONTS.InterRegular,
  },
  postTypeImage: {marginTop: heightInDp(2)},
  postTypeDoc: {
    flexDirection: 'row',
    gap: widthInDp(3),
    marginTop: heightInDp(2),
  },
  postTypeVideo: {
    height: heightInDp(20),
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
    height: heightInDp(20),
    width: 'auto',
    borderRadius: widthInDp(2),
  },
  postDoc: {color: COLORS.linkColor},
  postBtn: {
    borderRadius: widthInDp(2),
    marginTop: heightInDp(2),
  },
});
