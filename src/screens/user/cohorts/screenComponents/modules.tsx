import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, ICONS} from '../../../../themes';
import {widthInDp} from '../../../../utils';
import {Days} from './days';

interface IModules {
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
}

const Item = ({
  item,
  onPress,
  selectedItem,
}: {
  item: IModules;
  onPress: () => void;
  selectedItem: string;
}) => {
  return (
    <View style={styles.moduleContainer}>
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
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
            paddingHorizontal: widthInDp(2),
          }}>
          <Days days={item.days || []} />
        </View>
      )}
    </View>
  );
};
export const Modules = ({modules}: {modules: IModules[]}) => {
  const [selectedModule, setSelectedModule] = useState('');
  const renderItem = ({item}: {item: IModules}) => {
    return (
      <Item
        item={item}
        selectedItem={selectedModule}
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
    />
  );
};

const styles = StyleSheet.create({
  moduleContainer: {
    flex: 1,
    backgroundColor: COLORS.lightBlue,
    padding: widthInDp(1),
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
    gap: widthInDp(5),
    flex: 1,
  },
  title: {color: COLORS.black, flex: 1, fontFamily: FONTS.Inter},
});
