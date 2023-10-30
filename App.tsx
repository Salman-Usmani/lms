import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';
// import VideoPlayer from 'react-native-video-controls';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './src/navigation';
import {navigationRef} from './src/services/axiosConfig';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/utils';
import {SafeAreaView} from 'react-native';
import {COLORS} from './src/themes';
import {UserProvider} from './src/context/UserContext';
import {StatusBar} from 'react-native';

const App: React.FC = () => {
  // const [showPDF, setShowPDF] = useState(false);
  // const [showVideo, setShowVideo] = useState(false);
  // const [isLoading, setLoading] = useState(false);
  // const [progress, setProgress] = useState(0);

  // const isShowPDF = () => {
  //   setShowPDF(true);
  //   setShowVideo(false);
  // };

  // const isShowVideo = () => {
  //   setShowPDF(false);
  //   setShowVideo(true);
  // };

  // const goBack = () => {
  //   setShowPDF(false);
  //   setShowVideo(false);
  // };

  //     'https://minwallamodel.com/api/v1/public/cohort/ppt/1691163593465.pptx';
  //    'https://minwallamodel.com/api/v1/public/cohort/pdf/1692043415252.pdf'; // Replace with your actual download link

  // const requestStoragePermission = async () => {
  //   const status = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

  //   if (status === 'granted') {
  //     console.log('Storage');
  //     // Permission already granted, proceed with the download
  //     downloadFileWithRetry(
  //       'https://www.sampledocs.in/DownloadFiles/SampleFile?filename=SampleDocs-samplepptx&ext=pptx',
  //     );
  //     // 'https://www.learningcontainer.com/download/10-mb-sample-ppt-file/?wpdmdl=1620&refresh=64e838e3c9f621692940515',
  //     // 'https://minwallamodel.com/api/v1/public/cohort/ppt/1691163593465.pptx',
  //   } else {
  //     // Permission not granted, request it from the user
  //     const result = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

  //     if (result === 'granted') {
  //       // Permission granted, proceed with the download
  //       console.log('Storage permission');
  //       downloadFileWithRetry(
  //         'https://www.sampledocs.in/DownloadFiles/SampleFile?filename=SampleDocs-samplepptx&ext=pptx',
  //       );
  //       // 'https://freetestdata.com/wp-content/uploads/2022/11/Free_Test_Data_10.5MB_PDF.pdf',
  //     } else {
  //       // Permission denied, handle accordingly (e.g., show an error message)
  //       console.log('Storage permission denied');
  //     }
  //   }
  // };
  // async function downloadFileWithRetry(fileUrl: string, retries = 3) {
  //   try {
  //     setLoading(true);

  //     // const extension = getUrlExtension(fileUrl);
  //     const fileName = fileUrl.split('/').pop();
  //     const localFile = ReactNativeBlobUtil.fs.dirs.CacheDir + '/' + fileName;

  //     const exists = await ReactNativeBlobUtil.fs.exists(localFile);
  //     if (exists) {
  //       setTimeout(() => {
  //         setLoading(false);
  //         FileViewer.open(localFile, {
  //           showOpenWithDialog: true,
  //           onDismiss: () => ReactNativeBlobUtil.fs.unlink(localFile),
  //         });
  //       }, 350);
  //       return;
  //     }
  //     const task: any = await ReactNativeBlobUtil.config({
  //       followRedirect: true,
  //       fileCache: true,
  //       appendExt: 'pptx',
  //       // appendExt: extension,
  //       // path: filepath,
  //     })
  //       .fetch('GET', fileUrl)
  //       .progress((received, total) => {
  //         // console.log('progress', received / total);
  //         setProgress(Number(received) / Number(total));
  //       });
  //     setLoading(false);
  //     FileViewer.open(task.data, {
  //       showOpenWithDialog: true,
  //       // onDismiss: () => ReactNativeBlobUtil.fs.unlink(res.path()),
  //     });
  //   } catch (error) {
  //     setLoading(false);
  //     Alert.alert('something went wrong', String(error));
  //     console.log('something went wrong', error);
  //   }
  // }
  return (
    <SafeAreaView style={styles.container}>
      <UserProvider>
        <NavigationContainer ref={navigationRef}>
          {/* <StatusBar hidden /> */}
          <AuthStack />
          <Toast position="bottom" bottomOffset={20} config={toastConfig} />
        </NavigationContainer>
      </UserProvider>
    </SafeAreaView>
  );
  // return !isLoading ? (
  //   <View
  //     style={{
  //       flex: 1,
  //       // backgroundColor: '#ffffff',
  //       justifyContent: 'center',
  //       gap: 15,
  //       paddingHorizontal: 20,
  //     }}>
  //     {showPDF || showVideo ? (
  //       <Button title="Go Back" onPress={goBack} />
  //     ) : (
  //       <>
  //         <Button title="Show PPT" onPress={requestStoragePermission} />
  //         <Button title="Show Vide0" onPress={isShowVideo} />
  //         <Button title="Show PDF" onPress={isShowPDF} />
  //       </>
  //     )}

  //     {showVideo && (
  //       // video control
  //       <VideoPlayer
  //         source={{
  //           uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  //         }}
  //         // navigator={() => setShowVideo(false)}
  //       />

  //     )}

  //     {showPDF && (
  //       <View style={styles.container}>
  //         <Pdf
  //           source={{
  //             uri: 'https://freetestdata.com/wp-content/uploads/2022/11/Free_Test_Data_10.5MB_PDF.pdf',
  //           }}
  //           trustAllCerts={false}
  //           onLoadProgress={(percent: number) => console.log(percent)}
  //           onLoadComplete={(numberOfPages, filePath) => {
  //             console.log(`Number of pages: ${numberOfPages}`);
  //           }}
  //           onPageChanged={(page, numberOfPages) => {
  //             console.log(`Current page: ${page}`);
  //           }}
  //           onError={error => {
  //             console.log(error);
  //           }}
  //           onPressLink={uri => {
  //             console.log(`Link pressed: ${uri}`);
  //           }}
  //           style={styles.pdf}
  //         />
  //       </View>
  //     )}
  //   </View>
  // ) : (
  //   <Modal animationType="fade" visible={isLoading}>
  //     <View style={styles.centeredView}>
  //       <View style={styles.modalView}>
  //         <ActivityIndicator size="large" color="gray" />
  //         <Text style={styles.text}>
  //           Progress... {(progress * 100).toFixed(2)}
  //         </Text>
  //       </View>
  //     </View>
  //   </Modal>
  // );
};

export default App;

// function getUrlExtension(url: string): string {
//   return url.split(/[#?]/)[0].split('.').pop().trim();
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  // pdf: {
  //   flex: 1,
  //   width: Dimensions.get('window').width,
  //   height: 3000,
  // },
  // centeredView: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   alignContent: 'center',
  //   backgroundColor: 'rgba(0,0,0,0.3)',
  // },
  // modalView: {
  //   width: 100,
  //   margin: 10,
  //   backgroundColor: 'white',
  //   borderRadius: 10,
  //   padding: 15,
  //   shadowColor: 'black',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.85,
  //   elevation: 5,
  // },
  // text: {
  //   textAlign: 'center',
  //   marginTop: 10,
  // },
  // backgroundVideo: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   bottom: 0,
  //   right: 0,
  // },
  // activityIndicator: {
  //   position: 'absolute',
  //   top: 70,
  //   left: 70,
  //   right: 70,
  //   height: 50,
  // },
  // player: {
  //   flex: 1,
  // },

  // toastText2: {
  //   paddingTop: 2,
  //   fontSize: 15,
  //   color: '#000000',
  //   textAlignVertical: 'center',
  // },
  // toastText1: {
  //   fontSize: 15,
  //   fontWeight: '400',
  //   textAlignVertical: 'center',
  // },
});
