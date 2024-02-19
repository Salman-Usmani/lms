import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import Toast from 'react-native-toast-message';
import {Button, ImagePicker} from '../../../../components';
import {dataServer} from '../../../../services/axiosConfig';
import {FONTS} from '../../../../themes';
import {IMedia, UserData} from '../../../../types';
import {widthInDp} from '../../../../utils';

interface IImageBox {
  name?: string;
  avatar?: string;
  setUpdatedUser: (data: UserData) => void;
}

export const ImageBox = ({name, avatar, setUpdatedUser}: IImageBox) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(false);

  async function updateAvatar(data: IMedia) {
    try {
      setLoading(true);
      let imageData = new FormData();
      imageData.append('avatar', data);

      const avatarUpdateApi = await dataServer.put('user/avatar', imageData);
      setLoading(false);
      if (avatarUpdateApi.status === 200) {
        setUpdatedUser(avatarUpdateApi.data.data);
        await AsyncStorage.setItem(
          'userData',
          JSON.stringify(avatarUpdateApi.data.data),
        );
        Toast.show({
          type: 'success',
          text1: avatarUpdateApi.data.message,
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
            : error.response?.data || 'failed to update avatar',
      });
    }
  }
  return (
    <>
      <Image source={{uri: avatar}} style={styles.imageStyle} />
      <Text style={styles.title}>{name}</Text>
      <Button
        title={'Upload picture'}
        background={false}
        loading={isLoading}
        handlePress={() => {
          setShowModal(true);
        }}
      />
      <ImagePicker
        showModal={showModal}
        setShowModal={setShowModal}
        handleUpdateAvatar={updateAvatar}
      />
    </>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: widthInDp(50),
    height: widthInDp(50),
    borderRadius: widthInDp(100),
    alignSelf: 'center',
  },
  title: {
    fontSize: widthInDp(5),
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: FONTS.InterRegular,
  },
});
