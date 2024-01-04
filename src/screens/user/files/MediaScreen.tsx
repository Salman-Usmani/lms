import {StatusBar, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {CohortStackNavigagtionProps} from '../../../types';
import Pdf from 'react-native-pdf';
import VideoPlayer from 'react-native-video-controls';
import {heightInDp, widthInDp} from '../../../utils';

const MediaScreen = ({
  navigation,
  route,
}: CohortStackNavigagtionProps<'Media'>) => {
  const {fileType, url} = route.params;
  return (
    <View style={{flex: 1}}>
      <StatusBar hidden />
      {fileType === 'pdf' ? (
        <View style={styles.container}>
          <Pdf
            source={{
              uri: url,
            }}
            trustAllCerts={false}
            onLoadProgress={(percent: number) => console.log(percent)}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={error => {
              console.log('error', error);
            }}
            onPressLink={uri => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf}
          />
        </View>
      ) : (
        fileType === 'video' && (
          <View
            style={{
              flex: 1,
            }}>
            <VideoPlayer
              source={{
                uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              }}
              navigator={navigation}
              toggleResizeModeOnFullscreen={true}
            />
          </View>
        )
      )}
    </View>
  );
};

export default MediaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    height: '100%',
    width: '100%',
  },
});
