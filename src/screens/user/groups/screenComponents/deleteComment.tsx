import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, ICONS} from '../../../../themes';
import {heightInDp, widthInDp} from '../../../../utils';
import {Button} from '../../../../components';

type IImagePicker = {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  handleDeleteComment: () => void;
};

export const CommentDeletePrompt = (props: IImagePicker) => {
  const {showModal, setShowModal, handleDeleteComment} = props;

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
            <ICONS.Ionicons
              name="close-sharp"
              size={widthInDp(7)}
              color={COLORS.darkGray}
            />
          </TouchableOpacity>

          <Text style={styles.txt1}>
            Are you sure you want to delete this comment?
          </Text>

          <Button
            title={'Delete'}
            background={true}
            handlePress={handleDeleteComment}
            containerStyle={{
              marginTop: heightInDp(3),
              marginHorizontal: widthInDp(5),
              borderRadius: widthInDp(2),
            }}
          />

          <Button
            title={'Cancel'}
            background={false}
            handlePress={() => setShowModal(false)}
            containerStyle={{
              marginHorizontal: widthInDp(5),
              borderRadius: widthInDp(2),
            }}
          />
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
    // height: widthInDp(40),
    alignSelf: 'center',
    borderRadius: 10,
    paddingBottom: heightInDp(3),
    // marginVertical: widthInDp(50),
  },
  closeBtnStyle: {
    alignSelf: 'flex-end',
    marginHorizontal: widthInDp(2),
    marginTop: widthInDp(2),
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
    // textTransform: 'uppercase',
    color: COLORS.primary,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: FONTS.InterRegular,
    marginHorizontal: widthInDp(8),
  },
  btnView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
