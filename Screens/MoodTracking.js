import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Sentiment from "sentiment";
import * as Speech from "expo-speech";
import { db } from "../firebaseConfig"; 
import { collection, addDoc, getDocs, query, orderBy, doc, deleteDoc } from "firebase/firestore"; 
import { format } from "date-fns"; // Install with npm install date-fns
import LottieView from "lottie-react-native"; // ✅ Import Lottie

const MoodTracking = () => {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [moodHistory, setMoodHistory] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState("");

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

  const deleteMood = async (id) => {
    try {
      await deleteDoc(doc(db, "moodHistory", id));
      fetchMoodHistory(); // Refresh mood history after deletion
      setDeleteMessage("Mood successfully deleted!"); // Set the success message
      setTimeout(() => setDeleteMessage(""), 3000); // Reset the message after 3 seconds
    } catch (error) {
      console.error("❌ Error deleting mood:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Animation */}
      <LottieView
        source={require("../assets/home_an.json")} // ✅ Make sure the path is correct
        autoPlay
        loop
        style={StyleSheet.absoluteFillObject} // Covers entire background
      />

      <ScrollView contentContainerStyle={styles.content}>
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
            
            {/* Delete Button */}
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteMood(item.id)}>
  <Text style={styles.deleteButtonText}>🗑</Text>
</TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    position: 'absolute', 
    backgroundColor: "#546C75",
    width: 850,
    height: 850, // Keeps a base background color
  },
  content: {
    padding: 20,
  },
  header: { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 10, 
    color: "#fff",  
  },
  input: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    textAlignVertical: "top",
    backgroundColor: "#fff",
    marginRight: 450,
  },
  result: { 
    fontSize: 18, 
    marginTop: 10, 
    fontWeight: "bold",
    color: "#fff",  
  },
  historyHeader: { 
    fontSize: 20, 
    marginTop: 20, 
    fontWeight: "bold", 
    color: "#fff",  
  },
  historyItem: {
    backgroundColor: "#A7D8DE",  
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  timestamp: { 
    fontSize: 12, 
    color: "gray", 
    marginTop: 5 
  },
  analyzeButton: {
    backgroundColor: "#A7D8DE",
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    alignSelf: "center",
    marginRight: 450,
  },
  buttonText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
  deleteButton: { 
    backgroundColor: "#FFFFFF", 
    padding: 10, 
    borderRadius: 10,
    width: 40, 
    height: 40, 
    justifyContent: "center",
    alignItems: "center",
    left:300,
    bottom:40,
  },
  deleteMessage: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  

  
});

export default MoodTracking;
