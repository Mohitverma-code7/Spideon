import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { useColorScheme } from "react-native";
import {
  AppTheme,
  createNavigationTheme,
  darkAppTheme,
  lightAppTheme,
  ThemeMode,
} from "./appTheme";

type ThemeContextValue = {
  theme: AppTheme;
  themeMode: ThemeMode;
  toggleTheme: () => void;
  navigationTheme: ReturnType<typeof createNavigationTheme>;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const systemMode = useColorScheme() === "dark" ? "dark" : "light";
  const [themeMode, setThemeMode] = useState<ThemeMode>(systemMode);

  const value = useMemo(() => {
    const theme = themeMode === "dark" ? darkAppTheme : lightAppTheme;

    return {
      theme,
      themeMode,
      toggleTheme: () => {
        setThemeMode((currentMode) =>
          currentMode === "dark" ? "light" : "dark",
        );
      },
      navigationTheme: createNavigationTheme(theme),
    };
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useAppTheme must be used inside ThemeProvider.");
  }

  return context;
};
