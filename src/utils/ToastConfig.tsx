import {StyleSheet} from 'react-native';
import {
  BaseToastProps,
  BaseToast,
  ErrorToast,
  InfoToast,
} from 'react-native-toast-message';
import {widthInDp} from './DP';
import {COLORS, FONTS, ICONS} from '../themes';

export const toastConfig = {
  success: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={styles.baseToastStyle}
      contentContainerStyle={styles.contentContainerStyle}
      renderLeadingIcon={() => (
        <ICONS.AntDesign
          name="checkcircle"
          size={widthInDp(5)}
          color={COLORS.success}
          style={styles.iconStyle}
        />
      )}
      text1Style={styles.toastText1}
      text2Style={styles.toastText2}
    />
  ),
  error: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <ErrorToast
      {...props}
      style={styles.errorToastStyle}
      contentContainerStyle={styles.contentContainerStyle}
      renderLeadingIcon={() => (
        <ICONS.AntDesign
          name="closecircle"
          size={widthInDp(5)}
          color={COLORS.error}
          style={styles.iconStyle}
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
      style={styles.infoToastStyle}
      text1Style={styles.toastText1}
      text2Style={styles.toastText2}
    />
  ),
};

const styles = StyleSheet.create({
  baseToastStyle: {borderLeftColor: COLORS.success, alignItems: 'center'},
  contentContainerStyle: {paddingHorizontal: 0},
  iconStyle: {marginHorizontal: widthInDp(3)},
  errorToastStyle: {borderLeftColor: COLORS.error, alignItems: 'center'},
  infoToastStyle: {borderLeftColor: '#5bc0de', height: 80},

  toastText2: {
    fontSize: widthInDp(5),
    color: '#000000',
    textAlignVertical: 'center',
    fontFamily: FONTS.Inter,
  },
  toastText1: {
    fontSize: widthInDp(5),
    fontWeight: '400',
    fontFamily: FONTS.Inter,
    color: '#000000',
    textAlignVertical: 'center',
  },
});
