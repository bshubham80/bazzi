import React, {useCallback} from 'react';
import {View, Button, StyleSheet} from 'react-native';

import {MainStackScreen, MainStackScreenName} from '@typings/router';

export const Home: React.FC<MainStackScreen<'Home'>> = ({navigation}) => {
  const navigate = useCallback(
    (path: MainStackScreenName) => () => {
      navigation.navigate(path);
    },
    [navigation],
  );
  return (
    <View style={styles.wrapper}>
      <View style={styles.button}>
        <Button onPress={navigate('SwipeModal')} title="Swipe Modal" />
      </View>
      <View style={styles.button}>
        <Button onPress={navigate('TabView')} title="Circular Tab View" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 16,
  },
});
