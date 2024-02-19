import AsyncStorage from '@react-native-async-storage/async-storage';

export const UseAccessToken = async () => {
  const token = await AsyncStorage.getItem('accessToken');
  if (token) {
    const parseUserToken = JSON.parse(token);
    return parseUserToken || null;
  } else {
    return null;
  }
};
