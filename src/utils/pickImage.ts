import {
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';

export const pickImage = async (pickType: 'GALLERY' | 'cAMERA' | 'VIDEO') => {
  const DEFAULT_OPTIONS: ImageLibraryOptions & CameraOptions = {
    mediaType: pickType === 'VIDEO' ? 'video' : 'photo',
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
  let result: ImagePickerResponse;
  if (pickType === 'GALLERY' || pickType === 'VIDEO') {
    result = await launchImageLibrary(DEFAULT_OPTIONS);
  } else {
    result = await launchCamera(DEFAULT_OPTIONS);
  }

  if (result.didCancel) {
    Toast.show({
      type: 'error',
      text1: 'User cancelled camera picker',
    });
    return null;
  } else if (result.errorCode === 'camera_unavailable') {
    Toast.show({
      type: 'error',
      text1: 'Camera not available on device',
    });
    return null;
  } else if (result.errorCode === 'permission') {
    Toast.show({
      type: 'error',
      text1: 'Permission not satisfied',
    });
    return null;
  } else if (result.errorCode === 'others') {
    Toast.show({
      type: 'error',
      text1: result.errorMessage,
    });
    return null;
  } else if (result.assets) {
    return {
      uri: result.assets[0].uri,
      type: result.assets[0].type,
      name: result.assets[0].fileName,
    };
  }
};
