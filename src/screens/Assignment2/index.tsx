import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {SwipeModal} from '@components/SwipeModal';
import {MainStackScreen} from '@typings/router';

export const Assignment2: React.FC<MainStackScreen<'SwipeModal'>> = ({}) => {
  const [isModalVisible, setIsModalVisible] = useState({
    top: false,
    bottom: false,
    left: false,
    right: false,
  });

  const renderChildren = useCallback((key: string) => {
    return (
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>Modal Content direction {key}</Text>
      </View>
    );
  }, []);

  const onVisibilityChange = useCallback(
    (key: string) => (v: boolean) => {
      setIsModalVisible(p => ({...p, [key]: v}));
    },
    [],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main Content</Text>

      <SwipeModal
        direction="top"
        visible={isModalVisible.top}
        onVisibilityChange={onVisibilityChange('top')}>
        {renderChildren('top')}
      </SwipeModal>

      <SwipeModal
        direction="bottom"
        visible={isModalVisible.bottom}
        onVisibilityChange={onVisibilityChange('bottom')}>
        {renderChildren('bottom')}
      </SwipeModal>

      <SwipeModal
        direction="left"
        visible={isModalVisible.left}
        onVisibilityChange={onVisibilityChange('left')}>
        {renderChildren('left')}
      </SwipeModal>

      <SwipeModal
        direction="right"
        visible={isModalVisible.right}
        onVisibilityChange={onVisibilityChange('right')}>
        {renderChildren('right')}
      </SwipeModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalContent: {
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
