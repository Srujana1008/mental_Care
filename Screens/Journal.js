import React, { useState, useEffect } from "react";
import { 
  View, Text, TextInput, Button, Alert, StyleSheet, 
  TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView, FlatList, TouchableOpacity
} from "react-native";
import { collection, addDoc, getDocs, Timestamp, query, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

const Journal = () => {
  const [entry, setEntry] = useState("");
  const [userId, setUserId] = useState(null);
  const [journals, setJournals] = useState([]);
  const [showHistory, setShowHistory] = useState(false); // State to toggle history visibility

  // Generate or get stored unique user ID
  const getOrCreateUserId = async () => {
    try {
      let storedUserId = await AsyncStorage.getItem("userId");
      if (!storedUserId) {
        storedUserId = uuid.v4(); // Generate new UUID
        await AsyncStorage.setItem("userId", storedUserId);
      }
      setUserId(storedUserId);
    } catch (error) {
      console.error("Error generating user ID:", error);
    }
  };

  useEffect(() => {
    getOrCreateUserId();
  }, []);

  // Function to save journal entry
  const saveJournalEntry = async () => {
    if (!entry.trim()) {
      Alert.alert("Error", "Journal entry cannot be empty.");
      return;
    }

    if (!userId) {
      Alert.alert("Error", "User ID not found. Please try again.");
      return;
    }

    try {
      await addDoc(collection(db, "journals"), {
        userId: userId,
        entry: entry,
        timestamp: Timestamp.now()
      });

      Alert.alert("Success", "Journal entry saved!");
      setEntry(""); // Clear input after saving
      Keyboard.dismiss(); // Hide keyboard
      fetchJournalEntries(); // Refresh journal list after saving
    } catch (error) {
      console.error("Error saving journal entry:", error);
      Alert.alert("Error", "Failed to save entry. Try again.");
    }
  };

  // Fetch previous journal entries from Firestore
  const fetchJournalEntries = async () => {
    if (!userId) return;

    try {
      const q = query(collection(db, "journals"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const entries = querySnapshot.docs
        .filter(doc => doc.data().userId === userId) // Filter by user ID
        .map(doc => ({
          id: doc.id,
          entry: doc.data().entry,
          timestamp: doc.data().timestamp.toDate().toLocaleString()
        }));
      
      setJournals(entries);
    } catch (error) {
      console.error("Error fetching journal entries:", error);
    }
  };

  // Function to toggle history visibility
  const toggleHistory = () => {
    if (!showHistory) {
      fetchJournalEntries(); // Load history only when clicked
    }
    setShowHistory(!showHistory);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <Text style={styles.title}>Write Your Journal</Text>
          <TextInput
            style={styles.input}
            placeholder="How was your day?"
            multiline
            numberOfLines={5}
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss} // Close keyboard when "return" is pressed
            value={entry}
            onChangeText={setEntry}
          />
          <Button title="Save Entry" onPress={saveJournalEntry} />

          {/* Button to Toggle View History */}
          <TouchableOpacity style={styles.historyButton} onPress={toggleHistory}>
            <Text style={styles.historyButtonText}>
              {showHistory ? "Hide History" : "View History"}
            </Text>
          </TouchableOpacity>

          {/* Show history only when button is clicked */}
          {showHistory && (
            <FlatList
              data={journals}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.journalItem}>
                  <Text style={styles.timestamp}>{item.timestamp}</Text>
                  <Text style={styles.entryText}>{item.entry}</Text>
                </View>
              )}
            />
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: { flexGrow: 1, padding: 20, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: { 
    width: "100%", padding: 10, borderWidth: 1, borderColor: "#ccc", 
    borderRadius: 5, height: 150, textAlignVertical: "top", marginBottom: 10
  },
  historyButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
  },
  historyButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  journalItem: { 
    backgroundColor: "#f2f2f2", padding: 10, marginVertical: 5, borderRadius: 5, width: "100%"
  },
  timestamp: { fontSize: 12, color: "gray", marginBottom: 5 },
  entryText: { fontSize: 16 }
});

export default Journal;