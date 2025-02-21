import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import io from 'socket.io-client';
import axios from 'axios';

const API_URL = 'http://172.16.30.150:3000'; // Update with your server IP
const THRESHOLD = 120; // Alert threshold for high heart rate

const HeartRateMonitor = () => {
  const [heartRate, setHeartRate] = useState(null);
  const [loading, setLoading] = useState(false);

  const startTracking = async () => {
    setLoading(true);
    setHeartRate(null);

    try {
      const socket = io(API_URL);
      let heartRateReadings = [];

      socket.on('heartbeat', (data) => {
        if (heartRateReadings.length < 10) {
          heartRateReadings.push(data);
        }

        // Show current reading
        setHeartRate(data);
      });

      // Fetch initial heart rate
      const response = await axios.get(`${API_URL}/heartbeat`);
      heartRateReadings.push(response.data.heartRate);
      setHeartRate(response.data.heartRate);

      // Stop tracking after 5 seconds
      setTimeout(() => {
        socket.disconnect();
        setLoading(false);

        if (heartRateReadings.length > 0) {
          const avgHeartRate =
            heartRateReadings.reduce((sum, bpm) => sum + bpm, 0) / heartRateReadings.length;

          if (avgHeartRate > THRESHOLD) {
            Alert.alert('🚨 High Heart Rate!', `Your average heart rate is ${Math.round(avgHeartRate)} BPM. Try to relax.`);
          }
        }
      }, 10000);
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch heart rate.');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Heart Rate Monitor</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : heartRate !== null ? (
        <Text style={styles.heartRate}>{heartRate} BPM</Text>
      ) : (
        <Text style={styles.info}>Press "Start" to track heart rate</Text>
      )}

      <TouchableOpacity 
        style={styles.button}
        onPress={startTracking}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Start Heart Rate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#546C75',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'whitesmoke',
    marginBottom: 20,
  },
  heartRate: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#E63946',
  },
  info: {
    fontSize: 18,
    color: 'whitesmoke',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: '#A7D8DE',
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default HeartRateMonitor;
