import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Button,
  ListRenderItem,
  useWindowDimensions,
  ViewToken,
} from 'react-native';

type Props = {
  tabs: {id: number; color: string}[];
  onRemove: (index: number) => void;
  cyclicSwipes?: boolean;
};

const CircularTabView: React.FC<Props> = ({tabs, onRemove, cyclicSwipes}) => {
  const flatListRef = useRef<FlatList>(null);

  const {width} = useWindowDimensions();

  const [dataTabs] = useState(
    cyclicSwipes
      ? [...tabs.slice(tabs.length - 3), ...tabs, ...tabs.slice(0, 3)]
      : tabs,
  );

  const onRemoveItem = useCallback(
    (index: number) => () => {
      onRemove(index);
    },
    [onRemove],
  );

  const renderItems: ListRenderItem<{id: number; color: string}> = useCallback(
    ({item, index}) => {
      return (
        <View
          style={[styles.tabContainer, {width, backgroundColor: item.color}]}>
          <Text style={styles.tabTitle}>Screen {item.id}</Text>
          <Button onPress={onRemoveItem(index)} title="Remove Tab" />
        </View>
      );
    },
    [onRemoveItem, width],
  );

  const keyExtractor = useCallback(
    (tab: {id: number; color: string}, index: number) => `tab-view-${index}`,
    [],
  );

  const itemChanged = useCallback(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (cyclicSwipes) {
        // console.log('cyclicSwipes', viewableItems[0]);
        if (viewableItems[0]?.index && viewableItems[0].index <= 2) {
          console.log(
            'less than',
            viewableItems[0].index,
            'dataTabs.length',
            dataTabs.length,
          );
          flatListRef.current?.scrollToIndex({
            animated: false,
            index: dataTabs.length - 4,
          });
        } else if (
          viewableItems[0]?.index &&
          viewableItems[0].index >= dataTabs.length - 2
        ) {
          console.log(
            'Greater than',
            viewableItems[0].index,
            'dataTabs.length',
            dataTabs.length,
          );
          flatListRef.current?.scrollToIndex({
            animated: false,
            index: 4,
          });
        }
      }
    },
    [cyclicSwipes, dataTabs.length],
  );

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        viewAreaCoveragePercentThreshold: 50,
      },
      onViewableItemsChanged: itemChanged,
    },
  ]);

  return (
    <FlatList
      horizontal
      data={dataTabs}
      pagingEnabled
      extraData={tabs}
      ref={flatListRef}
      renderItem={renderItems}
      keyExtractor={keyExtractor}
      showsHorizontalScrollIndicator={false}
      initialScrollIndex={cyclicSwipes ? 3 : 0}
      contentContainerStyle={styles.contentContainerStyle}
      getItemLayout={(_data, index) => ({
        length: width,
        offset: width * index,
        index,
      })}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
    />
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
  tabContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabTitle: {
    color: '#fff',
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
});

export default CircularTabView;
