import React from 'react';
import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { useAppTheme } from '../../theme/ThemeProvider';
import type { CollectionStackParamList } from '../CollectionStackNavigator';

type CollectionDetailScreenProps = {
  route: RouteProp<CollectionStackParamList, 'CollectionDetail'>;
};

const CollectionDetailScreen = ({ route }: CollectionDetailScreenProps) => {
  const { item } = route.params;
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const openLink = async () => {
    if (!item.link) {
      return;
    }

    const supported = await Linking.canOpenURL(item.link);
    if (supported) {
      await Linking.openURL(item.link);
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.heroWrap}>
        <View style={styles.heroGlow} />
        <Image
          source={item.localImage || { uri: item.imageUrl }}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay} />
        <View style={styles.floatingHeader}>
          <Text style={styles.badge}>{item.badge || 'Spider-Verse'}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={styles.meta}>{item.meta}</Text>
        <Text style={styles.description}>{item.description}</Text>

        {item.link ? (
          <Pressable style={styles.linkButton} onPress={openLink}>
            <Text style={styles.linkButtonText}>{item.linkLabel || 'Open Link'}</Text>
          </Pressable>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default CollectionDetailScreen;

const createStyles = (theme: ReturnType<typeof useAppTheme>['theme']) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      paddingTop: 14,
      paddingBottom: 42,
    },
    heroWrap: {
      position: 'relative',
      height: 440,
      marginHorizontal: 16,
      marginTop: 6,
      borderRadius: 30,
      overflow: 'hidden',
      backgroundColor: theme.colors.surfaceAlt,
    },
    heroGlow: {
      position: 'absolute',
      width: 260,
      height: 260,
      borderRadius: 999,
      right: -48,
      top: -58,
      backgroundColor: theme.mode === 'dark' ? 'rgba(225,29,46,0.24)' : 'rgba(0,87,217,0.14)',
      zIndex: 1,
    },
    heroImage: {
      width: '100%',
      height: '100%',
    },
    heroOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(4,8,18,0.2)',
    },
    floatingHeader: {
      position: 'absolute',
      left: 22,
      right: 22,
      bottom: 22,
    },
    badge: {
      alignSelf: 'flex-start',
      backgroundColor: theme.colors.primary,
      color: theme.colors.white,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 999,
      overflow: 'hidden',
      fontSize: 11,
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      marginBottom: 12,
    },
    title: {
      color: '#FFFFFF',
      fontSize: 34,
      fontWeight: '900',
      marginBottom: 6,
    },
    subtitle: {
      color: 'rgba(255,255,255,0.88)',
      fontSize: 16,
      lineHeight: 24,
      maxWidth: '90%',
    },
    panel: {
      marginTop: -26,
      marginHorizontal: 16,
      backgroundColor: theme.colors.surface,
      borderRadius: 30,
      paddingHorizontal: 22,
      paddingVertical: 24,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: '#000',
      shadowOpacity: theme.mode === 'dark' ? 0.24 : 0.08,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 12 },
      elevation: 8,
    },
    meta: {
      color: theme.colors.primary,
      fontSize: 12,
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: 0.7,
      marginBottom: 14,
    },
    description: {
      color: theme.colors.textMuted,
      fontSize: 15,
      lineHeight: 26,
      marginBottom: 22,
    },
    linkButton: {
      alignSelf: 'flex-start',
      backgroundColor: theme.colors.primary,
      borderRadius: 999,
      paddingHorizontal: 18,
      paddingVertical: 13,
    },
    linkButtonText: {
      color: theme.colors.white,
      fontSize: 13,
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: 0.6,
    },
  });
