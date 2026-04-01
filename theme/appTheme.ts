import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";

export type ThemeMode = "light" | "dark";

export type AppTheme = {
  mode: ThemeMode;
  colors: {
    background: string;
    backgroundAlt: string;
    surface: string;
    surfaceAlt: string;
    card: string;
    text: string;
    textMuted: string;
    border: string;
    primary: string;
    primarySoft: string;
    accent: string;
    accentSoft: string;
    input: string;
    tabBar: string;
    tabIcon: string;
    tabIconActive: string;
    white: string;
  };
};

export const lightAppTheme: AppTheme = {
  mode: "light",
  colors: {
    background: "#EEF4FF",
    backgroundAlt: "#D9E9FF",
    surface: "#FFFFFF",
    surfaceAlt: "#DCE8FF",
    card: "#FFFFFF",
    text: "#09111F",
    textMuted: "#425168",
    border: "rgba(9, 17, 31, 0.08)",
    primary: "#D71921",
    primarySoft: "#FFE0E2",
    accent: "#0057D9",
    accentSoft: "#D9E7FF",
    input: "#F7FAFF",
    tabBar: "#FFFFFF",
    tabIcon: "#55657C",
    tabIconActive: "#FFFFFF",
    white: "#FFFFFF",
  },
};

export const darkAppTheme: AppTheme = {
  mode: "dark",
  colors: {
    background: "#050B18",
    backgroundAlt: "#091427",
    surface: "#0B1428",
    surfaceAlt: "#12203E",
    card: "#0B1428",
    text: "#F8FAFC",
    textMuted: "#B6C3D8",
    border: "rgba(255,255,255,0.08)",
    primary: "#E11D2E",
    primarySoft: "#381018",
    accent: "#2B7FFF",
    accentSoft: "#11264E",
    input: "#F8FAFC",
    tabBar: "#08101F",
    tabIcon: "#8CA0C3",
    tabIconActive: "#FFFFFF",
    white: "#FFFFFF",
  },
};

export const createNavigationTheme = (appTheme: AppTheme): Theme => {
  const baseTheme = appTheme.mode === "dark" ? DarkTheme : DefaultTheme;

  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: appTheme.colors.primary,
      background: appTheme.colors.background,
      card: appTheme.colors.surface,
      text: appTheme.colors.text,
      border: appTheme.colors.border,
      notification: appTheme.colors.accent,
    },
  };
};
