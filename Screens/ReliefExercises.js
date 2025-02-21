import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ReliefExercises() {
  const navigation = useNavigation(); // Added navigation hook
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function playMusic() {
    if (!isPlaying) {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/Weightless.mp3')
      );
      setSound(sound);
      await sound.playAsync();
      setIsPlaying(true);
    } else if (sound) { // Ensure sound exists before trying to stop it
      await sound.stopAsync();
      await sound.unloadAsync(); // Properly unload the sound
      setIsPlaying(false);
      setSound(null); // Reset sound state
    }
  }
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}> Relief Exercises</Text>

      {/* Breathing Exercise */}
      <View style={styles.card}>
        <Text style={styles.title}> Breathing Exercise</Text>
        <Text style={styles.text}>Inhale for 4 seconds, hold for 4 seconds, and exhale for 4 seconds.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BreathingExercise')}>
          <Text style={styles.buttonText}>Start Breathing</Text>
        </TouchableOpacity>
      </View>

      {/* Guided Meditation */}
      <View style={styles.card}>
        <Text style={styles.title}> Guided Meditation</Text>
        <Text style={styles.text}> Let's set a timer and Meditate.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MeditationTimer')}>
         <Text style={styles.buttonText}>Start Meditation</Text>
        </TouchableOpacity>
      </View>

      {/* Relaxing Music */}
      <View style={styles.card}>
        <Text style={styles.title}> Relaxing Music</Text>
        <Text style={styles.text}> Weightless Song </Text>
        <TouchableOpacity style={styles.musicButton} onPress={playMusic}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={30} color="white" />
          <Text style={styles.buttonText}>{isPlaying ? 'Pause Music' : 'Play Music'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#546C75',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  card: {
    width: '90%',
    backgroundColor: '#A7D8DE',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#546C75',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  musicButton: {
    flexDirection: 'row',
    backgroundColor: '#546C75',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
});