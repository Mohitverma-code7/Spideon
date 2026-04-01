import { createAudioPlayer } from 'expo-audio';

const audioSource = require('../assets/sounds/tab.mp3');

export const playTabSound = () => {
  try {
    const player = createAudioPlayer(audioSource);
    
    // The correct listener name in expo-audio is 'playbackStatusUpdate'
    const subscription = player.addListener('playbackStatusUpdate', (status) => {
      if (status.didJustFinish) {
        // Essential: remove listener and release memory
        subscription.remove();
        player.release();
      }
    });

    player.play();
  } catch (error) {
    console.error("Audio playback error:", error);
  }
};