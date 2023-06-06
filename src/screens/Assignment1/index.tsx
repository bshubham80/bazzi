import CircularTabView from '@components/CircularTabView';
import {getRandomColor} from '@utils/colors';
import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Button,
} from 'react-native';

// const CircularTabView: React.FC<{
//   tabs: JSX.Element[];
//   animated: boolean;
//   cyclicSwipe: boolean;
// }> = ({tabs, animated = false, cyclicSwipe = true}) => {
//   const currentIndexRef = useRef(0);
//   const {width} = Dimensions.get('window');
//   const containerRef = useRef();
//   const pan = useRef(new Animated.Value(0)).current;

//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderMove: (_, {dx}) => {
//         pan.setValue(dx);
//       },
//       onPanResponderRelease: (_, {dx}) => {
//         if (dx < -50 && currentIndexRef.current < tabs.length - 1) {
//           handleTabSwipe(1);
//         } else if (dx > 50 && currentIndexRef.current > 0) {
//           handleTabSwipe(-1);
//         } else {
//           Animated.spring(pan, {
//             toValue: 0,
//             useNativeDriver: true,
//           }).start();
//         }
//       },
//     }),
//   ).current;

//   const handleTabPress = (index: number) => {
//     if (animated) {
//       const offset = (currentIndexRef.current - index) * width;
//       Animated.spring(pan, {
//         toValue: offset,
//         useNativeDriver: true,
//       }).start();
//       currentIndexRef.current = index;
//     } else {
//       currentIndexRef.current = index;
//       pan.setValue(0);
//     }
//   };

//   const handleTabSwipe = direction => {
//     const nextIndex = currentIndexRef.current + direction;
//     const offset = (currentIndexRef.current - nextIndex) * width;
//     Animated.timing(pan, {
//       toValue: offset,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => {
//       currentIndexRef.current = nextIndex;
//       pan.setValue(0);
//     });
//   };

//   return (
//     <View style={{flex: 1, height: 100}}>
//       <Animated.View
//         ref={containerRef}
//         style={{flexDirection: 'row', transform: [{translateX: pan}]}}
//         {...(cyclicSwipe && {...panResponder.panHandlers})}>
//         {tabs.map((tab, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() => handleTabPress(index)}
//             style={{width, alignItems: 'center', justifyContent: 'center'}}>
//             {tab}
//           </TouchableOpacity>
//         ))}
//       </Animated.View>
//     </View>
//   );
// };

export const Assignment1: React.FC<{}> = props => {
  const [tabs, setTabs] = useState<{id: number; color: string}[]>([
    {id: 1, color: getRandomColor()},
    {id: 2, color: getRandomColor()},
    {id: 3, color: getRandomColor()},
  ]);

  const onAdd = useCallback(() => {
    setTabs(p => [...p, {id: p.length + 1, color: getRandomColor()}]);
  }, []);

  const onRemove = useCallback(
    (index: number) => {
      console.log('deleteTab', index, tabs.splice(index, 1));
      setTabs(p => p.filter((_value, idx) => idx !== index));
    },
    [tabs],
  );

  const onScroll = useCallback((index: number) => () => {}, []);

  const renderTabButton = useCallback(
    (t: {id: number; color: string}, index: number) => (
      <View style={styles.button} key={t.id}>
        <Button title={`Tab ${index}`} onPress={onScroll(index)} />
      </View>
    ),
    [onScroll],
  );

  return (
    <View style={styles.container}>
      <View style={styles.controllerContainer}>
        <Button title="Add tab" onPress={onAdd} />
        <View style={styles.buttonContainer}>{tabs.map(renderTabButton)}</View>
      </View>
      <CircularTabView tabs={tabs} onRemove={onRemove} cyclicSwipes={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  controllerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  button: {
    marginBottom: 8,
    marginHorizontal: 8,
  },
});
