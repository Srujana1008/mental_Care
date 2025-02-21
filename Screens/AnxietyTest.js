import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const questions = [
  "I worry about things",
  "I anticipate the worst",
  "I cannot control my fears",
  "I am irritable",
  "I feel tense",
  "I get startled easily",
  "I break into tears without apparent reason",
  "I get tired quickly",
  "I am unable to relax",
  "I have racing thoughts",
  "My sleep is disturbed",
  "I do not wake up feeling rested",
  "I find it difficult to concentrate on tasks",
  "I can’t remember things",
  "I am fidgety",
  "My hands tremble",
  "I experience sudden chest pains or rapid heartbeat",
  "I feel like I cannot breathe or am breathing too fast",
  "My mouth goes dry",
  "I avoid certain places, activities, or situations"
];

const options = ["Never", "Rarely", "Sometimes", "Often", "Always"];

const AnxietyTest = () => {
  const [responses, setResponses] = useState(Array(questions.length).fill(null));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState(null);

  const handleSelect = (value) => {
    const newResponses = [...responses];
    newResponses[currentIndex] = value;
    setResponses(newResponses);
  };

  const calculateResult = () => {
    const score = responses.reduce((sum, response) => sum + (response !== null ? options.indexOf(response) : 0), 0);
    let level = "Mild Anxiety";
    if (score > 40) level = "Severe Anxiety";
    else if (score > 25) level = "Moderate Anxiety";
    setResult({ level, score });
  };

  return (
    <View style={styles.container}>
      {!result ? (
        <>
          <Text style={styles.title}>Do You Feel Anxious?</Text>
          <Text style={styles.question}>{questions[currentIndex]}</Text>
          <View style={styles.optionsContainer}>
            {options.map((option) => (
              <TouchableOpacity 
                key={option} 
                style={[styles.optionButton, responses[currentIndex] === option && styles.selectedOption]} 
                onPress={() => handleSelect(option)}>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.navButtons}>
            {currentIndex > 0 && (
              <TouchableOpacity style={styles.navButton} onPress={() => setCurrentIndex(currentIndex - 1)}>
                <Text style={styles.navButtonText}>← Previous</Text>
              </TouchableOpacity>
            )}
            {currentIndex < questions.length - 1 ? (
              <TouchableOpacity style={styles.navButton} onPress={() => setCurrentIndex(currentIndex + 1)}>
                <Text style={styles.navButtonText}>Next →</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.submitButton} onPress={calculateResult}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Your Anxiety Level:</Text>
          <Text style={styles.resultScore}>{result.level}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  question: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  optionsContainer: { flexDirection: 'column', alignItems: 'center', marginBottom: 20 },
  optionButton: { padding: 10, marginVertical: 5, width: 200, backgroundColor: '#ddd', borderRadius: 5, alignItems: 'center' },
  selectedOption: { backgroundColor: '#007AFF' },
  optionText: { color: '#000', fontSize: 16 },
  navButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  navButton: { backgroundColor: '#007AFF', padding: 10, borderRadius: 8, width: 100, alignItems: 'center' },
  navButtonText: { color: '#fff', fontSize: 16 },
  submitButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, marginTop: 20, width: 150, alignItems: 'center' },
  submitText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  resultContainer: { marginTop: 20, alignItems: 'center' },
  resultText: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  resultScore: { fontSize: 24, fontWeight: 'bold', color: '#007AFF', marginTop: 10 }
});

export default AnxietyTest;