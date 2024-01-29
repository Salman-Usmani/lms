import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useUserContext} from '../../../context/UserContext';
import {heightInDp, widthInDp} from '../../../utils';
import {COLORS, FONTS, ICONS} from '../../../themes';
import {
  GiftedChat,
  Send,
  Composer,
  Bubble,
  BubbleProps,
  IMessage,
} from 'react-native-gifted-chat';
import {dataServer} from '../../../services/axiosConfig';
import Toast from 'react-native-toast-message';
import {ChatStackNavigagtionProps} from '../../../types';
import {Socket, io} from 'socket.io-client';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ImageWithFallbabck} from '../../../components';

type Imsg = {
  _id: string;
  sender: {
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

const MessageScreen = ({route}: ChatStackNavigagtionProps<'MessageScreen'>) => {
  const {chatId, recieverUser} = route.params;
  const {user} = useUserContext();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [socket, setSocket] = useState<Socket>();

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const fetchChatsApi = await dataServer.get(
        `chat/${chatId}/messages?page=1`,
      );
      if (fetchChatsApi.status === 200) {
        const msgs = fetchChatsApi.data.data.messages.map((item: Imsg) => ({
          _id: item._id,
          text: item.content,
          createdAt: item.createdAt,
          user: {
            _id: item.sender._id,
            name: item.sender.name,
            avatar: item.sender.avatar,
          },
        }));
        setMessages(msgs.reverse());
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
            : error.response?.data || 'failed to get messages',
      });
    }
  };
  useEffect(() => {
    fetchMessages();
  }, []);
  const UseAccessToken = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      const parseUserToken = JSON.parse(token);
      return parseUserToken || null;
    } else {
      return null;
    }
  };
  const initializeSocket = async () => {
    try {
      const accessToken = await UseAccessToken();

      if (accessToken && !socket) {
        const socket = io(`${Config.NEXT_PUBLIC_SOCKET_URL}`, {
          autoConnect: true,
          path: '/socket.io',
          transports: ['websocket'],
          extraHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        socket.on('connect', () => {
          console.log('Socket connected');
        });
        setSocket(socket);

        // socket.on('connect_error', e => {
        //   console.log('Socket not connected', e);
        // });
        console.log('socket', socket.connected);
      }
    } catch (error) {
      console.log('Error initializing socket', error);
    }
  };
  useEffect(() => {
    initializeSocket();
  }, []);

  useEffect(() => {
    socket?.on('recieveChatMessage', processMessage);
    return () => {
      if (socket) {
        socket?.disconnect();
      }
    };
  }, [socket]);

  const onMessageDelivered = (messageId: any) => {
    socket?.emit('onMessageDelivered', messageId);
  };

  function processMessage(newMessage: any) {
    const messageForCurrentUser = newMessage.sender._id === user?._id;
    if (messageForCurrentUser) return;

    const msgs = {
      _id: newMessage._id,
      text: newMessage.content,
      createdAt: newMessage.createdAt,
      user: {
        _id: newMessage.sender._id,
        name: newMessage.sender.name,
        avatar: newMessage.sender.avatar,
      },
    };

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [msgs]),
    );

    onMessageDelivered(newMessage?._id);
  }

  const renderBubble = (props: Readonly<BubbleProps<IMessage>>) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: COLORS.primary,
          },
          left: {backgroundColor: COLORS.lightBlue},
        }}
        textStyle={{
          right: {
            color: COLORS.white,
          },
          left: {
            color: COLORS.black,
          },
        }}
      />
    );
  };

  const onSend = useCallback(
    (messages: IMessage[]) => {
      try {
        const newMessage = {
          content: messages[0].text,
          chatId,
          recieverUserId: recieverUser._id,
        };
        console.log('client', socket);

        socket?.emit('onSendChatMessage', newMessage);
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages),
        );
      } catch (error) {
        console.log('error...', error);
      }
    },
    [socket],
  );

  const renderSend = (props: any) => {
    return (
      <Send {...props} containerStyle={styles.inputContainer}>
        <ICONS.MaterialCommunityIcons
          name="send-circle"
          size={widthInDp(10)}
          color={COLORS.primary}
        />
      </Send>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* <View style={styles.chatInfoView}>
        <ImageWithFallbabck
          source={recieverUser.avatar}
          name={recieverUser.name}
          diameter={widthInDp(10)}
        />
        <View style={styles.chatProfile}>
          <Text style={styles.chatName}>{recieverUser.name}</Text>
          <Text numberOfLines={1} style={styles.chatMail}>
            {recieverUser.email}
          </Text>
        </View>
      </View> */}
      <GiftedChat
        showAvatarForEveryMessage
        showUserAvatar
        isLoadingEarlier
        alwaysShowSend
        scrollToBottom
        // inverted={false}
        renderBubble={renderBubble}
        messages={messages}
        onSend={onSend}
        user={user || undefined}
        renderAvatar={() => null}
        keyboardShouldPersistTaps="never"
        renderComposer={props => {
          return <Composer {...props} textInputStyle={styles.textInputStyle} />;
        }}
        // messagesContainerStyle={styles.container}
        placeholder={'Type message'}
        renderSend={renderSend}
      />
    </SafeAreaView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  container: {
    borderWidth: widthInDp(0.5),
    borderColor: COLORS.lightBlue,
    borderRadius: widthInDp(5),
    gap: widthInDp(5),
    padding: widthInDp(3),
  },
  textInputStyle: {
    color: COLORS.black,
    borderRadius: 15,
    backgroundColor: COLORS.disable,
    paddingTop: 10,
    paddingLeft: 10,
    marginRight: 10,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: widthInDp(3),
    backgroundColor: COLORS.white,
    gap: widthInDp(2),
  },
  inputContainer: {
    borderRadius: 15,
    textAlignVertical: 'center',
    justifyContent: 'center',
  },
});
