import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import type { HomeStackParamList } from '../HomeStackNavigator';
import { useAppTheme } from '../../theme/ThemeProvider';

type SpiderDetailScreenProps = {
  route: RouteProp<HomeStackParamList, 'SpiderDetail'>;
};

const SpiderDetailScreen = ({ route }: SpiderDetailScreenProps) => {
  const { hero } = route.params;
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  const heroImage = hero.imageUrl;
  const earthLabel = hero.earth || hero.universe || 'Unknown Earth';
  const aliases = (hero.aliases || []).slice(0, 6);
  const abilities = (hero.abilities || []).slice(0, 8);
  const appearances = (hero.appearances || []).slice(0, 5);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.heroWrap}>
        <View style={styles.heroBackdrop} />
        {heroImage ? (
          <Image source={{ uri: heroImage }} style={styles.heroImage} resizeMode="contain" />
        ) : null}
        <View style={styles.heroOverlay} />
        <View style={styles.floatingHeader}>
          <Text style={styles.publisher}>{earthLabel}</Text>
          <Text style={styles.name}>{hero.name}</Text>
          <Text style={styles.fullName}>{hero.fullName || 'Identity classified in the multiverse'}</Text>
        </View>
      </View>

      <View style={styles.panel}>
        <View style={styles.sectionHeading}>
          <Text style={styles.sectionEyebrow}>Character File</Text>
          <Text style={styles.sectionTitle}>Spider dossier</Text>
        </View>

        <View style={styles.infoCard}>
          <DetailRow label="Status" value={hero.status || 'Unknown'} />
          <DetailRow label="Species" value={hero.species || 'Unknown'} />
          <DetailRow label="Gender" value={hero.gender || 'Unknown'} />
          <DetailRow label="Identity" value={hero.identity || 'Unknown'} />
          <DetailRow label="Location" value={hero.location || 'Unknown'} />
          <DetailRow label="Occupation" value={hero.occupation?.join(', ') || 'Unknown'} />
          <DetailRow label="Age" value={hero.age || 'Unknown'} />
          <DetailRow label="Voice Actor" value={hero.voiceActor || 'Unknown'} />
        </View>

        <View style={styles.storyPanel}>
          <Text style={styles.storyTitle}>Origin Snapshot</Text>
          <Text style={styles.storyText}>
            {hero.description || 'No extra multiverse notes are available for this character yet.'}
          </Text>
        </View>

        {aliases.length ? (
          <View style={styles.quotePanel}>
            <Text style={styles.quoteHeading}>Aliases</Text>
            <View style={styles.tagWrap}>
              {aliases.map((alias) => (
                <Tag key={alias} label={alias} />
              ))}
            </View>
          </View>
        ) : null}

        {abilities.length ? (
          <View style={styles.quotePanel}>
            <Text style={styles.quoteHeading}>Abilities</Text>
            <View style={styles.tagWrap}>
              {abilities.map((ability) => (
                <Tag key={ability} label={ability} />
              ))}
            </View>
          </View>
        ) : null}

        {appearances.length ? (
          <View style={styles.quotePanel}>
            <Text style={styles.quoteHeading}>Appearances</Text>
            <View style={styles.listWrap}>
              {appearances.map((appearance) => (
                <Text key={appearance} style={styles.listItem}>
                  {appearance}
                </Text>
              ))}
            </View>
          </View>
        ) : null}

        <View style={styles.quotePanel}>
          <Text style={styles.quoteHeading}>Profile Notes</Text>
          <Text style={styles.quoteText}>
            {hero.nationality || 'Unknown nationality'} | {hero.eyeColor || 'Unknown eyes'} |{' '}
            {hero.hairColor || 'Unknown hair'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

type DetailRowProps = {
  label: string;
  value: string;
};

const DetailRow = ({ label, value }: DetailRowProps) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
};

type TagProps = {
  label: string;
};

const Tag = ({ label }: TagProps) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{label}</Text>
    </View>
  );
};

export default SpiderDetailScreen;

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
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginHorizontal: 16,
      marginTop: 6,
      borderRadius: 30,
      overflow: 'hidden',
      backgroundColor: theme.mode === 'dark' ? '#06101E' : '#DCEBFF',
    },
    heroBackdrop: {
      position: 'absolute',
      width: 320,
      height: 320,
      borderRadius: 999,
      backgroundColor: theme.mode === 'dark' ? 'rgba(214,40,40,0.3)' : 'rgba(193,18,31,0.16)',
      top: 38,
    },
    heroImage: {
      width: '94%',
      height: 430,
    },
    heroOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(4,8,18,0.14)',
    },
    floatingHeader: {
      position: 'absolute',
      left: 22,
      right: 22,
      bottom: 24,
    },
    panel: {
      marginTop: -28,
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
    publisher: {
      alignSelf: 'flex-start',
      backgroundColor: theme.colors.primary,
      color: theme.colors.white,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 999,
      overflow: 'hidden',
      fontWeight: '700',
      fontSize: 12,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      marginBottom: 14,
    },
    name: {
      color: '#FFFFFF',
      fontSize: 38,
      fontWeight: '900',
    },
    fullName: {
      color: 'rgba(255,255,255,0.86)',
      fontSize: 16,
      lineHeight: 24,
      marginTop: 8,
      maxWidth: '85%',
    },
    sectionHeading: {
      marginBottom: 18,
    },
    sectionEyebrow: {
      color: theme.colors.primary,
      fontSize: 12,
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      marginBottom: 6,
    },
    sectionTitle: {
      color: theme.colors.text,
      fontSize: 24,
      fontWeight: '900',
    },
    infoCard: {
      backgroundColor: theme.colors.surfaceAlt,
      borderRadius: 22,
      paddingHorizontal: 18,
      paddingVertical: 4,
      marginBottom: 18,
    },
    detailRow: {
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    detailLabel: {
      color: theme.colors.textMuted,
      fontSize: 12,
      marginBottom: 8,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.6,
    },
    detailValue: {
      color: theme.colors.text,
      fontSize: 18,
      fontWeight: '800',
    },
    quotePanel: {
      backgroundColor: theme.mode === 'dark' ? '#0B1326' : '#F8FAFC',
      borderRadius: 22,
      padding: 20,
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginTop: 16,
    },
    storyPanel: {
      backgroundColor: theme.mode === 'dark' ? '#0B1326' : '#F8FAFC',
      borderRadius: 22,
      padding: 20,
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginBottom: 2,
    },
    storyTitle: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: '800',
      marginBottom: 10,
    },
    storyText: {
      color: theme.colors.textMuted,
      fontSize: 15,
      lineHeight: 24,
    },
    quoteHeading: {
      color: theme.colors.text,
      fontSize: 15,
      fontWeight: '800',
      marginBottom: 12,
    },
    quoteText: {
      color: theme.colors.textMuted,
      fontSize: 15,
      lineHeight: 24,
    },
    tagWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    tag: {
      backgroundColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#EAF1FF',
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    tagText: {
      color: theme.colors.text,
      fontSize: 12,
      fontWeight: '700',
    },
    listWrap: {
      gap: 10,
    },
    listItem: {
      color: theme.colors.textMuted,
      fontSize: 14,
      lineHeight: 21,
    },
  });
