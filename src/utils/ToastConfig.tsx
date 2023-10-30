import {StyleSheet} from 'react-native';
import {
  BaseToastProps,
  BaseToast,
  ErrorToast,
  InfoToast,
} from 'react-native-toast-message';
import {widthInDp} from './DP';
import {COLORS, ICONS} from '../themes';

export const toastConfig = {
  success: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: COLORS.success, alignItems: 'center'}}
      contentContainerStyle={{paddingHorizontal: 0}}
      renderLeadingIcon={() => (
        <ICONS.AntDesign
          name="checkcircle"
          size={widthInDp(5)}
          color={COLORS.success}
          style={{
            marginHorizontal: widthInDp(3),
          }}
        />
      )}
      text1Style={styles.toastText1}
      text2Style={styles.toastText2}
    />
  ),
  error: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: COLORS.error, alignItems: 'center'}}
      contentContainerStyle={{paddingHorizontal: 0}}
      renderLeadingIcon={() => (
        <ICONS.AntDesign
          name="closecircle"
          size={widthInDp(5)}
          color={COLORS.error}
          style={{
            marginHorizontal: widthInDp(3),
          }}
        />
      )}
      text1Style={styles.toastText1}
      text2Style={styles.toastText2}
    />
  ),
  info: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <InfoToast
      {...props}
      text2NumberOfLines={4}
      style={{
        borderLeftColor: '#5bc0de',
        height: 80,
      }}
      text1Style={styles.toastText1}
      text2Style={styles.toastText2}
    />
  ),
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalView: {
    width: 100,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
  },
  text: {
    textAlign: 'center',
    marginTop: 10,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  activityIndicator: {
    position: 'absolute',
    top: 70,
    left: 70,
    right: 70,
    height: 50,
  },
  player: {
    flex: 1,
  },

  toastText2: {
    // paddingTop: 2,
    fontSize: widthInDp(5),
    color: '#000000',
    textAlignVertical: 'center',
  },
  toastText1: {
    fontSize: widthInDp(5),
    fontWeight: '400',
    color: '#000000',
    textAlignVertical: 'center',
  },
});
