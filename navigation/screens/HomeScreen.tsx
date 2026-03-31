import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import SpiderHeroCard from '../../components/SpiderHeroCard';
import type { HomeStackParamList } from '../HomeStackNavigator';
import { getSpiderHeroes } from '../../api/spiderApi';
import { useAppTheme } from '../../theme/ThemeProvider';
import type { SpiderHero } from '../../types/spider';

const HomeScreen = () => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const [searchQuery, setSearchQuery] = useState('');
  const [heroes, setHeroes] = useState<SpiderHero[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fetchHeroes = async () => {
    try {
      setError('');
      const spiderHeroes = await getSpiderHeroes();
      setHeroes(spiderHeroes);
    } catch {
      setError('Could not load Spider-Verse data right now. Pull to try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  const filteredHeroes = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return heroes;
    }

    return heroes.filter((hero) => {
      const searchableText = [
        hero.name,
        hero.fullName,
        hero.earth,
        hero.universe,
        hero.status,
        hero.species,
        ...(hero.aliases || []),
        ...(hero.abilities || []),
        ...(hero.occupation || []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [heroes, searchQuery]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchHeroes();
  };
 


  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#D62828" />
      }
    >
      <View style={styles.heroPanel}>
        {/* <View style={styles.heroTopRow}>
          <View style={styles.kicker}>
            <Text style={styles.kickerText}>SPIDEON</Text>
          </View>
          <View style={styles.livePill}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>Character Intel</Text>
          </View>
        </View> */}

        <Text style={styles.title}>Swing through your Spider-Verse roster</Text>
        {/* <Text style={styles.subtitle}>
          Search variants, explore universes, and open richer Spider cards built from your new character API shape.
        </Text> */}



        <View style={styles.searchWrapper}>
          <Text style={styles.searchIcon}></Text>
          <TextInput
            placeholder="Search Miles, Gwen, Earth-65, Spider-Punk..."
            placeholderTextColor={theme.colors.textMuted}
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.statRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{heroes.length}</Text>
            <Text style={styles.statLabel}> Loaded</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{filteredHeroes.length}</Text>
            <Text style={styles.statLabel}> Matches</Text>
          </View>
        </View>

        {/* <View style={styles.heroActionRow}>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Spider Society</Text>
          </Pressable>
          <View style={styles.secondaryChip}>
            <Text style={styles.secondaryChipText}>Tap a card for full dossier</Text>
          </View>
        </View> */}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Spideon List</Text>
        
      </View>

      {loading ? (
        <View style={styles.feedbackCard}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.feedbackText}>Loading Spider-Verse data...</Text>
        </View>
      ) : null}

      {!loading && error ? (
        <View style={styles.feedbackCard}>
          <Text style={styles.feedbackTitle}>Network issue</Text>
          <Text style={styles.feedbackText}>{error}</Text>
        </View>
      ) : null}

      {!loading && !error && filteredHeroes.length === 0 ? (
        <View style={styles.feedbackCard}>
          <Text style={styles.feedbackTitle}>No matches found</Text>
          <Text style={styles.feedbackText}>Try a different character name, earth, alias, or ability.</Text>
        </View>
      ) : null}

      {!loading && !error
        ? filteredHeroes.map((hero) => (
            <SpiderHeroCard
              key={hero.id}
              hero={hero}
              onPress={() => navigation.navigate('SpiderDetail', { hero })}
            />
          ))
        : null}
    </ScrollView>
  );
};

export default HomeScreen;

const createStyles = (theme: ReturnType<typeof useAppTheme>['theme']) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      paddingHorizontal: 18,
      paddingTop: 14,
      paddingBottom: 120,
    },
    heroPanel: {
      backgroundColor: theme.mode === 'dark' ? '#091427' : '#DCEEFF',
      borderRadius: 34,
      padding: 22,
      marginBottom: 28,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: '#000',
      shadowOpacity: theme.mode === 'dark' ? 0.3 : 0.12,
      shadowRadius: 24,
      shadowOffset: { width: 0, height: 14 },
      elevation: 10,
      overflow: 'hidden',
    },
    heroTopRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    kicker: {
      backgroundColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.6)',
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    kickerText: {
      color: theme.colors.text,
      fontSize: 12,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.8,
    },
    livePill: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.mode === 'dark' ? '#08111F' : '#FFFFFF',
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 8,
      gap: 8,
    },
    liveDot: {
      width: 8,
      height: 8,
      borderRadius: 999,
      backgroundColor: theme.colors.primary,
    },
    liveText: {
      color: theme.colors.text,
      fontSize: 12,
      fontWeight: '700',
    },
    title: {
      color: theme.mode === 'dark' ? '#F8FAFC' : '#061426',
      fontSize: 34,
      fontWeight: '900',
      lineHeight: 40,
      maxWidth: '85%',
    },
    subtitle: {
      color: theme.mode === 'dark' ? '#CBD5E1' : '#314158',
      fontSize: 15,
      lineHeight: 23,
      marginTop: 12,
      marginBottom: 20,
      maxWidth: '88%',
    },
    searchWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.96)' : '#FFFFFF',
      borderRadius: 22,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    searchIcon: {
      fontSize: 11,
      color: '#64748B',
      marginRight: 10,
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: 0.8,
    },
    searchInput: {
      flex: 1,
      color: '#0F172A',
      fontSize: 16,
      paddingVertical: 10,
    },
    statRow: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 18,
    },
    statCard: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.72)',
      borderRadius: 22,
      padding: 16,
    },
    statValue: {
      color: theme.mode === 'dark' ? '#FFFFFF' : '#061426',
      fontSize: 26,
      fontWeight: '900',
    },
    statLabel: {
      color: theme.mode === 'dark' ? '#CBD5E1' : '#42546B',
      marginTop: 6,
      fontSize: 13,
      fontWeight: '600',
    },
    heroActionRow: {
      marginTop: 16,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      flexWrap: 'wrap',
    },
    primaryButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 999,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    primaryButtonText: {
      color: theme.colors.white,
      fontSize: 13,
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: 0.6,
    },
    secondaryChip: {
      backgroundColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.7)',
      borderRadius: 999,
      paddingHorizontal: 14,
      paddingVertical: 12,
    },
    secondaryChipText: {
      color: theme.colors.text,
      fontSize: 12,
      fontWeight: '700',
    },
    sectionHeader: {
      marginBottom: 18,
      paddingHorizontal: 2,
    },
    sectionTitle: {
      color: theme.colors.text,
      fontSize: 24,
      fontWeight: '900',
    },
    sectionCaption: {
      color: theme.colors.textMuted,
      fontSize: 14,
      marginTop: 6,
      lineHeight: 20,
    },
    feedbackCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 28,
      padding: 24,
      alignItems: 'center',
      marginBottom: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    feedbackTitle: {
      color: theme.colors.text,
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 8,
    },
    feedbackText: {
      color: theme.colors.textMuted,
      fontSize: 14,
      textAlign: 'center',
      marginTop: 12,
      lineHeight: 20,
    },
  });

