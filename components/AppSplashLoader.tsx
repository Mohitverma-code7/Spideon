import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../theme/ThemeProvider';

const AppSplashLoader = () => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.grid} />
      <View style={styles.glow} />
      <View style={styles.glowSecondary} />
      <View style={styles.logoWrap}>
        <Text style={styles.logoText}>SP</Text>
      </View>
      <Text style={styles.title}>Spideon</Text>
      <Text style={styles.subtitle}>Entering the Spider-Verse archive...</Text>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
};

export default AppSplashLoader;

const createStyles = (theme: ReturnType<typeof useAppTheme>['theme']) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
      padding: 24,
      overflow: 'hidden',
    },
    grid: {
      position: 'absolute',
      inset: 0,
      backgroundColor: theme.colors.background,
      borderColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(9,17,31,0.04)',
      borderTopWidth: 1,
    },
    glow: {
      position: 'absolute',
      width: 320,
      height: 320,
      borderRadius: 999,
      backgroundColor: theme.colors.primarySoft,
      opacity: 0.95,
      top: 120,
    },
    glowSecondary: {
      position: 'absolute',
      width: 260,
      height: 260,
      borderRadius: 999,
      backgroundColor: theme.colors.accentSoft,
      opacity: 0.9,
      bottom: 110,
      right: -40,
    },
    logoWrap: {
      width: 152,
      height: 152,
      borderRadius: 42,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginBottom: 20,
      transform: [{ rotate: '-6deg' }],
      shadowColor: '#000',
      shadowOpacity: theme.mode === 'dark' ? 0.28 : 0.14,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 12 },
      elevation: 8,
    },
    logoText: {
      fontSize: 58,
      fontWeight: '900',
      color: theme.colors.primary,
      letterSpacing: 1.2,
    },
    title: {
      fontSize: 38,
      fontWeight: '900',
      color: theme.colors.text,
      marginBottom: 8,
      letterSpacing: 0.5,
    },
    subtitle: {
      fontSize: 15,
      color: theme.colors.textMuted,
      marginBottom: 24,
      textAlign: 'center',
      maxWidth: 260,
    },
  });
