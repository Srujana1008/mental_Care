import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const questions = [
  "I feel down or depressed",
  "I have lost interest in activities I used to enjoy",
  "I feel tired or have little energy",
  "I have trouble concentrating",
  "I feel worthless or guilty",
  "I have trouble sleeping or sleep too much",
  "I have lost or gained weight without trying",
  "I feel restless or slowed down",
  "I have thoughts of self-harm or suicide",
  "I feel hopeless about the future"
];

const options = ["Never", "Rarely", "Sometimes", "Often", "Always"];

const DepressionTest = () => {
  const [responses, setResponses] = useState(Array(questions.length).fill(null));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [previousScores, setPreviousScores] = useState([]);
  const [showPreviousScores, setShowPreviousScores] = useState(false);

  const handleSelect = (value) => {
    const newResponses = [...responses];
    newResponses[currentIndex] = value;
    setResponses(newResponses);
  };

  const calculateResult = () => {
    const score = responses.reduce((sum, response) => sum + (response !== null ? options.indexOf(response) : 0), 0);
    let level = "Mild Depression";
    if (score > 30) level = "Severe Depression";
    else if (score > 15) level = "Moderate Depression";
    
    setPreviousScores([...previousScores, { score, level }]);
    setResult({ level, score });
  };

  return (
    <View style={styles.container}>
      {!result ? (
        <>
          <Text style={styles.title}>Do You Feel Depressed?</Text>
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
              <TouchableOpacity 
                style={[styles.navButton, responses[currentIndex] === null && styles.disabledButton]} 
                disabled={responses[currentIndex] === null}
                onPress={() => setCurrentIndex(currentIndex + 1)}>
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
          <Text style={styles.resultText}>Your Depression Level:</Text>
          <Text style={styles.resultLevel}>{result.level}</Text>
          <Text style={styles.resultScore}>Score: {result.score}</Text>

          <TouchableOpacity
            style={styles.viewScoresButton}
            onPress={() => setShowPreviousScores(!showPreviousScores)}>
            <Text style={styles.viewScoresText}>{showPreviousScores ? "Hide Previous Scores" : "View Previous Scores"}</Text>
          </TouchableOpacity>

          {showPreviousScores && (
            <ScrollView style={styles.scoresList}>
              {previousScores.length === 0 ? (
                <Text style={styles.noScoresText}>No previous scores available.</Text>
              ) : (
                previousScores.map((entry, index) => (
                  <Text key={index} style={styles.scoreEntry}>
                    Attempt {index + 1}: {entry.level} (Score: {entry.score})
                  </Text>
                ))
              )}
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#546C75' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color:'#F5F5F5' },
  question: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color:'#F5F5F5' },
  optionsContainer: { flexDirection: 'column', alignItems: 'center', marginBottom: 20 },
  optionButton: { padding: 10, marginVertical: 5, width: 200, backgroundColor: '#A7D8DE', borderRadius: 5, alignItems: 'center' },
  selectedOption: { backgroundColor: '#546C75' },
  optionText: { color: '#000', fontSize: 16 },
  navButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  navButton: { backgroundColor: '#A7D8DE', padding: 10, borderRadius: 8, width: 100, alignItems: 'center' },
  navButtonText: { color: '#000', fontSize: 16 },
  disabledButton: { backgroundColor: '#cccccc', opacity: 0.7 },
  submitButton: { backgroundColor: '#A7D8DE', padding: 15, borderRadius: 8, marginTop: 20, width: 150, alignItems: 'center' },
  submitText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  resultContainer: { marginTop: 20, alignItems: 'center' },
  resultText: { fontSize: 18, fontWeight: 'bold', color: '#F5F5F5' },
  resultLevel: { fontSize: 22, fontWeight: 'bold', color: '#A7D8DE' },
  resultScore: { fontSize: 16, color: '#F5F5F5', marginTop: 5 },
  viewScoresButton: { backgroundColor: '#A7D8DE', padding: 10, borderRadius: 8, marginTop: 20, width: 180, alignItems: 'center' },
  viewScoresText: { color: '#000', fontSize: 16 },
  scoresList: { marginTop: 20, maxHeight: 150, width: '80%', backgroundColor: '#F5F5F5', padding: 10, borderRadius: 10 },
  noScoresText: { textAlign: 'center', color: '#000' },
  scoreEntry: { color: '#000', fontSize: 16, marginBottom: 5 }
});

export default DepressionTest;
