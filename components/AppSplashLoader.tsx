import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Animated,
  Easing,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { VideoView, useVideoPlayer } from "expo-video";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootStack";
import Svg, { Path, Line, Circle, G } from "react-native-svg";


// ───────── Corner Web ─────────
const CornerWeb = () => (
  <Svg width={100} height={120} viewBox="0 0 120 120">
    <G stroke="#fff" strokeWidth={0.8} fill="none" opacity={0.35}>
      <Line x1="0" y1="0" x2="120" y2="0" />
      <Line x1="0" y1="0" x2="90" y2="90" />
      <Line x1="0" y1="0" x2="0" y2="120" />
      <Path d="M30,0 Q25,25 0,30" />
      <Path d="M60,0 Q50,50 0,60" />
      <Path d="M90,0 Q75,75 0,90" />
      <Path d="M120,0 Q100,100 0,120" />
    </G>
  </Svg>
);


// ───────── Web Rope ─────────
const WebRope = ({ height = 420 }) => (
  <Svg width={40} height={height} viewBox={`0 0 40 ${height}`}>
    <Path
      d={`M20,0 C18,${height * 0.33} 22,${height * 0.55} 20,${height}`}
      stroke="rgba(255,255,255,0.9)"
      strokeWidth={2}
      fill="none"
    />

    {Array.from({ length: Math.floor(height / 20) }).map((_, i) => (
      <Line
        key={i}
        x1={15}
        y1={(i + 1) * 20}
        x2={25}
        y2={(i + 1) * 20}
        stroke="rgba(255,255,255,0.28)"
        strokeWidth={0.8}
      />
    ))}
  </Svg>
);


// ───────── Mini Web ─────────
const MiniWeb = ({ size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" opacity={0.4}>
    <G stroke="white" strokeWidth={0.7} fill="none">
      <Line x1="12" y1="0" x2="12" y2="24" />
      <Line x1="0" y1="12" x2="24" y2="12" />
      <Line x1="3" y1="3" x2="21" y2="21" />
      <Line x1="21" y1="3" x2="3" y2="21" />
      <Circle cx="12" cy="12" r="4" />
      <Circle cx="12" cy="12" r="8" />
    </G>
  </Svg>
);


const SplashScreen = () => {

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const player = useVideoPlayer(require("../assets/videos/video1.mp4"), (p) => {
    p.loop = true;
    p.play();
  });

  const swing = useRef(new Animated.Value(0)).current;
  const drop = useRef(new Animated.Value(0)).current;
  const swingLoop = useRef<any>(null);

  const titleY = useRef(new Animated.Value(-40)).current;
  const titleO = useRef(new Animated.Value(0)).current;
  const taglineO = useRef(new Animated.Value(0)).current;


  const startSwing = () => {

    swingLoop.current = Animated.loop(
      Animated.sequence([

        Animated.timing(swing, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),

        Animated.timing(swing, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),

        Animated.timing(swing, {
          toValue: -1,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),

        Animated.timing(swing, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),

      ])
    );

    swingLoop.current.start();
  };


  useEffect(() => {

    startSwing();

    Animated.parallel([
      Animated.timing(titleY, {
        toValue: 0,
        duration: 700,
        delay: 300,
        easing: Easing.out(Easing.back(1.6)),
        useNativeDriver: true,
      }),
      Animated.timing(titleO, {
        toValue: 1,
        duration: 500,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(taglineO, {
      toValue: 1,
      duration: 700,
      delay: 900,
      useNativeDriver: true,
    }).start();

  }, []);


  const handlePress = () => {

    swingLoop.current?.stop();

    Animated.sequence([
      Animated.timing(swing, {
        toValue: 1.5,
        duration: 250,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),

      Animated.spring(drop, {
        toValue: 900,
        friction: 6,
        tension: 90,
        useNativeDriver: true,
      }),
    ]).start(() => {

      navigation.replace("MainTabs");

    });
  };


  const rotate = swing.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-4deg", "4deg"],
  });


  return (
    <View style={styles.container}>

      <VideoView
        player={player}
        style={StyleSheet.absoluteFillObject}
        contentFit="cover"
        nativeControls={false}
      />

      <View style={styles.overlay} />

      <View style={[styles.cornerWeb, styles.tl]}>
        <CornerWeb />
      </View>

      <View style={[styles.cornerWeb, styles.tr, { transform: [{ rotate: "90deg" }] }]}>
        <CornerWeb />
      </View>

      <View style={[styles.cornerWeb, styles.bl, { transform: [{ rotate: "-90deg" }] }]}>
        <CornerWeb />
      </View>

      <View style={[styles.cornerWeb, styles.br, { transform: [{ rotate: "180deg" }] }]}>
        <CornerWeb />
      </View>


      <Animated.View
        style={[
          styles.ropeSystem,
          {
            transform: [
              { translateY: -210 },
              { rotate },
              { translateY: 210 },
              { translateY: drop },
            ],
          },
        ]}
      >

        <WebRope height={420} />

        <View style={styles.webKnot} />

        <Pressable style={styles.button} onPress={handlePress}>

          <View style={styles.miniWebTR}>
            <MiniWeb />
          </View>

          <View style={styles.miniWebBL}>
            <MiniWeb />
          </View>

          <Text style={styles.buttonText}>ENTER THE SPIDER-VERSE</Text>
          <Text style={styles.buttonSub}>TAP TO SWING IN</Text>

        </Pressable>

      </Animated.View>


      <Animated.View
        style={[
          styles.titleWrap,
          { opacity: titleO, transform: [{ translateY: titleY }] },
        ]}
      >
        <Text style={styles.titleSub}>MARVEL PRESENTS</Text>

        <Text style={styles.titleMain}>
          SPID<Text style={styles.titleAccent}>E</Text>ON
        </Text>
      </Animated.View>


      <Animated.Text style={[styles.tagline, { opacity: taglineO }]}>
        WITH GREAT POWER COMES GREAT RESPONSIBILITY
      </Animated.Text>

    </View>
  );
};


export default SplashScreen;


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#050510",
    alignItems: "center",
  },

  cornerWeb: {
    position: "absolute",
  },

  tl: { top: 0, left: 0 },
  tr: { top: 0, right: 0 },
  bl: { bottom: 0, left: 0 },
  br: { bottom: 0, right: 0 },

  ropeSystem: {
    position: "absolute",
    alignItems: "center",
  },

  webKnot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#e00050",
    borderWidth: 3,
    borderColor: "#fff",
  },

  button: {
    backgroundColor: "#0d0c3f",
    borderWidth: 3,
    borderColor: "#fff",
    borderRadius: 50,
    paddingVertical: 18,
    paddingHorizontal: 30,
    alignItems: "center",
    shadowColor: "#ff0040",
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 16,
    elevation: 16,
  },

  buttonText: {
    fontSize: 18,
    letterSpacing: 2.5,
    color: "#fff",
    fontWeight: "bold",
  },

  buttonSub: {
    fontSize: 10,
    letterSpacing: 4,
    color: "rgba(255,255,255,0.5)",
    marginTop: 3,
  },

  miniWebTR: {
    position: "absolute",
    top: 6,
    right: 8,
  },

  miniWebBL: {
    position: "absolute",
    bottom: 6,
    left: 8,
  },

  titleWrap: {
    position: "absolute",
    top: 110,
    alignItems: "center",
  },

  titleSub: {
    fontSize: 12,
    letterSpacing: 8,
    color: "#e00050",
  },

  titleMain: {
    fontSize: 76,
    color: "#fff",
    letterSpacing: 3,
    textShadowColor: "#ff0040",
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 8,
  },

  titleAccent: {
    color: "#ff0040",
  },

  tagline: {
    position: "absolute",
    bottom: 28,
    fontSize: 10,
    letterSpacing: 5,
    color: "rgba(255,255,255,0.3)",
    textAlign: "center",
    paddingHorizontal: 20,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

});