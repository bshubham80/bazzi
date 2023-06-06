import React, {PropsWithChildren, useCallback, useState} from 'react';
import {Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';

type P = {
  direction: 'top' | 'bottom' | 'left' | 'right';
  visible: boolean;
  onVisibilityChange: (visible: boolean) => void;

  closeOnBackDrop?: boolean;
};

export const SwipeModal: React.FC<PropsWithChildren<P>> = ({
  direction,
  children,
  visible,
  onVisibilityChange,
  closeOnBackDrop = true,
}) => {
  const [modalAnimation] = useState(new Animated.Value(0));
  const [modalDirection, setModalDirection] = useState('');

  const animateModal = useCallback(
    (toValue: number, callback?: () => void) => {
      Animated.timing(modalAnimation, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }).start(callback);
    },
    [modalAnimation],
  );

  const toggleModal = useCallback(() => {
    if (visible) {
      animateModal(0, () => onVisibilityChange(false));
    } else {
      onVisibilityChange(true);
      setModalDirection(direction);
      animateModal(1);
    }
  }, [animateModal, direction, onVisibilityChange, visible]);

  const getModalAnimationStyle = useCallback(() => {
    const animationStyle = {};

    switch (modalDirection) {
      case 'top':
        animationStyle.transform = [
          {
            translateY: modalAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [-300, 0],
            }),
          },
        ];
        break;
      case 'bottom':
        animationStyle.transform = [
          {
            translateY: modalAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [300, 0],
            }),
          },
        ];
        break;
      case 'left':
        animationStyle.transform = [
          {
            translateX: modalAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [-300, 0],
            }),
          },
        ];
        break;
      case 'right':
        animationStyle.transform = [
          {
            translateX: modalAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [300, 0],
            }),
          },
        ];
        break;
    }

    return animationStyle;
  }, [modalAnimation, modalDirection]);

  const closeModal = useCallback(() => {
    animateModal(0, () => onVisibilityChange(false));
  }, [animateModal, onVisibilityChange]);

  return (
    <>
      <TouchableOpacity style={styles.openButton} onPress={toggleModal}>
        <Text style={styles.buttonText}>Open Modal ({direction})</Text>
      </TouchableOpacity>

      {visible && (
        <TouchableOpacity
          activeOpacity={1}
          disabled={!closeOnBackDrop}
          style={styles.backdrop}
          onPress={closeModal}>
          <Animated.View
            style={[styles.modalContainer, getModalAnimationStyle()]}>
            {children}
          </Animated.View>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  openButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});
