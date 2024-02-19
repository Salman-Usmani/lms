import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, ICONS} from '../../../../themes';
import {heightInDp, widthInDp} from '../../../../utils';
import {Days} from './days';
import {IModule} from './interface';

const Item = ({
  item,
  onPress,
  selectedItem,
  containerStyle,
}: {
  item: IModule;
  onPress: () => void;
  selectedItem: string;
  containerStyle?: ViewStyle;
}) => {
  return (
    <View style={[styles.moduleContainer, containerStyle]}>
      <TouchableOpacity onPress={onPress} style={styles.moduleButtonStyle}>
        <View style={styles.titleView}>
          <ICONS.MaterialIcons
            name="view-module"
            size={widthInDp(5)}
            color={COLORS.black}
          />
          <Text style={styles.title}>{item.name}</Text>
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
        <View style={styles.daysContainer}>
          <Days days={item.days || []} />
        </View>
      )}
    </View>
  );
};
export const Modules = ({
  modules,
  containerStyle,
}: {
  modules: IModule[];
  containerStyle?: ViewStyle;
}) => {
  const [selectedModule, setSelectedModule] = useState('');
  const renderItem = ({item}: {item: IModule}) => {
    return (
      <Item
        item={item}
        selectedItem={selectedModule}
        containerStyle={containerStyle}
        onPress={() => {
          if (selectedModule === item._id) {
            setSelectedModule('');
            return;
          }
          setSelectedModule(item._id);
        }}
      />
    );
  };

  return (
    <FlatList
      data={modules}
      renderItem={renderItem}
      keyExtractor={Item => Item._id}
      style={styles.listStyle}
    />
  );
};

const styles = StyleSheet.create({
  listStyle: {
    rowGap: heightInDp(0.3),
    marginVertical: heightInDp(2),
  },
  moduleContainer: {
    flex: 1,
    backgroundColor: COLORS.lightBlue,
    padding: widthInDp(1),
    marginHorizontal: widthInDp(2),
    borderRadius: widthInDp(2),
    borderWidth: widthInDp(1),
  },
  moduleButtonStyle: {
    flex: 1,
    flexDirection: 'row',
    padding: widthInDp(2),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleView: {
    flexDirection: 'row',
    gap: widthInDp(3),
    flex: 1,
  },
  title: {color: COLORS.black, flex: 1, fontFamily: FONTS.InterRegular},
  daysContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: widthInDp(2),
    borderRadius: widthInDp(2),
  },
});
