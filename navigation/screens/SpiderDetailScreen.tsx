import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import type { HomeStackParamList } from "../HomeStackNavigator";
import { useAppTheme } from "../../theme/ThemeProvider";

type SpiderDetailScreenProps = {
  route: RouteProp<HomeStackParamList, "SpiderDetail">;
};

const SpiderDetailScreen = ({ route }: SpiderDetailScreenProps) => {
  const { hero } = route.params;
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const aliases = (hero.aliases || []).slice(0, 6);
  const abilities = (hero.abilities || []).slice(0, 8);
  const appearances = (hero.appearances || []).slice(0, 5);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.heroWrap}>
        <Image
          source={{ uri: hero.imageUrl }}
          style={styles.heroImage}
          resizeMode="cover"
        />

        <View style={styles.heroText}>
          <Text style={styles.badge}>{hero.earth || "Unknown Earth"}</Text>
          <Text style={styles.name}>{hero.name}</Text>
          <Text style={styles.fullName}>
            {hero.fullName || "Identity classified"}
          </Text>
        </View>
      </View>

      <View style={styles.panel}>
        <Section title="Profile">
          <InfoRow label="Status" value={hero.status} />
          <InfoRow label="Species" value={hero.species} />
          <InfoRow label="Gender" value={hero.gender} />
          <InfoRow label="Identity" value={hero.identity} />
          <InfoRow label="Location" value={hero.location} />
          <InfoRow label="Age" value={hero.age} />
        </Section>

        <Section title="Origin">
          <Text style={styles.text} numberOfLines={3}>
            {hero.description || "No data available"}
          </Text>
        </Section>

        {aliases.length > 0 && (
          <Section title="Aliases">
            <TagWrap data={aliases.slice(0, 2)} />
          </Section>
        )}

        {abilities.length > 0 && (
          <Section title="Abilities">
            <TagWrap data={abilities.slice(0, 2)} />
          </Section>
        )}

        {appearances.length > 0 && (
          <Section title="Appearances">
            {appearances.slice(0, 2).map((item) => (
              <Text key={item} style={styles.listItem}>
                • {item}
              </Text>
            ))}
          </Section>
        )}

        <Section title="Details">
          <Text style={styles.text}>
            {hero.nationality || "Unknown"} • {hero.eyeColor || "Unknown"} •{" "}
            {hero.hairColor || "Unknown"}
          </Text>
        </Section>
      </View>
    </ScrollView>
  );
};

export default SpiderDetailScreen;

const Section = ({ title, children }: any) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
};

const InfoRow = ({ label, value }: any) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || "Unknown"}</Text>
    </View>
  );
};

const TagWrap = ({ data }: any) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.tagWrap}>
      {data.map((item: string) => (
        <View key={item} style={styles.tag}>
          <Text style={styles.tagText}>{item}</Text>
        </View>
      ))}
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    content: {
      paddingBottom: 40,
    },

    heroWrap: {
      height: 420,
      margin: 16,
      borderRadius: 30,
      overflow: "hidden",
      backgroundColor: theme.colors.surfaceAlt,
      justifyContent: "flex-end",
    },

    heroImage: {
      width: "100%",
      height: "100%",
    },

    heroText: {
      position: "absolute",
      bottom: 20,
      left: 20,
      right: 20,
    },

    badge: {
      alignSelf: "flex-start",
      backgroundColor: theme.colors.primary,
      color: "#fff",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 999,
      fontSize: 11,
      fontWeight: "800",
      marginBottom: 10,
    },

    name: {
      fontSize: 34,
      fontWeight: "900",
      color: "#fff",
    },

    fullName: {
      color: "rgba(255,255,255,0.85)",
      fontSize: 14,
      marginTop: 6,
    },

    panel: {
      marginTop: 30,
      marginHorizontal: 16,
      backgroundColor: theme.colors.surface,
      borderRadius: 30,
      padding: 20,
      borderWidth: 1,
      borderColor: theme.colors.border,
      elevation: 8,
    },

    section: {
      marginBottom: 20,
    },

    sectionTitle: {
      fontSize: 18,
      fontWeight: "900",
      marginBottom: 10,
      color: theme.colors.text,
    },

    row: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },

    label: {
      fontSize: 12,
      color: theme.colors.textMuted,
      textTransform: "uppercase",
      marginBottom: 4,
    },

    value: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.colors.text,
    },

    text: {
      fontSize: 14,
      lineHeight: 22,
      color: theme.colors.textMuted,
      marginBottom: 30,
    },

    tagWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },

    tag: {
      backgroundColor: theme.colors.backgroundAlt,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    tagText: {
      fontSize: 12,
      fontWeight: "700",
      color: theme.colors.text,
    },

    listItem: {
      fontSize: 14,
      color: theme.colors.textMuted,
      marginBottom: 6,
    },
  });
