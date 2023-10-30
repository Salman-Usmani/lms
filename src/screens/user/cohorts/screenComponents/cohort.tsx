import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import React, {useState} from 'react';
import {COLORS, ICONS} from '../../../../themes';
import {heightInDp, widthInDp} from '../../../../utils';
import {Modules} from './modules';

interface ICohorts {
  _id: string;
  name: string;
  year: string;
  session: {name: string};
  modules: [
    {
      _id: string;
      name: string;
      days: [
        {
          _id: string;
          title: string;
          videos: [
            {url: string; title: string; isDownloadable: boolean; _id: string},
          ];
          pdfs: [
            {url: string; title: string; isDownloadable: boolean; _id: string},
          ];
          docs: [
            {url: string; title: string; isDownloadable: boolean; _id: string},
          ];
          ppts: [
            {url: string; title: string; isDownloadable: boolean; _id: string},
          ];
        },
      ];
    },
  ];
}

const Item = ({
  item,
  onPress,
  selectedItem,
}: {
  item: ICohorts;
  onPress: () => void;
  selectedItem: string;
}) => {
  return (
    <View key={item._id} style={styles.cohortsContainer}>
      <TouchableOpacity onPress={onPress} style={styles.cohortButtonStyle}>
        <View style={styles.titleView}>
          <ICONS.FontAwesome6
            name="user-group"
            size={widthInDp(5)}
            color={COLORS.white}
          />
          <Text style={styles.title}>
            {item.name} - {item.session.name} {item.year}
          </Text>
        </View>
        {selectedItem === item._id ? (
          <ICONS.MaterialIcons
            name="keyboard-arrow-up"
            color={COLORS.white}
            size={25}
          />
        ) : (
          <ICONS.MaterialIcons
            name="keyboard-arrow-down"
            color={COLORS.white}
            size={25}
          />
        )}
      </TouchableOpacity>
      {selectedItem === item._id && <Modules modules={item.modules || []} />}
    </View>
  );
};

export const Cohorts = ({cohorts}: {cohorts: ICohorts[] | []}) => {
  const [selectedCohort, setSelectedCohort] = useState('');

  const renderItem = ({item}: {item: ICohorts}) => {
    return (
      <Item
        item={item}
        selectedItem={selectedCohort}
        onPress={() => {
          if (selectedCohort === item._id) {
            setSelectedCohort('');
            return;
          }
          setSelectedCohort(item._id);
        }}
      />
    );
  };

  return (
    <FlatList data={cohorts} renderItem={renderItem} nestedScrollEnabled />
  );
};

const styles = StyleSheet.create({
  cohortsContainer: {
    flex: 1,
    borderRadius: widthInDp(2),
    marginVertical: heightInDp(0.5),
    marginHorizontal: widthInDp(2),
    overflow: 'hidden',
    rowGap: heightInDp(0.5),
  },
  cohortButtonStyle: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    paddingHorizontal: widthInDp(3),
    paddingVertical: heightInDp(1),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleView: {flexDirection: 'row', columnGap: widthInDp(5)},
  title: {color: COLORS.white},
});
