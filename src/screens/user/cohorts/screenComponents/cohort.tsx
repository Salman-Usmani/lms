import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ListEmptyComponent} from '../../../../components';
import {COLORS, FONTS, ICONS} from '../../../../themes';
import {heightInDp, widthInDp} from '../../../../utils';
import {ICohortsByLevel} from './interface';
import {Levels} from './levels';

const Item = ({
  item,
  onPress,
  selectedItem,
}: {
  item: ICohortsByLevel;
  onPress: () => void;
  selectedItem: string;
}) => {
  return (
    <View style={styles.cohortsContainer}>
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
      {selectedItem === item._id && <Levels Levels={item.levels || []} />}
    </View>
  );
};

export const Cohorts = ({cohorts}: {cohorts: ICohortsByLevel[] | []}) => {
  const [selectedCohort, setSelectedCohort] = useState('');

  const renderItem = ({item}: {item: ICohortsByLevel}) => {
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
    <FlatList
      data={cohorts}
      renderItem={renderItem}
      keyExtractor={Item => Item._id}
      ListEmptyComponent={<ListEmptyComponent text={'Cohorts'} />}
      style={styles.mainContainer}
    />
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: COLORS.white},
  cohortsContainer: {
    flex: 1,
    borderRadius: widthInDp(2),
    marginVertical: heightInDp(0.5),
    marginHorizontal: widthInDp(3),
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
  title: {color: COLORS.white, fontFamily: FONTS.InterRegular},
});
