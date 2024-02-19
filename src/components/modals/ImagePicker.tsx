import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {COLORS, FONTS, ICONS} from '../../themes';
import {heightInDp, widthInDp} from '../../utils';
import {IMedia} from '../../types';

type IImagePicker = {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  handleUpdateAvatar: (data: IMedia) => void;
};

export const ImagePicker = (props: IImagePicker) => {
  const {showModal, setShowModal, handleUpdateAvatar} = props;

  const DEFAULT_OPTIONS: ImageLibraryOptions & CameraOptions = {
    mediaType: 'photo',
    quality: 1,
    maxWidth: 0,
    maxHeight: 0,
    includeBase64: false,
    cameraType: 'back',
    selectionLimit: 1,
    saveToPhotos: false,
    includeExtra: false,
    presentationStyle: 'pageSheet',
  };

  const pickImage = async (pickType: 'GALLERY' | 'cAMERA') => {
    let result: ImagePickerResponse;
    if (pickType === 'GALLERY') {
      result = await launchImageLibrary(DEFAULT_OPTIONS);
    } else {
      result = await launchCamera(DEFAULT_OPTIONS);
    }

    if (result.didCancel) {
      // Alert.alert('User cancelled camera picker');
      return;
    } else if (result.errorCode === 'camera_unavailable') {
      // Alert.alert('Camera not available on device');
      return;
    } else if (result.errorCode === 'permission') {
      // Alert.alert('Permission not satisfied');
      return;
    } else if (result.errorCode === 'others') {
      // Alert.alert(result.errorMessage);
      return;
    } else if (result.assets) {
      const imageObject = {
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: result.assets[0].fileName,
      };
      handleUpdateAvatar(imageObject);
      setShowModal(false);
    }
  };

  return (
    <Modal
      visible={showModal}
      transparent={true}
      onRequestClose={() => {
        setShowModal(false);
      }}>
      <View style={styles.mainContainer}>
        <View style={styles.innerContainer}>
          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={styles.closeBtnStyle}>
            <ICONS.AntDesign
              name="closecircle"
              size={widthInDp(7)}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <View style={styles.textStyle}>
            <Text style={styles.txt1}>Choose a picture</Text>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              onPress={() => pickImage('cAMERA')}
              style={styles.btnView}>
              <Text style={styles.txt1}>Camera</Text>
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity
              onPress={() => pickImage('GALLERY')}
              style={styles.btnView}>
              <Text style={styles.txt1}>Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    backgroundColor: COLORS.white,
    elevation: 5,
    width: widthInDp(80),
    height: widthInDp(40),
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: widthInDp(50),
  },
  closeBtnStyle: {
    alignSelf: 'flex-end',
    borderRadius: widthInDp(5),
    overflow: 'hidden',
    position: 'absolute',
    backgroundColor: COLORS.error,
    padding: 1,
    right: -widthInDp(3),
    top: -widthInDp(3),
  },
  textStyle: {
    borderBottomWidth: 1,
    justifyContent: 'center',
    flex: 1.5,
  },
  separator: {
    borderLeftWidth: 1,
    height: '100%',
  },

  btnContainer: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt1: {
    fontSize: widthInDp(5),
    color: COLORS.primary,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: FONTS.InterRegular,
  },
  btnView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
