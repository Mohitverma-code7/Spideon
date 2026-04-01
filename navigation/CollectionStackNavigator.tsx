import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, StyleSheet } from "react-native";
import type { CollectionItem } from "../types/content";
import { useAppTheme } from "../theme/ThemeProvider";
import ThemeToggleButton from "../components/ThemeToggleButton";

import SpiderScreen from "./screens/SpiderScreen";
import CostumeScreen from "./screens/CostumeScreen";
import ComicsScreen from "./screens/ComicsScreen";
import MoviesScreen from "./screens/MoviesScreen";
import CollectionDetailScreen from "./screens/CollectionDetailScreen";

export type CollectionStackParamList = {
  CollectionMain: undefined;
  CollectionDetail: {
    item: CollectionItem;
  };
};

const Stack = createNativeStackNavigator<CollectionStackParamList>();

type CollectionStackNavigatorProps = {
  screen: "Spider" | "Costume" | "Comics" | "Movies";
};

const screenMap = {
  Spider: SpiderScreen,
  Costume: CostumeScreen,
  Comics: ComicsScreen,
  Movies: MoviesScreen,
} as const;

const CollectionStackNavigator = ({
  screen,
}: CollectionStackNavigatorProps) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  const MainScreen = screenMap[screen];

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerShadowVisible: false,
        headerTitleAlign: "left",

        contentStyle: {
          backgroundColor: theme.colors.background,
        },

        headerRight: () => (
          <View style={{ marginRight: 6 }}>
            <ThemeToggleButton />
          </View>
        ),
      }}
    >
      <Stack.Screen
        name="CollectionMain"
        component={MainScreen}
        options={{
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <Text style={styles.logoText}>SPIDEON</Text>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="CollectionDetail"
        component={CollectionDetailScreen}
        options={{
          title: "Details",
          headerTitleStyle: {
            fontWeight: "800",
            fontSize: 20,
            color: theme.colors.text,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default CollectionStackNavigator;

const createStyles = (theme: any) =>
  StyleSheet.create({
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
    },

    logoText: {
      fontSize: 26,
      fontWeight: "900",
      letterSpacing: 2,
      color: theme.colors.primary,
      marginBottom: 8,
    },
  });
