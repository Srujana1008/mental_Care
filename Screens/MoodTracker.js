import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MoodTracker = () => {
  const [mood, setMood] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling today?</Text>

      <View style={styles.moodOptions}>
        {['Happy', 'Neutral', 'Sad', 'Anxious'].map((m) => (
          <TouchableOpacity key={m} style={styles.moodButton} onPress={() => setMood(m)}>
            <Text style={styles.moodText}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {mood !== '' && <Text style={styles.selectedMood}>You selected: {mood}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold' },
  moodOptions: { flexDirection: 'row', marginTop: 20 },
  moodButton: { padding: 10, margin: 5, backgroundColor: '#FFCC00', borderRadius: 5 },
  moodText: { fontSize: 16 },
  selectedMood: { marginTop: 20, fontSize: 18, fontWeight: 'bold' }
});

export default MoodTracker;