import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import {io} from 'socket.io-client';

const UseAccessToken = async () => {
  const token = await AsyncStorage.getItem('accessToken');
  if (token) {
    const parseUserToken = JSON.parse(token);
    return parseUserToken || null;
  } else {
    return null;
  }
};
export const socket = io(`${Config.NEXT_PUBLIC_SOCKET_URL}`, {
  autoConnect: true,
  path: '/socket.io',
  transports: ['websocket'],
  extraHeaders: {
    Authorization: `Bearer ${UseAccessToken()}`,
  },
});
