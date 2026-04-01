import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider, useAppTheme } from "./theme/ThemeProvider";
import RootStack from "./navigation/RootStack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

const AppContent = () => {
  const { navigationTheme } = useAppTheme();
  const insets = useSafeAreaInsets();

  const [fontsLoaded] = useFonts({
    "BebasNeue-Regular": require("./assets/fonts/BebasNeue-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
      onLayout={onLayoutRootView}
    >
      <NavigationContainer theme={navigationTheme}>
        <RootStack />
      </NavigationContainer>
    </View>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
