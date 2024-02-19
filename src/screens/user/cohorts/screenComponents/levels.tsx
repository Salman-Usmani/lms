import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import React, {useState} from 'react';
import {COLORS, FONTS, ICONS} from '../../../../themes';
import {heightInDp, widthInDp} from '../../../../utils';
import {Modules} from './modules';
import {ListEmptyComponent} from '../../../../components';
import {ILevel} from './interface';

const levelStyles = {
  'Level 1': {
    backgroundColor: COLORS.subLevelOne,
    borderColor: COLORS.levelOneBorderColor,
  },
  'Level 2': {
    backgroundColor: COLORS.subLevelTwo,
    borderColor: COLORS.levelTwoBorderColor,
  },
  'Level 3': {
    backgroundColor: COLORS.subLevelThree,
    borderColor: COLORS.levelThreeBorderColor,
  },
  'Level 4': {
    backgroundColor: COLORS.subLevelFour,
    borderColor: COLORS.levelFourBorderColor,
  },
  'Additional Resource': {
    backgroundColor: COLORS.subLevelAdditional,
    borderColor: COLORS.levelAdditional,
  },
};
const levelColor = {
  'Level 1': COLORS.levelOne,
  'Level 2': COLORS.levelTwo,
  'Level 3': COLORS.levelThree,
  'Level 4': COLORS.levelFour,
  'Additional Resource': COLORS.levelAdditional,
};

const renderItem = ({item}: {item: ILevel}) => {
  return (
    <View
      style={{
        ...styles.cohortsContainer,
        borderColor:
          levelColor[item.level] || levelColor['Additional Resource'],
      }}>
      <View
        style={{
          ...styles.titleView,
          backgroundColor:
            levelColor[item.level] || levelColor['Additional Resource'],
        }}>
        <Text style={styles.title}>{item.level}</Text>
      </View>

      <Modules
        modules={item.modules || []}
        containerStyle={
          levelStyles[item.level] || levelStyles['Additional Resource']
        }
      />
    </View>
  );
};

export const Levels = ({Levels}: {Levels: ILevel[] | []}) => (
  <FlatList
    data={Levels}
    renderItem={renderItem}
    keyExtractor={Item => Item.level}
    ListEmptyComponent={<ListEmptyComponent text={'Cohorts'} />}
  />
);

const styles = StyleSheet.create({
  cohortsContainer: {
    flex: 1,
    borderRadius: widthInDp(2),
    marginVertical: heightInDp(0.5),
    marginHorizontal: widthInDp(3),
    overflow: 'hidden',
    borderWidth: widthInDp(0.5),
  },
  cohortButtonStyle: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    paddingHorizontal: widthInDp(3),
    paddingVertical: heightInDp(1),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleView: {columnGap: widthInDp(5)},
  title: {
    color: COLORS.black,
    fontFamily: FONTS.InterRegular,
    margin: widthInDp(3),
  },
});
