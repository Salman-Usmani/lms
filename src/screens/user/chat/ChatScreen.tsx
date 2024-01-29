import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, SearchInput} from '../../../components';
import {useUserContext} from '../../../context/UserContext';
import {COLORS, FONTS, ICONS} from '../../../themes';
import {widthInDp} from '../../../utils';
import {ChatList} from './screenComponents/chatList';
import {ContactList} from './screenComponents/contactList';

const ChatScreen = () => {
  const {user} = useUserContext();
  const [search, setSearch] = useState('');
  const [selectedTab, setSelectedTab] = useState<'Chat' | 'Contact'>('Chat');
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Welcome back, {user?.name}!</Text>
        <Text style={styles.subHeading}>Chat</Text>
        <View style={styles.container}>
          <View style={styles.editContainer}>
            <Text style={styles.heading}>Chat</Text>
            <ICONS.FontAwesome5
              name="edit"
              size={widthInDp(5)}
              color={COLORS.primary}
            />
          </View>
          <SearchInput
            onChange={text => {
              setSearch(text);
            }}
            value={search}
          />
          <View style={styles.bodyContainer}>
            <Button
              title={'Chat'}
              background={selectedTab === 'Chat'}
              handlePress={() => {
                setSelectedTab('Chat');
              }}
              containerStyle={styles.btnStyle}
            />
            <Button
              title={'Contact'}
              background={selectedTab === 'Contact'}
              handlePress={() => {
                setSelectedTab('Contact');
              }}
              containerStyle={styles.btnStyle}
            />
          </View>
          {selectedTab === 'Chat' ? (
            <ChatList search={search.toLowerCase()} />
          ) : (
            <ContactList search={search.toLowerCase()} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: widthInDp(3),
    backgroundColor: COLORS.white,
    gap: widthInDp(2),
  },
  heading: {
    fontFamily: FONTS.InterRegular,
    fontSize: widthInDp(5),
    color: COLORS.primary,
    fontWeight: '700',
  },
  subHeading: {
    fontFamily: FONTS.InterRegular,
    fontSize: widthInDp(5),
    color: COLORS.primary,
  },
  container: {
    flex: 1,
    borderWidth: widthInDp(0.5),
    borderColor: COLORS.lightBlue,
    borderRadius: widthInDp(5),
    gap: widthInDp(5),
    padding: widthInDp(3),
  },
  editContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  bodyContainer: {
    flexDirection: 'row',
    borderRadius: widthInDp(2),
    backgroundColor: COLORS.disable,
    flex: 1,
    paddingHorizontal: widthInDp(2),
  },
  btnStyle: {flex: 1, borderRadius: widthInDp(2)},
});
