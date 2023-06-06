import type {StackScreenProps} from '@react-navigation/stack';

export type MainStackParamList = {
  Home: undefined;
  SwipeModal: undefined;
  TabView: undefined;
};

export type MainStackScreenName = keyof MainStackParamList;

export type MainStackScreen<RouteName extends keyof MainStackParamList> =
  StackScreenProps<MainStackParamList, RouteName>;
