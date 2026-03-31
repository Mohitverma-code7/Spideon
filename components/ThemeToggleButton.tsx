import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'expo/node_modules/@expo/vector-icons/MaterialCommunityIcons';
import { useAppTheme } from '../theme/ThemeProvider';

const ThemeToggleButton = () => {
  const { theme, themeMode, toggleTheme } = useAppTheme();
  const styles = createStyles(theme);
  const isDark = themeMode === 'dark';

  return (
    <Pressable style={styles.button} onPress={toggleTheme}>
      <View style={styles.iconShell}>
        <MaterialCommunityIcons
          name="spider"
          size={24}
          color={isDark ? '#FFFFFF' : '#0A0F1E'}
        />
        <View style={styles.modeBadge}>
          <MaterialCommunityIcons
            name={isDark ? 'white-balance-sunny' : 'moon-waning-crescent'}
            size={10}
            color={isDark ? '#0A0F1E' : '#FFFFFF'}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default ThemeToggleButton;

const createStyles = (theme: ReturnType<typeof useAppTheme>['theme']) =>
  StyleSheet.create({
    button: {
      backgroundColor: theme.mode === 'dark' ? '#05070D' : '#F4F7FB',
      borderRadius: 999,
      width: 56,
      height: 56,
      borderWidth: 1,
      borderColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOpacity: theme.mode === 'dark' ? 0.28 : 0.12,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 8 },
      elevation: 6,
    },
    iconShell: {
      width: 36,
      height: 36,
      borderRadius: 999,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.mode === 'dark' ? theme.colors.primary : theme.colors.accentSoft,
      position: 'relative',
    },
    modeBadge: {
      position: 'absolute',
      width: 16,
      height: 16,
      borderRadius: 99,
      right: -2,
      bottom: -1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.mode === 'dark' ? '#FFFFFF' : theme.colors.primary,
      borderWidth: 1,
      borderColor: theme.mode === 'dark' ? 'rgba(9,17,31,0.1)' : 'rgba(255,255,255,0.25)',
    },
  });
