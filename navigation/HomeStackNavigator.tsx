import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import SpiderDetailScreen from "./screens/SpiderDetailScreen";
import type { SpiderHero } from "../types/spider";
import { useAppTheme } from "../theme/ThemeProvider";
import ThemeToggleButton from "../components/ThemeToggleButton";

export type HomeStackParamList = {
  HomeMain: undefined;
  SpiderDetail: {
    hero: SpiderHero;
  };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

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
        name="HomeMain"
        component={HomeScreen}
        options={{
          headerTitle: () => (
            <View style={styles.headerContainer}>
            
              <Text style={styles.logoText}>SPIDEON</Text>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="SpiderDetail"
        component={SpiderDetailScreen}
        options={{
          title: "Hero Details",
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

export default HomeStackNavigator;

const createStyles = (theme: any) =>
  StyleSheet.create({
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
    },

    icon: {
      marginRight: 6,
    },

    logoText: {
      fontSize: 26,
      fontWeight: "900",
      letterSpacing: 2,
      color: theme.colors.primary,
      marginBottom: 8,
    },
  });

