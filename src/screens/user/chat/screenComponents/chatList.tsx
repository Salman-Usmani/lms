import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import moment from 'moment';
import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {ImageWithFallbabck, ListEmptyComponent} from '../../../../components';
import {useUserContext} from '../../../../context/UserContext';
import {dataServer} from '../../../../services/axiosConfig';
import {COLORS, FONTS} from '../../../../themes';
import {ChatStackScreensList} from '../../../../types';
import {heightInDp, widthInDp} from '../../../../utils';

type IChats = {
  _id: string;
  isGroupChat: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastMessage: {
    _id: string;
    sender: {
      _id: string;
      name: string;
      email: string;
      role: string;
      avatar: string;
    };
    reciever: {
      _id: string;
      name: string;
      email: string;
      role: string;
      avatar: string;
    };
    content: string;
    isDelivered: boolean;
    isSeen: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  unDeliveredCount: number;
  unSeenCount: number;
};

export const ChatList = ({search}: {search: string}) => {
  const {user} = useUserContext();
  const navigation = useNavigation<StackNavigationProp<ChatStackScreensList>>();
  const [isLoading, setLoading] = useState(false);
  const [chats, setChats] = useState<IChats[]>([]);

  async function fetchChats() {
    try {
      setLoading(true);
      const fetchChatsApi = await dataServer.get('chat');
      if (fetchChatsApi.status === 200) {
        setChats(fetchChatsApi.data.data.chats);
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: Array.isArray(error?.response?.data?.errors)
          ? error?.response?.data?.errors[0]
          : error?.response?.data.message
            ? error?.response?.data.message
            : error.response?.data || 'failed to get chats',
      });
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchChats();
    }, []),
  );

  if (isLoading) {
    return (
      <ActivityIndicator
        size={'large'}
        color={COLORS.primary}
        style={styles.flex}
      />
    );
  }
  return (
    <View style={styles.mainContainer}>
      {chats.length > 0 ? (
        chats.map(
          item =>
            item.lastMessage &&
            (item.lastMessage.reciever.name.toLowerCase().includes(search) ||
              item.lastMessage.sender.name.toLowerCase().includes(search)) && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('MessageScreen', {
                    chatId: item._id,
                    recieverUser:
                      user?._id === item.lastMessage.sender._id
                        ? item.lastMessage.reciever
                        : item.lastMessage.sender,
                  });
                }}
                key={item._id}
                style={styles.chatInfoView}>
                <ImageWithFallbabck
                  source={
                    user?._id === item.lastMessage.sender._id
                      ? item.lastMessage.reciever.avatar
                      : item.lastMessage.sender.avatar
                  }
                  name={
                    user?._id === item.lastMessage.sender._id
                      ? item.lastMessage.reciever.name
                      : item.lastMessage.sender.name
                  }
                  diameter={widthInDp(15)}
                />
                <View style={styles.chatProfile}>
                  <Text style={styles.chatName}>
                    {user?._id === item.lastMessage.sender._id
                      ? item.lastMessage.reciever.name
                      : item.lastMessage.sender.name}
                  </Text>
                  <Text numberOfLines={1} style={styles.chatMail}>
                    {item.lastMessage.content}
                  </Text>
                </View>
                <View>
                  <Text>{moment(item.lastMessage.createdAt).format('ll')}</Text>
                  {!!item.unSeenCount && (
                    <View style={styles.countCircle}>
                      <Text style={styles.countText}>{item.unSeenCount}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ),
        )
      ) : (
        <ListEmptyComponent text={'Chats'} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chatInfoView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
  mainContainer: {rowGap: heightInDp(2)},
  chatProfile: {
    flex: 1,
    marginLeft: widthInDp(3),
    rowGap: heightInDp(0.3),
    justifyContent: 'center',
  },
  chatName: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.InterSemiBold,
    fontSize: widthInDp(4),
  },

  chatMail: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.InterRegular,
    fontSize: widthInDp(4),
  },

  countCircle: {
    borderRadius: widthInDp(100),
    width: widthInDp(7),
    height: widthInDp(7),
    backgroundColor: COLORS.primary,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightInDp(1),
  },
  countText: {
    color: COLORS.white,
    fontSize: widthInDp(5),
  },
});
