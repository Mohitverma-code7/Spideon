import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "../theme/ThemeProvider";

type ScreenPlaceholderProps = {
  title: string;
  subtitle: string;
  badge: string;
};

const ScreenPlaceholder = ({
  title,
  subtitle,
  badge,
}: ScreenPlaceholderProps) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.badge}>{badge}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

export default ScreenPlaceholder;

const createStyles = (theme: ReturnType<typeof useAppTheme>["theme"]) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: "center",
      paddingHorizontal: 18,
      paddingTop: 18,
      paddingBottom: 120,
    },
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 30,
      padding: 26,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: "#000",
      shadowOpacity: theme.mode === "dark" ? 0.18 : 0.08,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 10 },
      elevation: 6,
    },
    badge: {
      alignSelf: "flex-start",
      backgroundColor: theme.colors.primarySoft,
      color: theme.colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 999,
      overflow: "hidden",
      fontSize: 12,
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: 0.6,
      marginBottom: 14,
    },
    title: {
      color: theme.colors.text,
      fontSize: 30,
      fontWeight: "800",
      marginBottom: 10,
    },
    subtitle: {
      color: theme.colors.textMuted,
      fontSize: 15,
      lineHeight: 23,
    },
  });
