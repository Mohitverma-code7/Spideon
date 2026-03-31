import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'expo/node_modules/@expo/vector-icons/MaterialCommunityIcons';
import HomeStackNavigator from './HomeStackNavigator';
import CollectionStackNavigator from './CollectionStackNavigator';
import { useAppTheme } from '../theme/ThemeProvider';
import ThemeToggleButton from '../components/ThemeToggleButton';

const Tab = createBottomTabNavigator();

const tabIcons: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
  Home: 'home-variant',
  Spider: 'spider',
  Costume: 'hanger',
  Comics: 'book-open-page-variant',
  Movies: 'movie-open',
};

const TabNavigator = () => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: '800',
          fontSize: 20,
        },
        headerTitleAlign: 'left',
        headerLeftContainerStyle: {
          paddingLeft: 8,
        },
        headerRightContainerStyle: {
          paddingRight: 10,
        },
        headerTitleContainerStyle: {
          paddingHorizontal: 8,
        },
        headerShadowVisible: false,
        headerRight: () => <ThemeToggleButton />,
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.tabIcon,
        tabBarIcon: ({ focused }) => (
          <View style={[styles.iconWrap, focused ? styles.iconWrapActive : null]}>
            <MaterialCommunityIcons
              name={tabIcons[route.name] || 'circle'}
              size={20}
              color={focused ? theme.colors.tabIconActive : theme.colors.tabIcon}
            />
          </View>
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="Spider" options={{ headerShown: false }}>
        {() => <CollectionStackNavigator screen="Spider" />}
      </Tab.Screen>
      <Tab.Screen name="Costume" options={{ headerShown: false }}>
        {() => <CollectionStackNavigator screen="Costume" />}
      </Tab.Screen>
      <Tab.Screen name="Comics" options={{ headerShown: false }}>
        {() => <CollectionStackNavigator screen="Comics" />}
      </Tab.Screen>
      <Tab.Screen name="Movies" options={{ headerShown: false }}>
        {() => <CollectionStackNavigator screen="Movies" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator;

const createStyles = (theme: ReturnType<typeof useAppTheme>['theme']) =>
  StyleSheet.create({
    tabBar: {
      position: 'absolute',
      left: 18,
      right: 18,
      bottom: 16,
      backgroundColor: theme.mode === 'dark' ? 'rgba(8,16,31,0.98)' : 'rgba(255,255,255,0.98)',
      borderTopWidth: 0,
      height: 78,
      paddingTop: 14,
      paddingBottom: 8,
      paddingHorizontal: 10,
      borderRadius: 26,
      elevation: 0,
      borderWidth: 1,
      borderColor: theme.mode === 'dark' ? 'rgba(43,127,255,0.18)' : 'rgba(225,29,46,0.1)',
      shadowOpacity: theme.mode === 'dark' ? 0.28 : 0.12,
      shadowRadius: 24,
      shadowOffset: { width: 0, height: 12 },
    },
    tabLabel: {
      fontSize: 10,
      fontWeight: '800',
      marginTop: 2,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
    },
    iconWrap: {
      width: 46,
      height: 40,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.mode === 'dark' ? '#102141' : '#E3EDFF',
      borderWidth: 1,
      borderColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(9,17,31,0.05)',
    },
    iconWrapActive: {
      backgroundColor: theme.colors.primary,
      transform: [{ translateY: -4 }, { rotate: '-4deg' }],
      shadowColor: theme.colors.primary,
      shadowOpacity: 0.35,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 8 },
    },
  });
