import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {dataServer} from '../../../../services/axiosConfig';
import Toast from 'react-native-toast-message';
import {heightInDp, widthInDp} from '../../../../utils';
import {COLORS, FONTS} from '../../../../themes';
import {ImageWithFallbabck, ListEmptyComponent} from '../../../../components';
import {
  ChatStackNavigagtionProps,
  ChatStackScreensList,
} from '../../../../types';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type IContacts = {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar: string;
};

export const ContactList = ({search}: {search: string}) => {
  const navigation = useNavigation<StackNavigationProp<ChatStackScreensList>>();

  const [isLoading, setLoading] = useState(false);
  const [contacts, setContacts] = useState<IContacts[]>([]);

  async function fetchContacts() {
    try {
      setLoading(true);
      const fetchContactsApi = await dataServer.get('chat/chat-users');
      if (fetchContactsApi.status === 200) {
        setContacts(fetchContactsApi.data.data.users);
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
            : error.response?.data || 'failed to get contacts',
      });
    }
  }
  async function initializeChat(item: IContacts) {
    try {
      setLoading(true);
      const initializeChatApi = await dataServer.post('/chat/init', {
        userId: item._id,
      });
      if (initializeChatApi.status === 200) {
        navigation.navigate('MessageScreen', {
          chatId: initializeChatApi.data.data.chat._id,
          recieverUser: item,
        });
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
            : error.response?.data || 'failed to initiate chat',
      });
    }
  }
  useEffect(() => {
    fetchContacts();
  }, []);
  const renderItem = (item: IContacts) => {
    return (
      <TouchableOpacity
        onPress={() => initializeChat(item)}
        key={item._id}
        style={styles.contactInfoView}>
        <ImageWithFallbabck
          source={item.avatar}
          name={item.name}
          diameter={widthInDp(15)}
        />
        <View style={styles.contactProfile}>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.contactMail}>{item.email}</Text>
        </View>
      </TouchableOpacity>
    );
  };

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
      {contacts.length > 0 ? (
        <>
          <Text style={styles.roleText}>Admins</Text>
          {contacts.map(
            item =>
              item.role === 'admin' &&
              (item.name.toLowerCase().includes(search) ||
                item.name.toLowerCase().includes(search)) &&
              renderItem(item),
          )}
          <Text style={styles.roleText}>User</Text>
          {contacts.map(
            item =>
              item.role === 'user' &&
              (item.name.toLowerCase().includes(search) ||
                item.name.toLowerCase().includes(search)) &&
              renderItem(item),
          )}
        </>
      ) : (
        <ListEmptyComponent text={'Contacts'} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contactInfoView: {flexDirection: 'row'},
  flex: {
    flex: 1,
  },
  mainContainer: {rowGap: heightInDp(1.5)},

  contactProfile: {
    flex: 1,
    marginLeft: widthInDp(3),
    rowGap: heightInDp(0.3),
    justifyContent: 'center',
  },
  contactName: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.InterSemiBold,
    fontSize: widthInDp(4),
  },

  contactMail: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.InterRegular,
    fontSize: widthInDp(4),
  },
  roleText: {
    fontFamily: FONTS.InterRegular,
    fontSize: widthInDp(4),
    color: COLORS.roleColor,
  },
});
