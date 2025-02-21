import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Sentiment from "sentiment";
import * as Speech from "expo-speech";
import { db } from "../firebaseConfig"; 
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { format } from "date-fns"; // Install with npm install date-fns

const MoodTracking = () => {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [moodHistory, setMoodHistory] = useState([]);

  useEffect(() => {
    fetchMoodHistory();
  }, []);

  const analyzeSentiment = async () => {
    const sentiment = new Sentiment();
    const analysis = sentiment.analyze(inputText);
    let mood = "";

    if (analysis.score > 0) {
      mood = "Positive 😊 - Keep up the good vibes!";
    } else if (analysis.score < 0) {
      mood = "Negative 😞 - Try some relaxation techniques.";
    } else {
      mood = "Neutral 😐 - Stay mindful and take care.";
    }

    console.log("📢 Speech Output:", mood); // ✅ This is where the audio comes from!
    setResult(mood);
    Speech.speak(mood); // 🎙️ This plays the audio

    try {
      await addDoc(collection(db, "moodHistory"), {
        text: inputText,
        mood: mood,
        timestamp: new Date(),
      });

      setInputText(""); // Clears input after submission
      fetchMoodHistory(); // Refresh mood history
    } catch (error) {
      console.error("❌ Error saving mood:", error);
    }
  };

  const fetchMoodHistory = async () => {
    try {
      const q = query(collection(db, "moodHistory"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const moods = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMoodHistory(moods);
    } catch (error) {
      console.error("❌ Error fetching mood history:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Mental Health Check-in</Text>
      <TextInput
        style={styles.input}
        placeholder="How are you feeling today?"
        onChangeText={setInputText}
        value={inputText}
        multiline
      />

      {/* Custom Analyze Mood Button */}
      <TouchableOpacity style={styles.analyzeButton} onPress={analyzeSentiment}>
        <Text style={styles.buttonText}>Analyze Mood</Text>
      </TouchableOpacity>

      {result !== "" && <Text style={styles.result}>{result}</Text>}

      <Text style={styles.historyHeader}>Mood History</Text>
      {moodHistory.map((item) => (
        <View key={item.id} style={styles.historyItem}>
          <Text>{item.text}</Text>
          <Text style={{ fontWeight: "bold" }}>{item.mood}</Text>
          <Text style={styles.timestamp}>
            {item.timestamp ? format(item.timestamp.toDate(), "PPpp") : "No Date"}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#546C75",  // Updated background color
  },
  header: { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 10, 
    color: "#fff",  // Optional: For contrast against the background
  },
  input: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    textAlignVertical: "top",
    backgroundColor: "#fff",  // For input box to stand out
  },
  result: { 
    fontSize: 18, 
    marginTop: 10, 
    fontWeight: "bold",
    color: "#fff",  // Optional: For better readability on dark background
  },
  historyHeader: { 
    fontSize: 20, 
    marginTop: 20, 
    fontWeight: "bold", 
    color: "#fff",  // Optional: For contrast against the background
  },
  historyItem: {
    backgroundColor: "#A7D8DE",  // Updated box color
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  timestamp: { 
    fontSize: 12, 
    color: "gray", 
    marginTop: 5 
  },
  // Custom button style
  analyzeButton: {
    backgroundColor: "#A7D8DE", // Button background color
    paddingVertical: 8, // Reduced vertical padding for a smaller button
    paddingHorizontal: 20, // Adjust horizontal padding as needed
    borderRadius: 3, // Rounded corners
    alignItems: "center",
    justifyContent: "center", // Centers the button content
    marginBottom: 10,
    alignSelf: "center", // Centers the button horizontally
  },
  buttonText: {
    fontSize: 18,
    color: "#000", // Text color
    fontWeight: "bold",
  },
});

export default MoodTracking;
