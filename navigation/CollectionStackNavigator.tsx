import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import type { CollectionItem } from '../types/content';
import { useAppTheme } from '../theme/ThemeProvider';
import ThemeToggleButton from '../components/ThemeToggleButton';
import SpiderScreen from './screens/SpiderScreen';
import CostumeScreen from './screens/CostumeScreen';
import ComicsScreen from './screens/ComicsScreen';
import MoviesScreen from './screens/MoviesScreen';
import CollectionDetailScreen from './screens/CollectionDetailScreen';

export type CollectionStackParamList = {
  CollectionMain: undefined;
  CollectionDetail: {
    item: CollectionItem;
  };
};

const Stack = createNativeStackNavigator<CollectionStackParamList>();

type CollectionStackNavigatorProps = {
  screen: 'Spider' | 'Costume' | 'Comics' | 'Movies';
};

const screenMap = {
  Spider: SpiderScreen,
  Costume: CostumeScreen,
  Comics: ComicsScreen,
  Movies: MoviesScreen,
} as const;

const titleMap = {
  Spider: 'SPIDEON',
  Costume: 'SPIDEON',
  Comics: 'SPIDEON',
  Movies: 'SPIDEON',
} as const;

const CollectionStackNavigator = ({ screen }: CollectionStackNavigatorProps) => {
  const { theme } = useAppTheme();
  const MainScreen = screenMap[screen];

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: '800',
          fontSize: 20,
        },
        headerTitleAlign: 'left',
        headerShadowVisible: false,
        headerRight: () => (
          <View style={{ marginRight: 6 }}>
            <ThemeToggleButton />
          </View>
        ),
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen
        name="CollectionMain"
        component={MainScreen}
        options={{ title: titleMap[screen] }}
      />
      <Stack.Screen
        name="CollectionDetail"
        component={CollectionDetailScreen}
        options={{ title: 'Details' }}
      />
    </Stack.Navigator>
  );
};

export default CollectionStackNavigator;
