import { createAudioPlayer } from "expo-audio";

const audioSource = require("../assets/sounds/tab.mp3");

export const playTabSound = () => {
  try {
    const player = createAudioPlayer(audioSource);

    const subscription = player.addListener(
      "playbackStatusUpdate",
      (status) => {
        if (status.didJustFinish) {
          subscription.remove();
          player.release();
        }
      },
    );

    player.play();
  } catch (error) {
    console.error("Audio playback error:", error);
  }
};
