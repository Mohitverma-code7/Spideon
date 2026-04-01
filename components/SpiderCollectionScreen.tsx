import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from "../theme/ThemeProvider";
import type { CollectionItem } from "../types/content";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { CollectionStackParamList } from "../navigation/CollectionStackNavigator";

type SpiderCollectionScreenProps = {
  badge: string;
  title: string;
  subtitle: string;
  sectionTitle: string;
  sectionCaption: string;
  loadItems: () => Promise<CollectionItem[]>;
};

const SpiderCollectionScreen = ({
  badge,
  title,
  subtitle,
  sectionTitle,
  sectionCaption,
  loadItems,
}: SpiderCollectionScreenProps) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  const navigation =
    useNavigation<NativeStackNavigationProp<CollectionStackParamList>>();
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const defaultFallbackImage =
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/620-spider-man.jpg";

  const fetchItems = async () => {
    try {
      setError("");
      const data = await loadItems();
      setItems(data);
      setFailedImages({});
    } catch {
      setError("Could not load this Spider-Verse section right now.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const filteredItems = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return items;
    }

    return items.filter((item) =>
      [item.title, item.subtitle, item.description, item.meta]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [items, searchQuery]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchItems();
  };

  const openLink = async (url?: string) => {
    if (!url) {
      return;
    }

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={theme.colors.primary}
        />
      }
    >
      <View style={styles.heroPanel}>
        <View style={styles.heroGlow} />
        <Text style={styles.badge}>{badge}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        <View style={styles.searchWrapper}>
          <Text style={styles.searchLabel}></Text>
          <TextInput
            placeholder="Search this collection..."
            placeholderTextColor={theme.colors.textMuted}
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{items.length}</Text>
            <Text style={styles.statLabel}> Items</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{filteredItems.length}</Text>
            <Text style={styles.statLabel}> Visible</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{sectionTitle}</Text>
        <Text style={styles.sectionCaption}>{sectionCaption}</Text>
      </View>

      {loading ? (
        <View style={styles.feedbackCard}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.feedbackText}>Loading collection...</Text>
        </View>
      ) : null}

      {!loading && error ? (
        <View style={styles.feedbackCard}>
          <Text style={styles.feedbackTitle}>Something went wrong</Text>
          <Text style={styles.feedbackText}>{error}</Text>
        </View>
      ) : null}

      {!loading && !error && filteredItems.length === 0 ? (
        <View style={styles.feedbackCard}>
          <Text style={styles.feedbackTitle}>No results</Text>
          <Text style={styles.feedbackText}>Try a different keyword.</Text>
        </View>
      ) : null}

      {!loading && !error
        ? filteredItems.map((item) => (
            <Pressable
              key={item.id}
              style={styles.card}
              onPress={() => navigation.navigate("CollectionDetail", { item })}
            >
              <View style={styles.imageWrap}>
                <Image
                  source={
                    item.localImage
                      ? item.localImage
                      : {
                          uri: failedImages[item.id]
                            ? item.fallbackImageUrl || defaultFallbackImage
                            : item.imageUrl,
                        }
                  }
                  style={styles.image}
                  resizeMode="cover"
                  onError={() => {
                    if (!item.localImage) {
                      setFailedImages((current) => ({
                        ...current,
                        [item.id]: true,
                      }));
                    }
                  }}
                />
                <View style={styles.overlayContent}>
                  <Text style={styles.overlayBadge}>{item.badge || badge}</Text>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                </View>
              </View>

              <View style={styles.cardBody}>
                <View style={styles.metaRow}>
                  <Text style={styles.meta} numberOfLines={2}>
                    {item.meta}
                  </Text>
                  <View style={styles.exploreChip}>
                    <Text style={styles.exploreChipText}>Tap to Explore</Text>
                  </View>
                </View>
                <Text
                  style={styles.description}
                  numberOfLines={3}
                  ellipsizeMode="tail"
                >
                  {item.description}{" "}
                </Text>

                {item.link ? (
                  <Pressable
                    style={styles.linkButton}
                    onPress={(event) => {
                      event.stopPropagation();
                      openLink(item.link);
                    }}
                  >
                    <Text style={styles.linkButtonText}>
                      {item.linkLabel || "Open Link"}
                    </Text>
                  </Pressable>
                ) : null}
              </View>
            </Pressable>
          ))
        : null}
    </ScrollView>
  );
};

export default SpiderCollectionScreen;

const createStyles = (theme: ReturnType<typeof useAppTheme>["theme"]) =>
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
      backgroundColor:
        theme.mode === "dark"
          ? theme.colors.backgroundAlt
          : theme.colors.backgroundAlt,
      borderRadius: 36,
      padding: 24,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: theme.colors.border,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOpacity: theme.mode === "dark" ? 0.24 : 0.1,
      shadowRadius: 22,
      shadowOffset: { width: 0, height: 12 },
      elevation: 8,
    },
    heroGlow: {
      position: "absolute",
      width: 260,
      height: 260,
      borderRadius: 999,
      // backgroundColor: theme.mode === 'dark' ? 'rgba(225,29,46,0.28)' : 'rgba(0,87,217,0.16)',
      right: -60,
      top: -80,
    },
    badge: {
      alignSelf: "flex-start",
      backgroundColor:
        theme.mode === "dark"
          ? "rgba(255,255,255,0.08)"
          : "rgba(255,255,255,0.82)",
      color: theme.colors.primary,
      paddingHorizontal: 13,
      paddingVertical: 8,
      borderRadius: 999,
      overflow: "hidden",
      fontSize: 12,
      fontWeight: "800",
      textTransform: "uppercase",
      letterSpacing: 0.7,
      marginBottom: 14,
    },
    title: {
      color: theme.colors.text,
      fontSize: 34,
      fontWeight: "900",
      lineHeight: 40,
      marginBottom: 12,
      maxWidth: "88%",
    },
    subtitle: {
      color: theme.colors.textMuted,
      fontSize: 15,
      lineHeight: 23,
      marginBottom: 20,
      maxWidth: "92%",
    },
    searchWrapper: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      borderRadius: 22,
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginBottom: 18,
      borderWidth: 1,
      borderColor:
        theme.mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(9,17,31,0.05)",
    },
    searchLabel: {
      color: "#64748B",
      fontSize: 11,
      fontWeight: "800",
      textTransform: "uppercase",
      letterSpacing: 0.8,
      marginRight: 10,
    },
    searchInput: {
      flex: 1,
      color: "#0F172A",
      fontSize: 15,
      paddingVertical: 10,
    },
    statsRow: {
      flexDirection: "row",
      gap: 14,
      padding: 8,
      justifyContent: "center",
    },
    statCard: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:
        theme.mode === "dark"
          ? "rgba(255,255,255,0.08)"
          : "rgba(255,255,255,0.8)",
      borderRadius: 22,
      padding: 16,
      borderWidth: 1,
      borderColor:
        theme.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(9,17,31,0.04)",
    },
    statValue: {
      color: theme.colors.text,
      fontSize: 24,
      fontWeight: "900",
    },
    statLabel: {
      color: theme.colors.textMuted,
      marginTop: 6,
      fontSize: 13,
      fontWeight: "700",
      padding: 4,
    },
    sectionHeader: {
      marginBottom: 18,
      paddingHorizontal: 2,
    },
    sectionTitle: {
      color: theme.colors.text,
      fontSize: 24,
      fontWeight: "900",
    },
    sectionCaption: {
      color: theme.colors.textMuted,
      fontSize: 14,
      marginTop: 6,
      lineHeight: 20,
    },
    feedbackCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 26,
      padding: 24,
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    feedbackTitle: {
      color: theme.colors.text,
      fontSize: 18,
      fontWeight: "800",
      marginBottom: 8,
    },
    feedbackText: {
      color: theme.colors.textMuted,
      fontSize: 14,
      lineHeight: 20,
      textAlign: "center",
      marginTop: 10,
    },
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 34,
      overflow: "hidden",
      marginBottom: 22,
      width: "100%",
      maxWidth: 350,
      alignSelf: "center",
      borderWidth: 1,
      borderColor:
        theme.mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(8,15,35,0.08)",
      shadowColor: "#000",
      shadowOpacity: theme.mode === "dark" ? 0.28 : 0.1,
      shadowRadius: 22,
      shadowOffset: { width: 0, height: 12 },
      elevation: 8,
    },
    imageWrap: {
      position: "relative",
      height: 300,
      backgroundColor: theme.colors.surfaceAlt,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    overlayContent: {
      position: "absolute",
      left: 20,
      right: 20,
      bottom: 20,
    },
    overlayBadge: {
      alignSelf: "flex-start",
      backgroundColor: theme.colors.primary,
      color: theme.colors.white,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 999,
      overflow: "hidden",
      fontSize: 11,
      fontWeight: "800",
      textTransform: "uppercase",
      letterSpacing: 0.6,
      marginBottom: 10,
    },
    cardTitle: {
      color: "#ff0000",
      fontSize: 31,
      fontWeight: "900",
      marginBottom: 4,
    },
    cardSubtitle: {
      color: "rgba(255,255,255,0.88)",
      fontSize: 14,
      lineHeight: 21,
    },
    cardBody: {
      paddingHorizontal: 18,
      paddingTop: 16,
      paddingBottom: 18,
    },
    metaRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      marginBottom: 10,
    },
    meta: {
      color: theme.colors.primary,
      fontSize: 12,
      fontWeight: "800",
      textTransform: "uppercase",
      letterSpacing: 0.7,
      flex: 1,
    },
    exploreChip: {
      backgroundColor:
        theme.mode === "dark" ? "rgba(255,255,255,0.08)" : "#EEF4FF",
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 7,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    exploreChipText: {
      color: theme.colors.text,
      fontSize: 10,
      fontWeight: "800",
      textTransform: "uppercase",
      letterSpacing: 0.6,
    },
    description: {
      color: theme.colors.textMuted,
      fontSize: 15,
      lineHeight: 23,
      marginBottom: 18,
    },
    linkButton: {
      alignSelf: "flex-start",
      backgroundColor: theme.colors.primary,
      borderRadius: 999,
      paddingHorizontal: 18,
      paddingVertical: 12,
    },
    linkButtonText: {
      color: theme.colors.white,
      fontSize: 13,
      fontWeight: "800",
      textTransform: "uppercase",
      letterSpacing: 0.6,
    },
  });
