import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import React, {useState} from 'react';
import {COLORS, FONTS, ICONS} from '../../../../themes';
import {heightInDp, widthInDp} from '../../../../utils';
import {Resources} from './resources';
import {IDay} from './interface';

const Item = ({
  item,
  onPress,
  selectedItem,
}: {
  item: IDay;
  onPress: () => void;
  selectedItem: string;
}) => {
  return (
    <View style={styles.dayContainer}>
      <TouchableOpacity onPress={onPress} style={styles.dayButtonStyle}>
        <View style={styles.titleView}>
          <ICONS.MaterialIcons
            name="folder"
            size={widthInDp(5)}
            color={COLORS.black}
          />
          <Text style={styles.title}>{item.title}</Text>
        </View>
        {selectedItem === item._id ? (
          <ICONS.MaterialIcons
            name="keyboard-arrow-up"
            color={COLORS.black}
            size={25}
          />
        ) : (
          <ICONS.MaterialIcons
            name="keyboard-arrow-down"
            color={COLORS.black}
            size={25}
          />
        )}
      </TouchableOpacity>
      {selectedItem === item._id && (
        <Resources
          videos={item.videos || []}
          pdfs={item.pdfs || []}
          ppts={item.ppts || []}
        />
      )}
    </View>
  );
};
const Separator = () => <View style={styles.separator} />;

export const Days = ({days}: {days: IDay[]}) => {
  const [selectedDay, setSelectedDay] = useState('');

  const renderItem = ({item}: {item: IDay}) => {
    return (
      <Item
        item={item}
        selectedItem={selectedDay}
        onPress={() => {
          if (selectedDay === item._id) {
            setSelectedDay('');
            return;
          }
          setSelectedDay(item._id);
        }}
      />
    );
  };

  return (
    <FlatList
      data={days}
      renderItem={renderItem}
      keyExtractor={Item => Item._id}
      ItemSeparatorComponent={Separator}
    />
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    paddingVertical: heightInDp(1),
    marginHorizontal: widthInDp(3),
    rowGap: heightInDp(1),
  },
  dayButtonStyle: {
    flexDirection: 'row',
    paddingVertical: widthInDp(2),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleView: {
    flexDirection: 'row',
    gap: widthInDp(5),
    flex: 1,
  },
  title: {color: COLORS.black, flex: 1, fontFamily: FONTS.InterRegular},
  separator: {
    height: 1, // Adjust the height of the separator as needed
    backgroundColor: COLORS.lightGray, // Separator color
    marginHorizontal: widthInDp(3),
  },
});
