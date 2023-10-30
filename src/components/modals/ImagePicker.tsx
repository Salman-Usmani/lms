import React from 'react';

import {Text, TouchableOpacity, View, Modal, StyleSheet} from 'react-native';
import {COLORS, ICONS} from '../../themes';
import {heightInDp, widthInDp} from '../../utils';
import {
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

type IImagePicker = {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  handleUpdateAvatar: ({
    uri,
    type,
    name,
  }: {
    uri: string | undefined;
    type: string | undefined;
    name: string | undefined;
  }) => void;
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
        <View
          style={{
            backgroundColor: COLORS.white,
            elevation: 5,
            width: widthInDp(80),
            height: widthInDp(40),
            alignSelf: 'center',
            borderRadius: 10,
            marginVertical: widthInDp(50),
          }}>
          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={{
              alignSelf: 'flex-end',
              borderRadius: widthInDp(5),
              overflow: 'hidden',
              position: 'absolute',
              backgroundColor: COLORS.error,
              padding: 1,
              right: -widthInDp(3),
              top: -widthInDp(3),
            }}>
            <ICONS.AntDesign
              name="closecircle"
              size={widthInDp(7)}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <View
            style={{
              borderBottomWidth: 1,

              justifyContent: 'center',
              flex: 1.5,
            }}>
            <Text style={[styles.txt1, {}]}>Choose a picture</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
              // paddin,
            }}>
            <View style={{flex: 1}}>
              <TouchableOpacity
                onPress={() => pickImage('cAMERA')}
                // onPress={() => {}}
                style={styles.btnView}>
                <Text style={styles.txt1}>Camera</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderLeftWidth: 1,
                height: '100%',
              }}
            />
            <View style={{flex: 1}}>
              <TouchableOpacity
                onPress={() => pickImage('GALLERY')}
                // onPress={() => {}}
                style={styles.btnView}>
                <Text style={styles.txt1}>Gallery</Text>
              </TouchableOpacity>
            </View>
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
  container: {
    alignSelf: 'center',
    width: widthInDp(90),
    height: heightInDp(70),
    backgroundColor: COLORS.white,
    borderRadius: widthInDp(2),
    padding: widthInDp(5),
    position: 'absolute',
    top: heightInDp(15),
  },
  btnContainer: {marginVertical: heightInDp(1), flexDirection: 'row'},
  dividerLine: {height: heightInDp(0.1), backgroundColor: 'lightgrey'},
  txt1: {
    fontSize: widthInDp(5),
    // textTransform: 'uppercase',
    color: COLORS.primary,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  btnView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
