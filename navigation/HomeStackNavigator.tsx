import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import SpiderDetailScreen from './screens/SpiderDetailScreen';
import type { SpiderHero } from '../types/spider';
import { useAppTheme } from '../theme/ThemeProvider';
import ThemeToggleButton from '../components/ThemeToggleButton';

export type HomeStackParamList = {
  HomeMain: undefined;
  SpiderDetail: {
    hero: SpiderHero;
  };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  const { theme } = useAppTheme();

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
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'SPIDEON' }} />
      <Stack.Screen
        name="SpiderDetail"
        component={SpiderDetailScreen}
        options={{ title: 'Hero Details' }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
