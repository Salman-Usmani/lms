import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import React, {useState} from 'react';
import {COLORS, FONTS, ICONS} from '../../../../themes';
import {heightInDp, widthInDp} from '../../../../utils';
import {Files} from './files';
import {FileType, IFile} from './interface';

export const Resources = ({
  videos,
  pdfs,
  ppts,
}: {
  videos: IFile[];
  pdfs: IFile[];
  ppts: IFile[];
}) => {
  const [selectedFile, setSelectedFile] = useState<FileType | ''>('');
  return (
    <View style={styles.resourceContainer}>
      {!!pdfs.length && (
        <Item
          toSelect={'pdf'}
          selectedFile={selectedFile}
          setSelectedFile={fileType => setSelectedFile(fileType)}
          files={pdfs}
          title="PDFs"
        />
      )}
      {!!ppts.length && (
        <Item
          toSelect={'ppt'}
          title="PPTs"
          selectedFile={selectedFile}
          setSelectedFile={fileType => setSelectedFile(fileType)}
          files={ppts}
          containerStyle={{
            backgroundColor: COLORS.pptBackground,
            borderColor: COLORS.pptBackground,
          }}
        />
      )}
      {!!videos.length && (
        <Item
          toSelect={'video'}
          title="Videos"
          selectedFile={selectedFile}
          setSelectedFile={fileType => setSelectedFile(fileType)}
          files={videos}
          containerStyle={{
            backgroundColor: COLORS.secondary,
            borderColor: COLORS.secondary,
          }}
        />
      )}
    </View>
  );
};

const Item = ({
  toSelect,
  files,
  selectedFile,
  setSelectedFile,
  containerStyle,
}: {
  title: string;
  toSelect: FileType;
  files: IFile[];
  selectedFile: FileType | '';
  setSelectedFile: (FileType: FileType | '') => void;
  containerStyle?: ViewStyle;
}) => {
  return (
    <View style={[styles.resourceBbuttonContainer, containerStyle]}>
      <TouchableOpacity
        onPress={() => {
          if (selectedFile === toSelect) {
            setSelectedFile('');
            return;
          }
          setSelectedFile(toSelect);
        }}
        style={[styles.resourceButtonStyle]}>
        <Text style={styles.title}>{toSelect}</Text>
        {selectedFile === toSelect ? (
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
      {selectedFile === toSelect && <Files files={files} fileType={toSelect} />}
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
  },

  title: {color: COLORS.black, flex: 1, fontFamily: FONTS.InterRegular},
});
