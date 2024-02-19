import ReactNativeBlobUtil from 'react-native-blob-util';
import RNFS from 'react-native-fs';
import Toast from 'react-native-toast-message';

export function getExtensionFromUrl(url: string) {
  // Split the URL by dot (.) and get the last part as the extension
  const parts = url.split('.');
  if (parts.length > 1) {
    return parts[parts.length - 1];
  } else {
    return ''; // No extension found
  }
}
export async function fileDownloader({
  fileUrl,
  title,
}: {
  fileUrl: string;
  title: string;
}) {
  if (!fileUrl) {
    return;
  }
  try {
    const extension = getExtensionFromUrl(fileUrl);
    const fileName = fileUrl.split('/').pop();
    const localFile = `${RNFS.DownloadDirectoryPath}/${title}`;
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
        path: ReactNativeBlobUtil.wrap(localFile),
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
      .then(async res => {
        Toast.show({
          type: 'success',
          text1: 'success',
          text2: 'file successfully saved in downloads',
        });
      });
  } catch (error) {
    console.log('error', error);
    // Toast.show({
    //   type: 'info',
    //   text1: String(error),
    // });
  }
}
