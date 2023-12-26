import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import React, {useState} from 'react';
import {COLORS, FONTS, ICONS} from '../../../../themes';
import {heightInDp, widthInDp} from '../../../../utils';
import {Files} from './files';

interface IVideos {
  url: string;
  title: string;
  isDownloadable: boolean;
  _id: string;
}
interface IPdfs {
  url: string;
  title: string;
  isDownloadable: boolean;
  _id: string;
}
interface IPpts {
  url: string;
  title: string;
  isDownloadable: boolean;
  _id: string;
}

export const Resources = ({
  videos,
  pdfs,
  ppts,
}: {
  videos: IVideos[];
  pdfs: IPdfs[];
  ppts: IPpts[];
}) => {
  const [selectedFile, setSelectedFile] = useState<
    'pdf' | 'ppt' | 'video' | ''
  >('');
  return (
    <View style={styles.resourceContainer}>
      <View style={styles.resourceBbuttonContainer}>
        <TouchableOpacity
          onPress={() => {
            if (selectedFile === 'pdf') {
              setSelectedFile('');
              return;
            }
            setSelectedFile('pdf');
          }}
          style={[styles.resourceButtonStyle]}>
          <Text style={styles.title}>PDFs</Text>
          {selectedFile === 'pdf' ? (
            <ICONS.MaterialIcons
              name="keyboard-arrow-up"
              color={COLORS.black}
              size={25}
            />
          ) : (
            <ICONS.MaterialIcons
              name="keyboard-arrow-down"
              color={COLORS.black}
              size={25}
            />
          )}
        </TouchableOpacity>
        {selectedFile === 'pdf' && <Files files={pdfs} fileType={'pdf'} />}
      </View>

      <View
        style={[
          styles.resourceBbuttonContainer,
          {
            backgroundColor: COLORS.pptBackground,
            borderColor: COLORS.pptBackground,
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            if (selectedFile === 'ppt') {
              setSelectedFile('');
              return;
            }
            setSelectedFile('ppt');
          }}
          style={styles.resourceButtonStyle}>
          <Text style={styles.title}>PPTs</Text>
          {selectedFile === 'ppt' ? (
            <ICONS.MaterialIcons
              name="keyboard-arrow-up"
              color={COLORS.black}
              size={25}
            />
          ) : (
            <ICONS.MaterialIcons
              name="keyboard-arrow-down"
              color={COLORS.black}
              size={25}
            />
          )}
        </TouchableOpacity>
        {selectedFile === 'ppt' && <Files files={ppts} fileType={'ppt'} />}
      </View>

      <View
        style={[
          styles.resourceBbuttonContainer,
          {
            backgroundColor: COLORS.secondary,
            borderColor: COLORS.secondary,
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            if (selectedFile === 'video') {
              setSelectedFile('');
              return;
            }
            setSelectedFile('video');
          }}
          style={styles.resourceButtonStyle}>
          <Text style={styles.title}>Videos</Text>
          {selectedFile === 'video' ? (
            <ICONS.MaterialIcons
              name="keyboard-arrow-up"
              color={COLORS.black}
              size={25}
            />
          ) : (
            <ICONS.MaterialIcons
              name="keyboard-arrow-down"
              color={COLORS.black}
              size={25}
            />
          )}
        </TouchableOpacity>
        {selectedFile === 'video' && (
          <Files files={videos} fileType={'video'} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  resourceContainer: {
    rowGap: heightInDp(1),
  },
  resourceBbuttonContainer: {
    backgroundColor: COLORS.pdfBackground,
    borderRadius: widthInDp(2),
    borderWidth: widthInDp(0.5),
    borderColor: COLORS.pdfBackground,
    overflow: 'hidden',
  },
  resourceButtonStyle: {
    flexDirection: 'row',
    paddingHorizontal: widthInDp(5),
    paddingVertical: heightInDp(1),
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderRadius: widthInDp(2),
  },
  titleView: {
    flexDirection: 'row',
    gap: widthInDp(5),
    flex: 1,
  },
  title: {color: COLORS.black, flex: 1, fontFamily: FONTS.InterRegular},
});
