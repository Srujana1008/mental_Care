import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const anxietyTips = [
  { title: "🌿 Instant Anxiety Relief Tips", description: "" },
  { title: "🧘‍♂️ 1. Breathe Like a Pro", description: "Try 4-7-8 breathing: Inhale for 5s, hold for 2s, exhale for 5s. Works like a natural tranquilizer." },
  { title: "🎶 2. Create a Chill Playlist", description: "Listening to lo-fi, classical, or binaural beats calms the mind. Try 'Weightless' by Marconi Union." },
  { title: "📖 3. The 5-4-3-2-1 Grounding Hack", description: "Identify 5 things you see, 4 touch, 3 hear, 2 smell, 1 taste. Instantly refocuses your mind." },
  { title: "🏃‍♀️ 4. Move Your Body (Even for 5 Minutes!)", description: "Jump, dance, or shake your arms—physical activity releases happy chemicals (endorphins)." },
  { title: "💬 5. Talk to Your Anxiety", description: "Name your anxiety ('Oh, hello Mr. Worry!') and remind yourself, 'This is temporary and will pass.'" },
  { title: "🌞 6. Sunlight + Nature = Instant Mood Boost", description: "10 minutes of sunlight boosts serotonin. Look at trees, flowers, or step outside for fresh air." },
  { title: "☕ 7. Cut the Caffeine", description: "Too much coffee/energy drinks increase anxiety. Try herbal tea like chamomile or peppermint." },
  { title: "📝 8. The Brain Dump Trick", description: "Write down everything making you anxious. Then, throw it away or highlight what's actually important." },
  { title: "📵 9. Digital Detox Before Bed", description: "Social media overload fuels anxiety. Try reading, stretching, or deep breathing instead." },
  { title: "😌 10. Seek Help (Because You Deserve It 💙)", description: "Talk to someone you trust—friends, family, or a therapist. Mental health needs care, just like physical health." },
];

const AnxietyTips = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📌 Anxiety Relief Tips</Text>
      <FlatList
        data={anxietyTips}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardText}>{item.description}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>⬅️ Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAF6F6', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 15, color: '#004D40' },
  card: { backgroundColor: '#FFFFFF', padding: 15, borderRadius: 10, marginBottom: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#00796B' },
  cardText: { fontSize: 16, color: '#333', marginTop: 5 },
  backButton: { marginTop: 20, alignSelf: 'center', backgroundColor: '#007AFF', padding: 10, borderRadius: 8, width: '50%', alignItems: 'center' },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});

export default AnxietyTips;
