import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../theme/ThemeProvider';
import type { SpiderHero } from '../types/spider';

type SpiderHeroCardProps = {
  hero: SpiderHero;
  onPress: () => void;
};

const SpiderHeroCard = ({ hero, onPress }: SpiderHeroCardProps) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  const heroImage = hero.imageUrl;
  const homeEarth = hero.earth || hero.universe || 'Unknown Earth';
  const aliasCount = hero.aliases?.length || 0;
  const appearancesCount = hero.appearances?.length || 0;
  const roleText = hero.occupation?.join(', ') || 'Spider-powered hero navigating the multiverse.';

  return (
    <View style={styles.card}>
      <View style={styles.imageWrap}>
        {heroImage ? (
          <Image source={{ uri: heroImage }} style={styles.cardImage} resizeMode="cover" />
        ) : null}
        <View style={styles.gridLine} />
        <View style={styles.imageTopRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{homeEarth}</Text>
          </View>
          {/* <View style={styles.arrowChip}>
            <Text style={styles.arrowText}>Open</Text>
          </View> */}
        </View>

        <View style={styles.headlineBlock}>
          <Text style={styles.cardTitle}>{hero.name}</Text>
          <Text style={styles.cardSubtitle}>{hero.fullName || 'Identity classified in the multiverse'}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.kickerRow}>
          <Text style={styles.kickerText}>Spider Profile</Text>
          <View style={styles.dot} />
          <Text style={styles.kickerText}>{hero.voiceActor || 'Multiverse File'}</Text>
        </View>
        {/* <View style={styles.metaGrid}>
          <View style={styles.metaCard}>
            <Text style={styles.metaLabel}>Status</Text>
            <Text style={styles.metaValue}>{hero.status || 'Unknown'}</Text>
          </View>
          <View style={styles.metaCard}>
            <Text style={styles.metaLabel}>Species</Text>
            <Text style={styles.metaValue}>{hero.species || 'Unknown'}</Text>
          </View>
        </View> */}
        {/* <View style={styles.rolePanel}>
          <Text style={styles.roleLabel}>Profile</Text>
          <Text style={styles.roleValue}>{roleText}</Text>
        </View>
        <Text style={styles.description} numberOfLines={3}>
          {hero.description || 'No extra intel yet for this Spider-Verse profile.'}
        </Text>
        <View style={styles.chipRow}>
          <View style={styles.statChip}>
            <Text style={styles.statChipValue}>{aliasCount}</Text>
            <Text style={styles.statChipLabel}>Aliases</Text>
          </View>
          <View style={styles.statChip}>
            <Text style={styles.statChipValue}>{appearancesCount}</Text>
            <Text style={styles.statChipLabel}>Appearances</Text>
          </View>
          <View style={styles.statChip}>
            <Text style={styles.statChipValue}>{hero.age || 'N/A'}</Text>
            <Text style={styles.statChipLabel}>Age</Text>
          </View>
        </View> */}
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>
            {hero.location || 'Unknown location'}
          </Text>
          <View style={styles.openBadge}>
            <Pressable onPress={onPress}>
              <Text style={styles.openBadgeText}>View Details</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SpiderHeroCard;

const createStyles = (theme: ReturnType<typeof useAppTheme>['theme']) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.card,
      borderRadius: 34,
      overflow: 'hidden',
      marginBottom: 24,
      borderWidth: 1,
      borderColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(8,15,35,0.08)',
      shadowColor: '#000',
      shadowOpacity: theme.mode === 'dark' ? 0.34 : 0.12,
      shadowRadius: 26,
      shadowOffset: { width: 0, height: 14 },
      elevation: 10,
    },
    imageWrap: {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'flex-end',
      minHeight: 356,
      backgroundColor: theme.mode === 'dark' ? '#071120' : '#DCEBFF',
    },
    cardImage: {
     width: '100%',
     height: 360,
    },
    gridLine: {
      position: 'absolute',
      left: 18,
      right: 18,
      top: 74,
      borderTopWidth: 1,
      borderTopColor: 'rgba(255,255,255,0.08)',
    },
    imageTopRow: {
      position: 'absolute',
      top: 18,
      left: 18,
      right: 18,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headlineBlock: {
      position: 'absolute',
      left: 20,
      right: 20,
      bottom: 22,
    },
    cardBody: {
      paddingHorizontal: 18,
      paddingTop: 18,
      paddingBottom: 20,
      backgroundColor: theme.colors.card,
    },
    kickerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 14,
      gap: 8,
    },
    kickerText: {
      color: theme.colors.textMuted,
      fontSize: 11,
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: 0.7,
    },
    dot: {
      width: 4,
      height: 4,
      borderRadius: 999,
      backgroundColor: theme.colors.primary,
    },
    badge: {
      alignSelf: 'flex-start',
      backgroundColor: theme.mode === 'dark' ? 'rgba(214,40,40,0.92)' : theme.colors.primary,
      borderRadius: 999,
      paddingHorizontal: 13,
      paddingVertical: 7,
      marginBottom: 12,
    },
    badgeText: {
      color: theme.colors.white,
      fontSize: 11,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.8,
    },
    arrowChip: {
      backgroundColor: 'rgba(255,255,255,0.94)',
      borderRadius: 999,
      paddingHorizontal: 14,
      paddingVertical: 8,
    },
    arrowText: {
      color: '#0F172A',
      fontSize: 11,
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: 0.7,
    },
    cardTitle: {
      color: '#FFFFFF',
      fontSize: 31,
      fontWeight: '900',
      marginBottom: 4,
    },
    cardSubtitle: {
      color: 'rgba(255,255,255,0.88)',
      fontSize: 14,
      lineHeight: 21,
    },
    metaGrid: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 14,
    },
    metaCard: {
      flex: 1,
      backgroundColor: theme.mode === 'dark' ? '#111D37' : '#F0F5FF',
      borderRadius: 20,
      paddingHorizontal: 14,
      paddingVertical: 15,
    },
    metaLabel: {
      color: theme.colors.textMuted,
      fontSize: 12,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 8,
    },
    metaValue: {
      color: theme.colors.text,
      fontSize: 15,
      fontWeight: '800',
    },
    rolePanel: {
      backgroundColor: theme.mode === 'dark' ? '#0C152A' : '#F8FAFC',
      borderRadius: 20,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    roleLabel: {
      color: theme.colors.textMuted,
      fontSize: 12,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      marginBottom: 8,
    },
    roleValue: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: '800',
    },
    description: {
      color: theme.colors.textMuted,
      fontSize: 14,
      lineHeight: 23,
      marginTop: 14,
      marginBottom: 16,
    },
    chipRow: {
      flexDirection: 'row',
      gap: 10,
      flexWrap: 'wrap',
    },
    statChip: {
      backgroundColor: theme.mode === 'dark' ? '#0C152A' : '#EEF4FF',
      borderRadius: 18,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: theme.colors.border,
      minWidth: 88,
    },
    statChipValue: {
      color: theme.colors.text,
      fontSize: 14,
      fontWeight: '900',
      marginBottom: 4,
    },
    statChipLabel: {
      color: theme.colors.textMuted,
      fontSize: 11,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    footerRow: {
      marginTop: 16,
      paddingTop: 14,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
    },
    footerText: {
      flex: 1,
      color: theme.colors.textMuted,
      fontSize: 12,
      fontWeight: '700',
    },
    openBadge: {
      backgroundColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#F3F7FF',
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    openBadgeText: {
      color: theme.colors.text,
      fontSize: 11,
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
  });
