import React from 'react';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import {View, Text, Button} from 'react-native';

export default function DocsScreen() {
  const url =
    'https://minwallamodel.com/api/v1/public/cohort/pdf/1692043415252.pdf';
  // 'https://minwallamodel.com/api/v1/public/cohort/ppt/1691163593465.pptx';
  // 'https://minwallamodel.com/api/v1/public/cohort/doc/1692729558827.docx';

  function getUrlExtension(url) {
    return url.split(/[#?]/)[0].split('.').pop().trim();
  }

  const extension = getUrlExtension(url);

  // Feel free to change main path according to your requirements.
  const localFile = `${RNFS.DocumentDirectoryPath}/1692043415252.pdf`;
  // const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${extension}`;

  const options = {
    fromUrl: url,
    toFile: localFile,
  };

  const OpenFile = () => {
    RNFS.downloadFile(options)
      .promise.then(() => {
        FileViewer.open(localFile);
      })
      .then(() => {
        // success
      })
      .catch(error => {
        // error
      });
  };
  return (
    <View>
      <Button title="Open File" onPress={OpenFile} />
    </View>
  );
}
