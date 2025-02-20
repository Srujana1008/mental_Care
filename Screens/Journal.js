import React, { useState, useEffect } from "react";
import { 
  View, Text, TextInput, Button, Alert, StyleSheet, 
  TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, 
  FlatList, TouchableOpacity
} from "react-native";
import LottieView from "lottie-react-native";
import { collection, addDoc, getDocs, deleteDoc, doc, Timestamp, query, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

const Journal = () => {
  const [entry, setEntry] = useState("");
  const [userId, setUserId] = useState(null);
  const [journals, setJournals] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const getOrCreateUserId = async () => {
    try {
      let storedUserId = await AsyncStorage.getItem("userId");
      if (!storedUserId) {
        storedUserId = uuid.v4();
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

  const saveJournalEntry = async () => {
    if (!entry.trim()) {
      Alert.alert("Error", "Journal entry cannot be empty.");
      return;
    }

    if (!userId) {
      Alert.alert("Error", "User ID not found. Please try again.");
      return;
    }

    // 🔹 Show success message **before** saving to Firebase
    Alert.alert("Success", "Journal entry saved!");
    setEntry("");
    Keyboard.dismiss();

    try {
      await addDoc(collection(db, "journals"), {
        userId: userId,
        entry: entry,
        timestamp: Timestamp.now(),
      });
      fetchJournalEntries();
    } catch (error) {
      console.error("Error saving journal entry:", error);
      Alert.alert("Error", "Failed to save entry. Try again.");
    }
  };

  const fetchJournalEntries = async () => {
    if (!userId) return;

    try {
      const q = query(collection(db, "journals"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const entries = querySnapshot.docs
        .filter((doc) => doc.data().userId === userId)
        .map((doc) => ({
          id: doc.id,
          entry: doc.data().entry,
          timestamp: doc.data().timestamp.toDate().toLocaleString(),
        }));

      setJournals(entries);
    } catch (error) {
      console.error("Error fetching journal entries:", error);
    }
  };

  const deleteJournalEntry = async (entryId) => {
    try {
      await deleteDoc(doc(db, "journals", entryId));
      Alert.alert("Deleted", "Journal entry removed successfully.");
      fetchJournalEntries();
    } catch (error) {
      console.error("Error deleting journal entry:", error);
      Alert.alert("Error", "Failed to delete entry. Try again.");
    }
  };

  const toggleHistory = () => {
    if (!showHistory) {
      fetchJournalEntries();
    }
    setShowHistory(!showHistory);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          
          {/* Lottie Animation - CENTERED */}
          <View style={styles.animationContainer}>
            <LottieView 
              source={require("../assets/journal_an.json")} 
              autoPlay 
              loop 
              style={styles.animation}
            />
          </View>

          <Text style={styles.title}>Write Your Journal</Text>
          <TextInput
            style={styles.input}
            placeholder="How was your day?"
            multiline
            numberOfLines={5}
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss} // Dismiss keyboard on "Done"
            blurOnSubmit={true} // Ensures the keyboard disappears
            value={entry}
            onChangeText={setEntry}
          />
          <Button title="Save Entry" onPress={saveJournalEntry} />

          <TouchableOpacity style={styles.historyButton} onPress={toggleHistory}>
            <Text style={styles.historyButtonText}>
              {showHistory ? "Hide History" : "View History"}
            </Text>
          </TouchableOpacity>

          {showHistory && (
            <FlatList
              data={journals}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.journalItem}>
                  <Text style={styles.timestamp}>{item.timestamp}</Text>
                  <Text style={styles.entryText}>{item.entry}</Text>
                  <TouchableOpacity 
                    style={styles.deleteButton} 
                    onPress={() => deleteJournalEntry(item.id)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
              contentContainerStyle={styles.flatListContent}
            />
          )}

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: { 
    flexGrow: 1, 
    padding: 20, 
    alignItems: "center", 
    justifyContent: "center" 
  },
  animationContainer: { 
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
    width: "100%",
  },
  animation: { width: 200, height: 200 }, // Adjust size as needed
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: { 
    width: "100%", 
    padding: 10, 
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 5, 
    height: 150, 
    textAlignVertical: "top", 
    marginBottom: 10
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
    backgroundColor: "#f2f2f2", 
    padding: 10, 
    marginVertical: 5, 
    borderRadius: 5, 
    width: "100%",
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center"
  },
  timestamp: { fontSize: 12, color: "gray", marginBottom: 5, flex: 1 },
  entryText: { fontSize: 16, flex: 2 },
  deleteButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: { color: "#fff", fontWeight: "bold" },
  flatListContent: { paddingBottom: 20 } // Prevents cutoff on scroll
});

export default Journal;
