import React, {useState} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  TextStyle,
  KeyboardType,
  Text,
} from 'react-native';
import {heightInDp, widthInDp} from '../../utils';
import {COLORS, FONTS} from '../../themes';
import {TextInput} from 'react-native-paper';

interface IfloatInput {
  title: string;
  value?: string;
  keyboardType?: KeyboardType;
  onChange?: (text: string) => void;
  errorMsg?: string;
  isPassword?: boolean;
  otp?: boolean;
}

export const FloatingTitleTextInputField = ({
  title,
  value,
  keyboardType,
  onChange,
  errorMsg,
  isPassword,
  otp,
}: IfloatInput) => {
  // const [isFieldActive, setIsFieldActive] = useState(false);
  // const position = new Animated.Value(value ? 1 : 0);

  // const handleFocus = () => {
  //   if (!isFieldActive) {
  //     setIsFieldActive(true);
  //     Animated.timing(position, {
  //       toValue: 1,
  //       duration: 150,
  //       useNativeDriver: false,
  //     }).start();
  //   }
  // };

  // const handleBlur = () => {
  //   if (isFieldActive && !value) {
  //     setIsFieldActive(false);
  //     Animated.timing(position, {
  //       toValue: 0,
  //       duration: 150,
  //       useNativeDriver: false,
  //     }).start();
  //   }
  // };

  // const returnAnimatedTitleStyles = () => {
  //   return {
  //     top: position.interpolate({
  //       inputRange: [0, 1],
  //       outputRange: [isFieldActive ? 0 : heightInDp(1), 0],
  //     }),
  //     fontSize: isFieldActive ? heightInDp(1.5) : heightInDp(2.5),
  //     color: isFieldActive ? COLORS.primary : COLORS.darkGray,
  //   } as Animated.WithAnimatedObject<TextStyle>;
  // };

  return (
    <View>
      <TextInput
        label={title}
        value={value}
        onChangeText={onChange}
        underlineStyle={{height: 0}}
        secureTextEntry={isPassword}
        keyboardType={keyboardType}
        maxLength={otp ? 4 : undefined}
        error={errorMsg ? true : false}
        disabled={!onChange && true}
        theme={{
          colors: {
            primary: COLORS.primary,
            error: COLORS.error,
            secondary: COLORS.secondary,
          },
        }}
        activeOutlineColor={COLORS.primary}
        style={{
          backgroundColor: COLORS.white,
          borderWidth: 0.5,
          fontFamily: FONTS.Inter,
          borderColor: errorMsg ? COLORS.error : undefined,
          borderRadius: widthInDp(2),
          borderTopLeftRadius: widthInDp(2),
          borderTopRightRadius: widthInDp(2),
        }}
      />
      {errorMsg && (
        <Text
          style={{
            color: COLORS.error,
            marginHorizontal: widthInDp(3),
            fontFamily: FONTS.Inter,
          }}>
          {errorMsg}
        </Text>
      )}
    </View>
    // <View>
    //   <View style={Styles.container}>
    //     <Animated.Text
    //       style={[Styles.titleStyles, returnAnimatedTitleStyles()]}>
    //       {title}
    //     </Animated.Text>
    //     <TextInput
    //       value={value}
    //       style={Styles.textInput}
    //       underlineColorAndroid="transparent"
    //       onFocus={handleFocus}
    //       onBlur={handleBlur}
    //       onChangeText={onChange}
    //       keyboardType={keyboardType}
    //       secureTextEntry={isPassword || false}
    //       maxLength={otp ? 4 : undefined}
    //     />
    //   </View>
    //   {errorMsg && (
    //     <Text style={{color: COLORS.error, marginHorizontal: widthInDp(3)}}>
    //       {errorMsg}
    //     </Text>
    //   )}
    // </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 5,
    borderRadius: widthInDp(3),
    borderStyle: 'solid',
    borderWidth: 0.5,
    height: heightInDp(6),
    // marginVertical: 4,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    marginTop: heightInDp(1),
    fontFamily: 'Avenir-Medium',
    color: 'black',
  },
  titleStyles: {
    position: 'absolute',
    fontFamily: 'Avenir-Medium',
    left: 8,
  },
});
