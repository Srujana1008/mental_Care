import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

const sounds = [
  { name: 'Rain', file: require('../assets/sounds/rain.mp3'), color: '#4CA1AF' },
  { name: 'Wind', file: require('../assets/sounds/wind.mp3'), color: '#5A69F9' },
  { name: 'Night', file: require('../assets/sounds/night.mp3'), color: '#3CC77D' },
  { name: 'White Noise', file: require('../assets/sounds/white_noise.mp3'), color: '#FA6E5A' }
];

const SleepMusic = () => {
  const [playingSound, setPlayingSound] = useState(null);
  const [currentPlaying, setCurrentPlaying] = useState(null); // Track which sound is playing

  const toggleSound = async (soundFile, index) => {
    if (playingSound) {
      const status = await playingSound.getStatusAsync();
      
      if (status.isPlaying && currentPlaying === index) {
        await playingSound.pauseAsync(); // Pause if already playing
        setCurrentPlaying(null);
        return;
      } else {
        await playingSound.stopAsync();
        await playingSound.unloadAsync();
      }
    }

    const { sound } = await Audio.Sound.createAsync(soundFile);
    setPlayingSound(sound);
    setCurrentPlaying(index);
    await sound.playAsync();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>White Noise & Sleep Music</Text>
      <Text style={styles.subtitle}>Choose a sound to relax:</Text>

      {sounds.map((sound, index) => (
        <TouchableOpacity 
          key={index} 
          style={[styles.button, { backgroundColor: sound.color }]} 
          onPress={() => toggleSound(sound.file, index)}
        >
          <Text style={styles.buttonText}>
            {currentPlaying === index ? '⏸️' : '▶️'} {sound.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
    backgroundColor: '#546C75', // Updated background color
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    color: 'white',
    textAlign: 'center',
  },
  subtitle: { 
    fontSize: 16, 
    marginBottom: 20, 
    color: 'white',
    textAlign: 'center',
  },
  button: { 
    width: '90%',
    padding: 15,
    marginVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonText: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold',
  }
});

export default SleepMusic;
