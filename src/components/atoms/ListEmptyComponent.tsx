import {StyleSheet, Text, View} from 'react-native';
import {FONTS} from '../../themes';

export const ListEmptyComponent = ({text}: {text: string}) => (
  <View style={styles.flex}>
    <Text style={styles.text}>No {text} found</Text>
  </View>
);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  text: {fontFamily: FONTS.InterRegular},
});
