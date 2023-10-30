// import {StyleSheet, Text, TextInput, View} from 'react-native';
// import React from 'react';
// import {ITextInput} from '../../types';
// import {colors} from '../../themes';

// export const Input = (props: ITextInput) => {
//   const {
//     title,
//     onChangeValue,
//     onIconPress,
//     errormsg,
//     icon,
//     placeholder,
//     onBlur,
//     value,
//   } = props;
//   return (
//     <View>
//       {title && <Text>{title}</Text>}
//       <TextInput
//         placeholder={placeholder}
//         value={value}
//         placeholderTextColor={colors.black}
//         onChangeText={onChangeValue}
//         style={styles.inputField}
//         onBlur={onBlur}
//       />
//       <Text>{errormsg}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   inputField: {
//     borderWidth: 1,
//     color: colors.black,
//   },
// });

import React from 'react';
import {StyleSheet, Text, View, TextInput, Platform} from 'react-native';
import {ITextInput} from '../../types';

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const Input = (props: ITextInput) => {
  const {title, Controller, name} = props;
  return (
    <View style={styles.container}>
      {title && <Text>{title}</Text>}
      <Controller
        defaultValue=""
        name={name}
        control={control}
        rules={{
          required: {
            value: required,
            message: `${message}`,
          },
          pattern: {
            value: emailValidation ? EMAIL_REGEX : null,
            message: 'Not a valid email',
          },
          validate: value => {
            if (allowedPercentage && value > allowedPercentage) {
              return 'Maximum guests in group should be less than final total Capacity';
            } else {
              return true;
            }
          },
        }}
        render={({field: {onChange, value}}) => {
          let inputValue = (value =
            value === null || value === undefined ? '' : String(value));
          return (
            <View
              style={{
                height: isMultiline ? 'auto' : 40,
                borderRadius: 5,
                borderWidth: error ? 1.0 : 1.0,
                borderColor: error ? 'red' : 'lightgray',
                paddingLeft: 5,
                // backgroundColor: '#fcfcfc',
              }}>
              <TextInput
                value={inputValue}
                placeholder="Type"
                placeholderTextColor={'gray'}
                multiline={isMultiline}
                style={styles.input}
                onFocus={onFocus}
                onChangeText={onChange}
                keyboardType={keyboardType ? keyboardType : 'default'}
              />
            </View>
          );
        }}
      />
      {errorText && (
        <Text style={{color: 'red', marginTop: 5}}>{errorText}</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  labelStyle: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
  input: {
    borderRadius: 5,
    fontSize: 14,
    color: 'black',
    paddingTop: Platform.OS === 'ios' ? 11 : 6,
    paddingBottom: 6,
  },
});
