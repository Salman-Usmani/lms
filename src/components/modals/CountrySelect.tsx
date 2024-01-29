import React, {useState} from 'react';
import {COUNTRIES} from '../../constants';

import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTS} from '../../themes';
import {ICountryCode, ICountrySelect} from '../../types';
import {heightInDp, widthInDp} from '../../utils';
import {SearchInput} from '../atoms/SearchInput';

export const CountrySelect = (props: ICountrySelect) => {
  const {showModal, setShowModal, setSelectedCountry} = props;
  const [statesList, setStatesList] = useState<ICountryCode[]>(COUNTRIES);
  const [searchText, setSearchText] = useState('');
  function handleSearch(text: string) {
    setSearchText(text);
    const formattedQuery = text.toLowerCase();
    if (text) {
      let dataProjectsList = COUNTRIES.filter((res: ICountryCode) =>
        res.name.toLowerCase().includes(formattedQuery),
      );
      setStatesList(dataProjectsList);
    } else {
      setStatesList(COUNTRIES);
    }
  }
  function itemSelect(item: ICountryCode) {
    setSelectedCountry(item);
    setShowModal(false);
    setStatesList(COUNTRIES);
  }
  return (
    <Modal
      visible={showModal}
      transparent={true}
      onRequestClose={() => {
        setShowModal(false);
        setStatesList(COUNTRIES);
      }}>
      <KeyboardAvoidingView
        style={styles.mainContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
          <SearchInput onChange={handleSearch} value={searchText} />

          <FlatList
            data={statesList}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.btnContainer}
                onPress={() => itemSelect(item)}>
                <Text style={styles.btnText}>
                  {item.flag + ' ' + item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    alignSelf: 'center',
    width: widthInDp(90),
    height: heightInDp(70),
    backgroundColor: COLORS.white,
    borderRadius: widthInDp(2),
    padding: widthInDp(5),
    position: 'absolute',
    top: heightInDp(15),
    rowGap: heightInDp(1.5),
  },
  btnContainer: {marginVertical: heightInDp(1), flexDirection: 'row'},
  btnText: {color: COLORS.black, fontFamily: FONTS.InterRegular},
});
