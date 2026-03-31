import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
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
import { VideoView, useVideoPlayer } from "expo-video";

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
      setError('Could not load Spider-Verse data right now.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  
  const player = useVideoPlayer(
    require("../../assets/videos/video1.mp4")
  );

  useEffect(() => {
    if (!player) return;

    player.loop = true;
    player.play();

    return () => {
      player.pause(); // cleanup (VERY IMPORTANT)
    };
  }, [player]);

  /* ---------------- FILTER ---------------- */
  const filteredHeroes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return heroes;

    return heroes.filter((hero) => {
      const text = [
        hero.name,
        hero.fullName,
        hero.earth,
        hero.universe,
        ...(hero.aliases || []),
      ]
        .join(' ')
        .toLowerCase();

      return text.includes(query);
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
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      
      <View style={styles.heroPanel}>

        <Text style={styles.title}>
          OUR MAIN HEROS
        </Text>

        
        {player && (
          <VideoView
            player={player}
            style={styles.video}
            nativeControls={false}
            contentFit='cover'
          />
        )}

        
        <View style={styles.searchWrapper}>
          <TextInput
            placeholder="Search Spider heroes..."
            placeholderTextColor={theme.colors.textMuted}
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.statRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{heroes.length}</Text>
            <Text style={styles.statLabel}>Loaded</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{filteredHeroes.length}</Text>
            <Text style={styles.statLabel}>Matches</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Spideon List</Text>

      {loading && (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      )}

      {error !== '' && (
        <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>
      )}

      {!loading &&
        filteredHeroes.map((hero) => (
          <SpiderHeroCard
            key={hero.id}
            hero={hero}
            onPress={() =>
              navigation.navigate('SpiderDetail', { hero })
            }
          />
        ))}
    </ScrollView>
  );
};

export default HomeScreen;


const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: 16,
      paddingBottom: 100,
    },

    heroPanel: {
      backgroundColor: theme.mode === 'dark' ? theme.colors.backgroundAlt : theme.colors.backgroundAlt,
      borderRadius: 30,
      padding: 20,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOpacity: theme.mode === 'dark' ? 0.24 : 0.1,
      shadowRadius: 22,
      shadowOffset: { width: 0, height: 12 },
      elevation: 8,
    },

    title: {
      fontSize: 26,
      fontWeight: '900',
      color: theme.colors.text,
      marginBottom: 12,
    },

    video: {
      width: '100%',
      height: 350,
      borderRadius: 20,
      marginBottom: 14,
      overflow: 'hidden',
    },

    searchWrapper: {
      backgroundColor: '#fff',
      borderRadius: 16,
      paddingHorizontal: 12,
      marginBottom: 12,
      borderWidth: 1,
    },

    searchInput: {
      height: 45,
      fontSize: 16,
      color: '#000',
    },

    statRow: {
      flexDirection: 'row',
      gap: 10,
    },

    statCard: {
      flex: 1,
      backgroundColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.8)',
      borderRadius: 16,
      padding: 12,
      alignItems: 'center',
      borderWidth: 1,
    },

    statValue: {
      fontSize: 20,
      fontWeight: '800',
      color: theme.colors.text,
    },

    statLabel: {
      fontSize: 12,
      color: theme.colors.textMuted,
    },

    sectionTitle: {
      fontSize: 22,
      fontWeight: '900',
      color: theme.colors.text,
      marginBottom: 12,
    },
  });